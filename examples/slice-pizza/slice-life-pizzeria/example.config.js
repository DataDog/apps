/*
 * Configuration variables
 * --- Update this file with your details ---
 */

const environment = {};

environment.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "AwesomePizzaDelivery-dev",
  stripeSecretApi: "--stripe-api--",
  mailgun: {
    from: "delivery@staging.slicelive.com",
    domain: "staging.slicelive.com",
    privateApi: "--mailgun-api--",
  },
};

environment.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "AwesomePizzaDelivery-prod",
  stripeSecretApi: "--stripe-api--",
  mailgun: {
    from: "delivery@slicelive.com",
    domain: "slicelive.com",
    privateApi: "--mailgun-api--",
  },
};

// Determine set environment
const currentEnv =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check if a valid environment is specified
const environmentToExport =
  typeof environment[currentEnv] === "object"
    ? environment[currentEnv]
    : environment.staging;

// Export environment
module.exports = environmentToExport;
