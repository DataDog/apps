const { v1 } = require('@datadog/datadog-api-client')
const fetch = require('node-fetch')

const {
    BASE_URL,
    DD_API_KEY,
    DD_APP_KEY
} = require('./constants')

const TITLE = 'Datadog App - Redis toto'

async function createDashboard(endpoint, method, appId) {
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
                    "id": 448495313914916,
                    "definition": {
                        "title": "Redis App",
                        "type": "group",
                        "show_title": true,
                        "layout_type": "ordered",
                        "widgets": [
                            {
                                "id": 5162668522903328,
                                "definition": {
                                    "title": "Latency (ms)",
                                    "title_size": "16",
                                    "title_align": "left",
                                    "show_legend": true,
                                    "legend_layout": "auto",
                                    "legend_columns": [
                                        "avg",
                                        "min",
                                        "max",
                                        "value",
                                        "sum"
                                    ],
                                    "type": "timeseries",
                                        "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "response_format": "timeseries",
                  "queries": [
                    {
                      "query": "avg:redis.info.latency_ms{*}",
                      "data_source": "metrics",
                      "name": "query1"
                    }
                  ],
                  "style": {
                    "palette": "dog_classic",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "bars"
                }
              ],
              "yaxis": {
                "include_zero": true,
                "scale": "linear",
                "label": "",
                "min": "auto",
                "max": "auto"
              },
              "markers": []
            },
            "layout": {
              "x": 0,
              "y": 0,
              "width": 6,
              "height": 3
            }
          },
          {
            "id": 620025708223280,
            "definition": {
              "title": "Command Per Second",
              "title_size": "16",
              "title_align": "left",
              "show_legend": true,
              "legend_layout": "auto",
              "legend_columns": [
                "avg",
                "min",
                "max",
                "value",
                "sum"
              ],
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "response_format": "timeseries",
                  "queries": [
                    {
                      "query": "avg:redis.net.instantaneous_ops_per_sec{*}",
                      "data_source": "metrics",
                      "name": "query1"
                    }
                  ],
                  "style": {
                    "palette": "dog_classic",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "yaxis": {
                "include_zero": true,
                "scale": "linear",
                "label": "",
                "min": "auto",
                "max": "auto"
              },
              "markers": []
            },
            "layout": {
              "x": 6,
              "y": 0,
              "width": 6,
              "height": 3
            }
          },
          {
            "id": 6700223609796012,
            "definition": {
              "title": "Hit rate (calculated)",
              "title_size": "16",
              "title_align": "left",
              "show_legend": true,
              "legend_layout": "auto",
              "legend_columns": [
                "avg",
                "min",
                "max",
                "value",
                "sum"
              ],
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [
                    {
                      "alias": "Hits",
                      "formula": "query1"
                    },
                    {
                      "alias": "Misses",
                      "formula": "query2"
                    },
                    {
                      "alias": "Hit Rate",
                      "formula": "query1 / (query1 + query2)"
                    }
                  ],
                  "response_format": "timeseries",
                  "queries": [
                    {
                      "query": "avg:redis.stats.keyspace_hits{*}",
                      "data_source": "metrics",
                      "name": "query1"
                    },
                    {
                      "query": "avg:redis.active_defrag.key_misses{*}",
                      "data_source": "metrics",
                      "name": "query2"
                    }
                  ],
                  "style": {
                    "palette": "dog_classic",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "yaxis": {
                "include_zero": true,
                "scale": "linear",
                "label": "",
                "min": "auto",
                "max": "auto"
              },
              "markers": []
            },
            "layout": {
              "x": 0,
              "y": 3,
              "width": 6,
              "height": 3
            }
          },
          {
            "id": 6885247603873236,
            "definition": {
              "title": "Connected Clients",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "response_format": "scalar",
                  "queries": [
                    {
                      "query": "avg:redis.net.clients{*}",
                      "data_source": "metrics",
                      "name": "query1",
                      "aggregator": "avg"
                    }
                  ]
                }
              ],
              "autoscale": true,
              "precision": 2
            },
            "layout": {
              "x": 6,
              "y": 3,
              "width": 3,
              "height": 3
            }
          },
          {
            "id": 5868268382798832,
            "definition": {
              "title": "Number of Redis Keys",
              "title_size": "16",
              "title_align": "left",
              "type": "query_value",
              "requests": [
                {
                  "formulas": [
                    {
                      "formula": "query1"
                    }
                  ],
                  "response_format": "scalar",
                  "queries": [
                    {
                      "query": "avg:redis.keys{*}",
                      "data_source": "metrics",
                      "name": "query1",
                      "aggregator": "avg"
                    }
                  ]
                }
              ],
              "autoscale": true,
              "precision": 2
            },
            "layout": {
              "x": 9,
              "y": 3,
              "width": 3,
              "height": 3
            }
          },
          {
            "id": 2635876498642904,
            "definition": {
              "title": "",
              "title_size": "16",
              "title_align": "left",
              "type": "custom",
              "app_id": "8d6a4ba2-4087-11ec-80d4-da7ad0900005",
              "custom_widget_key": "redis-key-search-widget"
            },
            "layout": {
              "x": 0,
              "y": 6,
              "width": 4,
              "height": 2
            }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 0,
        "width": 12,
        "height": 9
      }
    }
            ],
            template_variables: [],
            layout_type: 'ordered',
            is_read_only: false,
            notify_list: [],
            reflow_type: 'fixed',
            id: appId
        }),
        method
    })
        .catch(err => console.log('An error occurs when creating the dashboard'))
}

async function main(configuration, appId) {
    const dashboardApi = new v1.DashboardsApi(configuration)
    const { dashboards } = await dashboardApi.listDashboards({})

    const exisitingDashboard = dashboards.find(dashboard => dashboard.title === TITLE)

    console.log('=====')
    console.log(exisitingDashboard)
    console.log('=====')

    const endpoint = exisitingDashboard 
        ? `${BASE_URL}/api/v1/dashboard?${exisitingDashboard}` 
        : `${BASE_URL}/api/v1/dashboard`

    const method = exisitingDashboard 
        ? 'PUT' 
        : 'POST'

    await createDashboard(endpoint, method, appId)
}

module.exports = main

