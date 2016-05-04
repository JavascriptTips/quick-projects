#!/usr/bin/env bash
dir=$1
gameName=$2

cd $dir

git init

echo "module.exports = { __DEBUG__:false };" > $dir/tasks/env.js