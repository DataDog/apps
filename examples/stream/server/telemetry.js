const { v1 } = require('@datadog/datadog-api-client');
const { allUsers } = require('./users');

let submissionRoutine = null;
let globalRateLimit = 100;
let apiInstance = null;

// updated list of users and their settings, as they are modified by the admin
let users = allUsers;

const INTERVAL = 3000;

/**
 * Submits metrics to datadog simulating submissions from a set
 * of fake users. Some of the users (role == post-spam) are tweeting too much!
 */
const submitPoints = () => {
    const now = new Date().getTime() / 1000;

    // Tweets posted
    apiInstance.submitMetrics({
        body: {
            series: users
                .map(user => {
                    // Simulating that there is a 5% chance a random user submits a tweet each interval
                    let value = Math.random() < 0.05 ? 1 : 0;

                    // but for problem user, they do a bunch
                    if (user.role === 'post-spam') {
                        value = 5;
                    }

                    // if the user is banned, this simulates that they can't submit
                    if (user.state === 'blocked') {
                        value = 0;
                    }

                    return {
                        metric: 'tweets.posted',
                        points: [[now, value]],
                        tags: [`user:${user.email}`],
                        type: 'count'
                    };
                })
                // skip counts with 0 value
                .filter(submission => submission.points[0][1] > 0)
        }
    });

    // API gets
    apiInstance.submitMetrics({
        body: {
            series: users.map(user => {
                // normal rate is 1
                let value = 1;

                if (user.role === 'get-spam') {
                    value = 5;
                }

                // add some randomness for illustrative purposes
                value += 0.1 * Math.random();

                // if the user is banned, this simulates that they can't get requests
                if (user.state === 'blocked') {
                    value = 0;
                }

                // apply global rate limit
                value = Math.min(value, globalRateLimit);

                return {
                    interval: 3,
                    metric: 'tweets.api.gets',
                    points: [[now, value]],
                    tags: [`user:${user.email}`],
                    type: 'rate'
                };
            })
        }
    });
};

exports.startMetricSubmission = configuration => {
    if (submissionRoutine) {
        return;
    }
    apiInstance = new v1.MetricsApi(configuration);
    submissionRoutine = setInterval(submitPoints, INTERVAL);
};

exports.editBlocklist = ({ email, state }) => {
    const user = users.find(u => u.email === email);

    if (user) {
        // eslint-disable-next-line no-console
        console.log(`Changing user ${user.email} to ${user.state}`);

        users = users
            .filter(u => u.email !== user.email)
            .concat({
                ...user,
                state: state === 'blocked' ? 'blocked' : 'active'
            });

        return true;
    }

    return false;
};

exports.getBlockList = () =>
    users.filter(u => u.state === 'blocked').map(u => u.email);

exports.getRateLimit = () => globalRateLimit;

exports.setRateLimit = value => {
    // eslint-disable-next-line no-console
    console.log(`Setting rate limit to ${value}`);
    globalRateLimit = value;
};
