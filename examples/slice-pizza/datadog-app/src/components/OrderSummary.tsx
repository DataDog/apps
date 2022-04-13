import { useState, useEffect } from 'react';

import {
    Container,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    Button,
    Stack,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    Image
} from '@chakra-ui/react';

import currency from '../utils/currency';

import Pizza from '../types/Pizza';
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
        <Container centerContent padding="20px">
            <Stack spacing={4}>
                <Image src="/img/logo.jpeg" />
                <Heading>Order Confirmation</Heading>
                {orderData && (
                    <Stat>
                        <StatLabel>Total:</StatLabel>
                        <StatNumber>
                            {currency.format(orderData.total)}
                        </StatNumber>
                    </Stat>
                )}
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Item</Th>
                                <Th>Amount</Th>
                                <Th>Price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orderData &&
                                orderData.items
                                    // collate multiple orders for the same pizza into one item with updated quantity
                                    .reduce(
                                        (
                                            pizzas: Pizza[] = [],
                                            pizza: Pizza
                                        ) => {
                                            const pizzaOrder = pizzas.findIndex(
                                                item => item.id === pizza.id
                                            );

                                            if (pizzaOrder > -1) {
                                                pizzas[pizzaOrder].amount +=
                                                    pizza.amount;
                                            } else {
                                                pizzas.push(pizza);
                                            }

                                            return pizzas;
                                        },
                                        []
                                    )
                                    .map((pizza, index) => (
                                        <Tr key={`${pizza.id}-${index}`}>
                                            <Td>{pizza.name}</Td>
                                            <Td>{pizza.amount}</Td>
                                            <Td>
                                                {currency.format(pizza.price)}
                                            </Td>
                                        </Tr>
                                    ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Button onClick={onPlaceOrder}>Confirm Order</Button>
            </Stack>
        </Container>
    );
}
