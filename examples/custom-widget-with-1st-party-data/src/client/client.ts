import { init } from '@datadog/ui-extensions-sdk';

/**
 * We initialize the {@link DDClient} in one place and use it throughout the App.
 * Having the {@link DDClient} initialized in one place helps centralize auth logic and provide better type inference.
 */
export const client = init();
