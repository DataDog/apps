import { useForm } from 'react-hook-form';
import { Container, Stack, Button, Input, Heading } from '@chakra-ui/react';

import { PROXY_URL } from '../config';

export function SignInForm(props: { onSubmit: any }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        fetch(`${PROXY_URL}/api/tokens`, {
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => props.onSubmit(data))
            .catch(err => console.log('Oh no :(', err));
    };

    return (
        <Container centerContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Heading size="lg" as="h2">
                        Sign In
                    </Heading>
                    <Stack spacing={2}>
                        <Input
                            size="sm"
                            placeholder="Email"
                            type="email"
                            {...register('email')}
                        />
                        <Input
                            size="sm"
                            placeholder="Password"
                            type="password"
                            {...register('password')}
                        />
                    </Stack>
                    <Button type="submit">Log In</Button>
                </Stack>
            </form>
        </Container>
    );
}
