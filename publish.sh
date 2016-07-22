#!/usr/bin/env bash
withNpm=$1

if [ ! $withNpm ]
then
  echo "fuck"
  npm publish
fi
git push