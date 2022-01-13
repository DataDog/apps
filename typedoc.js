module.exports = {
    entryPoints: ['packages/*'],
    entryPointStrategy: 'packages',
    excludePrivate: true,
    excludeInternal: true,
    name: 'Datadog Apps API Documentation',
    out: 'docs/API/packages',
    readme: 'docs/API/README.md'
};
