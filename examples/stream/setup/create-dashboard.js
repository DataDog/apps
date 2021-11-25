const { v1 } = require('@datadog/datadog-api-client');
const fetch = require('node-fetch');

const BASE_URL = require('./constants')

const TITLE = 'Stream submissions';

const createDashboard = async (configuration, appID) => {
    const apiInstance = new v1.DashboardsApi(configuration);
    const getDashboardsResponse = await apiInstance.listDashboards({});
    const existingDash = getDashboardsResponse.dashboards.find(
        (d) => d.title === TITLE
    );

    let method = null;
    let endpoint = null;
    if (existingDash) {
        console.log(
            `Found an existing dashboard workshop app: ${existingDash.id}`
        );
        method = 'PUT';
        endpoint = `${BASE_URL}/api/v1/dashboard/${existingDash.id}`;
    } else {
        console.log('Creating a new app dashboard for the workshop app.');
        method = 'POST';
        endpoint = `${BASE_URL}/api/v1/dashboard`;
    }

    const dashBody = {
        title: TITLE,
        description: '',
        widgets: [
            {
                definition: {
                    title: 'API Gets',
                    title_size: '16',
                    title_align: 'left',
                    show_legend: true,
                    legend_layout: 'auto',
                    legend_columns: ['avg', 'min', 'max', 'value', 'sum'],
                    type: 'timeseries',
                    requests: [
                        {
                            formulas: [{ formula: 'query1' }],
                            response_format: 'timeseries',
                            on_right_yaxis: false,
                            queries: [
                                {
                                    query: 'avg:tweets.api.gets{*} by {user}',
                                    data_source: 'metrics',
                                    name: 'query1',
                                },
                            ],
                            style: {
                                palette: 'dog_classic',
                                line_type: 'solid',
                                line_width: 'normal',
                            },
                            display_type: 'line',
                        },
                    ],
                    yaxis: {
                        include_zero: true,
                        scale: 'linear',
                        label: '',
                        min: 'auto',
                        max: 'auto',
                    },
                    markers: [],
                },
                layout: {
                    x: 0,
                    y: 0,
                    width: 8,
                    height: 4,
                },
            },
            {
                definition: {
                    title: 'Incoming submissions',
                    title_size: '16',
                    title_align: 'left',
                    show_legend: true,
                    legend_layout: 'auto',
                    legend_columns: ['avg', 'min', 'max', 'value', 'sum'],
                    type: 'timeseries',
                    requests: [
                        {
                            formulas: [{ formula: 'query1' }],
                            response_format: 'timeseries',
                            on_right_yaxis: false,
                            queries: [
                                {
                                    query:
                                        'sum:tweets.posted{*} by {user}.as_count()',
                                    data_source: 'metrics',
                                    name: 'query1',
                                },
                            ],
                            style: {
                                palette: 'dog_classic',
                                line_type: 'solid',
                                line_width: 'normal',
                            },
                            display_type: 'bars',
                        },
                    ],
                    yaxis: {
                        include_zero: true,
                        scale: 'linear',
                        label: '',
                        min: 'auto',
                        max: 'auto',
                    },
                    markers: [],
                },
                layout: {
                    x: 0,
                    y: 4,
                    width: 8,
                    height: 4,
                },
            },
        ],
        template_variables: [],
        layout_type: 'ordered',
        is_read_only: false,
        notify_list: [],
        reflow_type: 'fixed',
        id: appID,
    };

    await fetch(endpoint, {
        headers: {
            'content-type': 'application/json',
            'DD-API-KEY': process.env.DD_API_KEY,
            'DD-APPLICATION-KEY': process.env.DD_APP_KEY,
	    'DD-SITE': process.env.DD_SITE
        },
        method,
        body: JSON.stringify(dashBody),
    });
};

module.exports = createDashboard;

