const fetch = require('node-fetch');

const BASE_URL = require('./constants')

const APP_NAME = 'Stream Admin';

const createAppEntry = async (configuration) => {
  let getAppsResponse = await fetch(`${BASE_URL}/api/v2/apps`, {
    headers: {
      'DD-API-KEY': process.env.DD_API_KEY,
      'DD-APPLICATION-KEY': process.env.DD_APP_KEY
    },
  });

  getAppsResponse = await getAppsResponse.json();

  const existingApp = getAppsResponse.data.find((app) => app.attributes.tile.title === APP_NAME);

  let method = null;
  let endpoint = null;
  if (existingApp) {
    console.log(`Found an existing workshop app: ${existingApp.id}`);
    method = 'PATCH';
    endpoint = `${BASE_URL}/api/v2/apps/${existingApp.id}`;
  } else {
    console.log('Creating a new app entry for the workshop app.');
    method = 'POST';
    endpoint = `${BASE_URL}/api/v2/apps`;
  }

  const mainURL = process.env.ADMIN_UI_URL;

  const createAppResponse = await fetch(endpoint, {
    headers: {
      'content-type': 'application/json',
      'DD-API-KEY': process.env.DD_API_KEY,
      'DD-APPLICATION-KEY': process.env.DD_APP_KEY
    },
    body: JSON.stringify({
      data: {
        type: 'apps',
        attributes: {
          author_info: {
            name: 'Ivan Di Lernia',
          },
          terms: {},
          assets: {
            ui_extensions: {
              debug_mode_url: 'http://localhost:3002',
              secured: false,
              main_url: mainURL,
              api_version: 'v1.0',
              features: [
                {
                  name: 'dashboard_custom_widget',
                  options: {
                    widgets: [
                      {
                        source: 'widget',
                        options: [],
                        name: 'Stream Admin',
                        custom_widget_key: 'stream-admin',
                        icon: 'https://freesvg.org/img/Simple-Water-Icon.png',
                      },
                    ],
                  },
                },
                {
                  name: 'widget_context_menu',
                  options: {},
                },
                {
                  name: 'modals',
                  options: {},
                },
                {
                  name: 'side_panels',
                  options: {},
                },
              ],
            },
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
              'Stream Admin, an example app used in the datadog apps workshop',
            logo_media: {
              light: 'https://freesvg.org/img/Simple-Water-Icon.png',
            },
            title: 'Stream Admin',
          },
        },
      },
    }),
    method,
  });

  const data = await createAppResponse.json();

  return data.data.id;
};

module.exports = createAppEntry;

