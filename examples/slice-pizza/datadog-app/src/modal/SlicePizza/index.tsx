import { init } from '@datadog/ui-extensions-sdk';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
    ChakraProvider,
    Container,
    Button,
    Text,
    Stack,
    Image
} from '@chakra-ui/react';

import '@fontsource/tourney/variable.css';
import '@fontsource/bebas-neue/index.css';

import theme from '../../theme';

import Token from '../../types/Token';
import User from '../../types/User';

import { OrderSuccess } from '../../components/OrderSuccess';
import { OrderSummary } from '../../components/OrderSummary';
import { SignInForm } from '../../components/SignInForm';
import { SignUpForm } from '../../components/SignUpForm';
import { PizzasList } from '../../components/PizzasList';

// eslint-disable-next-line
const client = init();

function Modal() {
    const [token, setToken] = useState<Token | null>(null);
    const [isOrderSummary, setIsOrderSummary] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useState<User | null>(null);
    const [hasAccount, setHasAccount] = useState(false);
    const [hasPlacedOrder, setHasPlacedOrder] = useState(false);

    const onRegisterUser = (user: User) => {
        setUser(user);
        setHasAccount(true);
    };

    const onSignInUser = (data: Token) => {
        setToken(data);
    };

    const displayOrderSummary = () => setIsOrderSummary(!isOrderSummary);

    const onPlaceOrder = () => setHasPlacedOrder(!hasPlacedOrder);

    if (hasPlacedOrder && token) {
        return <OrderSuccess token={token} />;
    }

    if (isOrderSummary && token) {
        return <OrderSummary onPlaceOrder={onPlaceOrder} token={token} />;
    }

    if (token) {
        return <PizzasList onSubmitOrder={displayOrderSummary} token={token} />;
    }

    return (
        <Container centerContent padding="20px">
            <Stack spacing={5}>
                <Image src="/img/logo.jpeg" />
                {hasAccount ? (
                    <>
                        <SignInForm onSubmit={onSignInUser} />
                        <Stack direction="row" marginTop="40px">
                            <Text>Don't have an account?</Text>
                            <Button
                                onClick={() => setHasAccount(false)}
                                variant="link"
                                marginInlineStart={0}
                                marginLeft={0}
                            >
                                Register
                            </Button>
                        </Stack>
                    </>
                ) : (
                    <>
                        <SignUpForm onSubmit={onRegisterUser} />
                        <Stack direction="row" marginTop="40px">
                            <Text>Already have an account?</Text>
                            <Button
                                onClick={() => setHasAccount(true)}
                                variant="link"
                                marginInlineStart={0}
                                marginLeft={0}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </Container>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <Modal />
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
