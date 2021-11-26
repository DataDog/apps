const fetch = require('node-fetch');
const { allUsers, getUser } = require('./users');

// In memory simulated stream db, stored as {"text": "hello world", "author": "Aristotle"}
let stream = [];

async function initStream() {
    if (!stream.length) {
        const response = await fetch('https://type.fit/api/quotes');
        stream = await response.json();
        // some quotes don't have authors
        stream = stream.filter(t => t.author);
    }
}

async function getStream() {
    await initStream();
    return stream.slice(0, 15);
}

async function getStreamForUser(user) {
    await initStream();
    user = getUser(user);
    if (!user) {
        return [];
    }
    if (user.role === 'post-spam') {
        // spammer tagging other users with ads
        return allUsers.map(u => {
            return {
                author: user.email,
                text: `Congratulations ${u.email}! You have won a $1,000 Walmart gift card. Go to https://example.com/fe34ax to claim now.`
            };
        });
    }

    return stream.slice(0, 15);
}

function postToStream(item) {
    if (!item.author) {
        console.log('Tweet missing author');
        return;
    }
    if (!item.text) {
        console.log('Tweet missing text');
        return;
    }
    stream.unshift(item);
}

module.exports = {
    getStream,
    getStreamForUser,
    postToStream
};
