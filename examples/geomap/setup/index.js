const { v1 } = require('@datadog/datadog-api-client')

const {
    BASE_URL,
    DD_SITE
} = require('./constants')
const createApp = require('./createDatadogApp')

async function main() {
    console.log('Configuring your account')

    const configuration = v1.createConfiguration()
    v1.setServerVariables(configuration, {
        site: DD_SITE
    })

    console.log('Creating and configuring the Datadog App')
    const appId = await createApp()
}

main()

