import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './Stream';
import { Login } from './Login';

const getContent = () => {
  switch(window.location.pathname) {
    case "/login": {
      return <Login />
    }
    default: {
      return <App />
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
   {getContent()}
  </React.StrictMode>,
  document.getElementById('root'),
);
