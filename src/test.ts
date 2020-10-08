import { DDClient } from './client';
import { UiAppEventType } from './constants';

test('instantiates without error', () => {
    const client = new DDClient();

    expect(client).toBeInstanceOf(Object);
});

test('has an "on" methods that accepts a subscription, and returns an unsubscribe method', () => {
    const client = new DDClient();

    const unsubscribe = client.on(
        UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
        context => {}
    );

    expect(unsubscribe).toBeInstanceOf(Function);
});
