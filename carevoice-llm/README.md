# CareVoice Hospital Model

This package fine-tunes and serves a small multilingual CareVoice model on hospital-controlled infrastructure. It adapts `Qwen/Qwen2.5-3B-Instruct` with QLoRA and exposes the bounded OpenAI-compatible endpoint consumed by the Next.js server.

For the smaller CPU-quantized Raspberry Pi appliance, use the same trainer with Qwen 1.5B and follow [../carevoice-edge/README.md](../carevoice-edge/README.md).

This is not a diagnostic model. Deterministic urgent-phrase routing remains in the CareVoice application and runs before model inference. Model output is schema-validated and falls back to local rules when unavailable or malformed.

## Hardware

- Training: Linux, NVIDIA GPU with at least 16 GB VRAM recommended, CUDA-compatible PyTorch
- Serving: Linux, NVIDIA GPU with approximately 8-12 GB VRAM for BF16; quantized serving can reduce this
- Storage: approximately 20 GB for base model, adapters, merged weights, and caches

The training dependencies are not installed by the web app. Use a dedicated Python environment on the GPU server.

## Train and merge

```bash
cd carevoice-llm
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python train.py
python merge.py
```

The included dataset is a schema and pipeline seed, not enough data for clinical or production quality. Replace it with reviewed, consented, de-identified examples. Keep a separate untouched safety evaluation set and obtain clinical, privacy, and security review before any pilot.

## Evaluate and serve

```bash
export CAREVOICE_MODEL_API_KEY="$(openssl rand -hex 32)"
docker compose up --build -d
python evaluate.py --api-key "$CAREVOICE_MODEL_API_KEY"
```

The service binds to `127.0.0.1:8000` by default. If CareVoice runs on another server, place the model behind internal TLS and network access controls. Do not expose the inference port publicly.

Configure the Next.js server:

```env
CAREVOICE_LLM_BASE_URL=http://127.0.0.1:8000
CAREVOICE_LLM_MODEL=carevoice-qwen-3b
CAREVOICE_LLM_API_KEY=the-same-random-service-token
```

Gemini remains an optional secondary provider. Remove `GOOGLE_GENERATIVE_AI_API_KEY` to guarantee that model requests stay inside hospital infrastructure. The deterministic fallback still works when the hospital model is offline.

## Production requirements

- Expand and clinically review the dataset; never train on identifiable patient records without a lawful, approved governance process.
- Encrypt model storage and service traffic, rotate service tokens, and restrict network routes.
- Add immutable inference audit metadata without storing raw patient prompts by default.
- Benchmark Cantonese and English separately for safety, JSON validity, latency, hallucination, and refusal behavior.
- Run red-team tests for prompt injection, credential extraction, medical advice, role bypass, and fabricated alert delivery.
- Version the dataset, adapter, base model, evaluation report, and rollback artifact together.