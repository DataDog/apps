const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const PARENT_PORT = 8000;
const CHILD_PORT = 8001;

express()
    .use(serveStatic(path.resolve(__dirname, '..', 'sandbox/parent')))
    .use(serveStatic(path.resolve(__dirname, '..')))
    .listen(PARENT_PORT, () => {
        console.log(`Parent app served at http://localhost:${PARENT_PORT}`);
    });

express()
    .use(serveStatic(path.resolve(__dirname, '..', 'sandbox/child')))
    .use(serveStatic(path.resolve(__dirname, '..')))
    .listen(CHILD_PORT, () => {
        console.log(`Child app served at http://localhost:${CHILD_PORT}`);
    });
