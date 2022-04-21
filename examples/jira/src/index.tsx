const init = async () => {
    switch (window.location.pathname) {
        case '/hello-world-widget': {
            let widget = await import('./widget/HelloWorld');
            return widget.default();
        }
        case '/jira-new-issue-modal': {
            let modal = await import('./modal/CreateIssue');
            return modal.default();
        }
        case '/jira-add-to-ticket-modal': {
            let modal = await import('./modal/AddTicket');
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
