const { v1 } = require('@datadog/datadog-api-client')
const fetch = require('node-fetch')

const {
    BASE_URL,
    DD_API_KEY,
    DD_APP_KEY
} = require('./constants')

const TITLE = 'Random Dog Image'


async function createDashboard(endpoint, method, appId) {
    return fetch(endpoint, {
        headers: {
            'content-type': 'application/json',
            'DD-API-KEY': DD_API_KEY,
            'DD-APPLICATION-KEY': DD_APP_KEY
        },
        method,
        body: JSON.stringify({
            title: TITLE,
            description: '',
            widgets: [],
            template_variables: [],
            layout_type: 'ordered',
            is_read_only: false,
            notify_list: [],
            reflow_type: 'fixed',
            id: appId,
        })
    })
}

async function main(configuration, appId) {
    const dashboardApi = new v1.DashboardsApi(configuration)
    const { dashboards } = await dashboardApi.listDashboards({})
    
    const existingDashboard = dashboards.find(dashboard => dashboard.title === TITLE)

    console.log(existingDashboard)

    const endpoint = existingDashboard 
        ? `${BASE_URL}/api/v1/dashboard/${existingDashboard.id}` 
        : `${BASE_URL}/api/v1/dashboard`

    const method = existingDashboard 
        ? 'PUT'
        : 'POST'

    await createDashboard(endpoint, method, appId)
}

module.exports = main

