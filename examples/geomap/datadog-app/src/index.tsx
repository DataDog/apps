const init = async () => {
    switch (window.location.pathname) {
        case '/geo-map-widget': {
            let widget = await import('./widget/GeoMap');
            return widget.default();
        }
        default: {
            let controller = await import('./controller');
            return controller.default();
        }
    }
};

init();
export {};
