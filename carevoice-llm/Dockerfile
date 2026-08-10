FROM nvidia/cuda:12.4.1-cudnn-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /service
COPY requirements.txt .
RUN python3 -m pip install --upgrade pip && python3 -m pip install -r requirements.txt

COPY serve.py .
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --start-period=180s --retries=3 CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=5)"
CMD ["python3", "-m", "uvicorn", "serve:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]