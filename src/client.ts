import { AppContext, EventHandler, HandleEventParams, ClientOptions } from "./types";
import { Host, UiAppCapabilityType, UiAppEventType } from './constants';
import { capabilityManagers } from './capabilites';
import Postmate from "postmate";
import { getLogger, Logger } from './logger';
import { CapabilityManager } from "./capabilites/capabilityManager";
import { Deferred, defer, uniqueInt } from './utils';

const DEFAULT_OPTIONS = {
  host: Host.STAGE,
  debug: false,
};

export class DDClient {
  private readonly host: string;
  private readonly debug: boolean;
  private readonly handshake: Postmate.Model;
  private readonly logger: Logger;
  private context: Deferred<AppContext>
  private capabilityManagers: CapabilityManager[];

  constructor(
    options: ClientOptions= {}
  ) {
    this.host = options.host || DEFAULT_OPTIONS.host;
    this.debug = options.debug || DEFAULT_OPTIONS.debug;
    this.context = defer();
    this.logger = getLogger(options);

    // @ts-ignore
    Postmate.debug = this._debug;

    this.handshake = new Postmate.Model({
      init: (context: AppContext) => this.init(context),
      handleEvent: (params: HandleEventParams) => this.handleEvent(params), 
    });

    this.capabilityManagers = capabilityManagers.map(Manager => new Manager(options, this.handshake, this.context));

    this.capabilityManagers.forEach(manager => manager.applyAdditionalMethods(this))

  }

  /**
   * Adds event handler to execute on a certain event type from the parent. Will print
   * an error if the installed app does not have the required capability. Returns an unsubscribe
   * method. This method can be called before handshake is successful, but handlers will not execute until
   * after successsful handshake.
   */
  on<T = any>(eventType: UiAppEventType, handler: EventHandler<T>): () => void {
    if (!Object.values(UiAppEventType).includes(eventType)) {
      this.logger.error('Unknown event type');

      return () => {};
    }

    const manager = this.getManagerByEventType(eventType);

    return manager.subscribeHandler<T>(eventType, handler);
  }

  /**
   * init method is exposed in the postmate model. It must be called before other operations may proceed,
   * in order to inform client of app context
   */
  private async init(context: AppContext) {
    // parent should only be able to call this after handshake is complete, but its worth a check anyways
    await this.handshake;

    this.context.resolve(context);
  
    this.logger.log(
      "dd-apps: sdk handshake: parent <-> child handshake is complete"
    );
    
    // exec any app_init event handlers registered by consumer
    this.handleEvent({ eventType: UiAppEventType.APP_CONTEXT, data: context })
  }

  /**
   * handleEvent is the main method called by the parent through postmate (child.handleEvent('exec', {...})). 
   * It accepts a keyed event type and arbitrary data to be passed to event handlers. It will log an error 
   * message if the user does not have the required capability enabled
   */
  private async handleEvent<T>({ eventType, data }: HandleEventParams<T>) {
    const manager = this.getManagerByEventType(eventType);

    manager.handleEvent({ eventType, data });
  }

  private getManagerByType(capabilityType: UiAppCapabilityType): CapabilityManager {
    return this.capabilityManagers.find(manager => manager.type === capabilityType);
  }

  private getManagerByEventType(eventType: UiAppEventType): CapabilityManager {
    return this.capabilityManagers.find(manager => manager.events.includes(eventType));
  }
}
