import { FeatureType, RequestType } from '../constants';
import { MockClient, mockContext } from '../utils/testUtils';
import { FeatureRenderType } from '..';

import { DDModalClient } from './modal';

let client: MockClient;
let modalClient: DDModalClient;

beforeEach(() => {
    client = new MockClient();
    modalClient = new DDModalClient(client as any);
});

describe('modal.open()', () => {
    test('sends an open modal request with definition to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.MODALS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await modalClient.open({
            key: 'my-modal',
            renderOptions: {
                type: FeatureRenderType.FRAME,
                source: 'modal.html'
            }
        });

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(RequestType.OPEN_MODAL, {
            definition: {
                key: 'my-modal',
                renderOptions: {
                    type: FeatureRenderType.FRAME,
                    source: 'modal.html'
                }
            }
        });
    });

    test('sends an open modal request with definition and args to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.MODALS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await modalClient.open(
            {
                key: 'my-modal',
                renderOptions: {
                    type: FeatureRenderType.FRAME,
                    source: 'modal.html'
                }
            },
            { foo: 'baar' }
        );

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(RequestType.OPEN_MODAL, {
            definition: {
                key: 'my-modal',
                source: 'modal.html'
            },
            args: {
                foo: 'baar'
            }
        });
    });

    test('throws an error if modal definition is invalid', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.MODALS]
            }
        });

        let error;

        try {
            // @ts-ignore
            await modalClient.open({
                renderOptions: {
                    type: FeatureRenderType.FRAME,
                    source: 'modal.html'
                }
            });
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });

    test('throws an error if app does not have modals feature enabled', async () => {
        client.framePostClient.init();

        let error;

        try {
            await modalClient.open({
                key: 'my-modal',
                renderOptions: {
                    type: FeatureRenderType.FRAME,
                    source: 'modal.html'
                }
            });
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });
});

describe('modal.close()', () => {
    test('sends an close modal request to parent', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.MODALS]
            }
        });
        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await modalClient.close('my-modal');

        expect(response).toEqual(null);

        expect(requestMock).toHaveBeenCalledWith(
            RequestType.CLOSE_MODAL,
            'my-modal'
        );
    });

    test('Throws an error if the app does not have the modals feature enabled', async () => {
        client.framePostClient.init();

        let error;

        try {
            await modalClient.close('my-modal');
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(Error);
    });
});
