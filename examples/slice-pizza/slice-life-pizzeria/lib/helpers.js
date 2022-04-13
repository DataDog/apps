/* eslint-disable */
const http = require('http');
const https = require('https');
const queryString = require('querystring');
const StringDecoder = require('string_decoder').StringDecoder;
const crypto = require('crypto');
const config = require('../config');

const helpers = {};

// Parse a JSON string to an object in all case, without throwing
helpers.parseJsonToObject = function (str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (err) {
        return {};
    }
};

helpers.validateEmail = email => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = email.match(emailRegex) !== null;
    return emailIsValid;
};

helpers.validatePassword = password => {
    // Add extra logic for password validation as needed
    return typeof password === 'string' && password.length >= 5;
};

// Create a SHA256 hash
helpers.hash = function (str) {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto
            .createHmac('sha256', config.hashingSecret)
            .update(str)
            .digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Create a string with random alphanumeric characters of a given length
helpers.createRandomString = strLength => {
    strLength =
        typeof strLength === 'number' && strLength > 0 ? strLength : false;

    // Return false strLength is invalid
    if (!strLength) {
        return false;
    }

    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const str = new Array(strLength)
        .fill(0)
        .map(char => chars[Math.floor(Math.random() * chars.length)])
        .join('');
    return str;
};

helpers.getPizzaSize = size => {
    const availableSizes = {
        // 10: Small, 12: Medium, 14: Large, 16: Family, 18: Party
        10: 'Small',
        12: 'Medium',
        14: 'Large',
        16: 'Family',
        18: 'Party'
    };
    return availableSizes[size];
};

helpers.createCartOverview = (cartData, menuData) => {
    // Create a cart overview to return it to the requester
    return cartData.reduce(
        (acc, item) => {
            const { id, size, amount } = item;
            // When a menu item (id) is not available return the accumulative object for the next iteration
            if (!menuData[id]) {
                return acc;
            }

            // calculate the price
            const topUpPrice = ((size - 10) / 2) * menuData[id].sizeUpPrice;
            const price = menuData[id].price + topUpPrice;

            // create the new cart item with all its details
            const newCartItem = {
                id,
                name: menuData[id].name,
                description: menuData[id].description,
                size: helpers.getPizzaSize(item.size),
                amount,
                price: parseFloat(price).toFixed(2),
                total: (price * amount).toFixed(2)
            };

            // return the items and the total
            return {
                items: [...acc.items, newCartItem],
                total: parseFloat(acc.total) + parseFloat(newCartItem.total)
            };
            // Initial values when starting the first iteration
        },
        { items: [], total: 0 }
    );
};

helpers.createStripePayment = (orderId, amount, callback) => {
    orderId = typeof orderId === 'string' && orderId.length ? orderId : false;

    if (!orderId) {
        callback('Order ID is missing or invalid');
        return;
    }

    amount =
        // remove any . or , from the amount 19.99 should be 1999
        amount = parseInt(`${amount}`.replace(/[.,]/gm, ``));

    const stringPayload = queryString.stringify({
        amount,
        currency: 'usd',
        description: `Order placed under ID: ${orderId}`,
        source: 'tok_visa', // For production, request a token first and use it here, or use Stripe.js and Elements in the frontend.
        metadata: {
            orderId
        }
    });

    const requestDetails = {
        protocol: 'https:',
        hostname: 'api.stripe.com',
        method: 'POST',
        path: '/v1/charges',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer sk_test_65thd3EhMzGVEup9EcyuEMK4',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    };
    const req = https.request(requestDetails, function (res) {
        const status = res.statusCode;
        if (status === 200 || status === 201) {
            callback(false);
        } else {
            callback(`status code returned was: ${status}`);
        }
    });

    req.on('error', function (err) {
        callback(err);
    });

    // Add the payload
    req.write(stringPayload);

    // End / send the request
    req.end();
};

// Function sends a confirmation email to the user who placed the order.
// Returns false on success or the error message when something went wrong
helpers.sendConfirmationMail = (orderId, to, body, callback) => {
    to = typeof to === 'string' && to.length ? to : false;
    body = typeof body === 'string' && body.length ? body : false;
    orderId = typeof orderId === 'string' && orderId.length ? orderId : false;

    if (!to) {
        callback('Email is missing or invalid');
        return;
    }

    if (!body) {
        callback('Email body is missing or invalid');
        return;
    }

    if (!orderId) {
        callback('Order ID is missing or invalid');
        return;
    }

    const stringPayload = queryString.stringify({
        from: config.mailgun.from,
        to,
        subject: `Order confirmation: ${orderId}`, // For production, request a token first and use it here, or use Stripe.js and Elements in the frontend.
        html: body
    });

    const requestDetails = {
        protocol: 'https:',
        hostname: 'api.mailgun.net',
        method: 'POST',
        path: `/v3/${config.mailgun.domain}/messages`,
        auth: `api:${config.mailgun.privateApi}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    };
    const req = https.request(requestDetails, function (res) {
        const status = res.statusCode;

        const decoder = new StringDecoder('utf-8');
        let buffer = '';
        res.on('data', data => (buffer += decoder.write(data)));

        res.on('end', () => {
            buffer += decoder.end();
            const payload = helpers.parseJsonToObject(buffer);

            console.log('payload', payload);

            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`status code returned was: ${status}`);
            }
        });
    });

    req.on('error', function (err) {
        callback(err);
    });

    // Add the payload
    req.write(stringPayload);

    // End / send the request
    req.end();
};

helpers.createEmailBody = order => {
    return `
<p>Hi, ${order.name},</p>

Thank you for ordering with us. Your order with reference number <span style="border: 1px solid #c6b3b3; padding: 3px 9px; background: #f3eaea; border-radius: 3px;">${
        order.id
    }</span> will be delivered to the following address:
<div style="font-weight: 700">${order.address}</div><br>

Below you'll find a summary of your items.<br>
<table style="margin: 13px 0 13px 5px;">
${order.items
    .map(item => {
        const { name, size, amount, price, total } = item;
        return `
        <tr>
            <td><img src="https://raw.githubusercontent.com/rscheffers82/slice-life-pizzeria/master/public/pizza_icon15.png" alt="pizza icon"></td>
            <td style="padding-right: 22px;">${name}</td>
            <td style="padding: 0 5px">${size}</td>
            <td style="text-align: right;">${amount}</td>
            <td> x </td>
            <td style="text-align:right;">${price} = </td>
            <td style="text-align: right; padding: 0 10px;">US$ ${total}<td>
        </tr>`;
    })
    .join('')}
    <td colspan=6 style="font-weight: 700">TOTAL (${order.items.length}):</td>
    <td style="border-top: 2px solid #101010; text-align: right; padding: 0 10px;">US$ ${
        order.total
    }</td>
</table>

Enjoy your meal and we hope to see you again soon!
`;
};

module.exports = helpers;
