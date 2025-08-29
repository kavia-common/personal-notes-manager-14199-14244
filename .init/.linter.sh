#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-notes-manager-14199-14244/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

