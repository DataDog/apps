/* eslint-disable */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const util = require('util');

const config = require('./config');
const router = require('./lib/routesAndHandlers');
const helpers = require('./lib/helpers');

const debug = util.debuglog('server');

// Instantiate the HTTP server
httpServer = http.createServer(function (req, res) {
    unifiedServer(req, res);
});

const keyPath = path.join(__dirname, '/https/key.pem');
const certPath = path.join(__dirname, '/https/cert.pem');
const certificateAvailable = fs.existsSync(keyPath) && fs.existsSync(certPath);
console.log({ certificateAvailable });
if (certificateAvailable) {
    // Instantiate the HTTPS server
    httpsServerOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };
    httpsServer = https.createServer(httpsServerOptions, function (req, res) {
        unifiedServer(req, res);
    });
}

// http and https server logic
unifiedServer = (req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true); // Add true to include query URL details

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // clean path so /endpoint == /endpoint/

    // Create a query string object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload is there is any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    // Collect data as it comes in, only used then a payload is specified.
    req.on('data', data => (buffer += decoder.write(data)));

    // When the end has reached, log the response.
    // This method is always called regardless if there's a payload
    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler this request should go to

        // route not available, route to notFound
        const chosenHandler =
            typeof router[trimmedPath] !== 'undefined'
                ? router[trimmedPath]
                : router.notFound;

        // Construct data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        };

        // Route the request to the handler as specified in the router
        chosenHandler(data, (statusCode, payload, contentType) => {
            // Set defaults
            contentType =
                typeof contentType === 'string' ? contentType : 'json';
            statusCode = typeof statusCode === 'number' ? statusCode : 200;

            // Return the response parts that are content specific
            let payloadString = '';
            if (contentType === 'json') {
                res.setHeader('content-type', 'application/json');
                payload = typeof payload === 'object' ? payload : {};
                payloadString = JSON.stringify(payload);
            }
            if (contentType === 'html') {
                res.setHeader('content-type', 'text/html');
                payloadString = typeof payload === 'string' ? payload : '';
            }
            if (contentType === 'css') {
                res.setHeader('content-type', 'text/css');
                payloadString = typeof payload !== undefined ? payload : '';
            }
            if (contentType === 'js') {
                res.setHeader('content-type', 'text/javascript');
                payloadString = typeof payload !== undefined ? payload : '';
            }
            if (contentType === 'ico') {
                res.setHeader('content-type', 'image/x-icon');
                payloadString = typeof payload !== undefined ? payload : '';
            }
            if (contentType === 'png') {
                res.setHeader('content-type', 'image/png');
                payloadString = typeof payload !== undefined ? payload : '';
            }
            if (contentType === 'jpg') {
                res.setHeader('content-type', 'image/jpeg');
                payloadString = typeof payload !== undefined ? payload : '';
            }
            if (contentType === 'plain') {
                res.setHeader('content-type', 'text/plain');
                payloadString = typeof payload !== undefined ? payload : '';
            }

            // Return the response parts that are common to all content-types
            res.writeHead(statusCode);
            res.end(payloadString);

            // If the response is 200, print green otherwise print red
            const green = '\x1b[32m%s\x1b[0m';
            const red = '\x1b[31m%s\x1b[0m';

            if ([200, 201].includes(statusCode)) {
                debug(
                    green,
                    `${method.toUpperCase()} /${trimmedPath} ${statusCode}`
                );
            } else {
                debug(
                    red,
                    `${method.toUpperCase()} /${trimmedPath} ${statusCode}`
                );
            }
        });
    });
};

// start the http server
httpServer.listen(config.httpPort, () => {
    console.log(
        '\x1b[36m%s\x1b[0m',
        `The server is listing on port ${config.httpPort}`,
        'in',
        config.envName,
        'mode (http)'
    );
});

if (certificateAvailable) {
    // Start the HTTPS server
    httpsServer.listen(config.httpsPort, () => {
        console.log(
            '\x1b[35m%s\x1b[0m',
            `The server is listing on port ${config.httpsPort}`,
            'in',
            config.envName,
            'mode (https)'
        );
    });
}
// // Stripe payment is working.
// helpers.createStripePayment('22', 525, function(err) {
//     console.log(err);
// });

// // Email integration works, just needs domain verification to work for other email addresses.
// helpers.sendConfirmationMail('22', 'r.scheffers@gmail.com', 'Hey Royko', function(err) {
//     console.log(err);
// });
