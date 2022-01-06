const fetch = require('node-fetch')

const {
    APP_URL,
    BASE_URL,
    DD_API_KEY,
    DD_APP_KEY
} = require('./constants')

const APP_NAME = 'Geo Map'

async function getAppsData() {
    return fetch(`${BASE_URL}/api/v2/apps`, {
        headers: {
            'DD-API-KEY': DD_API_KEY,
            'DD-APPLICATION-KEY': DD_APP_KEY
        }
    })
        .then(res => res.json())
        .then(({ data }) => data)
        .catch(err => console.log('An error occurs on getAppsData function', err))
}

async function createApp(endpoint, method) {
    console.log('=====')
    console.log(endpoint)
    console.log(method)
    console.log('=====')
}

async function main() {
    const apps = await getAppsData()
    const existingApp = apps.find(app => app.attributes.tile.title === APP_NAME)

    const endpoint = existingApp 
        ? `${BASE_URL}/api/v2/apps/${existingApp.id}` 
        : `${BASE_URL}/api/v2/apps`

    const method = existingApp 
        ? 'PATCH' 
        : 'POST'

    const appId = await createApp(endpoint, method)
}

module.exports = main

