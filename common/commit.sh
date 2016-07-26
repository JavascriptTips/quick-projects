#!/usr/bin/env bash
message=$*
git add -A
git commit -a -m "$message"