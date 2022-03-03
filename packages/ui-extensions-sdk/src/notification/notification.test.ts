import { FeatureType, RequestType } from '../constants';
import { mockContext, MockClient } from '../utils/testUtils';

import { DDNotificationClient } from './notification';

let client: MockClient;
let notificationClient: DDNotificationClient;

beforeEach(() => {
    client = new MockClient();
    notificationClient = new DDNotificationClient(client as any);
});

describe('notification.send()', () => {
    test('sends an open request with definition to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        await notificationClient.send({
            label: 'You screwed up bad!',
            level: 'danger'
        });

        expect(requestMock).toHaveBeenCalledWith(
            RequestType.SEND_NOTIFICATION,
            {
                label: 'You screwed up bad!',
                level: 'danger'
            }
        );
    });
});
