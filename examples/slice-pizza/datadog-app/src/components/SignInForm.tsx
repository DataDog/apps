import { useForm } from 'react-hook-form';

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
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} />
                <input {...register('password')} />
                <input type="submit" />
            </form>
        </div>
    );
}
