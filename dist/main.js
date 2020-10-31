(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DD_SDK"] = factory();
	else
		root["DD_SDK"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@datadog/framepost/dist/framepost.min.js":
/*!***************************************************************!*\
  !*** ./node_modules/@datadog/framepost/dist/framepost.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(self,(function(){return(()=>{"use strict";var e={573:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ChildClient=void 0;const i=s(601),n=s(473),r=s(416);class o extends r.SharedClient{constructor(e={}){super(e),this.context=e.context||null,this.initListener=this.initListener.bind(this),window.addEventListener("message",this.initListener),this.profile&&this.onRequest(i.REQUEST_KEY_GET_PROFILE,(()=>this.profiler.getEvents()))}getLogger(){return n.getLogger("child-client",this.debug)}onChannelInit(e){window.removeEventListener("message",this.initListener),this.messagePort=e.ports[0];const t=this.getInitMessage(this.context);this.messagePort.postMessage(t),this.profiler.logEvent(i.ProfileEventType.POST_MESSAGE,t)}destroy(){this.messagePort&&this.messagePort.close(),window.removeEventListener("message",this.initListener)}}t.ChildClient=o},601:(e,t)=>{var s,i,n;Object.defineProperty(t,"__esModule",{value:!0}),t.REQUEST_KEY_GET_PROFILE=t.REQUEST_TIMEOUT=t.TransactionDirection=t.ProfileEventType=t.MessageAPIVersion=t.MessageType=void 0,(n=t.MessageType||(t.MessageType={})).CHANNEL_INIT="channel_init",n.EVENT="event",n.REQUEST="request",n.RESPONSE="response",(t.MessageAPIVersion||(t.MessageAPIVersion={})).v1="framepost/v1",(i=t.ProfileEventType||(t.ProfileEventType={})).POST_MESSAGE="post_message",i.RECEIVE_MESSAGE="receive_message",(s=t.TransactionDirection||(t.TransactionDirection={})).UP="up",s.DOWN="down",t.REQUEST_TIMEOUT=1e4,t.REQUEST_KEY_GET_PROFILE="framepost_get_profile"},607:function(e,t,s){var i=this&&this.__createBinding||(Object.create?function(e,t,s,i){void 0===i&&(i=s),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,i){void 0===i&&(i=s),e[i]=t[s]}),n=this&&this.__exportStar||function(e,t){for(var s in e)"default"===s||Object.prototype.hasOwnProperty.call(t,s)||i(t,e,s)};Object.defineProperty(t,"__esModule",{value:!0}),t.ParentClient=t.ChildClient=void 0;var r=s(573);Object.defineProperty(t,"ChildClient",{enumerable:!0,get:function(){return r.ChildClient}});var o=s(166);Object.defineProperty(t,"ParentClient",{enumerable:!0,get:function(){return o.ParentClient}}),n(s(699),t)},473:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getLogger=void 0,t.getLogger=(e,t)=>t?{log:t=>console.log(`${e}: ${t}`),error:t=>console.error(`${e}: ${t}`)}:{log(){},error(){}}},166:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(n,r){function o(e){try{c(i.next(e))}catch(e){r(e)}}function a(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ParentClient=void 0;const n=s(601),r=s(473),o=s(416),a=s(593);class c extends o.SharedClient{constructor(e={}){super(e)}requestChannel(e,t){if(this.url=new URL(e.src),e.contentWindow){const s=new MessageChannel;this.messagePort=s.port1;const i=this.getInitMessage(t);this.messagePort.onmessage=this.initListener.bind(this),e.contentWindow.postMessage(i,this.url.origin,[s.port2]),this.profiler.logEvent(n.ProfileEventType.POST_MESSAGE,i)}}getMessageProfile(){return i(this,void 0,void 0,(function*(){const e=yield this.request(n.REQUEST_KEY_GET_PROFILE),t=this.profiler.getEvents();return a.profileMessages(t,e)}))}onChannelInit(){}getLogger(){return r.getLogger("parent-client",this.debug)}destroy(){this.messagePort&&this.messagePort.close()}}t.ParentClient=c},819:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getProfiler=void 0,t.getProfiler=e=>{const t=[];return{logEvent(s,i){e&&t.push({type:s,message:i,date:new Date})},getEvents:()=>t}}},416:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(n,r){function o(e){try{c(i.next(e))}catch(e){r(e)}}function a(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,a)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.SharedClient=void 0;const n=s(601),r=s(819),o=s(593);t.SharedClient=class{constructor({debug:e=!1,profile:t=!1,requestTimeout:s=n.REQUEST_TIMEOUT}={}){this.debug=e,this.profile=t,this.requestTimeout=s,this.channel=o.defer(),this.eventSubscriptions={},this.responseSubscriptions={},this.requestSubscriptions={},this.logger=this.getLogger(),this.profiler=r.getProfiler(t),this.channel.promise.then((()=>{this.logger.log("Secure parent <-> child channel established")}))}send(e,t){return i(this,void 0,void 0,(function*(){return this.postMessage(n.MessageType.EVENT,e,t)}))}on(e,t){this.eventSubscriptions[e]||(this.eventSubscriptions[e]={});const s=o.randomInsecureId(8);return this.eventSubscriptions[e][s]=t,this.logger.log(`Registered handler for event "${e}"`),()=>{this.eventSubscriptions[e]=o.omit(this.eventSubscriptions[e],s),this.logger.log("Unsubscribed handler for event "+e)}}request(e,t){return i(this,void 0,void 0,(function*(){const s=yield this.postMessage(n.MessageType.REQUEST,e,t),i=()=>{this.responseSubscriptions=o.omit(this.responseSubscriptions,s.id)};return new Promise(((e,t)=>{let n;this.responseSubscriptions[s.id]=(t,s)=>{clearTimeout(n),i(),e(t)},n=setTimeout((()=>{i(),t("Request timed out")}),this.requestTimeout)}))}))}onRequest(e,t){return this.requestSubscriptions[e]=(s,r)=>i(this,void 0,void 0,(function*(){const i=yield t(s,r);this.postMessage(n.MessageType.RESPONSE,e,i,r.id)})),()=>{this.requestSubscriptions=o.omit(this.requestSubscriptions,e)}}getContext(){return i(this,void 0,void 0,(function*(){const{context:e}=yield this.channel.promise;return e}))}messageListener(e){return i(this,void 0,void 0,(function*(){if(yield this.channel.promise,this.isValidMessage(e)){switch(e.data.type){case n.MessageType.EVENT:this.handleEvent(e);break;case n.MessageType.REQUEST:this.handleRequest(e);break;case n.MessageType.RESPONSE:this.handleResponse(e)}this.profiler.logEvent(n.ProfileEventType.RECEIVE_MESSAGE,e.data)}else this.logger.error("Invalid message format. Skipping.")}))}handleEvent(e){const t=e.data,s=this.eventSubscriptions[t.key];s&&Object.values(s).forEach((e=>e(t.data,t)))}handleRequest(e){const t=e.data,s=this.requestSubscriptions[t.key];s&&(s(t.data,t),this.logger.log("Handled request type "+t.key))}handleResponse(e){const t=e.data,s=t.requestId,i=s&&this.responseSubscriptions[s];i&&i(t.data,t)}postMessage(e,t,s,r){return i(this,void 0,void 0,(function*(){const{port:i}=yield this.channel.promise,a={type:e,apiVersion:n.MessageAPIVersion.v1,key:t,data:s,id:o.randomInsecureId(),requestId:r};return i.postMessage(a),this.profiler.logEvent(n.ProfileEventType.POST_MESSAGE,a),a}))}initListener(e){this.isInitMessage(e)?(this.profiler.logEvent(n.ProfileEventType.RECEIVE_MESSAGE,e.data),this.onChannelInit(e),this.messagePort&&(this.messagePort.onmessage=this.messageListener.bind(this)),this.resolveChannel(e)):this.logger.error("Invalid message format. Skipping.")}isValidMessage(e){const t=e.data;return t.type&&t.id&&t.apiVersion===n.MessageAPIVersion.v1}isInitMessage(e){return this.isValidMessage(e)&&e.data.type===n.MessageType.CHANNEL_INIT}resolveChannel(e){if(this.messagePort){const t={port:this.messagePort,origin:e.origin,context:e.data.data};this.channel.resolve(t)}}getInitMessage(e){return{type:n.MessageType.CHANNEL_INIT,apiVersion:n.MessageAPIVersion.v1,key:"",data:e,id:o.randomInsecureId()}}}},699:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},593:function(e,t,s){var i=this&&this.__rest||function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(s[i[n]]=e[i[n]])}return s};Object.defineProperty(t,"__esModule",{value:!0}),t.profileMessages=t.omit=t.randomInsecureId=t.defer=void 0;const n=s(601);t.defer=()=>{let e=()=>{},t=()=>{};const s=new Promise(((s,i)=>{e=s,t=i}));return{resolve:e,reject:t,promise:s}},t.randomInsecureId=(e=16)=>[...Array(e)].map((()=>(~~(36*Math.random())).toString(36))).join(""),t.omit=(e,t)=>{const s=e,n=t;return s[n],i(s,["symbol"==typeof n?n:n+""])},t.profileMessages=(e,t)=>{const s=((e,t)=>{const s={};return e.forEach((e=>{s[(e=>e.message.id)(e)]=e})),s})(e.concat(t).filter((e=>e.type===n.ProfileEventType.RECEIVE_MESSAGE))),i=[],r=({date:e,message:t})=>{const i={id:t.id,direction:n.TransactionDirection.DOWN,postTime:e,message:t},r=s[t.id];return r&&(i.receiveTime=r.date,i.duration=(r.date.getTime()-e.getTime())/1e3),i};return e.filter((e=>e.type===n.ProfileEventType.POST_MESSAGE)).forEach((e=>{const t=r(e);i.push(t)})),t.filter((e=>e.type===n.ProfileEventType.POST_MESSAGE)).forEach((e=>{const t=r(e);t.direction=n.TransactionDirection.UP,i.push(t)})),i.filter((e=>e.message.key!==n.REQUEST_KEY_GET_PROFILE)).sort(((e,t)=>e.postTime.getTime()-t.postTime.getTime()))}}},t={};return function s(i){if(t[i])return t[i].exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,s),n.exports}(607)})()}));
//# sourceMappingURL=framepost.min.js.map

/***/ }),

