#!/usr/bin/env bash

set -e

npm run build

cd docs/.vuepress/dist

cp -r * ../../../

git add .
git commit -m 'deploy'
git push