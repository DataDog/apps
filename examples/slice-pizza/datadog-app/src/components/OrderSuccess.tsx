import Token from '../types/Token'

export function OrderSuccess(props: {token: Token}) {
        return (
            <div>
                <p>
                Thank you for your order!
                <br />
                Please find your order detail at {props.token ? props.token.email : ''}
                </p>
            </div>
        )
}
