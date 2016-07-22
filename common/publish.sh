#!/usr/bin/env bash
withoutNpm=$1

if [ ! $withoutNpm ]
then
  npm publish
fi
git push