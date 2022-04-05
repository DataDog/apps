#!/usr/bin/env node

try {
    // eslint-disable-next-line global-require, import/no-unresolved
    require('husky').install();
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
}
