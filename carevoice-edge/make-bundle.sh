#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
MODEL_FILE=${1:-}
LLAMA_SERVER=${2:-}
DIST_DIR=${3:-"${ROOT_DIR}/carevoice-edge/dist/carevoice-bundle"}

if [[ -z ${MODEL_FILE} || -z ${LLAMA_SERVER} ]]; then
  printf '%s\n' "Usage: ./carevoice-edge/make-bundle.sh /path/to/carevoice-qwen-1.5b-q4_k_m.gguf /path/to/linux-arm64/llama-server [output-directory]"
  exit 1
fi
if [[ ! -f ${MODEL_FILE} || ! -x ${LLAMA_SERVER} ]]; then
  printf '%s\n' "The GGUF model must exist and llama-server must be an executable Linux ARM64 binary."
  exit 1
fi

cd "${ROOT_DIR}"
npm ci
npm run build

rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}/app/.next" "${DIST_DIR}/bin" "${DIST_DIR}/desktop" "${DIST_DIR}/lib" "${DIST_DIR}/model" "${DIST_DIR}/systemd"
cp -a .next/standalone/. "${DIST_DIR}/app/"
cp -a .next/static "${DIST_DIR}/app/.next/static"
cp -a public "${DIST_DIR}/app/public"
cp -a carevoice-edge/desktop/. "${DIST_DIR}/desktop/"
install -m 0755 "${LLAMA_SERVER}" "${DIST_DIR}/bin/llama-server"
find "$(dirname "${LLAMA_SERVER}")" -maxdepth 1 \( -type f -o -type l \) -name '*.so*' -exec cp -a {} "${DIST_DIR}/lib/" \;
install -m 0644 "${MODEL_FILE}" "${DIST_DIR}/model/carevoice-qwen-1.5b-q4_k_m.gguf"
install -m 0755 carevoice-edge/install.sh "${DIST_DIR}/install.sh"
install -m 0755 carevoice-edge/verify.sh "${DIST_DIR}/verify.sh"
cp -a carevoice-edge/systemd/. "${DIST_DIR}/systemd/"

tar -C "$(dirname "${DIST_DIR}")" -czf "${DIST_DIR}.tar.gz" "$(basename "${DIST_DIR}")"
printf 'Created offline appliance bundle: %s\n' "${DIST_DIR}.tar.gz"