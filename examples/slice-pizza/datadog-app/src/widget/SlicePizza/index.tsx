import React from 'react';
import ReactDOM from 'react-dom';
import { init, ModalSize } from '@datadog/ui-extensions-sdk';
import {
    ChakraProvider,
    Container,
    Button,
    Image,
    Stack
} from '@chakra-ui/react';

import '@fontsource/tourney/variable.css';
import '@fontsource/bebas-neue/index.css';

import theme from '../../theme';

// eslint-disable-next-line
const client = init();

function Widget() {
    const onOpenModal = () => {
        client.modal.open({
            key: 'slice-pizza-modal',
            source: 'slice-pizza-modal',
            size: ModalSize.LARGE
        });
    };

    return (
        <Container centerContent padding="20px">
            <Stack direction="row" alignItems="center">
                <Image src="/img/logo.png" maxWidth="75px" />
                <Button onClick={onOpenModal} marginTop="40px">
                    Order Pizza
                </Button>
            </Stack>
        </Container>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <Widget />
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
