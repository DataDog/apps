const init = async () => {
    switch (window.location.pathname) {
        case '/hello-world-widget': {
            let widget = await import('./widget/HelloWorld');
            return widget.default();
        }
        case '/jira-new-ticket-modal': {
            let modal = await import('./modal/CreateTicket');
            return modal.default();
        }
        case '/jira-update-ticket-modal': {
            let modal = await import('./modal/UpdateTicket');
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