/***/ "./src/capabilites/capabilityManager.ts":
/*!**********************************************!*\
  !*** ./src/capabilites/capabilityManager.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapabilityManager = void 0;
const logger_1 = __webpack_require__(/*! ../logger */ "./src/logger.ts");
class CapabilityManager {
    constructor(options, framePostClient) {
        this.host = options.host;
        this.debug = options.debug;
        this.logger = logger_1.getLogger(options);
        this.framePostClient = framePostClient;
    }
    /**
     * Wraps additional methods in a check against the capability type, then applies to provided client object. Do not override
     */
    applyAdditionalMethods(client) {
        const additionalMethods = this.getAdditionalClientMethods();
        const wrappedMethods = {};
        Object.entries(additionalMethods).forEach(([key, method]) => {
            wrappedMethods[key] = (...args) => __awaiter(this, void 0, void 0, function* () {
                const isEnabled = yield this.isEnabled();
                if (isEnabled) {
                    return method(...args);
                }
                else {
                    this.logger.error(`The ${this.type} capability must be enabled to perform this action`);
                }
            });
        });
        Object.assign(client, wrappedMethods);
    }
    triggerEvent(eventType, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEnabled = yield this.isEnabled();
            if (isEnabled) {
                this.framePostClient.send(eventType, data);
            }
            else {
                this.logger.error(`The ${this.type} capability must be enabled to trigger events of type ${eventType}.`);
            }
        });
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const { capabilities } = yield this.framePostClient.getContext();
            return capabilities.includes(this.type);
        });
    }
}
exports.CapabilityManager = CapabilityManager;


/***/ }),

/***/ "./src/capabilites/index.ts":
/*!**********************************!*\
  !*** ./src/capabilites/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilityManagers = void 0;
const constants_1 = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const capabilityManager_1 = __webpack_require__(/*! ./capabilityManager */ "./src/capabilites/capabilityManager.ts");
class DashboardCogMenuManager extends capabilityManager_1.CapabilityManager {
    constructor() {
        super(...arguments);
        this.type = constants_1.UiAppCapabilityType.DASHBOARD_COG_MENU;
        this.eventsToSubscribe = [constants_1.UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT];
        this.eventsToTrigger = [];
    }
    getAdditionalClientMethods() {
        return {};
    }
}
class AppRoutingManager extends capabilityManager_1.CapabilityManager {
    constructor() {
        super(...arguments);
        this.type = constants_1.UiAppCapabilityType.APP_ROUTING;
        this.eventsToSubscribe = [];
        this.eventsToTrigger = [
            constants_1.UiAppEventToTriggerType.RELOAD_FRAME,
            constants_1.UiAppEventToTriggerType.OPEN_URL
        ];
    }
    getAdditionalClientMethods() {
        return {};
    }
}
class DashboardCustomWidgetManager extends capabilityManager_1.CapabilityManager {
    constructor() {
        super(...arguments);
        this.type = constants_1.UiAppCapabilityType.DASHBOARD_CUSTOM_WIDGET;
        this.eventsToSubscribe = [];
        this.eventsToTrigger = [];
    }
    getAdditionalClientMethods() {
        return {};
    }
}
exports.capabilityManagers = [
    DashboardCogMenuManager,
    AppRoutingManager,
    DashboardCustomWidgetManager
];


/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDClient = void 0;
const framepost_1 = __webpack_require__(/*! @datadog/framepost */ "./node_modules/@datadog/framepost/dist/framepost.min.js");
const capabilites_1 = __webpack_require__(/*! ./capabilites */ "./src/capabilites/index.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const DEFAULT_OPTIONS = {
    host: constants_1.Host.STAGE,
    debug: false
};
class DDClient {
    constructor(options = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;
        this.framePostClient = new framepost_1.ChildClient({
            debug: this.debug,
            profile: this.debug,
            context: {
                sdkVersion: constants_1.SDK_VERSION
            }
        });
        this.logger = logger_1.getLogger(options);
        this.capabilityManagers = capabilites_1.capabilityManagers.map(Manager => new Manager({
            host: this.host,
            debug: this.debug
        }, this.framePostClient));
        this.capabilityManagers.forEach(manager => manager.applyAdditionalMethods(this));
    }
    /**
     * Adds event handler to execute on a certain event type from the parent. Will print
     * an error if the installed app does not have the required capability. Returns an unsubscribe
     * method. This method can be called before handshake is successful, but handlers will not execute until
     * after successsful handshake.
     */
    on(eventType, handler) {
        const manager = this.getManagerByEventToSubscribeType(eventType);
        if (!manager) {
            this.logger.error('Unknown event type');
            return () => { };
        }
        const wrappedHandler = (...args) => __awaiter(this, void 0, void 0, function* () {
            const isEnabled = yield manager.isEnabled();
            if (isEnabled) {
                handler(...args);
            }
            else {
                this.logger.error(`The ${manager.type} capability must be enabled to respond to events of type ${eventType}.`);
            }
        });
        return this.framePostClient.on(eventType, wrappedHandler);
    }
    /**
     * Triggers an event type to be handled in the parent. Will print
     * an error if the installed app does not have the required capability.
     * This method can be called before handshake is successful, but handlers will not execute until
     * after successsful handshake.
     */
    triggerEvent(eventType, data = {}) {
        const manager = this.getManagerByEventToTriggerType(eventType);
        if (!manager) {
            this.logger.error('Unknown event type');
        }
        else {
            manager.triggerEvent(eventType, data);
        }
    }
    /**
     * Returns app context data, after it is sent from the parent
     */
    getContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.framePostClient.getContext();
        });
    }
    getManagerByType(capabilityType) {
        return this.capabilityManagers.find(manager => manager.type === capabilityType);
    }
    getManagerByEventToSubscribeType(eventType) {
        return this.capabilityManagers.find(manager => manager.eventsToSubscribe.includes(eventType));
    }
    getManagerByEventToTriggerType(eventType) {
        return this.capabilityManagers.find(manager => manager.eventsToTrigger.includes(eventType));
    }
}
exports.DDClient = DDClient;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK_VERSION = exports.UiAppEventToTriggerType = exports.UiAppEventToSubscribeType = exports.UiAppCapabilityType = exports.Host = void 0;
var Host;
(function (Host) {
    Host["PROD"] = "https://app.datadoghq.com/";
    Host["STAGE"] = "https://dd.datad0g.com/";
})(Host = exports.Host || (exports.Host = {}));
var UiAppCapabilityType;
(function (UiAppCapabilityType) {
    UiAppCapabilityType["APP_CONTEXT"] = "app_context";
    UiAppCapabilityType["DASHBOARD_COG_MENU"] = "dashboard_cog_menu";
    UiAppCapabilityType["DASHBOARD_CUSTOM_WIDGET"] = "dashboard_custom_widget";
    UiAppCapabilityType["APP_ROUTING"] = "app_routing";
})(UiAppCapabilityType = exports.UiAppCapabilityType || (exports.UiAppCapabilityType = {}));
var UiAppEventToSubscribeType;
(function (UiAppEventToSubscribeType) {
    UiAppEventToSubscribeType["DASHBOARD_COG_MENU_CONTEXT"] = "dashboard_cog_menu_context";
})(UiAppEventToSubscribeType = exports.UiAppEventToSubscribeType || (exports.UiAppEventToSubscribeType = {}));
var UiAppEventToTriggerType;
(function (UiAppEventToTriggerType) {
    UiAppEventToTriggerType["RELOAD_FRAME"] = "reload_frame";
    UiAppEventToTriggerType["OPEN_URL"] = "open_url";
})(UiAppEventToTriggerType = exports.UiAppEventToTriggerType || (exports.UiAppEventToTriggerType = {}));
exports.SDK_VERSION = '0.1.0';


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const client_1 = __webpack_require__(/*! ./client */ "./src/client.ts");
let client;
/**
 * Initializes a client, or returns an existing one if already initialized. User can provide an optional
 * callback to be executed with app context data when it is sent from the parent.
 */
