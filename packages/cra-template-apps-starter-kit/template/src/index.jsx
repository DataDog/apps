const init = async () => {
    switch (window.location.pathname) {
        case '/widget': {
            const widget = await import('./widget');
            return widget.default();
        }
        case '/panel': {
            const sidepanel = await import('./side-panel');
            return sidepanel.default();
        }
        case '/modal': {
            const modal = await import('./modal');
            return modal.default();
        }
        default: {
            const controller = await import('./controller');
            return controller.default();
        }
    }
};

init();

export {};
