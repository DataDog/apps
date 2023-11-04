const init = async () => {
    switch (window.location.pathname) {
        case '/jira-new-ticket-modal': {
            let modal = await import('./modal/CreateTicket');
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
