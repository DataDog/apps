import { AppConfig, EventProps } from "../types";
export class BaseCapability {
  constructor() {
    console.log("xxx BaseCapability started");
  }
  static implementEventHandler({ eventType, options }: EventProps, resolve) {
    // the base functionality is just to resolve options. Each capability can optionally imlement a custom logic.
    resolve(options);
  }
}
