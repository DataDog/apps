const { v1 } = require('@datadog/datadog-api-client');

const createApp = require('./create-app');
const createDashboard = require('./create-dashboard');

const init = async () => {
  console.log('Configuring your account');

  const configuration = v1.createConfiguration();
  v1.setServerVariables(configuration, {
    site: process.env.DD_SITE
  })

  const appId = await createApp(configuration);
  await createDashboard(configuration, appId);

  console.log('Your account has been configured with a dashbooard and sample datadog app, you are ready to go!');
};

init().catch(console.error);
