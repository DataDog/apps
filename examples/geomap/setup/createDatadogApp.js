const fetch = require('node-fetch');

const { APP_URL, BASE_URL, DD_API_KEY, DD_APP_KEY } = require('./constants');

const APP_NAME = 'Geo Map';

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
                                                source: 'geo-map-widget',
                                                name: 'Geo Map Widget',
                                                custom_widget_key:
                                                    'geo_map_widget'
                                            }
                                        ]
                                    }
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
                        description:
                            'A Datadog application using OpenStreetMap to display the location of IP addresses',
                        logo_media: {
                            light: 'https://freesvg.org/img/location_icon.png'
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
