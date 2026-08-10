from __future__ import annotations

import argparse

import torch
from peft import AutoPeftModelForCausalLM
from transformers import AutoTokenizer


def main() -> None:
    parser = argparse.ArgumentParser(description="Merge a CareVoice LoRA adapter for serving.")
    parser.add_argument("--adapter", default="artifacts/carevoice-qwen-3b-lora")
    parser.add_argument("--output", default="artifacts/carevoice-qwen-3b-merged")
    args = parser.parse_args()

    model = AutoPeftModelForCausalLM.from_pretrained(
        args.adapter,
        torch_dtype=torch.bfloat16,
        device_map="auto",
    )
    merged = model.merge_and_unload()
    merged.save_pretrained(args.output, safe_serialization=True, max_shard_size="4GB")
    AutoTokenizer.from_pretrained(args.adapter).save_pretrained(args.output)


if __name__ == "__main__":
    main()