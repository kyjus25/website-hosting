#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
APPLICATIONS_DIR="${REPO_ROOT}/applications"
IMAGE_PLATFORM="${IMAGE_PLATFORM:-}"
IMAGE_OUTPUT_MODE="${IMAGE_OUTPUT_MODE:-load}"
IMAGE_OUTPUT_DIR="${IMAGE_OUTPUT_DIR:-}"

APPS=()
while IFS= read -r app; do
  APPS+=("${app}")
done < <(find "${APPLICATIONS_DIR}" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)

if [[ ${#APPS[@]} -eq 0 ]]; then
  echo "No applications found in ${APPLICATIONS_DIR}" >&2
  exit 1
fi

if [[ $# -gt 0 ]]; then
  APPS=()
  for requested_app in "$@"; do
    if [[ ! -d "${APPLICATIONS_DIR}/${requested_app}" ]]; then
      echo "Unknown application: ${requested_app}" >&2
      exit 1
    fi
    APPS+=("${requested_app}")
  done
fi

if [[ ! -x "${REPO_ROOT}/node_modules/.bin/astro" ]]; then
  echo "Installing workspace dependencies"
  (cd "${REPO_ROOT}" && npm install)
fi

if [[ "${IMAGE_OUTPUT_MODE}" != "load" && "${IMAGE_OUTPUT_MODE}" != "archive" ]]; then
  echo "IMAGE_OUTPUT_MODE must be 'load' or 'archive'" >&2
  exit 1
fi

if [[ "${IMAGE_OUTPUT_MODE}" == "archive" && -z "${IMAGE_OUTPUT_DIR}" ]]; then
  echo "IMAGE_OUTPUT_DIR is required when IMAGE_OUTPUT_MODE=archive" >&2
  exit 1
fi

if [[ "${IMAGE_OUTPUT_MODE}" == "archive" && -z "${IMAGE_PLATFORM}" ]]; then
  echo "IMAGE_PLATFORM is required when IMAGE_OUTPUT_MODE=archive" >&2
  exit 1
fi

if [[ "${IMAGE_OUTPUT_MODE}" == "archive" || -n "${IMAGE_PLATFORM}" ]]; then
  docker buildx inspect --bootstrap >/dev/null
fi

for app in "${APPS[@]}"; do
  echo "Building static site for ${app}"
  (cd "${REPO_ROOT}" && npm run build -- "${app}")

  if [[ "${IMAGE_OUTPUT_MODE}" == "archive" ]]; then
    archive_path="${IMAGE_OUTPUT_DIR}/${app}.tar"
    echo "Building ${app}:latest for ${IMAGE_PLATFORM}"
    docker buildx build \
      --platform "${IMAGE_PLATFORM}" \
      --file "${SCRIPT_DIR}/Dockerfile" \
      --tag "${app}:latest" \
      --load \
      "${REPO_ROOT}/applications/${app}"
    echo "Saving ${app}:latest -> ${archive_path}"
    docker save --output "${archive_path}" "${app}:latest"
  elif [[ -n "${IMAGE_PLATFORM}" ]]; then
    echo "Building ${app}:latest for ${IMAGE_PLATFORM}"
    docker buildx build \
      --platform "${IMAGE_PLATFORM}" \
      --file "${SCRIPT_DIR}/Dockerfile" \
      --tag "${app}:latest" \
      --load \
      "${REPO_ROOT}/applications/${app}"
  else
    echo "Building ${app}:latest"
    docker build \
      --file "${SCRIPT_DIR}/Dockerfile" \
      --tag "${app}:latest" \
      "${REPO_ROOT}/applications/${app}"
  fi
done
