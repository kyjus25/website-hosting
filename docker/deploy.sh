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
UPLOAD_ROOT="${TMP_DIR}/upload-home"
UPLOAD_ARCHIVE="${TMP_DIR}/deploy-bundle.tar"
SSH_PASSWORD=""

cleanup() {
  SSH_PASSWORD=""
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

can_use_passwordless_ssh() {
  ssh -o BatchMode=yes -o ConnectTimeout=5 "${REMOTE_HOST}" true >/dev/null 2>&1
}

prompt_for_ssh_password() {
  if [[ -n "${SSH_PASSWORD}" || -n "${DEPLOY_SSH_PASSWORD:-}" ]]; then
    return
  fi

  if ! [[ -t 0 && -t 1 ]]; then
    return
  fi

  printf '%s password: ' "${REMOTE_HOST}"
  IFS= read -rs SSH_PASSWORD
  printf '\n'
}

prepare_upload_bundle() {
  mkdir -p "${UPLOAD_ROOT}/Documents/website-redesign" "${UPLOAD_ROOT}/docker-imports"

  cp "${SCRIPT_DIR}/docker-compose.yml" "${UPLOAD_ROOT}/Documents/website-redesign/docker-compose.yml"

  local app archive_path
  for app in "${SELECTED_APPS[@]}"; do
    archive_path="${TMP_DIR}/${app}.tar"
    cp "${archive_path}" "${UPLOAD_ROOT}/docker-imports/${app}.tar"
  done

  COPYFILE_DISABLE=1 tar -cf "${UPLOAD_ARCHIVE}" -C "${UPLOAD_ROOT}" .
}

run_remote_deploy() {
  local upload_size remote_command app
  local -a ssh_cmd

  upload_size="$(stat -f %z "${UPLOAD_ARCHIVE}")"
  remote_command="mkdir -p ${REMOTE_DIR} ${REMOTE_TMP_DIR} && tar -xf - -C ~"

  for app in "${SELECTED_APPS[@]}"; do
    remote_command+=" && docker load --input ${REMOTE_TMP_DIR}/${app}.tar && rm -f ${REMOTE_TMP_DIR}/${app}.tar"
  done

  remote_command+=" && cd ${REMOTE_DIR} && docker compose up -d --remove-orphans ${REMOTE_SERVICES[*]}"
  ssh_cmd=(ssh "${REMOTE_HOST}" "${remote_command}")

  echo "Uploading deploy bundle to ${REMOTE_HOST}"
  if can_use_passwordless_ssh; then
    "${ssh_cmd[@]}" < <(pv -ptebar -s "${upload_size}" "${UPLOAD_ARCHIVE}")
    return
  fi

  prompt_for_ssh_password
  if [[ -n "${DEPLOY_SSH_PASSWORD:-}" ]]; then
    SSHPASS="${DEPLOY_SSH_PASSWORD}" sshpass -e "${ssh_cmd[@]}" < <(pv -ptebar -s "${upload_size}" "${UPLOAD_ARCHIVE}")
    return
  fi

  if [[ -n "${SSH_PASSWORD}" ]]; then
    SSHPASS="${SSH_PASSWORD}" sshpass -e "${ssh_cmd[@]}" < <(pv -ptebar -s "${upload_size}" "${UPLOAD_ARCHIVE}")
    return
  fi

  "${ssh_cmd[@]}" < <(pv -ptebar -s "${upload_size}" "${UPLOAD_ARCHIVE}")
}

IMAGE_PLATFORM="linux/amd64" IMAGE_OUTPUT_MODE="archive" IMAGE_OUTPUT_DIR="${TMP_DIR}" "${SCRIPT_DIR}/build.sh" "${SELECTED_APPS[@]}"

REMOTE_SERVICES=()
for app in "${SELECTED_APPS[@]}"; do
  REMOTE_SERVICES+=("$(printf '%q' "${app}")")
done

echo "Preparing deploy bundle"
prepare_upload_bundle

echo "Deploying selected remote services"
run_remote_deploy
