import { init } from '@datadog/ui-extensions-sdk'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const API_URL = process.env.REACT_APP_API_URL

const Widget = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ redisClients, setRedisClients ] = useState([])

    useEffect(
        () => {
            fetch(`${API_URL}/clients`)
                .then(res => res.json())
                .then(({ data }) => setRedisClients(data))
                .catch(err => setError(err))
                .finally(() => setIsLoading(!isLoading))
        }, []
    )

    if (error) {
        return <div>An error occurs</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {
                redisClients.length && redisClients.map(({ id, ip, name }) => (
                    <div className='client' key={id}>
                        <p>Client IP: {ip}</p>
                        <p>Client Name: 
                            <span className='client-name'>
                                {name ? name : 'Undefined'}
                            </span>
                        </p>
                        <button>Display client info</button>
                    </div>
                ))
            }
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

