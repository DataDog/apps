const DD_SITE = process.env.DD_SITE;
const DD_API_KEY = process.env.DD_API_KEY;
const DD_APP_KEY = process.env.DD_APP_KEY;
const APP_NAME = process.env.APP_NAME;

const BASE_URL =
    DD_SITE === 'datadoghq.eu'
        ? 'https://api.datadoghq.eu'
        : 'https://api.datadoghq.com';

const APP_URL = 'http://localhost:3002';

module.exports = {
    APP_URL,
    APP_NAME,
    BASE_URL,
    DD_SITE,
    DD_API_KEY,
    DD_APP_KEY
};
