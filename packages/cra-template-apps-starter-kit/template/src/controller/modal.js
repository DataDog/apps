export const setupModal = client => {
    // listen for modal events
    client.events.on('modal_action', () => {
        console.log('Confirmed!');
    });

    client.events.on('modal_cancel', () => {
        console.log('Denied!');
    });

    client.events.on('modal_close', definition => {
        console.log(`User exited modal ${definition.key}`);
    });

    // listen for a custom event sent from modal IFrame
    client.events.onCustom('modal_button_click', count => {
        console.log(`The user has clicked the button ${count} times`);
    });
};
