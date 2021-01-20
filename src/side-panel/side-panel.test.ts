import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { getLogger } from '../utils/logger';
import { MockFramePostChildClient, mockContext } from '../utils/testUtils';

import { DDSidePanelClient } from './side-panel';

let mockFramepostClient: MockFramePostChildClient;
let client: DDSidePanelClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDSidePanelClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('sidePanel.open()', () => {
    test('sends an open request with definition to parent', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.open({
            key: 'my-panel',
            source: 'panel.html'
        });

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.OPEN_SIDE_PANEL,
            {
                key: 'my-panel',
                source: 'panel.html'
            }
        );
    });

    test('sends an open request with key to parent', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.open('my-panel');

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.OPEN_SIDE_PANEL,
            'my-panel'
        );
    });

    test('throws an error if definition is invalid', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });

        let error;

        try {
            // @ts-ignore
            await client.open({
                source: 'panel.html'
            });
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });

    test('ignores request if key is empty', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.open('');

        expect(response).toBeUndefined();

        expect(requestMock).not.toHaveBeenCalled();
    });

    test('throws an error if app does not have the feature enabled', async () => {
        mockFramepostClient.init();

        let error;

        try {
            await client.open({
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
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.SIDE_PANELS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.close('my-panel');

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.CLOSE_SIDE_PANEL,
            'my-panel'
        );
    });

    test('Throws an error if the app does not have the feature enabled', async () => {
        mockFramepostClient.init();

        let error;

        try {
            await client.close('my-panel');
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });
});
