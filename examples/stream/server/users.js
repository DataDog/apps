const allUsers = [
    // Posting too many tweets
    { email: 'margaret@ecorp.com', role: 'post-spam', state: 'active' },
    // Likely a bot crawling the api
    { email: 'lucious14@hotmail.com', role: 'get-spam', state: 'active' },
    { email: 'chelsea.rolfson@yahoo.com', role: 'user', state: 'active' },
    { email: 'tschiller@yahoo.com', role: 'user', state: 'active' },
    { email: 'ptillman@jast.com', role: 'user', state: 'active' },
    { email: 'oberbrunner.hailie@hotmail.com', role: 'user', state: 'active' },
    { email: 'doyle.ollie@gmail.com', role: 'user', state: 'active' },
    { email: 'oconner.rogers@yahoo.com', role: 'user', state: 'active' },
    { email: 'nfeeney@langworth.com', role: 'user', state: 'active' },
    { email: 'nadia10@maggio.com', role: 'user', state: 'active' }
];

const getUser = email => {
    return allUsers.find(u => u.email === email);
};

module.exports = {
    allUsers,
    getUser
};
