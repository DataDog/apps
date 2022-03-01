import { RequestType } from '../constants';
import { RequestClient, NotificationDefinition } from '../types';

export class DDNotificationClient {
    private readonly client: RequestClient;

    constructor(client: RequestClient) {
        this.client = client;
    }

    async send(definition: NotificationDefinition) {
        return this.client.request<NotificationDefinition, void>(
            RequestType.SEND_NOTIFICATION,
            definition
        );
    }
}
