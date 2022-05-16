export default function setup() {
    const root = document.getElementById('root');
    if (!root) {
        return;
    }
    root.innerHTML = `
    <div>
      The application controller is running in the background.
    </div>
    <a href='/widget'> Click here to open your widget </a>
  `;
}
