#!/usr/bin/env sh

bootstrap() {
  local datadog_domain
  local datadog_api_key
  local datadog_app_key

  # borrowed from: https://stackoverflow.com/a/28393320/656011
  # Read secret string
  read_secret() {
    # Disable echo.
    stty -echo

    # Set up trap to ensure echo is enabled before exiting if the script
    # is terminated while echo is disabled.
    trap 'stty echo' EXIT

    # Read secret.
    read "$@"

    # Enable echo.
    stty echo
    trap - EXIT

    # Print a newline because the newline entered by the user after
    # entering the passcode is not echoed. This ensures that the
    # next line of output begins at a new line.
    echo
  }

  printf '%s\n\n' "We'll ask you to paste in some API Keys shortly. You won't see any input in your terminal because we've disabled echoing to stdout when asking for a key."

  printf '%s\n\n' "Get your Stripe API Key from: https://dashboard.stripe.com/test/apikeys"

  printf '%s\n' "Stripe API Key:"
  read_secret stripe_key

  printf '%s\n\n' "Get your Mailgun API Key from: https://app.mailgun.com/app/account/security/api_keys"

  printf '%s\n' "Mailgun API Key:"
  read_secret mailgun_key

  printf '%s\n\n' "Get your Mailgun Sandbox Domain from: https://app.mailgun.com/app/sending/domains/"
  read mailgun_domain

  printf '%s\n\n' "Be sure to add yourself as an Authorized Recipient: https://app.mailgun.com/app/sending/domains/${mailgun_domain}"

  printf '%s\n\n' "Creating slice-life-pizzera/config.js..."

  cp slice-life-pizzeria/example.config.js slice-life-pizzeria/config.js

  sed -i '' -e "s/--stripe-api--/$stripe_key/g" ./slice-life-pizzeria/config.js
  sed -i '' -e "s/--mailgun-api--/$mailgun_key/g" ./slice-life-pizzeria/config.js
  sed -i '' -e "s/--mailgun-domain--/$mailgun_domain/g" ./slice-life-pizzeria/config.js

  mkdir -p ./slice-life-pizzeria/https

  printf '%s\n\n' "Generating local SSL Certificate..."

  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout ./slice-life-pizzeria/https/key.pem -out ./slice-life-pizzeria/https/cert.pem

  printf '%s\n' "Please enter the domain you use to access Datadog (example: app.datadoghq.com):"

  read datadog_domain

  # strip leading https://
  datadog_domain=${datadog_domain/https:\/\//}
  # strip leading http://
  datadog_domain=${datadog_domain/http:\/\//}
  # strip leading app. subdomain
  datadog_domain=${datadog_domain/app./}
  # strip any paths and trailing slashes
  datadog_domain=${datadog_domain%%\/*}

  printf '%s\n\n' "Get your Datadog API Key from: https://app.datadoghq.com/organization-settings/api-keys"

  printf '%s\n' "Datadog API Key:"
  read_secret datadog_api_key

  printf '%s\n\n' "Get your Datadog Application Key from: https://app.datadoghq.com/organization-settings/application-keys"
  read_secret datadog_app_key

  printf '%s\n\n' "Creating .env..."

  cp .env.example .env

  sed -i '' -e "s/DD_SITE=/DD_SITE=$datadog_domain/g" .env
  sed -i '' -e "s/DD_API_KEY=/DD_API_KEY=$datadog_api_key/g" .env
  sed -i '' -e "s/DD_APP_KEY=/DD_APP_KEY=$datadog_app_key/g" .env

  printf '%s\n' "You should now be able to run the project with `docker-compose up`"
}

bootstrap
