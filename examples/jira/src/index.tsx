const init = async () => {
    switch (window.location.pathname) {
        case '/hello-world-widget': {
            let widget = await import('./widget/HelloWorld');
            return widget.default();
        }
        case '/hello-world-modal': {
            let modal = await import('./modal/HelloWorld');
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
