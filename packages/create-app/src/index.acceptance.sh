#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
IFS=$'\n\t'

readonly DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TEMPORARY_DIR="$(mktemp -d -t 'index.acceptance.sh.XXXXXXXXXX')"

cleanup() {
    local exit_code="$?"

    echo 'Removing temp directory'
    rm -fr "${TEMPORARY_DIR}"

    exit "${exit_code}"
}

trap cleanup EXIT


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

echo 'Checking that `--features` requires at least one feature'
if ./bin/index.js --features 1> /dev/null; then
    test_exit_code="$?"
    echo "Expected non-zero exit code. Actual exit code: ${test_exit_code}"

    exit "${test_exit_code}"
fi

echo 'Checking that `--features custom-widget` creates the correct files'
./bin/index.js --directory "${TEMPORARY_DIR}" --features custom-widget --no-install 1> /dev/null
if ! test -f "${TEMPORARY_DIR}/src/custom-widget/index.tsx"; then
    echo 'Did not create `src/custom-widget/index.tsx` for `--features custom-widget`'

    exit 1
fi
# Remove any generated files.
rm -fr "${TEMPORARY_DIR}/*"

echo 'Checking that `--features custom-widget,modal` creates the correct files'
./bin/index.js --directory "${TEMPORARY_DIR}" --features custom-widget,modal --no-install 1> /dev/null
if ! test -f "${TEMPORARY_DIR}/src/controller/modal.ts"; then
    echo 'Did not create `src/controller/modal.ts` for `--features custom-widget,modal`'

    exit 1
fi
if ! test -f "${TEMPORARY_DIR}/src/custom-widget/index.tsx"; then
    echo 'Did not create `src/custom-widget/index.tsx` for `--features custom-widget`'

    exit 1
fi
if ! test -f "${TEMPORARY_DIR}/src/modal/index.tsx"; then
    echo 'Did not create `src/modal/index.tsx` for `--features custom-widget,modal`'

    exit 1
fi
# Remove any generated files.
rm -fr "${TEMPORARY_DIR}/*"

echo 'Checking that `--features custom-widget,side-panel` creates the correct files'
./bin/index.js --directory "${TEMPORARY_DIR}" --features custom-widget,side-panel --no-install 1> /dev/null
if ! test -f "${TEMPORARY_DIR}/src/custom-widget/index.tsx"; then
    echo 'Did not create `src/custom-widget/index.tsx` for `--features custom-widget`'

    exit 1
fi
if ! test -f "${TEMPORARY_DIR}/src/side-panel/index.tsx"; then
    echo 'Did not create `src/side-panel/index.tsx` for `--features custom-widget,side-panel`'

    exit 1
fi
# Remove any generated files.
rm -fr "${TEMPORARY_DIR}/*"

echo 'Checking that `--features dashboard-cog-menu` creates the correct files'
./bin/index.js --directory "${TEMPORARY_DIR}" --features dashboard-cog-menu --no-install 1> /dev/null
if ! test -f "${TEMPORARY_DIR}/src/controller/dashboard-cog-menu.ts"; then
    echo 'Did not create `src/controller/dashboard-cog-menu.ts` for `--features dashboard-cog-menu`'

    exit 1
fi
# Remove any generated files.
rm -fr "${TEMPORARY_DIR}/*"

echo 'Checking that `--features widget-context-menu` creates the correct files'
./bin/index.js --directory "${TEMPORARY_DIR}" --features widget-context-menu --no-install 1> /dev/null
if ! test -f "${TEMPORARY_DIR}/src/controller/widget-context-menu.ts"; then
    echo 'Did not create `src/controller/widget-context-menu.ts` for `--features widget-context-menu`'

    exit 1
fi
# Remove any generated files.
rm -fr "${TEMPORARY_DIR}/*"
