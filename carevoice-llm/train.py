from __future__ import annotations

import argparse
from pathlib import Path

import torch
from datasets import load_dataset
from peft import LoraConfig, prepare_model_for_kbit_training
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from trl import SFTConfig, SFTTrainer


DEFAULT_MODEL = "Qwen/Qwen2.5-3B-Instruct"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fine-tune CareVoice with QLoRA.")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--train-file", default="data/train.jsonl")
    parser.add_argument("--eval-file", default="data/eval.jsonl")
    parser.add_argument("--output-dir", default="artifacts/carevoice-qwen-3b-lora")
    parser.add_argument("--epochs", type=float, default=3.0)
    parser.add_argument("--learning-rate", type=float, default=2e-4)
    parser.add_argument("--batch-size", type=int, default=2)
    parser.add_argument("--gradient-accumulation", type=int, default=8)
    parser.add_argument("--max-seq-length", type=int, default=1024)
    parser.add_argument("--seed", type=int, default=42)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not torch.cuda.is_available():
        raise RuntimeError("QLoRA training requires a CUDA-capable NVIDIA GPU.")

    tokenizer = AutoTokenizer.from_pretrained(args.model, use_fast=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    quantization = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16,
        bnb_4bit_use_double_quant=True,
    )
    model = AutoModelForCausalLM.from_pretrained(
        args.model,
        device_map="auto",
        torch_dtype=torch.bfloat16,
        quantization_config=quantization,
        use_cache=False,
    )
    model = prepare_model_for_kbit_training(model)

    files = {
        "train": str(Path(args.train_file)),
        "validation": str(Path(args.eval_file)),
    }
    dataset = load_dataset("json", data_files=files)

    def render_chat(example: dict[str, object]) -> dict[str, str]:
        messages = example.get("messages")
        if not isinstance(messages, list):
            raise ValueError("Every dataset row must contain a messages list.")
        text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=False)
        return {"text": text}

    rendered = dataset.map(render_chat, remove_columns=dataset["train"].column_names)
    lora = LoraConfig(
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    )
    training = SFTConfig(
        output_dir=args.output_dir,
        num_train_epochs=args.epochs,
        learning_rate=args.learning_rate,
        per_device_train_batch_size=args.batch_size,
        per_device_eval_batch_size=args.batch_size,
        gradient_accumulation_steps=args.gradient_accumulation,
        max_seq_length=args.max_seq_length,
        dataset_text_field="text",
        eval_strategy="epoch",
        save_strategy="epoch",
        logging_steps=5,
        warmup_ratio=0.05,
        lr_scheduler_type="cosine",
        bf16=True,
        gradient_checkpointing=True,
        report_to="none",
        seed=args.seed,
    )
    trainer = SFTTrainer(
        model=model,
        args=training,
        train_dataset=rendered["train"],
        eval_dataset=rendered["validation"],
        peft_config=lora,
        processing_class=tokenizer,
    )
    trainer.train()
    trainer.save_model(args.output_dir)
    tokenizer.save_pretrained(args.output_dir)


if __name__ == "__main__":
    main()