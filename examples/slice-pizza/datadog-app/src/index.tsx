const init = async () => {
    switch (window.location.pathname) {
        case '/slice-pizza-widget': {
            let widget = await import('./widget/SlicePizza');
            return widget.default();
        }
        case '/slice-pizza-modal': {
            let modal = await import('./modal/SlicePizza');
            return modal.default();
        }
        default: {
            let controller = await import('./controller');
            return controller.default();
        }
    }
};

init();
export {};
