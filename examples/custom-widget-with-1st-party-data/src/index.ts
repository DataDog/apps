import { client } from './client';
import { renderController } from './controller';
import { renderCustomWidget } from './custom-widget';

switch (window.location.pathname) {
    case '/custom-widget':
        renderCustomWidget(client);
        break;

    default:
        renderController(client);
        break;
}
