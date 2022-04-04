import { useState, useEffect } from 'react';

import Token from '../types/Token';
import Order from '../types/Order';

import { PROXY_URL } from '../config';

export function OrderSummary(props: { onPlaceOrder: any; token: Token }) {
    const [orderData, setOrderData] = useState<Order | null>(null);

    useEffect(() => {
        fetch(`${PROXY_URL}/api/cart?email=${props.token.email}`, {
            headers: {
                token: props.token.id
            }
        })
            .then(res => res.json())
            .then(data => setOrderData(data))
            .catch(err => console.log('Oh no', err));
    }, [props.token]);

    const onPlaceOrder = () => {
        fetch(`${PROXY_URL}/api/order`, {
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
            .catch(err =>
                console.log('Something went wrong when placing the order', err)
            );
    };

    return (
        <div>
            <p>Order Summary</p>
            {orderData && <p>Amount: {orderData.total}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData &&
                        orderData.items.map(pizza => (
                            <tr key={pizza.id}>
                                <td key={pizza.id}>{pizza.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <hr />
            <button onClick={() => onPlaceOrder()}>Place order</button>
        </div>
    );
}
