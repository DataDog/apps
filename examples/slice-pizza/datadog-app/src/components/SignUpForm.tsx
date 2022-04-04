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
        <div className="sp-app-sign-up">
            <div className="sp-app-sign-up__wrapper">
                <p className="sp-app-sign-up-title">Sign Up</p>
                <form
                    className="sp-app-sign-up-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="sp-app-sign-up__form-group">
                        <input
                            placeholder="Name"
                            className="sp-app-sign-up__input"
                            type="text"
                            {...register('name')}
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <input
                            placeholder="Email"
                            className="sp-app-sign-up__input"
                            type="email"
                            {...register('email')}
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <input
                            placeholder="Create password"
                            className="sp-app-sign-up__input"
                            type="password"
                            {...register('password')}
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <textarea
                            {...register('address')}
                            className="sp-app-sign-up__input"
                            placeholder="Address"
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <input
                            type="submit"
                            className="sp-app-sign-up__submit-btn"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
