const init = async () => {
    switch (window.location.pathname) {
        case '/clients-list': {
            const widget = await import('./widgets/ClientsList')
            return widget.default()
        }
        case '/keys-search-widget': {
            const widget = await import('./widgets/KeySearch')
            return widget.default()
        }
        case '/keys-search-modal': {
            const modal = await import('./modals/KeySearch')
            return modal.default()
        }
        default: {
            const controller = await import('./controller')
            return controller.default()
        }
    }
}

init()
export {}

