import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { getLogger } from '../utils/logger';
import { MockFramePostChildClient, mockContext } from '../utils/testUtils';

import { DDModalClient } from './modal';

let mockFramepostClient: MockFramePostChildClient;
let client: DDModalClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDModalClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('modal.open()', () => {
    test('sends an open modal request to parent', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.MODALS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.open({
            key: 'my-modal',
            source: 'https://domain.com/modal.html'
        });

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(UiAppRequestType.OPEN_MODAL, {
            key: 'my-modal',
            source: 'https://domain.com/modal.html'
        });
    });

    test('logs an error and does not send request if app does not have modals feature enabled', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        mockFramepostClient.init();

        await client.open({
            key: 'my-modal',
            source: 'https://domain.com/modal.html'
        });

        expect(errorSpy).toHaveBeenCalled();
        expect(requestMock).not.toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });
});

describe('modal.close()', () => {
    test('sends an close modal request to parent', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.MODALS]
            }
        });
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.close('my-modal');

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.CLOSE_MODAL,
            'my-modal'
        );
    });

    test('logs an error and does not send request if app does not have modals feature enabled', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        mockFramepostClient.init();

        await client.close('my-modal');

        expect(errorSpy).toHaveBeenCalled();
        expect(requestMock).not.toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
