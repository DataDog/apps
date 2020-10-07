module.exports = {
    rules: {
        'no-console': 0,
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true
            }
        ]
    }
};
