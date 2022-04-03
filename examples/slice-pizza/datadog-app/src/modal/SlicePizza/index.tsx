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


interface User {
    email: string;
    password: string;
}


interface Token {
    email: string;
    id: string;
    expires: number;
}


function SignInForm (props: {onSubmit: any}) {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        fetch(`${PROXY_URL}/api/tokens`, {
            body: JSON.stringify({
                "email": data.email,
                "password": data.password
            }),
            headers: {
                    'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => props.onSubmit(data))
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
        const user: User = {
            email: data.email,
            password: data.password
        }

        fetch(`${PROXY_URL}/api/users`, {
                body: JSON.stringify({
                    "name": data.name,
                    "email": user.email,
                    "password": user.password,
                    "address": data.address
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
        })
        .then(() => props.onSubmit(user))
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


function PizzaLists(props: {onSubmitOrder: any, token: Token}) {
    const [ pizzas, setPizzas ] = useState<Pizza[]>([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/menu?email=${props.token.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': props.token.id
                }
            })
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

    const onSubmit = () => {
        const pizzasOrdered = pizzas.filter(pizza => pizza.quantity > 0)

        Promise.all(pizzasOrdered.map(async pizza => {
            await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': props.token.id
                },
                body: JSON.stringify({
                    email: props.token.email,
                    id: pizza.id,
                    size: 10,
                    amount: pizza.quantity
                })
            })
            .then(res => res.json())
            .then(data => console.log("Add to cart", data))
            .catch(err => console.log("An error happended on adding to cart", err))
        })).then(() => props.onSubmitOrder())
    }


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
                <button onClick={() => onSubmit()}>Place order</button>
            </div>
        )
    }



    return <h1>Loading...</h1>
}


function OrderSummary(props: {onPlaceOrder: any, token: Token}) {
    const [ orderData, setOrderData ] = useState<Order | null>(null)

    useEffect(() => {

        console.log("=====")
        console.log(props.token)
        console.log("=====")
        console.log("=====")

        fetch(`http://localhost:5000/api/cart?email=${props.token.email}`, {
                headers: {
                    'token': props.token.id
                }
            })
            .then(res => res.json())
            .then(data => setOrderData(data))
            .catch(err => console.log('Oh no', err))
    }, [])

    const onPlaceOrder = () => {
        fetch('http://localhost:5000/api/order', {
            headers: {
                token: props.token.id,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: props.token.email
            })
        })
        .then(() => props.onPlaceOrder())
        .catch(err => console.log("Something went wrong when placing the order", err))
    }

    return (
        <div>
            <p>Order Summary</p>
            {
                orderData && (
                    <p>Amount: {orderData.total}</p>
                )
            }
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orderData && orderData.items.map(pizza => (
                        <tr key={pizza.id}>
                            <td key={pizza.id}>{pizza.name}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <hr />
            <button onClick={() => onPlaceOrder()}>Place order</button>
        </div>
    )
}


function OrderSuccess(props: {token: Token}) {
        return (
            <div>
                <p>
                Thank you for your order!
                <br />
                Please find your order detail at {props.token ? props.token.email : ''}
                </p>
            </div>
        )
}

function Modal() {
    const [token, setToken] = useState<Token | null>(null)
    const [isOrderSummary, setIsOrderSummary] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [hasAccount, setHasAccount] = useState(false)
    const [hasPlacedOrder, setHasPlacedOrder] = useState(false)

    const onRegisterUser = (user: User) => {
        setUser(user)
        setHasAccount(true)
    }

    const onSignInUser = (data: Token) => {
        setToken(data)
    }

    const displayOrderSummary = () => setIsOrderSummary(!isOrderSummary)

    const onPlaceOrder = () => setHasPlacedOrder(!hasPlacedOrder)

    if (hasPlacedOrder && token) {
        return <OrderSuccess token={token} />
    }

    if (isOrderSummary && token) {
        return <OrderSummary onPlaceOrder={onPlaceOrder} token={token} />
    }

    if (token) {
        return <PizzaLists onSubmitOrder={displayOrderSummary} token={token} />
    }

    return (
        <div>
            <button onClick={() => setHasAccount(true)}>Sign In</button>
            <button onClick={() => setHasAccount(false)}>Sign Up</button>
            <hr />
            {
                hasAccount 
                    ? <SignInForm onSubmit={onSignInUser} />
                    : <SignUpForm onSubmit={onRegisterUser} />
            }
        </div>
    )
}


export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Modal />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

