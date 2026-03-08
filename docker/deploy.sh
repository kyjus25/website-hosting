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

SELECTED_APPS=()
CHECKLIST_SELECTIONS=()

draw_app_checklist() {
  local current_index="$1"
  local message="${2:-}"

  printf '\033[H\033[2J'
  echo "Select apps to build and deploy"
  echo "Use up/down arrow keys to move, space to toggle, a to toggle all, enter to continue."
  echo

  local i marker cursor
  for i in "${!APPS[@]}"; do
    marker='[ ]'
    if [[ "${CHECKLIST_SELECTIONS[$i]}" == "1" ]]; then
      marker='[x]'
    fi

    cursor=' '
    if [[ "$i" -eq "$current_index" ]]; then
      cursor='>'
    fi

    printf '%s %s %s\n' "$cursor" "$marker" "${APPS[$i]}"
  done

  if [[ -n "$message" ]]; then
    echo
    echo "$message"
  fi
}

prompt_for_apps() {
  if [[ $# -gt 0 ]]; then
    for requested_app in "$@"; do
      if [[ ! -d "${APPLICATIONS_DIR}/${requested_app}" ]]; then
        echo "Unknown application: ${requested_app}" >&2
        exit 1
      fi
      SELECTED_APPS+=("${requested_app}")
    done
    return
  fi

  if [[ ! -t 0 || ! -t 1 ]]; then
    SELECTED_APPS=("${APPS[@]}")
    return
  fi

  local current_index=0
  local message=""
  local key escape_sequence i

  CHECKLIST_SELECTIONS=()
  for _ in "${APPS[@]}"; do
    CHECKLIST_SELECTIONS+=("0")
  done

  while true; do
    draw_app_checklist "$current_index" "$message"
    message=""

    IFS= read -rsn1 key
    case "$key" in
      "")
        SELECTED_APPS=()
        for i in "${!APPS[@]}"; do
          if [[ "${CHECKLIST_SELECTIONS[$i]}" == "1" ]]; then
            SELECTED_APPS+=("${APPS[$i]}")
          fi
        done

        if [[ ${#SELECTED_APPS[@]} -eq 0 ]]; then
          message="Select at least one application."
          continue
        fi

        printf '\033[H\033[2J'
        return
        ;;
      " ")
        if [[ "${CHECKLIST_SELECTIONS[$current_index]}" == "1" ]]; then
          CHECKLIST_SELECTIONS[$current_index]="0"
        else
          CHECKLIST_SELECTIONS[$current_index]="1"
        fi
        ;;
      "a"|"A")
        local select_all=0
        for i in "${!CHECKLIST_SELECTIONS[@]}"; do
          if [[ "${CHECKLIST_SELECTIONS[$i]}" == "0" ]]; then
            select_all=1
            break
          fi
        done

        for i in "${!CHECKLIST_SELECTIONS[@]}"; do
          CHECKLIST_SELECTIONS[$i]="$select_all"
        done
        ;;
      $'\x1b')
        escape_sequence=""
        IFS= read -rsn1 -t 1 key || key=""
        escape_sequence+="${key}"
        if [[ "${key}" == "[" || "${key}" == "O" ]]; then
          IFS= read -rsn1 -t 1 key || key=""
          escape_sequence+="${key}"
        fi
        case "${escape_sequence}" in
          "[A"|"OA")
            current_index=$(((current_index - 1 + ${#APPS[@]}) % ${#APPS[@]}))
            ;;
          "[B"|"OB")
            current_index=$(((current_index + 1) % ${#APPS[@]}))
            ;;
        esac
        ;;
      "q"|"Q")
        echo
        echo "Deployment cancelled."
        exit 1
        ;;
    esac
  done
}

prompt_for_apps "$@"

TMP_DIR="$(mktemp -d)"

run_remote_ssh() {
  ssh "${REMOTE_HOST}" "$@"
}

upload_file_via_ssh() {
  local local_path="$1"
  local remote_path="$2"

  run_remote_ssh "cat > ${remote_path}" < "${local_path}"
}

cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

IMAGE_PLATFORM="linux/amd64" IMAGE_OUTPUT_MODE="archive" IMAGE_OUTPUT_DIR="${TMP_DIR}" "${SCRIPT_DIR}/build.sh" "${SELECTED_APPS[@]}"

echo "Preparing remote directories on ${REMOTE_HOST}"
run_remote_ssh "mkdir -p ${REMOTE_DIR} ${REMOTE_TMP_DIR}"

echo "Uploading docker-compose.yml"
upload_file_via_ssh "${SCRIPT_DIR}/docker-compose.yml" "${REMOTE_DIR}/docker-compose.yml"

for app in "${SELECTED_APPS[@]}"; do
  archive_path="${TMP_DIR}/${app}.tar"
  remote_archive_path="${REMOTE_TMP_DIR}/${app}.tar"

  echo "Uploading ${app} image archive"
  upload_file_via_ssh "${archive_path}" "${remote_archive_path}"

  echo "Importing ${app}:latest on ${REMOTE_HOST}"
  run_remote_ssh "docker load --input ${remote_archive_path} && rm -f ${remote_archive_path}"
done

REMOTE_SERVICES=()
for app in "${SELECTED_APPS[@]}"; do
  REMOTE_SERVICES+=("$(printf '%q' "${app}")")
done

echo "Restarting selected remote services"
run_remote_ssh "cd ${REMOTE_DIR} && docker compose up -d --remove-orphans ${REMOTE_SERVICES[*]}"
