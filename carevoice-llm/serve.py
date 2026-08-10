from __future__ import annotations

import asyncio
import os
import time
import uuid
from contextlib import asynccontextmanager
from typing import Literal

import torch
from fastapi import Depends, FastAPI, Header, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from transformers import AutoModelForCausalLM, AutoTokenizer


MODEL_PATH = os.getenv("CAREVOICE_MODEL_PATH", "artifacts/carevoice-qwen-3b-merged")
MODEL_NAME = os.getenv("CAREVOICE_MODEL_NAME", "carevoice-qwen-3b")
API_KEY = os.getenv("CAREVOICE_MODEL_API_KEY", "")


class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="forbid")
    role: Literal["system", "user", "assistant"]
    content: str = Field(min_length=1, max_length=8_000)


class ResponseFormat(BaseModel):
    model_config = ConfigDict(extra="forbid")
    type: Literal["json_object"]


class ChatCompletionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    model: str
    messages: list[ChatMessage] = Field(min_length=1, max_length=12)
    temperature: float = Field(default=0.2, ge=0.0, le=1.0)
    max_tokens: int = Field(default=320, ge=32, le=768)
    response_format: ResponseFormat | None = None


class ModelRuntime:
    def __init__(self) -> None:
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, use_fast=True)
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_PATH,
            torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
        )
        self.model.eval()
        self.lock = asyncio.Lock()

    def generate(self, request: ChatCompletionRequest) -> str:
        messages = [message.model_dump() for message in request.messages]
        prompt = self.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        encoded = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2_048)
        device = next(self.model.parameters()).device
        encoded = {key: value.to(device) for key, value in encoded.items()}
        with torch.inference_mode():
            output = self.model.generate(
                **encoded,
                max_new_tokens=request.max_tokens,
                do_sample=request.temperature > 0,
                temperature=max(request.temperature, 0.01),
                top_p=0.9,
                repetition_penalty=1.05,
                pad_token_id=self.tokenizer.eos_token_id,
            )
        generated = output[0, encoded["input_ids"].shape[1]:]
        return self.tokenizer.decode(generated, skip_special_tokens=True).strip()


runtime: ModelRuntime | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global runtime
    runtime = ModelRuntime()
    yield
    runtime = None


app = FastAPI(title="CareVoice Hospital Model", version="1.0.0", lifespan=lifespan)


def authorize(authorization: str | None = Header(default=None)) -> None:
    if not API_KEY:
        return
    if authorization != f"Bearer {API_KEY}":
        raise HTTPException(status_code=401, detail="Invalid model service token.")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ready" if runtime else "loading", "model": MODEL_NAME}


@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest, _: None = Depends(authorize)) -> dict[str, object]:
    if runtime is None:
        raise HTTPException(status_code=503, detail="Model is still loading.")
    if request.model not in {MODEL_NAME, "carevoice-qwen-3b"}:
        raise HTTPException(status_code=404, detail="Requested model is unavailable.")
    started = time.time()
    async with runtime.lock:
        content = await asyncio.to_thread(runtime.generate, request)
    return {
        "id": f"chatcmpl-{uuid.uuid4().hex}",
        "object": "chat.completion",
        "created": int(started),
        "model": MODEL_NAME,
        "choices": [{"index": 0, "message": {"role": "assistant", "content": content}, "finish_reason": "stop"}],
    }
