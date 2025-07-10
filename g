#!/bin/bash

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./g your commit message here"
    exit 1
fi

# Combine all arguments into a single commit message
commit_message="$*"

# Execute git commands
git add .
git commit -m "$commit_message"
git push