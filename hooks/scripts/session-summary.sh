#!/bin/sh
# PALATOS session-summary (POSIX sh) - Stop hook.
# Non-blocking. Surfaces pending gates and a dirty working tree at the end of a turn.
cat >/dev/null 2>&1   # consume stdin

msgs=""

if [ -f .palatos/gates.md ]; then
  n=$(grep -c 'status:[[:space:]]*PENDING' .palatos/gates.md 2>/dev/null || printf 0)
  if [ "$n" -gt 0 ] 2>/dev/null; then
    msgs="$n gate(s) awaiting approval - run /palatos:gate. "
  fi
fi

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  msgs="${msgs}working tree has uncommitted changes."
fi

if [ -n "$msgs" ]; then
  printf '{"systemMessage":"PALATOS: %s"}\n' "$msgs"
fi
exit 0
