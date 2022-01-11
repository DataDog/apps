const BASE_URL =
    process.env.DD_SITE === 'datadoghq.eu'
        ? 'https://api.datadoghq.eu'
        : 'https://api.datadoghq.com';

module.exports = BASE_URL;
