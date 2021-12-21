import { init } from '@datadog/ui-extensions-sdk'

export default function setup() {
    const client = init()

    const root = document.getElementById('root')

    if (!root) return

    root.innerHTML = `
        <div>
            <h1>Datadog Redis App</h1>
            <p>Browse Datadoghq.com ou Datadoghq.eu to find out more</p>
        </div>
    `
}

