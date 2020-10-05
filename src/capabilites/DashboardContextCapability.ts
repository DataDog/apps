import { BaseCapability } from "./baseCapability";

export class DashboardContextCapability extends BaseCapability {
  constructor() {
    super();
  }
  print() {
    return "child rrr";
  }
}
