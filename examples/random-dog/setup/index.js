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

    const id = await createApp(configuration)
    await createDashboard(configuration, id)

    console.log(`You can now open your datadog account at url ${BASE_URL}`)
}

main()

