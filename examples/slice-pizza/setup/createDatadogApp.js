const fetch = require('node-fetch');

const { APP_URL, BASE_URL, DD_API_KEY, DD_APP_KEY, APP_NAME } = require('./constants');

async function getAppsData() {
    return fetch(`${BASE_URL}/api/v2/apps`, {
        headers: {
            'DD-API-KEY': DD_API_KEY,
            'DD-APPLICATION-KEY': DD_APP_KEY
        }
    })
        .then(res => res.json())
        .then(({ data }) => data)
        .catch(err =>
            // eslint-disable-next-line no-console
            console.log('An error occurs on getAppsData function', err)
        );
}

/**
 * Upserts an App.
 * @param {string} [appId] The App id, if it exists.
 * @returns {Promise<string>} The upserted App id.
 */
async function createApp(appId) {
    const endpoint = appId
        ? `${BASE_URL}/api/v2/apps/${appId}`
        : `${BASE_URL}/api/v2/apps`;

    const method = appId ? 'PATCH' : 'POST';

    return fetch(endpoint, {
        headers: {
            'content-type': 'application/json',
            'DD-API-KEY': DD_API_KEY,
            'DD-APPLICATION-KEY': DD_APP_KEY
        },
        body: JSON.stringify({
            data: {
                type: 'apps',
                id: appId,
                attributes: {
                    author_info: {
                        name: 'Thomas Dimnet'
                    },
                    terms: {},
                    assets: {
                        ui_extensions: {
                            debug_mode_url: APP_URL,
                            secured: false,
                            main_url: APP_URL,
                            api_version: 'v1.0',
                            features: [
                                {
                                    name: 'dashboard_custom_widget',
                                    options: {
                                        widgets: [
                                            {
                                                source: 'slice-pizza-widget',
                                                name: `${APP_NAME} Widget`,
                                                custom_widget_key:
                                                    'slice_pizza_widget'
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'modals',
                                    options: {}
                                }
                            ]
                        }
                    },
                    short_name: null,
                    support_type: 'partner',
                    created_at: '2021-08-12T15:47:53.997855+00:00',
                    proxy_scopes: [],
                    stability: 'dev',
                    modified_at: '2021-09-08T00:47:03.116381+00:00',
                    pricing: [],
                    published: false,
                    tile: {
                        description: 'Order Pizza whenever you want',
                        logo_media: {
                            light:
                                'http://localhost:3002/img/logo.png'
                        },
                        title: APP_NAME
                    }
                }
            }
        }),
        method
    })
        .then(res => res.json())
        .then(({ data: { id } }) => id)
        .catch(err =>
            // eslint-disable-next-line no-console
            console.log('An error occurs on createApp function', err)
        );
}

async function main() {
    const apps = await getAppsData();
    const existingApp = apps.find(
        app => app.attributes.tile.title === APP_NAME
    );

    const appId = await createApp(existingApp?.id);
    return appId;
}

module.exports = main;
