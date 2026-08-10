#!/usr/bin/env bash
set -euo pipefail

MERGED_MODEL=${1:-}
LLAMA_CPP_DIR=${2:-}
OUTPUT_DIR=${3:-"$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/models"}

if [[ -z ${MERGED_MODEL} || -z ${LLAMA_CPP_DIR} ]]; then
  printf '%s\n' "Usage: ./carevoice-edge/export-pi-model.sh /path/to/merged-qwen-1.5b /path/to/llama.cpp [output-directory]"
  exit 1
fi

CONVERTER="${LLAMA_CPP_DIR}/convert_hf_to_gguf.py"
QUANTIZER="${LLAMA_CPP_DIR}/build/bin/llama-quantize"
if [[ ! -f ${CONVERTER} || ! -x ${QUANTIZER} ]]; then
  printf '%s\n' "llama.cpp must be built and include convert_hf_to_gguf.py and build/bin/llama-quantize."
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"
F16_MODEL="${OUTPUT_DIR}/carevoice-qwen-1.5b-f16.gguf"
Q4_MODEL="${OUTPUT_DIR}/carevoice-qwen-1.5b-q4_k_m.gguf"
python3 "${CONVERTER}" "${MERGED_MODEL}" --outfile "${F16_MODEL}" --outtype f16
"${QUANTIZER}" "${F16_MODEL}" "${Q4_MODEL}" Q4_K_M
rm -f "${F16_MODEL}"
printf 'Created Raspberry Pi model: %s\n' "${Q4_MODEL}"