import { init } from '@datadog/ui-extensions-sdk'
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const client = init()


function SignInForm () {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        fetch('http://localhost:5000/api/tokens', {
            body: JSON.stringify({
                "email": data.email,
                "password": data.password
            }),
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('Oh no :(', err))
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email') } />
                <input {...register('password') } />
                <input type='submit' />
            </form>
        </div>
    )
}


function SignUpForm(props: {onSubmit: any}) {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        fetch('http://localhost:5000/api/users', {
                body: JSON.stringify({
                    "name": data.name,
                    "email": data.email,
                    "password": data.password,
                    "address": data.address
                }),
                method: 'POST',
                mode: 'no-cors'
        })
        .then(() => props.onSubmit())
        // Add modal
        .catch(err => console.log('Oh no :(', err))
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register('name')} />
                <input  {...register('email')} />
                <input  {...register('password')} />
                <input  {...register('address')} />
                <input type='submit' />
            </form>
        </div>
    )
}


function PizzaLists() {
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/menu')
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('Oh no', err))
    }, [])

    console.log('=====')
    console.log(pizzas)
    console.log('=====')

    return <h1>Pizzas</h1>
}

function Modal() {
    const [token, setToken] = useState('3qyPgFdVA2GvkJZxSsthtM')
    const [isRegistered, setIsRegistered] = useState(true)

    const onSubmitForm = () => {
        console.log('======')
        console.log('======')
        console.log('======')
        setIsRegistered(!isRegistered)
    }

    if (!isRegistered) {
        return <SignUpForm onSubmit={onSubmitForm}  />
    }

    if (token) {
        return <PizzaLists />
    }

    return <SignInForm />
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Modal />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

