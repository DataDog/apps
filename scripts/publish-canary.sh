#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
IFS=$'\n\t'

readonly SHA=$(git rev-parse --short HEAD)
readonly SNAPSHOT="canary.${SHA}"
yarn changeset version --snapshot "${SNAPSHOT}"
yarn changeset publish --no-git-tag --tag canary
git tag --contains HEAD --list --format='yarn add %(refname:strip=2)'
