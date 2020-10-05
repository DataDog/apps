import { AppConfig } from "../types";
import { CapabilityType } from "../constants";
import { DashboardCogMenuCapability } from "./DashboardCogMenuCapability";
import { DashboardContextCapability } from "./DashboardContextCapability";

export class CapabilityManager {
  constructor(config: AppConfig) {
    const capabilyTypes = Object.keys(config);
    capabilyTypes.forEach((capabilityType: CapabilityType) => {
      const capabilityClass =
        CapabilityManager.capabilityByType[capabilityType];
      const capability = new capabilityClass();
    });
  }

  init = () => {};

  static capabilityByType = {
    [CapabilityType.DASHBOARD_COG_MENU]: DashboardCogMenuCapability,
    [CapabilityType.DASHBOARD_CONTEXT]: DashboardContextCapability,
  };
}
