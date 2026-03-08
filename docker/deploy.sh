#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
APPLICATIONS_DIR="${REPO_ROOT}/applications"
REMOTE_HOST="mipps@highlinemedia.org"
REMOTE_DIR="~/Documents/website-redesign"
REMOTE_TMP_DIR="~/docker-imports"

APPS=()
while IFS= read -r app; do
  APPS+=("${app}")
done < <(find "${APPLICATIONS_DIR}" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)

if [[ ${#APPS[@]} -eq 0 ]]; then
  echo "No applications found in ${APPLICATIONS_DIR}" >&2
  exit 1
fi

TMP_DIR="$(mktemp -d)"
SSH_CONTROL_DIR="${HOME}/.ssh"
SSH_CONTROL_PATH="${SSH_CONTROL_DIR}/codex-deploy-%C"
SSH_OPTS=(
  -o ControlMaster=auto
  -o ControlPersist=10m
  -o "ControlPath=${SSH_CONTROL_PATH}"
)
cleanup() {
  ssh "${SSH_OPTS[@]}" -O exit "${REMOTE_HOST}" >/dev/null 2>&1 || true
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

IMAGE_PLATFORM="linux/amd64" IMAGE_OUTPUT_MODE="archive" IMAGE_OUTPUT_DIR="${TMP_DIR}" "${SCRIPT_DIR}/build.sh"

mkdir -p "${SSH_CONTROL_DIR}"

echo "Opening SSH control connection to ${REMOTE_HOST}"
ssh "${SSH_OPTS[@]}" -MNf "${REMOTE_HOST}"

echo "Preparing remote directories on ${REMOTE_HOST}"
ssh "${SSH_OPTS[@]}" "${REMOTE_HOST}" "mkdir -p ${REMOTE_DIR} ${REMOTE_TMP_DIR}"

echo "Uploading docker-compose.yml"
scp "${SSH_OPTS[@]}" "${SCRIPT_DIR}/docker-compose.yml" "${REMOTE_HOST}:${REMOTE_DIR}/docker-compose.yml"

for app in "${APPS[@]}"; do
  archive_path="${TMP_DIR}/${app}.tar"
  remote_archive_path="${REMOTE_TMP_DIR}/${app}.tar"

  echo "Uploading ${app} image archive"
  scp "${SSH_OPTS[@]}" "${archive_path}" "${REMOTE_HOST}:${remote_archive_path}"

  echo "Importing ${app}:latest on ${REMOTE_HOST}"
  ssh "${SSH_OPTS[@]}" "${REMOTE_HOST}" "docker load --input ${remote_archive_path} && rm -f ${remote_archive_path}"
done

echo "Restarting remote compose stack"
ssh "${SSH_OPTS[@]}" "${REMOTE_HOST}" "cd ${REMOTE_DIR} && docker compose up -d --remove-orphans"
