import { init } from '@datadog/ui-extensions-sdk';

export default function setup() {
    // eslint-disable-next-line
    const client = init();

    const root = document.getElementById('root');
    if (!root) {
        return;
    }
    root.innerHTML = `
    <div>
      The application controller is running in the background.
    </div>
    <a href='http://localhost:3000/slice-pizza-widget'> Click here to open your widget </a>
  `;
}
