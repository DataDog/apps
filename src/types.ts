import { CapabilityType, EventType } from "./constants";

export interface AppConfig {
  [prop: string]: any;
}

export interface EventProps {
  eventType: EventType;
  options: any;
}
