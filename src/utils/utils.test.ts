import { FeatureType, EventType } from '../constants';
import { ModalDefinition, SidePanelDefinition } from '../types';

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

    it('rejects a definition without a key', () => {
        const defintion = {
            foo: 'bar'
        };

        expect(() => validateKey(defintion)).toThrowError(
            'Definition missing required field ".key"'
        );
    });
});

describe('feature utils', () => {
    test('isEnabled correclty tests if a feature type is in the set of enabled feature types', () => {
        expect(
            isFeatureEnabled(FeatureType.DASHBOARD_COG_MENU, [
                FeatureType.DASHBOARD_COG_MENU,
                FeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(true);

        expect(
            isFeatureEnabled(FeatureType.DASHBOARD_COG_MENU, [
                FeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(false);
    });

    test('getFeatureTypesByEvent returns index of the features enabling various events', () => {
        expect(
            getFeatureTypesByEvent()
                .get(EventType.DASHBOARD_TIMEFRAME_CHANGE)
                ?.has(FeatureType.DASHBOARD_CUSTOM_WIDGET)
        ).toBe(true);
    });

    test('isEventEnabled correctly tests enablement of standard events', () => {
        expect(
            isEventEnabled(EventType.DASHBOARD_TIMEFRAME_CHANGE, [
                FeatureType.DASHBOARD_CUSTOM_WIDGET
            ])
        ).toBe(true);

        expect(
            isEventEnabled(EventType.DASHBOARD_TIMEFRAME_CHANGE, [
                FeatureType.DASHBOARD_COG_MENU
            ])
        ).toBe(false);
    });

    test('isEventEnabled returns true for globally enabled events', () => {
        expect(isEventEnabled(EventType.CUSTOM_EVENT, [])).toBe(true);

        expect(
            isEventEnabled(EventType.CUSTOM_EVENT, [
                FeatureType.DASHBOARD_COG_MENU
            ])
        ).toBe(true);
    });
});
