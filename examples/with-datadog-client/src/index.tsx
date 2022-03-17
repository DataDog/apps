const init = async () => {
    switch (window.location.pathname) { 
        case '/custom-widget': {
            let customWidget = await import('./custom-widget');
            return customWidget.default();
        }
        default: {
            let controller = await import('./controller');
            return controller.default();
        }
    }
};

init();
export {};
