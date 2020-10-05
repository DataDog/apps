import { AppConfig, EventProps } from "../types";
import { CapabilityType, EventType } from "../constants";
import { DashboardCogMenuCapability } from "./DashboardCogMenuCapability";
import { DashboardContextCapability } from "./DashboardContextCapability";

export class CapabilityManager {
  constructor(config: AppConfig) {
    // const capabilyTypes = Object.keys(config);
    // this._capabilities = capabilyTypes.map((capabilityType: CapabilityType) => {
    //   const capabilityClass =
    //     CapabilityManager.capabilityByType[capabilityType].klass;
    //   return new capabilityClass();
    // });
  }

  init = () => {};

  handleEvent = ({ eventType, options }: EventProps, resolve) => {
    // step1: check if the event is of a valid type [TODO]
    // step2: find the capability that this event belongs to
    const capability = CapabilityManager.findCapabilityByEventType(eventType);
    // step3: validate that this capability is enabled, reject if not [TODO]
    // step4: now simple let the capability handle the event
    capability.implementEventHandler({ eventType, options }, resolve);
  };

  static findCapabilityByEventType = (eventType: EventType) => {
    for (const [capabilityType, { klass, events }] of Object.entries(
      CapabilityManager.capabilityByType
    )) {
      if (events.indexOf(eventType) > -1) {
        return klass;
      }
    }
    return null;
  };

  static capabilityByType: {
    [prop: string]: {
      klass: any;
      events: string[];
    };
  } = {
    [CapabilityType.DASHBOARD_COG_MENU]: {
      klass: DashboardCogMenuCapability,
      events: [EventType.DASHBOARD_COG_MENU_INIT],
    },
    [CapabilityType.DASHBOARD_CONTEXT]: {
      klass: DashboardContextCapability,
      events: [],
    },
  };
}
