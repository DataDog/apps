import {
    extendTheme,
    withDefaultColorScheme,
    ComponentStyleConfig
} from '@chakra-ui/react';

const typography = {
    fonts: {
        heading: 'TourneyVariable, sans-serif',
        body: 'Bebas Neue'
    },
    fontWeights: {
        heading: 900
    },
    colors: {
        heading: '#231f20',
        body: '#231f20'
    }
};

const Button: ComponentStyleConfig = {
    baseStyle: {
        fontFamily: 'TourneyVariable, sans-serif',
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    variants: {
        link: {
            fontFamily: 'Bebas Neue',
            fontWeight: 400,
            textDecoration: 'underline'
        }
    }
};

const Input: ComponentStyleConfig = {
    variants: {
        outline: {
            backgroundColor: '#ffffff'
        }
    }
};

const components = {
    components: {
        Button,
        Input
    }
};

const styles = {
    styles: {
        global: {
            body: {
                textTransform: 'uppercase',
                backgroundColor: '#f6f3e5'
            },
            'h1, h2, h3, h4': {
                fontWeight: '900 !important'
            }
        }
    }
};

const theme = extendTheme(
    typography,
    styles,
    components,
    withDefaultColorScheme({ colorScheme: 'red', components: ['Button'] })
);

export default theme;
