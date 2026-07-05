#!/bin/sh
# PALATOS gate-guard (POSIX sh) - advisory backstop for gated autonomy.
# PreToolUse:Bash hook. Reads the tool payload on stdin, scans the intended
# command, and BLOCKS (exit 2) genuinely irreversible/outward actions so a
# human must approve them. Warns on maybe-spend commands. Everything else passes.
input=$(cat)

# Best-effort extract of the command field; fall back to the whole payload.
cmd=$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)".*/\1/p')
[ -z "$cmd" ] && cmd="$input"

block() {
  printf 'PALATOS GATE (%s): "%s" is a gated action per palatos:company-os.\n' "$1" "$2" 1>&2
  printf 'Do NOT perform it. Queue it to .palatos/gates.md and get human approval via /palatos:gate approve.\n' 1>&2
  exit 2
}

case "$cmd" in
  *"git push"*|*"git remote add"*) block "push" "git push / remote write" ;;
  *"npm publish"*|*"yarn publish"*|*"pnpm publish"*) block "publish" "package publish" ;;
  *"vercel"*"--prod"*|*"netlify deploy"*|*"eas submit"*|*"supabase db push"*|*"supabase functions deploy"*|*"fly deploy"*|*"gcloud run deploy"*|*"kubectl apply"*|*"terraform apply"*|*"serverless deploy"*) block "deploy" "external deploy / infra change" ;;
  *"rm -rf"*|*"rm -fr"*|*"git reset --hard"*|*"git push --force"*|*"git push -f"*|*"DROP TABLE"*|*"DROP DATABASE"*|*"TRUNCATE "*|*"mkfs"*) block "destructive" "destructive / irreversible operation" ;;
  *"stripe "*|*"aws "*|*"gcloud "*|*"docker push"*|*"eas build"*)
    printf 'PALATOS notice: "%s" may spend money or change infrastructure - confirm it is not a gated action before proceeding.\n' "$cmd" 1>&2
    exit 0 ;;
esac

exit 0
