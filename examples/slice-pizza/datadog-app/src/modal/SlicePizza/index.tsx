import { init } from '@datadog/ui-extensions-sdk'
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const client = init()

const PROXY_URL = process.env.REACT_APP_PROXY_URL 

interface Pizza {
    description: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    items: Pizza[];
    total: number;
}


function SignInForm () {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        fetch(`${PROXY_URL}/api/tokens`, {
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
        fetch(`${PROXY_URL}/api/users`, {
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


function PizzaLists(props: {onSubmitOrder: any}) {
    const [ pizzas, setPizzas ] = useState<Pizza[]>([])

    useEffect(() => {
        fetch('http://localhost:5000/api/menu')
            .then(res => res.json())
            .then(data => {
                const updatedPizzas = data.data.map((pizza: Pizza) => ({
                    ...pizza,
                    quantity: 0
                }))
                setPizzas(updatedPizzas)
            })
            .catch(err => console.log('Oh no', err))
    }, [])

    const onAddPizza = (pizza: Pizza) => {
        const updatedPizzas = Array.from(pizzas)

        const item = updatedPizzas.findIndex(i => i.id === pizza.id)
        updatedPizzas[item]['quantity'] +=1

        setPizzas(updatedPizzas)
    }

    const onRemovePizza = (pizza: Pizza) => {
        if (pizza.quantity === 0) return

        const updatedPizzas = Array.from(pizzas)

        const item = updatedPizzas.findIndex(i => i.id === pizza.id)
        updatedPizzas[item]['quantity'] -=1

        setPizzas(updatedPizzas)
    }

    console.log('=======')
    console.log(pizzas)
    console.log('=======')


    if (pizzas.length) {
        return (
            <div>
                {
                    pizzas.map(pizza => (
                        <div key={pizza.id} className='form-group'>
                            <p>{pizza.name}</p>
                            <span className='minus' onClick={() => onRemovePizza(pizza)}>-</span>
                            <input readOnly type='text' value={pizza.quantity} />
                            <span className='plus' onClick={() => onAddPizza(pizza)}>+</span>
                        </div>
                    ))
                }
                <button onClick={() => props.onSubmitOrder()}>Place order</button>
            </div>
        )
    }



    return <h1>Loading...</h1>
}


function OrderSummary(props: {onSubmitOrder: any}) {
    const [ orderData, setOrderData ] = useState<Order | null>(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/cart')
            .then(res => res.json())
            .then(data => setOrderData(data))
            .catch(err => console.log('Oh no', err))
    }, [])

    return (
        <div>
            <p>Order Summary</p>
            {
                orderData && (
                    <p>Amount: {orderData.total}</p>
                )
            }
            <hr />
            <button onClick={() => props.onSubmitOrder()}>Go back</button>
        </div>
    )
}


function Modal() {
    const [token, setToken] = useState('3qyPgFdVA2GvkJZxSsthtM')
    const [isRegistered, setIsRegistered] = useState(true)
    const [isOrderSummary, setIsOrderSummary] = useState(false)

    const onSubmitForm = () => {
        setIsRegistered(!isRegistered)
    }

    const displayOrderSummary = () => setIsOrderSummary(!isOrderSummary)

    if (isOrderSummary) {
        return <OrderSummary onSubmitOrder={displayOrderSummary}/>
    }

    if (!isRegistered) {
        return <SignUpForm onSubmit={onSubmitForm}  />
    }

    if (token) {
        return <PizzaLists onSubmitOrder={displayOrderSummary}/>
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

