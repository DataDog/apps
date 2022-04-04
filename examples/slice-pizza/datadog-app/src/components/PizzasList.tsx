import { useEffect, useState } from 'react';

import Token from '../types/Token';
import Pizza from '../types/Pizza';

import { PROXY_URL } from '../config';

export function PizzaLists(props: { onSubmitOrder: any; token: Token }) {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    useEffect(() => {
        fetch(`${PROXY_URL}/api/menu?email=${props.token.email}`, {
            headers: {
                'Content-Type': 'application/json',
                token: props.token.id
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedPizzas = data.data.map((pizza: Pizza) => ({
                    ...pizza,
                    quantity: 0
                }));
                setPizzas(updatedPizzas);
            })
            .catch(err => console.log('Oh no', err));
    }, [props.token]);

    const onAddPizza = (pizza: Pizza) => {
        const updatedPizzas = Array.from(pizzas);

        const item = updatedPizzas.findIndex(i => i.id === pizza.id);
        updatedPizzas[item]['quantity'] += 1;

        setPizzas(updatedPizzas);
    };

    const onRemovePizza = (pizza: Pizza) => {
        if (pizza.quantity === 0) return;

        const updatedPizzas = Array.from(pizzas);

        const item = updatedPizzas.findIndex(i => i.id === pizza.id);
        updatedPizzas[item]['quantity'] -= 1;

        setPizzas(updatedPizzas);
    };

    console.log('=======');
    console.log(pizzas);
    console.log('=======');

    const onSubmit = () => {
        const pizzasOrdered = pizzas.filter(pizza => pizza.quantity > 0);

        Promise.all(
            pizzasOrdered.map(async pizza => {
                await fetch('http://localhost:5000/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: props.token.id
                    },
                    body: JSON.stringify({
                        email: props.token.email,
                        id: pizza.id,
                        size: 10,
                        amount: pizza.quantity
                    })
                })
                    .then(res => res.json())
                    .then(data => console.log('Add to cart', data))
                    .catch(err =>
                        console.log('An error happended on adding to cart', err)
                    );
            })
        ).then(() => props.onSubmitOrder());
    };

    if (pizzas.length) {
        return (
            <div>
                {pizzas.map(pizza => (
                    <div key={pizza.id} className="form-group">
                        <p>{pizza.name}</p>
                        <span
                            className="minus"
                            onClick={() => onRemovePizza(pizza)}
                        >
                            -
                        </span>
                        <input readOnly type="text" value={pizza.quantity} />
                        <span
                            className="plus"
                            onClick={() => onAddPizza(pizza)}
                        >
                            +
                        </span>
                    </div>
                ))}
                <button onClick={() => onSubmit()}>Place order</button>
            </div>
        );
    }

    return <h1>Loading...</h1>;
}
