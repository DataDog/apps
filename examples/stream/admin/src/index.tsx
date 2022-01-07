import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import setup from './controller';
import BlocklistModal from './blocklist-modal';
import AccountPanel from './account-panel';
import Widget from './widget';
import AuthRedirect from './auth-redirect';
import 'bootstrap/dist/css/bootstrap.css';

const getContent = () => {
    switch (window.location.pathname) {
        case '/widget': {
            return <Widget />;
        }
        case '/blocklist-modal': {
            return <BlocklistModal />;
        }
        case '/account-panel': {
            return <AccountPanel />;
        }
        case '/auth-redirect': {
            return <AuthRedirect />;
        }
        default: {
            setup();
        }
    }
};

ReactDOM.render(
    <React.StrictMode>{getContent()}</React.StrictMode>,
    document.getElementById('root')
);
