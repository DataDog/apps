import { init } from '@datadog/ui-extensions-sdk';
import { setupWidgetCtxMenu } from './widget-ctx-menu';

export default function setup() {
    const client = init();
    setupWidgetCtxMenu(client);

    const root = document.getElementById('root');
    if (!root) {
        return;
    }
    root.innerHTML = `
    <div>
      The application controller is running in the background.
    </div>
    <a href='http://localhost:3000/widget'> Click here to open your widget </a>
  `;
}
