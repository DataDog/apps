import { init } from '@datadog/ui-extensions-sdk'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const SidePanel = () => {
    const [ redisMetric, setRedisMetric ] = useState(null)

    useEffect(() => {
        client.getContext()
            .then(({ args: { redisData } }) => setRedisMetric(redisData))
            .catch(err => console.log('Oh no'))
    }, [])

    if (!redisMetric) return <div>Loading...</div>

    return (
        <div>
            Redis Data:
            <ul>
                <li>Key: {redisMetric.key}</li>
                <li>Value: {redisMetric.value}</li>
            </ul>
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <SidePanel />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

