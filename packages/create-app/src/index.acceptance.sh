#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
IFS=$'\n\t'

readonly DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Move to the package directory of this script so we start somewhere reliable.
cd "${DIR}/.."
rm -fr bin
yarn build

echo 'Checking that `--example` and `--features` cannot be used together'
if ./bin/index.js --example starter-kit --features custom-widget,side-panel 1> /dev/null; then
    test_exit_code="$?"
    echo "Expected non-zero exit code. Actual exit code: ${test_exit_code}"

    exit "${test_exit_code}"
fi
