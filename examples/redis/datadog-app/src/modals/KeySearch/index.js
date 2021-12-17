import { init } from '@datadog/ui-extensions-sdk'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const API_URL = process.env.REACT_APP_API_URL

const Key = ({ redisKey, deleteKey }) => (
    <div className='sk-key'>
        {redisKey.key_id}
        <br />
        {redisKey.key_value}
        <button onClick={() => deleteKey(redisKey.key_id)}>
            Delete key
        </button>
    </div>
)

const Modal = () => {
    const { register, handleSubmit } = useForm()
    const [ keys, setKeys ] = useState(null)

    const getKeys = async query => fetch(`${API_URL}/search?query=${query}`)
        .then(res => res.json())
        .then(({ search }) => setKeys(search))
        .catch(err => console.log('Oh no', err))

    const deleteKey = async redisKey => fetch(`${API_URL}/keys/${redisKey}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            const newKeys = keys.filter(key => key.key_id !== redisKey)
            setKeys(newKeys)
        })
        .catch(err => console.log(`Error on delete key`, err))

    const onSubmit = async ({ query }) => await getKeys(query)

    return (
        <div className='sk-wrapper'>
            <form className='sk-form'  onSubmit={handleSubmit(onSubmit)}>
                <input {...register('query', { required: true })} />
                <input type='submit' />
            </form>
            <div className='sk-keys-wrapper'>
                {
                    keys && keys.length
                        ? keys.map(key => <Key key={key.key_id} redisKey={key} deleteKey={deleteKey}>{key}</Key>)
                        : <p>No keys found</p>
                }
            </div>
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Modal />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

