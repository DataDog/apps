const { v1 } = require('@datadog/datadog-api-client')

const {
    BASE_URL,
    DD_SITE
} = require('./constants')
const createApp = require('./createDatadogApp')
const createDashboard = require('./createDatadogDashboard')

async function main() {
    console.log('Configuring your account')

    const configuration = v1.createConfiguration()
    v1.setServerVariables(configuration, {
        site: DD_SITE
    })

    console.log('Creating and configuring the Datadog App')
    const appId = await createApp()

    console.log('Creating the dashboard and adding the different widgets')
    await createDashboard(configuration, appId)

    console.log(`You can now go to ${BASE_URL}`)
}

main()

