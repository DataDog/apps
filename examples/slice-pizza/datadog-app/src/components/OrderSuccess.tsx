import { Container, Text, Image, AspectRatio, Stack, Heading } from '@chakra-ui/react'

import Token from '../types/Token';

export function OrderSuccess(props: { token: Token }) {
    return (
        <Container centerContent padding="20px">
            <Stack spacing={4}>
                <Heading as="h2" size="md">Thank you for your order!</Heading>
                {props?.token?.email && (
                    <Text>We've sent an order confirmation email to <strong>{props.token.email}</strong>.</Text>
                )}
                <AspectRatio ratio={4/3}>
                    <Image src="https://c.tenor.com/UhhsVw2lzLgAAAAd/love-pizza-pizza.gif" />
                </AspectRatio>
            </Stack>
        </Container>
    );
}
