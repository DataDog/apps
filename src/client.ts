import { AppConfig } from "./types";
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
  readonly _handshake: any;
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
}

export const DDClient = {
  init: (config: AppConfig) => {
    console.log("dd-apps: sdk init");

    const client = new Client(config);

    return client;
  },
};
