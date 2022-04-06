import Token from '../types/Token';

export function OrderSuccess(props: { token: Token }) {
    return (
        <div className="sp-app-order-success">
            <p className="sp-app-order-success__message">
                Thank you for your order!
                <br />
                Please find your order detail at{' '}
                {props.token ? props.token.email : ''}
            </p>
            <img
                className="sp-app-order-success__img"
                src="https://c.tenor.com/UhhsVw2lzLgAAAAd/love-pizza-pizza.gif"
            />
        </div>
    );
}