exports.init = (options, callback) => {
    if (!client) {
        client = new client_1.DDClient(options);
    }
    if (callback) {
        client.getContext().then(callback);
    }
    return client;
};


/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
exports.getLogger = (options) => {
    if (options.debug) {
        return {
            log(message) {
                return console.log(`dd-apps: ${message}`);
            },
            error(message) {
                return console.error(`dd-apps: ${message}`);
            }
        };
    }
    else {
        return {
            log() { },
            error() { }
        };
    }
};


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERF9TREsvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0REX1NESy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ERF9TREsvLi9ub2RlX21vZHVsZXMvQGRhdGFkb2cvZnJhbWVwb3N0L2Rpc3QvZnJhbWVwb3N0Lm1pbi5qcyIsIndlYnBhY2s6Ly9ERF9TREsvLi9zcmMvY2FwYWJpbGl0ZXMvY2FwYWJpbGl0eU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2NhcGFiaWxpdGVzL2luZGV4LnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ERF9TREsvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFB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QUMsQ0FBQztZQUM5QyxDQUFDO1lBQ0QsS0FBSyxDQUFDLE9BQWU7Z0JBQ2pCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDaEQsQ0FBQztTQUNKLENBQUM7S0FDTDtTQUFNO1FBQ0gsT0FBTztZQUNILEdBQUcsS0FBSSxDQUFDO1lBQ1IsS0FBSyxLQUFJLENBQUM7U0FDYixDQUFDO0tBQ0w7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkREX1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJERF9TREtcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5mcmFtZXBvc3Q9dCgpOmUuZnJhbWVwb3N0PXQoKX0oc2VsZiwoZnVuY3Rpb24oKXtyZXR1cm4oKCk9PntcInVzZSBzdHJpY3RcIjt2YXIgZT17NTczOihlLHQscyk9PntPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LkNoaWxkQ2xpZW50PXZvaWQgMDtjb25zdCBpPXMoNjAxKSxuPXMoNDczKSxyPXMoNDE2KTtjbGFzcyBvIGV4dGVuZHMgci5TaGFyZWRDbGllbnR7Y29uc3RydWN0b3IoZT17fSl7c3VwZXIoZSksdGhpcy5jb250ZXh0PWUuY29udGV4dHx8bnVsbCx0aGlzLmluaXRMaXN0ZW5lcj10aGlzLmluaXRMaXN0ZW5lci5iaW5kKHRoaXMpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLHRoaXMuaW5pdExpc3RlbmVyKSx0aGlzLnByb2ZpbGUmJnRoaXMub25SZXF1ZXN0KGkuUkVRVUVTVF9LRVlfR0VUX1BST0ZJTEUsKCgpPT50aGlzLnByb2ZpbGVyLmdldEV2ZW50cygpKSl9Z2V0TG9nZ2VyKCl7cmV0dXJuIG4uZ2V0TG9nZ2VyKFwiY2hpbGQtY2xpZW50XCIsdGhpcy5kZWJ1Zyl9b25DaGFubmVsSW5pdChlKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix0aGlzLmluaXRMaXN0ZW5lciksdGhpcy5tZXNzYWdlUG9ydD1lLnBvcnRzWzBdO2NvbnN0IHQ9dGhpcy5nZXRJbml0TWVzc2FnZSh0aGlzLmNvbnRleHQpO3RoaXMubWVzc2FnZVBvcnQucG9zdE1lc3NhZ2UodCksdGhpcy5wcm9maWxlci5sb2dFdmVudChpLlByb2ZpbGVFdmVudFR5cGUuUE9TVF9NRVNTQUdFLHQpfWRlc3Ryb3koKXt0aGlzLm1lc3NhZ2VQb3J0JiZ0aGlzLm1lc3NhZ2VQb3J0LmNsb3NlKCksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsdGhpcy5pbml0TGlzdGVuZXIpfX10LkNoaWxkQ2xpZW50PW99LDYwMTooZSx0KT0+e3ZhciBzLGksbjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LlJFUVVFU1RfS0VZX0dFVF9QUk9GSUxFPXQuUkVRVUVTVF9USU1FT1VUPXQuVHJhbnNhY3Rpb25EaXJlY3Rpb249dC5Qcm9maWxlRXZlbnRUeXBlPXQuTWVzc2FnZUFQSVZlcnNpb249dC5NZXNzYWdlVHlwZT12b2lkIDAsKG49dC5NZXNzYWdlVHlwZXx8KHQuTWVzc2FnZVR5cGU9e30pKS5DSEFOTkVMX0lOSVQ9XCJjaGFubmVsX2luaXRcIixuLkVWRU5UPVwiZXZlbnRcIixuLlJFUVVFU1Q9XCJyZXF1ZXN0XCIsbi5SRVNQT05TRT1cInJlc3BvbnNlXCIsKHQuTWVzc2FnZUFQSVZlcnNpb258fCh0Lk1lc3NhZ2VBUElWZXJzaW9uPXt9KSkudjE9XCJmcmFtZXBvc3QvdjFcIiwoaT10LlByb2ZpbGVFdmVudFR5cGV8fCh0LlByb2ZpbGVFdmVudFR5cGU9e30pKS5QT1NUX01FU1NBR0U9XCJwb3N0X21lc3NhZ2VcIixpLlJFQ0VJVkVfTUVTU0FHRT1cInJlY2VpdmVfbWVzc2FnZVwiLChzPXQuVHJhbnNhY3Rpb25EaXJlY3Rpb258fCh0LlRyYW5zYWN0aW9uRGlyZWN0aW9uPXt9KSkuVVA9XCJ1cFwiLHMuRE9XTj1cImRvd25cIix0LlJFUVVFU1RfVElNRU9VVD0xZTQsdC5SRVFVRVNUX0tFWV9HRVRfUFJPRklMRT1cImZyYW1lcG9zdF9nZXRfcHJvZmlsZVwifSw2MDc6ZnVuY3Rpb24oZSx0LHMpe3ZhciBpPXRoaXMmJnRoaXMuX19jcmVhdGVCaW5kaW5nfHwoT2JqZWN0LmNyZWF0ZT9mdW5jdGlvbihlLHQscyxpKXt2b2lkIDA9PT1pJiYoaT1zKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxpLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0W3NdfX0pfTpmdW5jdGlvbihlLHQscyxpKXt2b2lkIDA9PT1pJiYoaT1zKSxlW2ldPXRbc119KSxuPXRoaXMmJnRoaXMuX19leHBvcnRTdGFyfHxmdW5jdGlvbihlLHQpe2Zvcih2YXIgcyBpbiBlKVwiZGVmYXVsdFwiPT09c3x8T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQscyl8fGkodCxlLHMpfTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LlBhcmVudENsaWVudD10LkNoaWxkQ2xpZW50PXZvaWQgMDt2YXIgcj1zKDU3Myk7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJDaGlsZENsaWVudFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiByLkNoaWxkQ2xpZW50fX0pO3ZhciBvPXMoMTY2KTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIlBhcmVudENsaWVudFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBvLlBhcmVudENsaWVudH19KSxuKHMoNjk5KSx0KX0sNDczOihlLHQpPT57T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5nZXRMb2dnZXI9dm9pZCAwLHQuZ2V0TG9nZ2VyPShlLHQpPT50P3tsb2c6dD0+Y29uc29sZS5sb2coYCR7ZX06ICR7dH1gKSxlcnJvcjp0PT5jb25zb2xlLmVycm9yKGAke2V9OiAke3R9YCl9Ontsb2coKXt9LGVycm9yKCl7fX19LDE2NjpmdW5jdGlvbihlLHQscyl7dmFyIGk9dGhpcyYmdGhpcy5fX2F3YWl0ZXJ8fGZ1bmN0aW9uKGUsdCxzLGkpe3JldHVybiBuZXcoc3x8KHM9UHJvbWlzZSkpKChmdW5jdGlvbihuLHIpe2Z1bmN0aW9uIG8oZSl7dHJ5e2MoaS5uZXh0KGUpKX1jYXRjaChlKXtyKGUpfX1mdW5jdGlvbiBhKGUpe3RyeXtjKGkudGhyb3coZSkpfWNhdGNoKGUpe3IoZSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHQ7ZS5kb25lP24oZS52YWx1ZSk6KHQ9ZS52YWx1ZSx0IGluc3RhbmNlb2Ygcz90Om5ldyBzKChmdW5jdGlvbihlKXtlKHQpfSkpKS50aGVuKG8sYSl9YygoaT1pLmFwcGx5KGUsdHx8W10pKS5uZXh0KCkpfSkpfTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LlBhcmVudENsaWVudD12b2lkIDA7Y29uc3Qgbj1zKDYwMSkscj1zKDQ3Myksbz1zKDQxNiksYT1zKDU5Myk7Y2xhc3MgYyBleHRlbmRzIG8uU2hhcmVkQ2xpZW50e2NvbnN0cnVjdG9yKGU9e30pe3N1cGVyKGUpfXJlcXVlc3RDaGFubmVsKGUsdCl7aWYodGhpcy51cmw9bmV3IFVSTChlLnNyYyksZS5jb250ZW50V2luZG93KXtjb25zdCBzPW5ldyBNZXNzYWdlQ2hhbm5lbDt0aGlzLm1lc3NhZ2VQb3J0PXMucG9ydDE7Y29uc3QgaT10aGlzLmdldEluaXRNZXNzYWdlKHQpO3RoaXMubWVzc2FnZVBvcnQub25tZXNzYWdlPXRoaXMuaW5pdExpc3RlbmVyLmJpbmQodGhpcyksZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKGksdGhpcy51cmwub3JpZ2luLFtzLnBvcnQyXSksdGhpcy5wcm9maWxlci5sb2dFdmVudChuLlByb2ZpbGVFdmVudFR5cGUuUE9TVF9NRVNTQUdFLGkpfX1nZXRNZXNzYWdlUHJvZmlsZSgpe3JldHVybiBpKHRoaXMsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24qKCl7Y29uc3QgZT15aWVsZCB0aGlzLnJlcXVlc3Qobi5SRVFVRVNUX0tFWV9HRVRfUFJPRklMRSksdD10aGlzLnByb2ZpbGVyLmdldEV2ZW50cygpO3JldHVybiBhLnByb2ZpbGVNZXNzYWdlcyh0LGUpfSkpfW9uQ2hhbm5lbEluaXQoKXt9Z2V0TG9nZ2VyKCl7cmV0dXJuIHIuZ2V0TG9nZ2VyKFwicGFyZW50LWNsaWVudFwiLHRoaXMuZGVidWcpfWRlc3Ryb3koKXt0aGlzLm1lc3NhZ2VQb3J0JiZ0aGlzLm1lc3NhZ2VQb3J0LmNsb3NlKCl9fXQuUGFyZW50Q2xpZW50PWN9LDgxOTooZSx0KT0+e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0UHJvZmlsZXI9dm9pZCAwLHQuZ2V0UHJvZmlsZXI9ZT0+e2NvbnN0IHQ9W107cmV0dXJue2xvZ0V2ZW50KHMsaSl7ZSYmdC5wdXNoKHt0eXBlOnMsbWVzc2FnZTppLGRhdGU6bmV3IERhdGV9KX0sZ2V0RXZlbnRzOigpPT50fX19LDQxNjpmdW5jdGlvbihlLHQscyl7dmFyIGk9dGhpcyYmdGhpcy5fX2F3YWl0ZXJ8fGZ1bmN0aW9uKGUsdCxzLGkpe3JldHVybiBuZXcoc3x8KHM9UHJvbWlzZSkpKChmdW5jdGlvbihuLHIpe2Z1bmN0aW9uIG8oZSl7dHJ5e2MoaS5uZXh0KGUpKX1jYXRjaChlKXtyKGUpfX1mdW5jdGlvbiBhKGUpe3RyeXtjKGkudGhyb3coZSkpfWNhdGNoKGUpe3IoZSl9fWZ1bmN0aW9uIGMoZSl7dmFyIHQ7ZS5kb25lP24oZS52YWx1ZSk6KHQ9ZS52YWx1ZSx0IGluc3RhbmNlb2Ygcz90Om5ldyBzKChmdW5jdGlvbihlKXtlKHQpfSkpKS50aGVuKG8sYSl9YygoaT1pLmFwcGx5KGUsdHx8W10pKS5uZXh0KCkpfSkpfTtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LlNoYXJlZENsaWVudD12b2lkIDA7Y29uc3Qgbj1zKDYwMSkscj1zKDgxOSksbz1zKDU5Myk7dC5TaGFyZWRDbGllbnQ9Y2xhc3N7Y29uc3RydWN0b3Ioe2RlYnVnOmU9ITEscHJvZmlsZTp0PSExLHJlcXVlc3RUaW1lb3V0OnM9bi5SRVFVRVNUX1RJTUVPVVR9PXt9KXt0aGlzLmRlYnVnPWUsdGhpcy5wcm9maWxlPXQsdGhpcy5yZXF1ZXN0VGltZW91dD1zLHRoaXMuY2hhbm5lbD1vLmRlZmVyKCksdGhpcy5ldmVudFN1YnNjcmlwdGlvbnM9e30sdGhpcy5yZXNwb25zZVN1YnNjcmlwdGlvbnM9e30sdGhpcy5yZXF1ZXN0U3Vic2NyaXB0aW9ucz17fSx0aGlzLmxvZ2dlcj10aGlzLmdldExvZ2dlcigpLHRoaXMucHJvZmlsZXI9ci5nZXRQcm9maWxlcih0KSx0aGlzLmNoYW5uZWwucHJvbWlzZS50aGVuKCgoKT0+e3RoaXMubG9nZ2VyLmxvZyhcIlNlY3VyZSBwYXJlbnQgPC0+IGNoaWxkIGNoYW5uZWwgZXN0YWJsaXNoZWRcIil9KSl9c2VuZChlLHQpe3JldHVybiBpKHRoaXMsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24qKCl7cmV0dXJuIHRoaXMucG9zdE1lc3NhZ2Uobi5NZXNzYWdlVHlwZS5FVkVOVCxlLHQpfSkpfW9uKGUsdCl7dGhpcy5ldmVudFN1YnNjcmlwdGlvbnNbZV18fCh0aGlzLmV2ZW50U3Vic2NyaXB0aW9uc1tlXT17fSk7Y29uc3Qgcz1vLnJhbmRvbUluc2VjdXJlSWQoOCk7cmV0dXJuIHRoaXMuZXZlbnRTdWJzY3JpcHRpb25zW2VdW3NdPXQsdGhpcy5sb2dnZXIubG9nKGBSZWdpc3RlcmVkIGhhbmRsZXIgZm9yIGV2ZW50IFwiJHtlfVwiYCksKCk9Pnt0aGlzLmV2ZW50U3Vic2NyaXB0aW9uc1tlXT1vLm9taXQodGhpcy5ldmVudFN1YnNjcmlwdGlvbnNbZV0scyksdGhpcy5sb2dnZXIubG9nKFwiVW5zdWJzY3JpYmVkIGhhbmRsZXIgZm9yIGV2ZW50IFwiK2UpfX1yZXF1ZXN0KGUsdCl7cmV0dXJuIGkodGhpcyx2b2lkIDAsdm9pZCAwLChmdW5jdGlvbiooKXtjb25zdCBzPXlpZWxkIHRoaXMucG9zdE1lc3NhZ2Uobi5NZXNzYWdlVHlwZS5SRVFVRVNULGUsdCksaT0oKT0+e3RoaXMucmVzcG9uc2VTdWJzY3JpcHRpb25zPW8ub21pdCh0aGlzLnJlc3BvbnNlU3Vic2NyaXB0aW9ucyxzLmlkKX07cmV0dXJuIG5ldyBQcm9taXNlKCgoZSx0KT0+e2xldCBuO3RoaXMucmVzcG9uc2VTdWJzY3JpcHRpb25zW3MuaWRdPSh0LHMpPT57Y2xlYXJUaW1lb3V0KG4pLGkoKSxlKHQpfSxuPXNldFRpbWVvdXQoKCgpPT57aSgpLHQoXCJSZXF1ZXN0IHRpbWVkIG91dFwiKX0pLHRoaXMucmVxdWVzdFRpbWVvdXQpfSkpfSkpfW9uUmVxdWVzdChlLHQpe3JldHVybiB0aGlzLnJlcXVlc3RTdWJzY3JpcHRpb25zW2VdPShzLHIpPT5pKHRoaXMsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24qKCl7Y29uc3QgaT15aWVsZCB0KHMscik7dGhpcy5wb3N0TWVzc2FnZShuLk1lc3NhZ2VUeXBlLlJFU1BPTlNFLGUsaSxyLmlkKX0pKSwoKT0+e3RoaXMucmVxdWVzdFN1YnNjcmlwdGlvbnM9by5vbWl0KHRoaXMucmVxdWVzdFN1YnNjcmlwdGlvbnMsZSl9fWdldENvbnRleHQoKXtyZXR1cm4gaSh0aGlzLHZvaWQgMCx2b2lkIDAsKGZ1bmN0aW9uKigpe2NvbnN0e2NvbnRleHQ6ZX09eWllbGQgdGhpcy5jaGFubmVsLnByb21pc2U7cmV0dXJuIGV9KSl9bWVzc2FnZUxpc3RlbmVyKGUpe3JldHVybiBpKHRoaXMsdm9pZCAwLHZvaWQgMCwoZnVuY3Rpb24qKCl7aWYoeWllbGQgdGhpcy5jaGFubmVsLnByb21pc2UsdGhpcy5pc1ZhbGlkTWVzc2FnZShlKSl7c3dpdGNoKGUuZGF0YS50eXBlKXtjYXNlIG4uTWVzc2FnZVR5cGUuRVZFTlQ6dGhpcy5oYW5kbGVFdmVudChlKTticmVhaztjYXNlIG4uTWVzc2FnZVR5cGUuUkVRVUVTVDp0aGlzLmhhbmRsZVJlcXVlc3QoZSk7YnJlYWs7Y2FzZSBuLk1lc3NhZ2VUeXBlLlJFU1BPTlNFOnRoaXMuaGFuZGxlUmVzcG9uc2UoZSl9dGhpcy5wcm9maWxlci5sb2dFdmVudChuLlByb2ZpbGVFdmVudFR5cGUuUkVDRUlWRV9NRVNTQUdFLGUuZGF0YSl9ZWxzZSB0aGlzLmxvZ2dlci5lcnJvcihcIkludmFsaWQgbWVzc2FnZSBmb3JtYXQuIFNraXBwaW5nLlwiKX0pKX1oYW5kbGVFdmVudChlKXtjb25zdCB0PWUuZGF0YSxzPXRoaXMuZXZlbnRTdWJzY3JpcHRpb25zW3Qua2V5XTtzJiZPYmplY3QudmFsdWVzKHMpLmZvckVhY2goKGU9PmUodC5kYXRhLHQpKSl9aGFuZGxlUmVxdWVzdChlKXtjb25zdCB0PWUuZGF0YSxzPXRoaXMucmVxdWVzdFN1YnNjcmlwdGlvbnNbdC5rZXldO3MmJihzKHQuZGF0YSx0KSx0aGlzLmxvZ2dlci5sb2coXCJIYW5kbGVkIHJlcXVlc3QgdHlwZSBcIit0LmtleSkpfWhhbmRsZVJlc3BvbnNlKGUpe2NvbnN0IHQ9ZS5kYXRhLHM9dC5yZXF1ZXN0SWQsaT1zJiZ0aGlzLnJlc3BvbnNlU3Vic2NyaXB0aW9uc1tzXTtpJiZpKHQuZGF0YSx0KX1wb3N0TWVzc2FnZShlLHQscyxyKXtyZXR1cm4gaSh0aGlzLHZvaWQgMCx2b2lkIDAsKGZ1bmN0aW9uKigpe2NvbnN0e3BvcnQ6aX09eWllbGQgdGhpcy5jaGFubmVsLnByb21pc2UsYT17dHlwZTplLGFwaVZlcnNpb246bi5NZXNzYWdlQVBJVmVyc2lvbi52MSxrZXk6dCxkYXRhOnMsaWQ6by5yYW5kb21JbnNlY3VyZUlkKCkscmVxdWVzdElkOnJ9O3JldHVybiBpLnBvc3RNZXNzYWdlKGEpLHRoaXMucHJvZmlsZXIubG9nRXZlbnQobi5Qcm9maWxlRXZlbnRUeXBlLlBPU1RfTUVTU0FHRSxhKSxhfSkpfWluaXRMaXN0ZW5lcihlKXt0aGlzLmlzSW5pdE1lc3NhZ2UoZSk/KHRoaXMucHJvZmlsZXIubG9nRXZlbnQobi5Qcm9maWxlRXZlbnRUeXBlLlJFQ0VJVkVfTUVTU0FHRSxlLmRhdGEpLHRoaXMub25DaGFubmVsSW5pdChlKSx0aGlzLm1lc3NhZ2VQb3J0JiYodGhpcy5tZXNzYWdlUG9ydC5vbm1lc3NhZ2U9dGhpcy5tZXNzYWdlTGlzdGVuZXIuYmluZCh0aGlzKSksdGhpcy5yZXNvbHZlQ2hhbm5lbChlKSk6dGhpcy5sb2dnZXIuZXJyb3IoXCJJbnZhbGlkIG1lc3NhZ2UgZm9ybWF0LiBTa2lwcGluZy5cIil9aXNWYWxpZE1lc3NhZ2UoZSl7Y29uc3QgdD1lLmRhdGE7cmV0dXJuIHQudHlwZSYmdC5pZCYmdC5hcGlWZXJzaW9uPT09bi5NZXNzYWdlQVBJVmVyc2lvbi52MX1pc0luaXRNZXNzYWdlKGUpe3JldHVybiB0aGlzLmlzVmFsaWRNZXNzYWdlKGUpJiZlLmRhdGEudHlwZT09PW4uTWVzc2FnZVR5cGUuQ0hBTk5FTF9JTklUfXJlc29sdmVDaGFubmVsKGUpe2lmKHRoaXMubWVzc2FnZVBvcnQpe2NvbnN0IHQ9e3BvcnQ6dGhpcy5tZXNzYWdlUG9ydCxvcmlnaW46ZS5vcmlnaW4sY29udGV4dDplLmRhdGEuZGF0YX07dGhpcy5jaGFubmVsLnJlc29sdmUodCl9fWdldEluaXRNZXNzYWdlKGUpe3JldHVybnt0eXBlOm4uTWVzc2FnZVR5cGUuQ0hBTk5FTF9JTklULGFwaVZlcnNpb246bi5NZXNzYWdlQVBJVmVyc2lvbi52MSxrZXk6XCJcIixkYXRhOmUsaWQ6by5yYW5kb21JbnNlY3VyZUlkKCl9fX19LDY5OTooZSx0KT0+e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSw1OTM6ZnVuY3Rpb24oZSx0LHMpe3ZhciBpPXRoaXMmJnRoaXMuX19yZXN0fHxmdW5jdGlvbihlLHQpe3ZhciBzPXt9O2Zvcih2YXIgaSBpbiBlKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLGkpJiZ0LmluZGV4T2YoaSk8MCYmKHNbaV09ZVtpXSk7aWYobnVsbCE9ZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyl7dmFyIG49MDtmb3IoaT1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpO248aS5sZW5ndGg7bisrKXQuaW5kZXhPZihpW25dKTwwJiZPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoZSxpW25dKSYmKHNbaVtuXV09ZVtpW25dXSl9cmV0dXJuIHN9O09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQucHJvZmlsZU1lc3NhZ2VzPXQub21pdD10LnJhbmRvbUluc2VjdXJlSWQ9dC5kZWZlcj12b2lkIDA7Y29uc3Qgbj1zKDYwMSk7dC5kZWZlcj0oKT0+e2xldCBlPSgpPT57fSx0PSgpPT57fTtjb25zdCBzPW5ldyBQcm9taXNlKCgocyxpKT0+e2U9cyx0PWl9KSk7cmV0dXJue3Jlc29sdmU6ZSxyZWplY3Q6dCxwcm9taXNlOnN9fSx0LnJhbmRvbUluc2VjdXJlSWQ9KGU9MTYpPT5bLi4uQXJyYXkoZSldLm1hcCgoKCk9Pih+figzNipNYXRoLnJhbmRvbSgpKSkudG9TdHJpbmcoMzYpKSkuam9pbihcIlwiKSx0Lm9taXQ9KGUsdCk9Pntjb25zdCBzPWUsbj10O3JldHVybiBzW25dLGkocyxbXCJzeW1ib2xcIj09dHlwZW9mIG4/bjpuK1wiXCJdKX0sdC5wcm9maWxlTWVzc2FnZXM9KGUsdCk9Pntjb25zdCBzPSgoZSx0KT0+e2NvbnN0IHM9e307cmV0dXJuIGUuZm9yRWFjaCgoZT0+e3NbKGU9PmUubWVzc2FnZS5pZCkoZSldPWV9KSksc30pKGUuY29uY2F0KHQpLmZpbHRlcigoZT0+ZS50eXBlPT09bi5Qcm9maWxlRXZlbnRUeXBlLlJFQ0VJVkVfTUVTU0FHRSkpKSxpPVtdLHI9KHtkYXRlOmUsbWVzc2FnZTp0fSk9Pntjb25zdCBpPXtpZDp0LmlkLGRpcmVjdGlvbjpuLlRyYW5zYWN0aW9uRGlyZWN0aW9uLkRPV04scG9zdFRpbWU6ZSxtZXNzYWdlOnR9LHI9c1t0LmlkXTtyZXR1cm4gciYmKGkucmVjZWl2ZVRpbWU9ci5kYXRlLGkuZHVyYXRpb249KHIuZGF0ZS5nZXRUaW1lKCktZS5nZXRUaW1lKCkpLzFlMyksaX07cmV0dXJuIGUuZmlsdGVyKChlPT5lLnR5cGU9PT1uLlByb2ZpbGVFdmVudFR5cGUuUE9TVF9NRVNTQUdFKSkuZm9yRWFjaCgoZT0+e2NvbnN0IHQ9cihlKTtpLnB1c2godCl9KSksdC5maWx0ZXIoKGU9PmUudHlwZT09PW4uUHJvZmlsZUV2ZW50VHlwZS5QT1NUX01FU1NBR0UpKS5mb3JFYWNoKChlPT57Y29uc3QgdD1yKGUpO3QuZGlyZWN0aW9uPW4uVHJhbnNhY3Rpb25EaXJlY3Rpb24uVVAsaS5wdXNoKHQpfSkpLGkuZmlsdGVyKChlPT5lLm1lc3NhZ2Uua2V5IT09bi5SRVFVRVNUX0tFWV9HRVRfUFJPRklMRSkpLnNvcnQoKChlLHQpPT5lLnBvc3RUaW1lLmdldFRpbWUoKS10LnBvc3RUaW1lLmdldFRpbWUoKSkpfX19LHQ9e307cmV0dXJuIGZ1bmN0aW9uIHMoaSl7aWYodFtpXSlyZXR1cm4gdFtpXS5leHBvcnRzO3ZhciBuPXRbaV09e2V4cG9ydHM6e319O3JldHVybiBlW2ldLmNhbGwobi5leHBvcnRzLG4sbi5leHBvcnRzLHMpLG4uZXhwb3J0c30oNjA3KX0pKCl9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcmFtZXBvc3QubWluLmpzLm1hcCIsImltcG9ydCB0eXBlIHsgQ2hpbGRDbGllbnQgfSBmcm9tICdAZGF0YWRvZy9mcmFtZXBvc3QnO1xuXG5pbXBvcnQgdHlwZSB7IEREQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7XG4gICAgVWlBcHBDYXBhYmlsaXR5VHlwZSxcbiAgICBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlLFxuICAgIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRMb2dnZXIsIExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBBcHBDb250ZXh0LCBDbGllbnRPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIGFic3RyYWN0IHR5cGU6IFVpQXBwQ2FwYWJpbGl0eVR5cGU7XG4gICAgYWJzdHJhY3QgZXZlbnRzVG9TdWJzY3JpYmU6IFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGVbXTtcbiAgICBhYnN0cmFjdCBldmVudHNUb1RyaWdnZXI6IFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlW107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaG9zdDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGZyYW1lUG9zdENsaWVudDogQ2hpbGRDbGllbnQ8QXBwQ29udGV4dD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3B0aW9uczogUmVxdWlyZWQ8Q2xpZW50T3B0aW9ucz4sXG4gICAgICAgIGZyYW1lUG9zdENsaWVudDogQ2hpbGRDbGllbnQ8QXBwQ29udGV4dD5cbiAgICApIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0O1xuICAgICAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZztcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZnJhbWVQb3N0Q2xpZW50ID0gZnJhbWVQb3N0Q2xpZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcGxhY2UgZm9yIGV2ZW50dWFsIGV4dGVuc2lvbnMgb2YgdGhlIGJhc2UgY2xpZW50IG1ldGhvZHMsIHNwZWNpZmljIHRvIGEgY2FwYWJpbGl0eVxuICAgICAqIEV4YW1wbGU6XG4gICAgICogcHJpdmF0ZSBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbiB9IHtcbiAgICAgKiAgIHJldHVybiAge1xuICAgICAqICAgICBnZXRUaW1lU2VyaWVzOiAoKSA9PiB0aGlzLmdldFRpbWVTZXJpZXMoKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGFkZGl0aW9uYWwgbWV0aG9kcyBpbiBhIGNoZWNrIGFnYWluc3QgdGhlIGNhcGFiaWxpdHkgdHlwZSwgdGhlbiBhcHBsaWVzIHRvIHByb3ZpZGVkIGNsaWVudCBvYmplY3QuIERvIG5vdCBvdmVycmlkZVxuICAgICAqL1xuICAgIGFwcGx5QWRkaXRpb25hbE1ldGhvZHMoY2xpZW50OiBERENsaWVudCkge1xuICAgICAgICBjb25zdCBhZGRpdGlvbmFsTWV0aG9kcyA9IHRoaXMuZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTtcblxuICAgICAgICBjb25zdCB3cmFwcGVkTWV0aG9kczogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfSA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGFkZGl0aW9uYWxNZXRob2RzKS5mb3JFYWNoKChba2V5LCBtZXRob2RdKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkTWV0aG9kc1trZXldID0gYXN5bmMgKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgdGhpcy5pc0VuYWJsZWQoKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZCguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBUaGUgJHt0aGlzLnR5cGV9IGNhcGFiaWxpdHkgbXVzdCBiZSBlbmFibGVkIHRvIHBlcmZvcm0gdGhpcyBhY3Rpb25gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihjbGllbnQsIHdyYXBwZWRNZXRob2RzKTtcbiAgICB9XG5cbiAgICBhc3luYyB0cmlnZ2VyRXZlbnQoZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZSwgZGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IGF3YWl0IHRoaXMuaXNFbmFibGVkKCk7XG5cbiAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVBvc3RDbGllbnQuc2VuZChldmVudFR5cGUsIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgICAgYFRoZSAke3RoaXMudHlwZX0gY2FwYWJpbGl0eSBtdXN0IGJlIGVuYWJsZWQgdG8gdHJpZ2dlciBldmVudHMgb2YgdHlwZSAke2V2ZW50VHlwZX0uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlzRW5hYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgeyBjYXBhYmlsaXRpZXMgfSA9IGF3YWl0IHRoaXMuZnJhbWVQb3N0Q2xpZW50LmdldENvbnRleHQoKTtcblxuICAgICAgICByZXR1cm4gY2FwYWJpbGl0aWVzLmluY2x1ZGVzKHRoaXMudHlwZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBVaUFwcENhcGFiaWxpdHlUeXBlLFxuICAgIFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUsXG4gICAgVWlBcHBFdmVudFRvVHJpZ2dlclR5cGVcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcblxuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tICcuL2NhcGFiaWxpdHlNYW5hZ2VyJztcblxuZXhwb3J0IHR5cGUgeyBDYXBhYmlsaXR5TWFuYWdlciB9IGZyb20gJy4vY2FwYWJpbGl0eU1hbmFnZXInO1xuXG5jbGFzcyBEYXNoYm9hcmRDb2dNZW51TWFuYWdlciBleHRlbmRzIENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgICB0eXBlID0gVWlBcHBDYXBhYmlsaXR5VHlwZS5EQVNIQk9BUkRfQ09HX01FTlU7XG4gICAgZXZlbnRzVG9TdWJzY3JpYmUgPSBbVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZS5EQVNIQk9BUkRfQ09HX01FTlVfQ09OVEVYVF07XG4gICAgZXZlbnRzVG9UcmlnZ2VyID0gW107XG5cbiAgICBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cblxuY2xhc3MgQXBwUm91dGluZ01hbmFnZXIgZXh0ZW5kcyBDYXBhYmlsaXR5TWFuYWdlciB7XG4gICAgdHlwZSA9IFVpQXBwQ2FwYWJpbGl0eVR5cGUuQVBQX1JPVVRJTkc7XG4gICAgZXZlbnRzVG9TdWJzY3JpYmUgPSBbXTtcbiAgICBldmVudHNUb1RyaWdnZXIgPSBbXG4gICAgICAgIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLlJFTE9BRF9GUkFNRSxcbiAgICAgICAgVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUuT1BFTl9VUkxcbiAgICBdO1xuXG4gICAgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG5cbmNsYXNzIERhc2hib2FyZEN1c3RvbVdpZGdldE1hbmFnZXIgZXh0ZW5kcyBDYXBhYmlsaXR5TWFuYWdlciB7XG4gICAgdHlwZSA9IFVpQXBwQ2FwYWJpbGl0eVR5cGUuREFTSEJPQVJEX0NVU1RPTV9XSURHRVQ7XG4gICAgZXZlbnRzVG9TdWJzY3JpYmUgPSBbXTtcbiAgICBldmVudHNUb1RyaWdnZXIgPSBbXTtcblxuICAgIGdldEFkZGl0aW9uYWxDbGllbnRNZXRob2RzKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY2FwYWJpbGl0eU1hbmFnZXJzID0gW1xuICAgIERhc2hib2FyZENvZ01lbnVNYW5hZ2VyLFxuICAgIEFwcFJvdXRpbmdNYW5hZ2VyLFxuICAgIERhc2hib2FyZEN1c3RvbVdpZGdldE1hbmFnZXJcbl07XG4iLCJpbXBvcnQgeyBDaGlsZENsaWVudCB9IGZyb20gJ0BkYXRhZG9nL2ZyYW1lcG9zdCc7XG5cbmltcG9ydCB7IENhcGFiaWxpdHlNYW5hZ2VyIH0gZnJvbSAnLi9jYXBhYmlsaXRlcy9jYXBhYmlsaXR5TWFuYWdlcic7XG5pbXBvcnQgeyBjYXBhYmlsaXR5TWFuYWdlcnMgfSBmcm9tICcuL2NhcGFiaWxpdGVzJztcbmltcG9ydCB7XG4gICAgSG9zdCxcbiAgICBVaUFwcENhcGFiaWxpdHlUeXBlLFxuICAgIFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUsXG4gICAgVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUsXG4gICAgU0RLX1ZFUlNJT05cbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyLCBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBBcHBDb250ZXh0LCBGcmFtZUNvbnRleHQsIEV2ZW50SGFuZGxlciwgQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgaG9zdDogSG9zdC5TVEFHRSxcbiAgICBkZWJ1ZzogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBERENsaWVudCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBob3N0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZyYW1lUG9zdENsaWVudDogQ2hpbGRDbGllbnQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXI6IExvZ2dlcjtcbiAgICBwcml2YXRlIGNhcGFiaWxpdHlNYW5hZ2VyczogQ2FwYWJpbGl0eU1hbmFnZXJbXTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENsaWVudE9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmhvc3QgPSBvcHRpb25zLmhvc3QgfHwgREVGQVVMVF9PUFRJT05TLmhvc3Q7XG4gICAgICAgIHRoaXMuZGVidWcgPSBvcHRpb25zLmRlYnVnIHx8IERFRkFVTFRfT1BUSU9OUy5kZWJ1ZztcblxuICAgICAgICB0aGlzLmZyYW1lUG9zdENsaWVudCA9IG5ldyBDaGlsZENsaWVudDxBcHBDb250ZXh0Pih7XG4gICAgICAgICAgICBkZWJ1ZzogdGhpcy5kZWJ1ZyxcbiAgICAgICAgICAgIHByb2ZpbGU6IHRoaXMuZGVidWcsXG4gICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgc2RrVmVyc2lvbjogU0RLX1ZFUlNJT05cbiAgICAgICAgICAgIH0gYXMgRnJhbWVDb250ZXh0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyID0gZ2V0TG9nZ2VyKG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzID0gY2FwYWJpbGl0eU1hbmFnZXJzLm1hcChcbiAgICAgICAgICAgIE1hbmFnZXIgPT5cbiAgICAgICAgICAgICAgICBuZXcgTWFuYWdlcihcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdDogdGhpcy5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWc6IHRoaXMuZGVidWdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZVBvc3RDbGllbnRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZm9yRWFjaChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmFwcGx5QWRkaXRpb25hbE1ldGhvZHModGhpcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBvbiBhIGNlcnRhaW4gZXZlbnQgdHlwZSBmcm9tIHRoZSBwYXJlbnQuIFdpbGwgcHJpbnRcbiAgICAgKiBhbiBlcnJvciBpZiB0aGUgaW5zdGFsbGVkIGFwcCBkb2VzIG5vdCBoYXZlIHRoZSByZXF1aXJlZCBjYXBhYmlsaXR5LiBSZXR1cm5zIGFuIHVuc3Vic2NyaWJlXG4gICAgICogbWV0aG9kLiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIGJlZm9yZSBoYW5kc2hha2UgaXMgc3VjY2Vzc2Z1bCwgYnV0IGhhbmRsZXJzIHdpbGwgbm90IGV4ZWN1dGUgdW50aWxcbiAgICAgKiBhZnRlciBzdWNjZXNzc2Z1bCBoYW5kc2hha2UuXG4gICAgICovXG4gICAgb248VCA9IGFueT4oXG4gICAgICAgIGV2ZW50VHlwZTogVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICAgICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyPFQ+XG4gICAgKTogKCkgPT4gdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VG9TdWJzY3JpYmVUeXBlKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKCFtYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignVW5rbm93biBldmVudCB0eXBlJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHdyYXBwZWRIYW5kbGVyOiBFdmVudEhhbmRsZXI8VD4gPSBhc3luYyAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgbWFuYWdlci5pc0VuYWJsZWQoKTtcblxuICAgICAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoLi4uYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICAgICAgICBgVGhlICR7bWFuYWdlci50eXBlfSBjYXBhYmlsaXR5IG11c3QgYmUgZW5hYmxlZCB0byByZXNwb25kIHRvIGV2ZW50cyBvZiB0eXBlICR7ZXZlbnRUeXBlfS5gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZVBvc3RDbGllbnQub24oZXZlbnRUeXBlLCB3cmFwcGVkSGFuZGxlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW4gZXZlbnQgdHlwZSB0byBiZSBoYW5kbGVkIGluIHRoZSBwYXJlbnQuIFdpbGwgcHJpbnRcbiAgICAgKiBhbiBlcnJvciBpZiB0aGUgaW5zdGFsbGVkIGFwcCBkb2VzIG5vdCBoYXZlIHRoZSByZXF1aXJlZCBjYXBhYmlsaXR5LlxuICAgICAqIFRoaXMgbWV0aG9kIGNhbiBiZSBjYWxsZWQgYmVmb3JlIGhhbmRzaGFrZSBpcyBzdWNjZXNzZnVsLCBidXQgaGFuZGxlcnMgd2lsbCBub3QgZXhlY3V0ZSB1bnRpbFxuICAgICAqIGFmdGVyIHN1Y2Nlc3NzZnVsIGhhbmRzaGFrZS5cbiAgICAgKi9cblxuICAgIHRyaWdnZXJFdmVudChldmVudFR5cGU6IFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLCBkYXRhOiBhbnkgPSB7fSkge1xuICAgICAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5nZXRNYW5hZ2VyQnlFdmVudFRvVHJpZ2dlclR5cGUoZXZlbnRUeXBlKTtcbiAgICAgICAgaWYgKCFtYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignVW5rbm93biBldmVudCB0eXBlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYW5hZ2VyLnRyaWdnZXJFdmVudChldmVudFR5cGUsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhcHAgY29udGV4dCBkYXRhLCBhZnRlciBpdCBpcyBzZW50IGZyb20gdGhlIHBhcmVudFxuICAgICAqL1xuICAgIGFzeW5jIGdldENvbnRleHQoKTogUHJvbWlzZTxBcHBDb250ZXh0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lUG9zdENsaWVudC5nZXRDb250ZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNYW5hZ2VyQnlUeXBlKFxuICAgICAgICBjYXBhYmlsaXR5VHlwZTogVWlBcHBDYXBhYmlsaXR5VHlwZVxuICAgICk6IENhcGFiaWxpdHlNYW5hZ2VyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzLmZpbmQoXG4gICAgICAgICAgICBtYW5hZ2VyID0+IG1hbmFnZXIudHlwZSA9PT0gY2FwYWJpbGl0eVR5cGVcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1hbmFnZXJCeUV2ZW50VG9TdWJzY3JpYmVUeXBlKFxuICAgICAgICBldmVudFR5cGU6IFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGVcbiAgICApOiBDYXBhYmlsaXR5TWFuYWdlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdHlNYW5hZ2Vycy5maW5kKG1hbmFnZXIgPT5cbiAgICAgICAgICAgIG1hbmFnZXIuZXZlbnRzVG9TdWJzY3JpYmUuaW5jbHVkZXMoZXZlbnRUeXBlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWFuYWdlckJ5RXZlbnRUb1RyaWdnZXJUeXBlKFxuICAgICAgICBldmVudFR5cGU6IFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlXG4gICAgKTogQ2FwYWJpbGl0eU1hbmFnZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZmluZChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmV2ZW50c1RvVHJpZ2dlci5pbmNsdWRlcyhldmVudFR5cGUpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGVudW0gSG9zdCB7XG4gICAgUFJPRCA9ICdodHRwczovL2FwcC5kYXRhZG9naHEuY29tLycsXG4gICAgU1RBR0UgPSAnaHR0cHM6Ly9kZC5kYXRhZDBnLmNvbS8nXG59XG5cbmV4cG9ydCBlbnVtIFVpQXBwQ2FwYWJpbGl0eVR5cGUge1xuICAgIEFQUF9DT05URVhUID0gJ2FwcF9jb250ZXh0JyxcbiAgICBEQVNIQk9BUkRfQ09HX01FTlUgPSAnZGFzaGJvYXJkX2NvZ19tZW51JyxcbiAgICBEQVNIQk9BUkRfQ1VTVE9NX1dJREdFVCA9ICdkYXNoYm9hcmRfY3VzdG9tX3dpZGdldCcsXG4gICAgQVBQX1JPVVRJTkcgPSAnYXBwX3JvdXRpbmcnXG59XG5cbmV4cG9ydCBlbnVtIFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUge1xuICAgIERBU0hCT0FSRF9DT0dfTUVOVV9DT05URVhUID0gJ2Rhc2hib2FyZF9jb2dfbWVudV9jb250ZXh0J1xufVxuZXhwb3J0IGVudW0gVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUge1xuICAgIFJFTE9BRF9GUkFNRSA9ICdyZWxvYWRfZnJhbWUnLFxuICAgIE9QRU5fVVJMID0gJ29wZW5fdXJsJ1xufVxuXG5leHBvcnQgY29uc3QgU0RLX1ZFUlNJT04gPSAnMC4xLjAnO1xuIiwiaW1wb3J0IHsgRERDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBBcHBDb250ZXh0LCBDbGllbnRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmxldCBjbGllbnQ6IEREQ2xpZW50O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgY2xpZW50LCBvciByZXR1cm5zIGFuIGV4aXN0aW5nIG9uZSBpZiBhbHJlYWR5IGluaXRpYWxpemVkLiBVc2VyIGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0byBiZSBleGVjdXRlZCB3aXRoIGFwcCBjb250ZXh0IGRhdGEgd2hlbiBpdCBpcyBzZW50IGZyb20gdGhlIHBhcmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoXG4gICAgb3B0aW9ucz86IENsaWVudE9wdGlvbnMsXG4gICAgY2FsbGJhY2s/OiAoY29udGV4dDogQXBwQ29udGV4dCkgPT4gdm9pZFxuKTogRERDbGllbnQgPT4ge1xuICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgIGNsaWVudCA9IG5ldyBERENsaWVudChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2xpZW50LmdldENvbnRleHQoKS50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xpZW50O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCB7IENsaWVudE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBMb2dnZXIge1xuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xuICAgIGVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRMb2dnZXIgPSAob3B0aW9uczogQ2xpZW50T3B0aW9ucyk6IExvZ2dlciA9PiB7XG4gICAgaWYgKG9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coYGRkLWFwcHM6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihgZGQtYXBwczogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2coKSB7fSxcbiAgICAgICAgICAgIGVycm9yKCkge31cbiAgICAgICAgfTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==