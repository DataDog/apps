const mongoose = require('mongoose');
const { createClient } = require('redis');

const createConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            dbName: process.env.MONGO_DB
        });

        // eslint-disable-next-line no-console
        console.log('MongoDB: connection successful');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('An error occurs when connecting to the mongodb', error);
    }
};

function createRedisClient() {
    const client = createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    // eslint-disable-next-line no-console
    client.on('error', error => console.log('Redis Client Error:', error));

    return client;
}

module.exports = {
    createConnection,
    createRedisClient
};
