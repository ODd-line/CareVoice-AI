#!/usr/bin/env bash
set -euo pipefail

ENV_FILE=${1:-/etc/carevoice/carevoice.env}
if [[ ! -r ${ENV_FILE} ]]; then
  printf 'Cannot read %s. Run with sudo or provide an environment file.\n' "${ENV_FILE}"
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

systemctl is-active --quiet carevoice-model.service
systemctl is-active --quiet carevoice-web.service
curl --fail --silent http://127.0.0.1:8000/health >/dev/null
curl --fail --silent http://127.0.0.1:3000/ >/dev/null

RESPONSE=$(curl --fail --silent http://127.0.0.1:8000/v1/chat/completions \
  -H "Authorization: Bearer ${CAREVOICE_LLM_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"model":"carevoice-qwen-1.5b","messages":[{"role":"user","content":"Return only JSON: {\"reply\":\"ready\",\"suggestions\":[]}"}],"temperature":0,"max_tokens":64,"response_format":{"type":"json_object"}}')

if [[ ${RESPONSE} != *'"choices"'* ]]; then
  printf '%s\n' "Model response did not contain a chat completion."
  exit 1
fi
printf '%s\n' "CareVoice web app and preloaded local AI are ready."