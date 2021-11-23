const { v1 } = require('@datadog/datadog-api-client');
const fallback = require('express-history-api-fallback');
const path = require('path');

const express = require('express');
const cors = require('cors');
const { getStream, getStreamForUser, postToStream } = require('./stream');
const {
    startMetricSubmission,
    editBlocklist,
    setRateLimit,
    getBlockList,
    getRateLimit
} = require('./telemetry');

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// fake demo auth middleware for demo purposes
app.use((req, res, next) => {
    const authHeader = req.header('Authorization');

    // If there's no auth header, it means that we're not to the point in the demo where
    // it is required. Skip
    if (!authHeader) {
        next();
        return;
    }

    // Just check that there is a token at all, this is not real auth :)
    const match = authHeader.match(/Bearer (\S*)/);
    const token = match && match[1];

    if (token) {
        next();
        return;
    }

    res.status(401).json({ error: 'Not authorized' });
});

/**
 * Gets a simulated stream of posts
 */
app.get('/stream', async (req, res) => {
    const tweets = await getStream();

    res.json({
        tweets
    });
});

app.get('/stream/:user', async (req, res) => {
    const tweets = await getStreamForUser(req.params.user);

    res.json({
        tweets
    });
});

/**
 * Posts to the stream
 */
app.post('/stream', (req, res) => {
    const data = req.body;
    postToStream({
        author: data.author,
        text: data.text
    });

    res.json({
        success: true
    });
});

// FEATURE 1
// BLOCKLIST ACTIONS
app.get('/blocklist', (req, res) => {
    res.json({
        users: getBlockList()
    });
});

app.post('/blocklist', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return;
    }

    const success = editBlocklist({ email, state: 'blocked' });

    res.json({
        success
    });
});

app.delete('/blocklist', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return;
    }

    const success = editBlocklist({ email, state: 'active' });

    res.json({
        success
    });
});

// FEATURE 2
// RATE LIMITS
app.get('/limits', (req, res) => {
    res.json({
        limit: getRateLimit()
    });
});

app.post('/limits', (req, res) => {
    const { value } = req.body;
    if (Number.isNaN(value)) {
        res.send('Need a value');
    }

    setRateLimit(value);

    res.json({
        success: true
    });
});

const root = path.resolve(__dirname, '../ui/build');

app.use(express.static(root));
app.use(fallback('index.html', { root }));

async function init() {
    // SETUP ROUTINES
    const configuration = v1.createConfiguration();

    //startMetricSubmission(configuration);
    // START LISTENING
    app.listen(port, () => {
        console.log(
            `Initialized successfully. Listening at http://localhost:${port}`
        );
    });
}

init();
