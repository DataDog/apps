import { init } from '@datadog/ui-extensions-sdk';

import { setupDashboardCogMenu } from './dashboard-cog-menu';
import { setupModal } from './modal';
import { setupWidgetCtxMenu } from './widget-ctx-menu';

export default function setup() {
    const client = init();

    setupModal(client);
    setupWidgetCtxMenu(client);
    setupDashboardCogMenu(client);

    const root = document.getElementById('root');

    if (!root) {
        return;
    }

    root.innerHTML = `
        <div>
            <p>The application controller is running in the background.</p>
            <a href='http://localhost:3000/widget'>Click here to open your widget</a>
        </div>
    `;
}