const { v1 } = require('@datadog/datadog-api-client')

const {
    BASE_URL,
    DD_SITE
} = require('./constants')
const createApp = require('./createDatadogApp')
const createDashboard = require('./createDatadogDashboard')

const main = async () => {
    console.log('Configuring your account')
    const configuration = v1.createConfiguration()
    v1.setServerVariables(configuration, {
        site: DD_SITE
    })

    console.log('Creating the app')
    const id = await createApp(configuration)

    console.log('Creating the dashboard and attaching the app')
    await createDashboard(configuration, id)
}

main()

