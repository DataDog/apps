import { AppConfig, EventProps } from "./types";
import { EventType } from "./constants";
import Postmate from "postmate";
import { CapabilityManager } from "./capabilites/capabilityManager";

const DEFAULT_OPTIONS = {
  host: "datad0g.com",
  debug: false,
};

class Client {
  readonly _host: string;
  readonly _debug: boolean;
  readonly _config: AppConfig;
  readonly _capabilityManager: CapabilityManager;
  _handshake: any;
  constructor(
    config: AppConfig,
    options: { debug?: boolean; host?: string } = {}
  ) {
    this._config = config;
    this._host = options.host || DEFAULT_OPTIONS.host;
    this._debug = options.debug || DEFAULT_OPTIONS.debug;
    this._capabilityManager = new CapabilityManager(this._config);

    Postmate.debug = this._debug;
    this._handshake = new Postmate.Model({
      config: () => this._config,
    });
    this._handshake.then((parent) => {
      console.log(
        "dd-apps: sdk handshake: parent <-> child handshake is complete"
      );
      this._capabilityManager.init();
    });
  }

  handleEvent(eventType: EventType) {
    return new Promise((resolve) => {
      const handshake = new Postmate.Model({
        handleEvent: (eventprops: EventProps) => {
          this._capabilityManager.handleEvent(eventprops, resolve);
        },
      });
      this._handshake.then((parent) => {
        console.log(
          "dd-apps: sdk handshake 2nd pass: parent <-> child handshake is complete"
        );
      });
    });
  }
}

export const DDClient = {
  init: (config: AppConfig) => {
    console.log("dd-apps: sdk init");

    const client = new Client(config);

    return client;
  },
  on: (eventType: EventType) => {
    const client = new Client({});
    return client.handleEvent(eventType);
  },
};
