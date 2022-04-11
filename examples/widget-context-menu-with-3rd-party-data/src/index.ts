import { client } from './client';
import { renderController } from './controller';
import { renderLogin } from './login';
import { renderModal } from './modal';

switch (window.location.pathname) {
    /**
     * This authentication route is part of this App,
     * but the system is designed to be able to leverage a preexisting authentication route if you have access to it.
     * If you already have an authentication route,
     * this route should be removed.
     */
    case '/login':
        renderLogin(client);
        break;

    case '/modal':
        renderModal(client);
        break;

    default:
        renderController(client);
        break;
}
