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
        <div className="sp-app-sign-up">
            <div className="sp-app-sign-up__wrapper">
                <p className="sp-app-sign-up-title">Sign In</p>
                <form
                    className="sp-app-sign-up-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="sp-app-sign-up__form-group">
                        <input
                            className="sp-app-sign-up__input"
                            placeholder="Email"
                            type="email"
                            {...register('email')}
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <input
                            className="sp-app-sign-up__input"
                            placeholder="Create password"
                            type="password"
                            {...register('password')}
                        />
                    </div>
                    <div className="sp-app-sign-up__form-group">
                        <input
                            className="sp-app-sign-up__submit-btn"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
