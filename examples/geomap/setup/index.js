const { v1 } = require('@datadog/datadog-api-client');

const { BASE_URL, DD_SITE } = require('./constants');
const createApp = require('./createDatadogApp');
const createDashboard = require('./createDatadogDashboard');

async function main() {
    // eslint-disable-next-line no-console
    console.log('Configuring your account');

    const configuration = v1.createConfiguration();
    v1.setServerVariables(configuration, {
        site: DD_SITE
    });

    // eslint-disable-next-line no-console
    console.log('Creating and configuring the Datadog App');
    const appId = await createApp();

    // eslint-disable-next-line no-console
    console.log('Creating the dashboard and adding the different widgets');
    await createDashboard(configuration, appId);

    // eslint-disable-next-line no-console
    console.log(`You can now go to ${BASE_URL}`);
}

main();
