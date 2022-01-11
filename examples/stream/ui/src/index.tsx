import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';

import { Login } from './Login';
import App from './Stream';

const getContent = () => {
    switch (window.location.pathname) {
        case '/login': {
            return <Login />;
        }
        default: {
            return <App />;
        }
    }
};

ReactDOM.render(
    <React.StrictMode>{getContent()}</React.StrictMode>,
    document.getElementById('root')
);
