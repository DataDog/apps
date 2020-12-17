import { UiAppFeatureType, UiAppEventType } from '../constants';

import {
    isFeatureEnabled,
    getFeatureTypesByEvent,
    isEventEnabled
} from './utils';

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
