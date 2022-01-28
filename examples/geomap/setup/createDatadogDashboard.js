const { v1 } = require('@datadog/datadog-api-client');
const fetch = require('node-fetch');

const { BASE_URL, DD_API_KEY, DD_APP_KEY } = require('./constants');

const TITLE = 'Geo Map App Dashboard';

async function createDashbord(endpoint, method, appId) {
    return fetch(endpoint, {
        headers: {
            'content-type': 'application/json',
            'DD-API-KEY': DD_API_KEY,
            'DD-APPLICATION-KEY': DD_APP_KEY
        },
        body: JSON.stringify({
            title: TITLE,
            description: '',
            widgets: [
                {
                    id: 1415671103205748,
                    definition: {
                        title: 'Number of Audit Logs',
                        type: 'group',
                        show_title: true,
                        layout_type: 'ordered',
                        widgets: [
                            {
                                id: 552688630132494,
                                definition: {
                                    title: 'Filtered by user email addresses',
                                    title_size: '16',
                                    title_align: 'left',
                                    type: 'query_table',
                                    requests: [
                                        {
                                            formulas: [
                                                {
                                                    formula: 'query1',
                                                    conditional_formats: [],
                                                    limit: {
                                                        count: 1000,
                                                        order: 'desc'
                                                    },
                                                    cell_display_mode: 'bar'
                                                }
                                            ],
                                            response_format: 'scalar',
                                            queries: [
                                                {
                                                    search: {
                                                        query: '$Email $IP'
                                                    },
                                                    data_source: 'audit',
                                                    compute: {
                                                        aggregation: 'count'
                                                    },
                                                    name: 'query1',
                                                    indexes: ['*'],
                                                    group_by: [
                                                        {
                                                            facet: '@usr.email',
                                                            sort: {
                                                                aggregation:
                                                                    'count',
                                                                order: 'desc'
                                                            },
                                                            limit: 1000
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    has_search_bar: 'auto'
                                },
                                layout: {
                                    x: 0,
                                    y: 0,
                                    width: 6,
                                    height: 4
                                }
                            },
                            {
                                id: 2313104896100148,
                                definition: {
                                    title: 'Filtered by IP addresses',
                                    title_size: '16',
                                    title_align: 'left',
                                    type: 'query_table',
                                    requests: [
                                        {
                                            formulas: [
                                                {
                                                    formula: 'query1',
                                                    conditional_formats: [],
                                                    limit: {
                                                        count: 50,
                                                        order: 'desc'
                                                    },
                                                    cell_display_mode: 'bar'
                                                }
                                            ],
                                            response_format: 'scalar',
                                            queries: [
                                                {
                                                    search: {
                                                        query: '$Email $IP'
                                                    },
                                                    data_source: 'audit',
                                                    compute: {
                                                        aggregation: 'count'
                                                    },
                                                    name: 'query1',
                                                    indexes: ['*'],
                                                    group_by: [
                                                        {
                                                            facet:
                                                                '@network.client.ip',
                                                            sort: {
                                                                aggregation:
                                                                    'count',
                                                                order: 'desc'
                                                            },
                                                            limit: 1000
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    has_search_bar: 'auto'
                                },
                                layout: {
                                    x: 6,
                                    y: 0,
                                    width: 6,
                                    height: 4
                                }
                            },
                            {
                                id: 889583198573900,
                                definition: {
                                    title:
                                        'Group by User email addresses and IP',
                                    title_size: '16',
                                    title_align: 'left',
                                    show_legend: true,
                                    legend_layout: 'auto',
                                    legend_columns: [
                                        'avg',
                                        'min',
                                        'max',
                                        'value',
                                        'sum'
                                    ],
                                    type: 'timeseries',
                                    requests: [
                                        {
                                            formulas: [
                                                {
                                                    formula: 'query1'
                                                }
                                            ],
                                            response_format: 'timeseries',
                                            queries: [
                                                {
                                                    search: {
                                                        query: '$Email $IP'
                                                    },
                                                    data_source: 'audit',
                                                    compute: {
                                                        aggregation: 'count'
                                                    },
                                                    name: 'query1',
                                                    indexes: ['*'],
                                                    group_by: [
                                                        {
                                                            facet: '@usr.email',
                                                            sort: {
                                                                aggregation:
                                                                    'count',
                                                                order: 'desc'
                                                            },
                                                            limit: 10
                                                        },
                                                        {
                                                            facet:
                                                                '@network.client.ip',
                                                            sort: {
                                                                aggregation:
                                                                    'count',
                                                                order: 'desc'
                                                            },
                                                            limit: 10
                                                        }
                                                    ]
                                                }
                                            ],
                                            style: {
                                                palette: 'dog_classic',
                                                line_type: 'solid',
                                                line_width: 'normal'
                                            },
                                            display_type: 'bars'
                                        }
                                    ],
                                    yaxis: {
                                        include_zero: true,
                                        scale: 'linear',
                                        label: '',
                                        min: 'auto',
                                        max: 'auto'
                                    },
                                    markers: []
                                },
                                layout: {
                                    x: 0,
                                    y: 4,
                                    width: 12,
                                    height: 4
                                }
                            }
                        ]
                    },
                    layout: {
                        x: 0,
                        y: 0,
                        width: 12,
                        height: 9
                    }
                },
                {
                    id: 8248955263944240,
                    definition: {
                        title: 'Related locations to the IP addresses',
                        type: 'group',
                        show_title: true,
                        layout_type: 'ordered',
                        widgets: [
                            {
                                id: 2882849715250970,
                                definition: {
                                    title: '',
                                    title_size: '16',
                                    title_align: 'left',
                                    type: 'custom',
                                    app_id: appId,
                                    custom_widget_key: 'geo_map_widget'
                                },
                                layout: {
                                    x: 0,
                                    y: 0,
                                    width: 12,
                                    height: 5
                                }
                            }
                        ]
                    },
                    layout: {
                        x: 0,
                        y: 9,
                        width: 12,
                        height: 6,
                        is_column_break: true
                    }
                }
            ],
            template_variables: [
                {
                    name: 'Email',
                    default: '*',
                    prefix: '@usr.email',
                    available_values: []
                },
                {
                    name: 'IP',
                    default: '*',
                    prefix: '@network.client.ip',
                    available_values: []
                }
            ],
            layout_type: 'ordered',
            is_read_only: false,
            notify_list: [],
            reflow_type: 'fixed',
            id: appId
        }),
        method
    }).catch(err =>
        // eslint-disable-next-line no-console
        console.log('An error occurs when creating the dashboard', err)
    );
}

async function main(configuration, appId) {
    const dashboardApi = new v1.DashboardsApi(configuration);
    const { dashboards } = await dashboardApi.listDashboards({});

    const existingDashboard = dashboards.find(
        dashboard => dashboard.title === TITLE
    );

    const endpoint = existingDashboard
        ? `${BASE_URL}/api/v1/dashboard?${existingDashboard}`
        : `${BASE_URL}/api/v1/dashboard`;

    const method = existingDashboard ? 'PUT' : 'POST';

    await createDashbord(endpoint, method, appId);
}

module.exports = main;
