import { UiAppFeatureType, UiAppEventType } from '../constants';
import { ModalDefinition } from '../modal/modal';
import { SidePanelDefinition } from '../side-panel/side-panel';

import {
    isFeatureEnabled,
    getFeatureTypesByEvent,
    isEventEnabled,
    validateKey
} from './utils';

describe('validateKey', () => {
    it('accepts a valid ModalDefinition', () => {
        const defintion: ModalDefinition = {
            key: 'my-modal',
            source: 'modal.html'
        };

        const result = validateKey(defintion);
        expect(result).toBeTruthy();
    });

    it('accepts a valid SidePanelDefinition', () => {
        const defintion: SidePanelDefinition = {
            key: 'side-panel',
            source: 'panel.html'
        };

        const result = validateKey(defintion);
        expect(result).toBeTruthy();
    });

    it('accepts a valid string key', () => {
        const result = validateKey('side-panel');
        expect(result).toBeTruthy();
    });

    it('rejects a definition without a key', () => {
        const defintion = {
            foo: 'bar'
        };

        expect(() => validateKey(defintion)).toThrowError(
            'Definition missing required field ".key"'
        );
    });
    it('rejects an empty string', () => {
        const result = validateKey('');
        expect(result).toBeFalsy();
    });
});

describe('feature utils', () => {
    test('isEnabled correclty tests if a feature type is in the set of enabled feature types', () => {
        expect(
            isFeatureEnabled(UiAppFeatureType.DASHBOARD_COG_MENU, [
                UiAppFeatureType.DASHBOARD_COG_MENU,
                UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(true);

        expect(
            isFeatureEnabled(UiAppFeatureType.DASHBOARD_COG_MENU, [
                UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(false);
    });

    test('getFeatureTypesByEvent returns index of the features enabling various events', () => {
        expect(
            getFeatureTypesByEvent()
                .get(UiAppEventType.DASHBOARD_TIMEFRAME_CHANGE)
                ?.has(UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET)
        ).toBe(true);
    });

    test('isEventEnabled correctly tests enablement of standard events', () => {
        expect(
            isEventEnabled(UiAppEventType.DASHBOARD_TIMEFRAME_CHANGE, [
                UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(true);

        expect(
            isEventEnabled(UiAppEventType.DASHBOARD_TIMEFRAME_CHANGE, [
                UiAppFeatureType.DASHBOARD_COG_MENU
            ])
        ).toBe(false);
    });

    test('isEventEnabled returns true for globally enabled events', () => {
        expect(isEventEnabled(UiAppEventType.CUSTOM_EVENT, [])).toBe(true);

        expect(
            isEventEnabled(UiAppEventType.CUSTOM_EVENT, [
                UiAppFeatureType.DASHBOARD_COG_MENU
            ])
        ).toBe(true);
    });
});
