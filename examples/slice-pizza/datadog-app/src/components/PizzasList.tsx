import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Stack,
    Spinner,
    Button,
    Heading,
    Text,
    Image,
    Stat,
    StatHelpText,
    StatNumber
} from '@chakra-ui/react';

import { PizzaInput } from './PizzaInput';
import currency from '../utils/currency';

import Token from '../types/Token';
import Pizza from '../types/Pizza';

import { PROXY_URL } from '../config';

export function PizzasList(props: { onSubmitOrder: any; token: Token }) {
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    .then(data => console.log('Added to cart', data))
                    .catch(err =>
                        console.log(
                            'Encountered an error while adding to cart',
                            err
                        )
                    );
            })
        ).then(() => props.onSubmitOrder());
    };

    if (pizzas.length) {
        return (
            <Container
                centerContent
                paddingY="20px"
                width="65%"
                maxWidth="none"
            >
                <form onSubmit={onSubmit}>
                    <Stack spacing={5}>
                        <Image
                            src="/img/logo.jpeg"
                            maxWidth="400px"
                            marginX="auto"
                        />
                        <Heading size="lg" as="h2">
                            Menu
                        </Heading>
                        <Stack spacing={2}>
                            {pizzas.map(pizza => {
                                return (
                                    <Box
                                        key={pizza.id}
                                        borderWidth="1px"
                                        borderStyle="solid"
                                        borderColor="blackAlpha.800"
                                        padding="0"
                                        backgroundColor="white"
                                        borderRadius="5px"
                                    >
                                        <Stack direction="row">
                                            <Stack
                                                direction="row"
                                                width="70%"
                                                justifyContent="space-between"
                                            >
                                                <Stack padding="10px">
                                                    <Heading
                                                        as="p"
                                                        fontSize="3vw"
                                                    >
                                                        {pizza.name}
                                                    </Heading>
                                                    <Text
                                                        size="sm"
                                                        color="blackAlpha.700"
                                                    >
                                                        {pizza.description}
                                                    </Text>
                                                    <Stat>
                                                        <StatNumber>
                                                            {currency.format(
                                                                pizza.price
                                                            )}
                                                        </StatNumber>
                                                        <StatHelpText
                                                            color="blackAlpha.600"
                                                            fontSize={'xs'}
                                                        >
                                                            + taxes and fees
                                                        </StatHelpText>
                                                    </Stat>
                                                </Stack>
                                                <PizzaInput
                                                    onIncrement={() =>
                                                        onAddPizza(pizza)
                                                    }
                                                    onDecrement={() =>
                                                        onRemovePizza(pizza)
                                                    }
                                                />
                                            </Stack>
                                            <Image
                                                src={pizza.image}
                                                width="30%"
                                                maxHeight="177px"
                                            />
                                        </Stack>
                                    </Box>
                                );
                            })}
                        </Stack>
                        <Button type="submit">Place Order</Button>
                    </Stack>
                </form>
            </Container>
        );
    }

    return <Spinner />;
}
