import { useForm } from 'react-hook-form';

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
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} />
                <input {...register('email')} />
                <input {...register('password')} />
                <input {...register('address')} />
                <input type="submit" />
            </form>
        </div>
    );
}
