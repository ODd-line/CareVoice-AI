#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  printf '%s\n' "Run this installer as root: sudo ./install.sh /path/to/carevoice-bundle"
  exit 1
fi

BUNDLE_DIR=${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}
for required in app/server.js bin/llama-server desktop/carevoice-home desktop/carevoice-home.desktop model/carevoice-qwen-1.5b-q4_k_m.gguf systemd/carevoice-model.service systemd/carevoice-web.service; do
  if [[ ! -e "${BUNDLE_DIR}/${required}" ]]; then
    printf 'Missing bundle file: %s\n' "${required}"
    exit 1
  fi
done
if [[ ! -x /usr/bin/node ]]; then
  printf '%s\n' "Node.js is missing. Install Node.js 20 or later in the Raspberry Pi OS image."
  exit 1
fi

if ! id carevoice >/dev/null 2>&1; then
  useradd --system --home /var/lib/carevoice --create-home --shell /usr/sbin/nologin carevoice
fi

systemctl stop carevoice-web.service carevoice-model.service 2>/dev/null || true
install -d -m 0750 -o carevoice -g carevoice /opt/carevoice/app /opt/carevoice/bin /opt/carevoice/lib /opt/carevoice/model /var/lib/carevoice
cp -a "${BUNDLE_DIR}/app/." /opt/carevoice/app/
install -m 0755 -o carevoice -g carevoice "${BUNDLE_DIR}/bin/llama-server" /opt/carevoice/bin/llama-server
cp -a "${BUNDLE_DIR}/lib/." /opt/carevoice/lib/
chown -R carevoice:carevoice /opt/carevoice/lib
install -m 0640 -o carevoice -g carevoice "${BUNDLE_DIR}/model/carevoice-qwen-1.5b-q4_k_m.gguf" /opt/carevoice/model/carevoice-qwen-1.5b-q4_k_m.gguf
chown -R carevoice:carevoice /opt/carevoice/app

install -d -m 0750 -o root -g carevoice /etc/carevoice
if [[ ! -f /etc/carevoice/carevoice.env ]]; then
  umask 0077
  MODEL_TOKEN=$(openssl rand -hex 32)
  AUTH_SECRET=$(openssl rand -base64 48 | tr -d '\n')
  cat > /etc/carevoice/carevoice.env <<EOF
CAREVOICE_EDGE_MODE=true
CAREVOICE_LLM_BASE_URL=http://127.0.0.1:8000
CAREVOICE_LLM_MODEL=carevoice-qwen-1.5b
CAREVOICE_LLM_API_KEY=${MODEL_TOKEN}
AUTH_SECRET=${AUTH_SECRET}
GOOGLE_GENERATIVE_AI_API_KEY=
EOF
  chown root:carevoice /etc/carevoice/carevoice.env
  chmod 0640 /etc/carevoice/carevoice.env
fi

install -m 0644 "${BUNDLE_DIR}/systemd/carevoice-model.service" /etc/systemd/system/carevoice-model.service
install -m 0644 "${BUNDLE_DIR}/systemd/carevoice-web.service" /etc/systemd/system/carevoice-web.service

DESKTOP_USER=${CAREVOICE_DESKTOP_USER:-${SUDO_USER:-}}
if [[ -n ${DESKTOP_USER} && ${DESKTOP_USER} != root ]] && id "${DESKTOP_USER}" >/dev/null 2>&1; then
  DESKTOP_GROUP=$(id -gn "${DESKTOP_USER}")
  DESKTOP_HOME=$(getent passwd "${DESKTOP_USER}" | cut -d: -f6)
  install -d -m 0755 -o "${DESKTOP_USER}" -g "${DESKTOP_GROUP}" \
    "${DESKTOP_HOME}/Desktop" \
    "${DESKTOP_HOME}/.config/autostart" \
    "${DESKTOP_HOME}/.local/bin" \
    "${DESKTOP_HOME}/.local/share/icons"
  install -m 0755 -o "${DESKTOP_USER}" -g "${DESKTOP_GROUP}" "${BUNDLE_DIR}/desktop/carevoice-home" "${DESKTOP_HOME}/.local/bin/carevoice-home"
  install -m 0644 -o "${DESKTOP_USER}" -g "${DESKTOP_GROUP}" "${BUNDLE_DIR}/app/public/assets/carevoice-home.svg" "${DESKTOP_HOME}/.local/share/icons/carevoice-home.svg"
  sed "s|@HOME@|${DESKTOP_HOME}|g" "${BUNDLE_DIR}/desktop/carevoice-home.desktop" > "${DESKTOP_HOME}/Desktop/CareVoice Home.desktop"
  chown "${DESKTOP_USER}:${DESKTOP_GROUP}" "${DESKTOP_HOME}/Desktop/CareVoice Home.desktop"
  chmod 0755 "${DESKTOP_HOME}/Desktop/CareVoice Home.desktop"
  install -m 0755 -o "${DESKTOP_USER}" -g "${DESKTOP_GROUP}" "${DESKTOP_HOME}/Desktop/CareVoice Home.desktop" "${DESKTOP_HOME}/.config/autostart/carevoice-home.desktop"
fi

hostnamectl set-hostname carevoice-micro
systemctl daemon-reload
systemctl enable --now carevoice-model.service carevoice-web.service

printf '%s\n' "CareVoice Micro installed. Open http://carevoice-micro.local:3000 after the services become ready."