import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { mockContext, MockClient } from '../utils/testUtils';

import { DDSidePanelClient } from './side-panel';

let client: MockClient;
let sidePanelClient: DDSidePanelClient;

beforeEach(() => {
    client = new MockClient();
    sidePanelClient = new DDSidePanelClient(client as any);
});

describe('sidePanel.open()', () => {
    test('sends an open request with definition to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await sidePanelClient.open({
            key: 'my-panel',
            source: 'panel.html'
        });

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.OPEN_SIDE_PANEL,
            {
                definition: {
                    key: 'my-panel',
                    source: 'panel.html'
                }
            }
        );
    });

    test('sends an open request with definition and context to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await sidePanelClient.open(
            {
                key: 'my-panel',
                source: 'panel.html'
            },
            { foo: 'baar' }
        );

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.OPEN_SIDE_PANEL,
            {
                definition: {
                    key: 'my-panel',
                    source: 'panel.html'
                },
                args: { foo: 'baar' }
            }
        );
    });

    test('throws an error if definition is invalid', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });

        let error;

        try {
            // @ts-ignore
            await sidePanelClient.open({
                source: 'panel.html'
            });
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });

    test('throws an error if app does not have the feature enabled', async () => {
        client.framePostClient.init();

        let error;

        try {
            await sidePanelClient.open({
                key: 'my-panel',
                source: 'panel.html'
            });
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });
});

describe('sidePanel.close()', () => {
    test('sends an close request to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await sidePanelClient.close('my-panel');

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.CLOSE_SIDE_PANEL,
            'my-panel'
        );
    });

    test('Throws an error if the app does not have the feature enabled', async () => {
        client.framePostClient.init();

        let error;

        try {
            await sidePanelClient.close('my-panel');
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });
});
