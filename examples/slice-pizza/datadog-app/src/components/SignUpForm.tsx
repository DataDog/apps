import { useForm } from 'react-hook-form';
import { Container, Input, Textarea, Button, Heading, Stack } from '@chakra-ui/react'

import User from '../types/User';
import { PROXY_URL } from '../config';

export function SignUpForm(props: { onSubmit: any }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        const user: User = {
            email: data.email,
            password: data.password
        };

        fetch(`${PROXY_URL}/api/users`, {
            body: JSON.stringify({
                name: data.name,
                email: user.email,
                password: user.password,
                address: data.address
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(() => props.onSubmit(user))
            // Add modal
            .catch(err => console.log('Oh no :(', err));
    };

    return (
        <Container centerContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Heading size="lg" as="h2">Sign Up</Heading>
                    <Stack spacing={2}>
                        <Input
                            placeholder="Name"
                            size="sm"
                            type="text"
                            {...register('name')}
                        />
                        <Input
                            placeholder="Email"
                            size="sm"
                            type="email"
                            {...register('email')}
                        />
                        <Input
                            placeholder="Create password"
                            size="sm"
                            type="password"
                            {...register('password')}
                        />
                        <Textarea
                            size="sm"
                            placeholder="Delivery Address"
                            {...register('address')}
                        />
                    </Stack>
                    <Button type="submit">Create Account</Button>
                </Stack>
            </form>
        </Container>
    );
}
