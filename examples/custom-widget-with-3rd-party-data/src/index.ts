import { client } from './client';
import { renderController } from './controller';
import { renderCustomWidget } from './custom-widget';
import { renderLogin } from './login';

switch (window.location.pathname) {
    case '/custom-widget':
        renderCustomWidget(client);
        break;

    /**
     * This authentication route is part of this App,
     * but the system is designed to be able to leverage a preexisting authentication route if you have access to it.
     * If you already have an authentication route,
     * this route should be removed.
     */
    case '/login':
        renderLogin(client);
        break;

    default:
        renderController(client);
        break;
}
