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

/***/ "./node_modules/postmate/build/postmate.es.js":
/*!****************************************************!*\
  !*** ./node_modules/postmate/build/postmate.es.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.5.2
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/
/**
 * The type of messages our frames our sending
 * @type {String}
 */
var messageType = 'application/x-postmate-v1+json';
/**
 * The maximum number of attempts to send a handshake request to the parent
 * @type {Number}
 */

var maxHandshakeRequests = 5;
/**
 * A unique message ID that is used to ensure responses are sent to the correct requests
 * @type {Number}
 */

var _messageId = 0;
/**
 * Increments and returns a message ID
 * @return {Number} A unique ID for a message
 */

var generateNewMessageId = function generateNewMessageId() {
  return ++_messageId;
};
/**
 * Postmate logging function that enables/disables via config
 * @param  {Object} ...args Rest Arguments
 */

var log = function log() {
  var _console;

  return Postmate.debug ? (_console = console).log.apply(_console, arguments) : null;
}; // eslint-disable-line no-console

/**
 * Takes a URL and returns the origin
 * @param  {String} url The full URL being requested
 * @return {String}     The URLs origin
 */

var resolveOrigin = function resolveOrigin(url) {
  var a = document.createElement('a');
  a.href = url;
  var protocol = a.protocol.length > 4 ? a.protocol : window.location.protocol;
  var host = a.host.length ? a.port === '80' || a.port === '443' ? a.hostname : a.host : window.location.host;
  return a.origin || protocol + "//" + host;
};
var messageTypes = {
  handshake: 1,
  'handshake-reply': 1,
  call: 1,
  emit: 1,
  reply: 1,
  request: 1
  /**
   * Ensures that a message is safe to interpret
   * @param  {Object} message The postmate message being sent
   * @param  {String|Boolean} allowedOrigin The whitelisted origin or false to skip origin check
   * @return {Boolean}
   */

};
var sanitize = function sanitize(message, allowedOrigin) {
  if (typeof allowedOrigin === 'string' && message.origin !== allowedOrigin) return false;
  if (!message.data) return false;
  if (typeof message.data === 'object' && !('postmate' in message.data)) return false;
  if (message.data.type !== messageType) return false;
  if (!messageTypes[message.data.postmate]) return false;
  return true;
};
/**
 * Takes a model, and searches for a value by the property
 * @param  {Object} model     The dictionary to search against
 * @param  {String} property  A path within a dictionary (i.e. 'window.location.href')
 * @param  {Object} data      Additional information from the get request that is
 *                            passed to functions in the child model
 * @return {Promise}
 */

var resolveValue = function resolveValue(model, property) {
  var unwrappedContext = typeof model[property] === 'function' ? model[property]() : model[property];
  return Postmate.Promise.resolve(unwrappedContext);
};
/**
 * Composes an API to be used by the parent
 * @param {Object} info Information on the consumer
 */

var ParentAPI =
/*#__PURE__*/
function () {
  function ParentAPI(info) {
    var _this = this;

    this.parent = info.parent;
    this.frame = info.frame;
    this.child = info.child;
    this.childOrigin = info.childOrigin;
    this.events = {};

    if (true) {
      log('Parent: Registering API');
      log('Parent: Awaiting messages...');
    }

    this.listener = function (e) {
      if (!sanitize(e, _this.childOrigin)) return false;
      /**
       * the assignments below ensures that e, data, and value are all defined
       */

      var _ref = ((e || {}).data || {}).value || {},
          data = _ref.data,
          name = _ref.name;

      if (e.data.postmate === 'emit') {
        if (true) {
          log("Parent: Received event emission: " + name);
        }

        if (name in _this.events) {
          _this.events[name].call(_this, data);
        }
      }
    };

    this.parent.addEventListener('message', this.listener, false);

    if (true) {
      log('Parent: Awaiting event emissions from Child');
    }
  }

  var _proto = ParentAPI.prototype;

  _proto.get = function get(property) {
    var _this2 = this;

    return new Postmate.Promise(function (resolve) {
      // Extract data from response and kill listeners
      var uid = generateNewMessageId();

      var transact = function transact(e) {
        if (e.data.uid === uid && e.data.postmate === 'reply') {
          _this2.parent.removeEventListener('message', transact, false);

          resolve(e.data.value);
        }
      }; // Prepare for response from Child...


      _this2.parent.addEventListener('message', transact, false); // Then ask child for information


      _this2.child.postMessage({
        postmate: 'request',
        type: messageType,
        property: property,
        uid: uid
      }, _this2.childOrigin);
    });
  };

  _proto.call = function call(property, data) {
    // Send information to the child
    this.child.postMessage({
      postmate: 'call',
      type: messageType,
      property: property,
      data: data
    }, this.childOrigin);
  };

  _proto.on = function on(eventName, callback) {
    this.events[eventName] = callback;
  };

  _proto.destroy = function destroy() {
    if (true) {
      log('Parent: Destroying Postmate instance');
    }

    window.removeEventListener('message', this.listener, false);
    this.frame.parentNode.removeChild(this.frame);
  };

  return ParentAPI;
}();
/**
 * Composes an API to be used by the child
 * @param {Object} info Information on the consumer
 */

var ChildAPI =
/*#__PURE__*/
function () {
  function ChildAPI(info) {
    var _this3 = this;

    this.model = info.model;
    this.parent = info.parent;
    this.parentOrigin = info.parentOrigin;
    this.child = info.child;

    if (true) {
      log('Child: Registering API');
      log('Child: Awaiting messages...');
    }

    this.child.addEventListener('message', function (e) {
      if (!sanitize(e, _this3.parentOrigin)) return;

      if (true) {
        log('Child: Received request', e.data);
      }

      var _e$data = e.data,
          property = _e$data.property,
          uid = _e$data.uid,
          data = _e$data.data;

      if (e.data.postmate === 'call') {
        if (property in _this3.model && typeof _this3.model[property] === 'function') {
          _this3.model[property](data);
        }

        return;
      } // Reply to Parent


      resolveValue(_this3.model, property).then(function (value) {
        return e.source.postMessage({
          property: property,
          postmate: 'reply',
          type: messageType,
          uid: uid,
          value: value
        }, e.origin);
      });
    });
  }

  var _proto2 = ChildAPI.prototype;

  _proto2.emit = function emit(name, data) {
    if (true) {
      log("Child: Emitting Event \"" + name + "\"", data);
    }

    this.parent.postMessage({
      postmate: 'emit',
      type: messageType,
      value: {
        name: name,
        data: data
      }
    }, this.parentOrigin);
  };

  return ChildAPI;
}();
/**
  * The entry point of the Parent.
 * @type {Class}
 */

var Postmate =
/*#__PURE__*/
function () {
  // eslint-disable-line no-undef
  // Internet Explorer craps itself

  /**
   * Sets options related to the Parent
   * @param {Object} object The element to inject the frame into, and the url
   * @return {Promise}
   */
  function Postmate(_ref2) {
    var _ref2$container = _ref2.container,
        container = _ref2$container === void 0 ? typeof container !== 'undefined' ? container : document.body : _ref2$container,
        model = _ref2.model,
        url = _ref2.url,
        name = _ref2.name,
        _ref2$classListArray = _ref2.classListArray,
        classListArray = _ref2$classListArray === void 0 ? [] : _ref2$classListArray;
    // eslint-disable-line no-undef
    this.parent = window;
    this.frame = document.createElement('iframe');
    this.frame.name = name || '';
    this.frame.classList.add.apply(this.frame.classList, classListArray);
    container.appendChild(this.frame);
    this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow;
    this.model = model || {};
    return this.sendHandshake(url);
  }
  /**
   * Begins the handshake strategy
   * @param  {String} url The URL to send a handshake request to
   * @return {Promise}     Promise that resolves when the handshake is complete
   */


  var _proto3 = Postmate.prototype;

  _proto3.sendHandshake = function sendHandshake(url) {
    var _this4 = this;

    var childOrigin = resolveOrigin(url);
    var attempt = 0;
    var responseInterval;
    return new Postmate.Promise(function (resolve, reject) {
      var reply = function reply(e) {
        if (!sanitize(e, childOrigin)) return false;

        if (e.data.postmate === 'handshake-reply') {
          clearInterval(responseInterval);

          if (true) {
            log('Parent: Received handshake reply from Child');
          }

          _this4.parent.removeEventListener('message', reply, false);

          _this4.childOrigin = e.origin;

          if (true) {
            log('Parent: Saving Child origin', _this4.childOrigin);
          }

          return resolve(new ParentAPI(_this4));
        } // Might need to remove since parent might be receiving different messages
        // from different hosts


        if (true) {
          log('Parent: Invalid handshake reply');
        }

        return reject('Failed handshake');
      };

      _this4.parent.addEventListener('message', reply, false);

      var doSend = function doSend() {
        attempt++;

        if (true) {
          log("Parent: Sending handshake attempt " + attempt, {
            childOrigin: childOrigin
          });
        }

        _this4.child.postMessage({
          postmate: 'handshake',
          type: messageType,
          model: _this4.model
        }, childOrigin);

        if (attempt === maxHandshakeRequests) {
          clearInterval(responseInterval);
        }
      };

      var loaded = function loaded() {
        doSend();
        responseInterval = setInterval(doSend, 500);
      };

      if (_this4.frame.attachEvent) {
        _this4.frame.attachEvent('onload', loaded);
      } else {
        _this4.frame.onload = loaded;
      }

      if (true) {
        log('Parent: Loading frame', {
          url: url
        });
      }

      _this4.frame.src = url;
    });
  };

  return Postmate;
}();
/**
 * The entry point of the Child
 * @type {Class}
 */


Postmate.debug = false;

Postmate.Promise = function () {
  try {
    return window ? window.Promise : Promise;
  } catch (e) {
    return null;
  }
}();

Postmate.Model =
/*#__PURE__*/
function () {
  /**
   * Initializes the child, model, parent, and responds to the Parents handshake
   * @param {Object} model Hash of values, functions, or promises
   * @return {Promise}       The Promise that resolves when the handshake has been received
   */
  function Model(model) {
    this.child = window;
    this.model = model;
    this.parent = this.child.parent;
    return this.sendHandshakeReply();
  }
  /**
   * Responds to a handshake initiated by the Parent
   * @return {Promise} Resolves an object that exposes an API for the Child
   */


  var _proto4 = Model.prototype;

  _proto4.sendHandshakeReply = function sendHandshakeReply() {
    var _this5 = this;

    return new Postmate.Promise(function (resolve, reject) {
      var shake = function shake(e) {
        if (!e.data.postmate) {
          return;
        }

        if (e.data.postmate === 'handshake') {
          if (true) {
            log('Child: Received handshake from Parent');
          }

          _this5.child.removeEventListener('message', shake, false);

          if (true) {
            log('Child: Sending handshake reply to Parent');
          }

          e.source.postMessage({
            postmate: 'handshake-reply',
            type: messageType
          }, e.origin);
          _this5.parentOrigin = e.origin; // Extend model with the one provided by the parent

          var defaults = e.data.model;

          if (defaults) {
            Object.keys(defaults).forEach(function (key) {
              _this5.model[key] = defaults[key];
            });

            if (true) {
              log('Child: Inherited and extended model from Parent');
            }
          }

          if (true) {
            log('Child: Saving Parent origin', _this5.parentOrigin);
          }

          return resolve(new ChildAPI(_this5));
        }

        return reject('Handshake Reply Failed');
      };

      _this5.child.addEventListener('message', shake, false);
    });
  };

  return Model;
}();

/* harmony default export */ __webpack_exports__["default"] = (Postmate);


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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapabilityManager = void 0;
const constants_1 = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const logger_1 = __webpack_require__(/*! ../logger */ "./src/logger.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
const initSubscriptions = () => {
    const subcriptions = {};
    Object.values(constants_1.UiAppEventToSubscribeType).forEach(eventType => {
        subcriptions[eventType] = {};
    });
    return subcriptions;
};
class CapabilityManager {
    constructor(options, handshake, context) {
        this.host = options.host;
        this.debug = options.debug;
        this.logger = logger_1.getLogger(options);
        this.handshake = handshake;
        this.context = context;
        this.subscriptions = initSubscriptions();
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
    /**
     * Called by the client to register an event handler managed by this capability. Do not override
     */
    subscribeHandler(eventType, handler) {
        const subscriptionId = utils_1.uniqueInt();
        this.subscriptions[eventType][subscriptionId] = handler;
        return () => {
            const _a = this.subscriptions[eventType], _b = subscriptionId, _ = _a[_b], otherSubscriptions = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            this.subscriptions[eventType] = otherSubscriptions;
        };
    }
    /**
     * Called by the client to delegate event handling. Do not override
     */
    handleEvent({ eventType, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasHandlers = this.hasHandlers(eventType);
            if (!hasHandlers) {
                return;
            }
            const isEnabled = yield this.isEnabled();
            if (isEnabled) {
                const subscriptions = this.subscriptions[eventType];
                Object.values(subscriptions).forEach(handler => handler(data));
            }
            else {
                this.logger.error(`The ${this.type} capability must be enabled to respond to events of type ${eventType}.`);
            }
        });
    }
    triggerEvent(eventType, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEnabled = yield this.isEnabled();
            if (isEnabled) {
                const parent = yield this.handshake;
                parent.emit(eventType);
            }
            else {
                this.logger.error(`The ${this.type} capability must be enabled to trigger events of type ${eventType}.`);
            }
        });
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const { capabilities } = yield this.context.promise;
            return capabilities.includes(this.type);
        });
    }
    hasHandlers(eventType) {
        return !!Object.keys(this.subscriptions[eventType]).length;
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
exports.capabilityManagers = [DashboardCogMenuManager, AppRoutingManager];


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDClient = void 0;
const postmate_1 = __importDefault(__webpack_require__(/*! postmate */ "./node_modules/postmate/build/postmate.es.js"));
const capabilites_1 = __webpack_require__(/*! ./capabilites */ "./src/capabilites/index.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const logger_1 = __webpack_require__(/*! ./logger */ "./src/logger.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const DEFAULT_OPTIONS = {
    host: constants_1.Host.STAGE,
    debug: false
};
class DDClient {
    constructor(options = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;
        this.context = utils_1.defer();
        this.logger = logger_1.getLogger(options);
        // @ts-ignore
        postmate_1.default.debug = this._debug;
        this.handshake = new postmate_1.default.Model({
            init: (context) => this.init(context),
            handleEvent: (params) => this.handleEvent(params)
        });
        this.capabilityManagers = capabilites_1.capabilityManagers.map(Manager => new Manager({ host: this.host, debug: this.debug }, this.handshake, this.context));
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
        return manager.subscribeHandler(eventType, handler);
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
            return this.context.promise;
        });
    }
    /**
     * syntactic sugar trigger UiAppEventToTriggerType.RELOAD_FRAME which reloads the current child frame and re-initiate the handshake with the parent
     */
    reloadFrame() {
        this.triggerEvent(constants_1.UiAppEventToTriggerType.RELOAD_FRAME);
    }
    /**
     * Reloads the current child frame and re-initiate the handshake with the parent
     */
    loadFrameWithURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.handshake;
            parent.emit('loadFrameWithURL', url);
        });
    }
    /**
     * init method is exposed in the postmate model. It must be called before other operations may proceed,
     * in order to inform client of app context
     */
    init(context) {
        return __awaiter(this, void 0, void 0, function* () {
            // parent should only be able to call this after handshake is complete, but its worth a check anyways
            yield this.handshake;
            this.context.resolve(context);
            this.logger.log('dd-apps: sdk handshake: parent <-> child handshake is complete');
        });
    }
    /**
     * handleEvent is the main method called by the parent through postmate (child.handleEvent('exec', {...})).
     * It accepts a keyed event type and arbitrary data to be passed to event handlers. It will log an error
     * message if the user does not have the required capability enabled
     */
    handleEvent({ eventType, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = this.getManagerByEventToSubscribeType(eventType);
            if (!manager) {
                this.logger.error('Could not handle event: no corresponding manager found');
                return;
            }
            manager.handleEvent({ eventType, data });
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
exports.UiAppEventToTriggerType = exports.UiAppEventToSubscribeType = exports.UiAppCapabilityType = exports.Host = void 0;
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


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueInt = exports.defer = void 0;
/**
 * Creates a defferred object, including promise and resolve + reject methods to be executed later
 */
exports.defer = () => {
    let resolve = () => { };
    let reject = () => { };
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        resolve,
        reject,
        promise
    };
};
let increment = 0;
// generates an integer, guaranteed to be unique becuase it's incremented :)
exports.uniqueInt = () => {
    increment++;
    return increment;
};


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERF9TREsvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0REX1NESy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ERF9TREsvLi9ub2RlX21vZHVsZXMvcG9zdG1hdGUvYnVpbGQvcG9zdG1hdGUuZXMuanMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2NhcGFiaWxpdGVzL2NhcGFiaWxpdHlNYW5hZ2VyLnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9jYXBhYmlsaXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9ERF9TREsvLi9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztR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QUNILEdBQUcsS0FBSSxDQUFDO1lBQ1IsS0FBSyxLQUFJLENBQUM7U0FDYixDQUFDO0tBQ0w7QUFDTCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkY7O0dBRUc7QUFDVSxhQUFLLEdBQUcsR0FBbUIsRUFBRTtJQUN0QyxJQUFJLE9BQU8sR0FBbUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksTUFBTSxHQUFtQixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDeEMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0gsT0FBTztRQUNQLE1BQU07UUFDTixPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztBQUUxQiw0RUFBNEU7QUFDL0QsaUJBQVMsR0FBRyxHQUFXLEVBQUU7SUFDbEMsU0FBUyxFQUFFLENBQUM7SUFFWixPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkREX1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJERF9TREtcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gIHBvc3RtYXRlIC0gQSBwb3dlcmZ1bCwgc2ltcGxlLCBwcm9taXNlLWJhc2VkIHBvc3RNZXNzYWdlIGxpYnJhcnlcbiAgQHZlcnNpb24gdjEuNS4yXG4gIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xsYXJzaGF2ZWNsdWIvcG9zdG1hdGVcbiAgQGF1dGhvciBKYWNvYiBLZWxsZXkgPGpha2llOEBnbWFpbC5jb20+XG4gIEBsaWNlbnNlIE1JVFxuKiovXG4vKipcbiAqIFRoZSB0eXBlIG9mIG1lc3NhZ2VzIG91ciBmcmFtZXMgb3VyIHNlbmRpbmdcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBtZXNzYWdlVHlwZSA9ICdhcHBsaWNhdGlvbi94LXBvc3RtYXRlLXYxK2pzb24nO1xuLyoqXG4gKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXR0ZW1wdHMgdG8gc2VuZCBhIGhhbmRzaGFrZSByZXF1ZXN0IHRvIHRoZSBwYXJlbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cblxudmFyIG1heEhhbmRzaGFrZVJlcXVlc3RzID0gNTtcbi8qKlxuICogQSB1bmlxdWUgbWVzc2FnZSBJRCB0aGF0IGlzIHVzZWQgdG8gZW5zdXJlIHJlc3BvbnNlcyBhcmUgc2VudCB0byB0aGUgY29ycmVjdCByZXF1ZXN0c1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuXG52YXIgX21lc3NhZ2VJZCA9IDA7XG4vKipcbiAqIEluY3JlbWVudHMgYW5kIHJldHVybnMgYSBtZXNzYWdlIElEXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgdW5pcXVlIElEIGZvciBhIG1lc3NhZ2VcbiAqL1xuXG52YXIgZ2VuZXJhdGVOZXdNZXNzYWdlSWQgPSBmdW5jdGlvbiBnZW5lcmF0ZU5ld01lc3NhZ2VJZCgpIHtcbiAgcmV0dXJuICsrX21lc3NhZ2VJZDtcbn07XG4vKipcbiAqIFBvc3RtYXRlIGxvZ2dpbmcgZnVuY3Rpb24gdGhhdCBlbmFibGVzL2Rpc2FibGVzIHZpYSBjb25maWdcbiAqIEBwYXJhbSAge09iamVjdH0gLi4uYXJncyBSZXN0IEFyZ3VtZW50c1xuICovXG5cbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gUG9zdG1hdGUuZGVidWcgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbi8qKlxuICogVGFrZXMgYSBVUkwgYW5kIHJldHVybnMgdGhlIG9yaWdpblxuICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIGZ1bGwgVVJMIGJlaW5nIHJlcXVlc3RlZFxuICogQHJldHVybiB7U3RyaW5nfSAgICAgVGhlIFVSTHMgb3JpZ2luXG4gKi9cblxudmFyIHJlc29sdmVPcmlnaW4gPSBmdW5jdGlvbiByZXNvbHZlT3JpZ2luKHVybCkge1xuICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICB2YXIgcHJvdG9jb2wgPSBhLnByb3RvY29sLmxlbmd0aCA+IDQgPyBhLnByb3RvY29sIDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICB2YXIgaG9zdCA9IGEuaG9zdC5sZW5ndGggPyBhLnBvcnQgPT09ICc4MCcgfHwgYS5wb3J0ID09PSAnNDQzJyA/IGEuaG9zdG5hbWUgOiBhLmhvc3QgOiB3aW5kb3cubG9jYXRpb24uaG9zdDtcbiAgcmV0dXJuIGEub3JpZ2luIHx8IHByb3RvY29sICsgXCIvL1wiICsgaG9zdDtcbn07XG52YXIgbWVzc2FnZVR5cGVzID0ge1xuICBoYW5kc2hha2U6IDEsXG4gICdoYW5kc2hha2UtcmVwbHknOiAxLFxuICBjYWxsOiAxLFxuICBlbWl0OiAxLFxuICByZXBseTogMSxcbiAgcmVxdWVzdDogMVxuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IGEgbWVzc2FnZSBpcyBzYWZlIHRvIGludGVycHJldFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG1lc3NhZ2UgVGhlIHBvc3RtYXRlIG1lc3NhZ2UgYmVpbmcgc2VudFxuICAgKiBAcGFyYW0gIHtTdHJpbmd8Qm9vbGVhbn0gYWxsb3dlZE9yaWdpbiBUaGUgd2hpdGVsaXN0ZWQgb3JpZ2luIG9yIGZhbHNlIHRvIHNraXAgb3JpZ2luIGNoZWNrXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG59O1xudmFyIHNhbml0aXplID0gZnVuY3Rpb24gc2FuaXRpemUobWVzc2FnZSwgYWxsb3dlZE9yaWdpbikge1xuICBpZiAodHlwZW9mIGFsbG93ZWRPcmlnaW4gPT09ICdzdHJpbmcnICYmIG1lc3NhZ2Uub3JpZ2luICE9PSBhbGxvd2VkT3JpZ2luKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbWVzc2FnZS5kYXRhKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgbWVzc2FnZS5kYXRhID09PSAnb2JqZWN0JyAmJiAhKCdwb3N0bWF0ZScgaW4gbWVzc2FnZS5kYXRhKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAobWVzc2FnZS5kYXRhLnR5cGUgIT09IG1lc3NhZ2VUeXBlKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbWVzc2FnZVR5cGVzW21lc3NhZ2UuZGF0YS5wb3N0bWF0ZV0pIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBUYWtlcyBhIG1vZGVsLCBhbmQgc2VhcmNoZXMgZm9yIGEgdmFsdWUgYnkgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0gIHtPYmplY3R9IG1vZGVsICAgICBUaGUgZGljdGlvbmFyeSB0byBzZWFyY2ggYWdhaW5zdFxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wZXJ0eSAgQSBwYXRoIHdpdGhpbiBhIGRpY3Rpb25hcnkgKGkuZS4gJ3dpbmRvdy5sb2NhdGlvbi5ocmVmJylcbiAqIEBwYXJhbSAge09iamVjdH0gZGF0YSAgICAgIEFkZGl0aW9uYWwgaW5mb3JtYXRpb24gZnJvbSB0aGUgZ2V0IHJlcXVlc3QgdGhhdCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkIHRvIGZ1bmN0aW9ucyBpbiB0aGUgY2hpbGQgbW9kZWxcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cblxudmFyIHJlc29sdmVWYWx1ZSA9IGZ1bmN0aW9uIHJlc29sdmVWYWx1ZShtb2RlbCwgcHJvcGVydHkpIHtcbiAgdmFyIHVud3JhcHBlZENvbnRleHQgPSB0eXBlb2YgbW9kZWxbcHJvcGVydHldID09PSAnZnVuY3Rpb24nID8gbW9kZWxbcHJvcGVydHldKCkgOiBtb2RlbFtwcm9wZXJ0eV07XG4gIHJldHVybiBQb3N0bWF0ZS5Qcm9taXNlLnJlc29sdmUodW53cmFwcGVkQ29udGV4dCk7XG59O1xuLyoqXG4gKiBDb21wb3NlcyBhbiBBUEkgdG8gYmUgdXNlZCBieSB0aGUgcGFyZW50XG4gKiBAcGFyYW0ge09iamVjdH0gaW5mbyBJbmZvcm1hdGlvbiBvbiB0aGUgY29uc3VtZXJcbiAqL1xuXG52YXIgUGFyZW50QVBJID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyZW50QVBJKGluZm8pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJlbnQgPSBpbmZvLnBhcmVudDtcbiAgICB0aGlzLmZyYW1lID0gaW5mby5mcmFtZTtcbiAgICB0aGlzLmNoaWxkID0gaW5mby5jaGlsZDtcbiAgICB0aGlzLmNoaWxkT3JpZ2luID0gaW5mby5jaGlsZE9yaWdpbjtcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBSZWdpc3RlcmluZyBBUEknKTtcbiAgICAgIGxvZygnUGFyZW50OiBBd2FpdGluZyBtZXNzYWdlcy4uLicpO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFzYW5pdGl6ZShlLCBfdGhpcy5jaGlsZE9yaWdpbikpIHJldHVybiBmYWxzZTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlIGFzc2lnbm1lbnRzIGJlbG93IGVuc3VyZXMgdGhhdCBlLCBkYXRhLCBhbmQgdmFsdWUgYXJlIGFsbCBkZWZpbmVkXG4gICAgICAgKi9cblxuICAgICAgdmFyIF9yZWYgPSAoKGUgfHwge30pLmRhdGEgfHwge30pLnZhbHVlIHx8IHt9LFxuICAgICAgICAgIGRhdGEgPSBfcmVmLmRhdGEsXG4gICAgICAgICAgbmFtZSA9IF9yZWYubmFtZTtcblxuICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2VtaXQnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKFwiUGFyZW50OiBSZWNlaXZlZCBldmVudCBlbWlzc2lvbjogXCIgKyBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lIGluIF90aGlzLmV2ZW50cykge1xuICAgICAgICAgIF90aGlzLmV2ZW50c1tuYW1lXS5jYWxsKF90aGlzLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5saXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBBd2FpdGluZyBldmVudCBlbWlzc2lvbnMgZnJvbSBDaGlsZCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBQYXJlbnRBUEkucHJvdG90eXBlO1xuXG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQocHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUG9zdG1hdGUuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgLy8gRXh0cmFjdCBkYXRhIGZyb20gcmVzcG9uc2UgYW5kIGtpbGwgbGlzdGVuZXJzXG4gICAgICB2YXIgdWlkID0gZ2VuZXJhdGVOZXdNZXNzYWdlSWQoKTtcblxuICAgICAgdmFyIHRyYW5zYWN0ID0gZnVuY3Rpb24gdHJhbnNhY3QoZSkge1xuICAgICAgICBpZiAoZS5kYXRhLnVpZCA9PT0gdWlkICYmIGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ3JlcGx5Jykge1xuICAgICAgICAgIF90aGlzMi5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRyYW5zYWN0LCBmYWxzZSk7XG5cbiAgICAgICAgICByZXNvbHZlKGUuZGF0YS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByZXBhcmUgZm9yIHJlc3BvbnNlIGZyb20gQ2hpbGQuLi5cblxuXG4gICAgICBfdGhpczIucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0cmFuc2FjdCwgZmFsc2UpOyAvLyBUaGVuIGFzayBjaGlsZCBmb3IgaW5mb3JtYXRpb25cblxuXG4gICAgICBfdGhpczIuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBwb3N0bWF0ZTogJ3JlcXVlc3QnLFxuICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICB1aWQ6IHVpZFxuICAgICAgfSwgX3RoaXMyLmNoaWxkT3JpZ2luKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY2FsbCA9IGZ1bmN0aW9uIGNhbGwocHJvcGVydHksIGRhdGEpIHtcbiAgICAvLyBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBjaGlsZFxuICAgIHRoaXMuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgcG9zdG1hdGU6ICdjYWxsJyxcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIHRoaXMuY2hpbGRPcmlnaW4pO1xuICB9O1xuXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gY2FsbGJhY2s7XG4gIH07XG5cbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ1BhcmVudDogRGVzdHJveWluZyBQb3N0bWF0ZSBpbnN0YW5jZScpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5saXN0ZW5lciwgZmFsc2UpO1xuICAgIHRoaXMuZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZyYW1lKTtcbiAgfTtcblxuICByZXR1cm4gUGFyZW50QVBJO1xufSgpO1xuLyoqXG4gKiBDb21wb3NlcyBhbiBBUEkgdG8gYmUgdXNlZCBieSB0aGUgY2hpbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIEluZm9ybWF0aW9uIG9uIHRoZSBjb25zdW1lclxuICovXG5cbnZhciBDaGlsZEFQSSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENoaWxkQVBJKGluZm8pIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHRoaXMubW9kZWwgPSBpbmZvLm1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gaW5mby5wYXJlbnQ7XG4gICAgdGhpcy5wYXJlbnRPcmlnaW4gPSBpbmZvLnBhcmVudE9yaWdpbjtcbiAgICB0aGlzLmNoaWxkID0gaW5mby5jaGlsZDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ0NoaWxkOiBSZWdpc3RlcmluZyBBUEknKTtcbiAgICAgIGxvZygnQ2hpbGQ6IEF3YWl0aW5nIG1lc3NhZ2VzLi4uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghc2FuaXRpemUoZSwgX3RoaXMzLnBhcmVudE9yaWdpbikpIHJldHVybjtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nKCdDaGlsZDogUmVjZWl2ZWQgcmVxdWVzdCcsIGUuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBfZSRkYXRhID0gZS5kYXRhLFxuICAgICAgICAgIHByb3BlcnR5ID0gX2UkZGF0YS5wcm9wZXJ0eSxcbiAgICAgICAgICB1aWQgPSBfZSRkYXRhLnVpZCxcbiAgICAgICAgICBkYXRhID0gX2UkZGF0YS5kYXRhO1xuXG4gICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnY2FsbCcpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5IGluIF90aGlzMy5tb2RlbCAmJiB0eXBlb2YgX3RoaXMzLm1vZGVsW3Byb3BlcnR5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIF90aGlzMy5tb2RlbFtwcm9wZXJ0eV0oZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFJlcGx5IHRvIFBhcmVudFxuXG5cbiAgICAgIHJlc29sdmVWYWx1ZShfdGhpczMubW9kZWwsIHByb3BlcnR5KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZS5zb3VyY2UucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICBwb3N0bWF0ZTogJ3JlcGx5JyxcbiAgICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgICB1aWQ6IHVpZCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSwgZS5vcmlnaW4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IENoaWxkQVBJLnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmVtaXQgPSBmdW5jdGlvbiBlbWl0KG5hbWUsIGRhdGEpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKFwiQ2hpbGQ6IEVtaXR0aW5nIEV2ZW50IFxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIiwgZGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgcG9zdG1hdGU6ICdlbWl0JyxcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfVxuICAgIH0sIHRoaXMucGFyZW50T3JpZ2luKTtcbiAgfTtcblxuICByZXR1cm4gQ2hpbGRBUEk7XG59KCk7XG4vKipcbiAgKiBUaGUgZW50cnkgcG9pbnQgb2YgdGhlIFBhcmVudC5cbiAqIEB0eXBlIHtDbGFzc31cbiAqL1xuXG52YXIgUG9zdG1hdGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGNyYXBzIGl0c2VsZlxuXG4gIC8qKlxuICAgKiBTZXRzIG9wdGlvbnMgcmVsYXRlZCB0byB0aGUgUGFyZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGVsZW1lbnQgdG8gaW5qZWN0IHRoZSBmcmFtZSBpbnRvLCBhbmQgdGhlIHVybFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgZnVuY3Rpb24gUG9zdG1hdGUoX3JlZjIpIHtcbiAgICB2YXIgX3JlZjIkY29udGFpbmVyID0gX3JlZjIuY29udGFpbmVyLFxuICAgICAgICBjb250YWluZXIgPSBfcmVmMiRjb250YWluZXIgPT09IHZvaWQgMCA/IHR5cGVvZiBjb250YWluZXIgIT09ICd1bmRlZmluZWQnID8gY29udGFpbmVyIDogZG9jdW1lbnQuYm9keSA6IF9yZWYyJGNvbnRhaW5lcixcbiAgICAgICAgbW9kZWwgPSBfcmVmMi5tb2RlbCxcbiAgICAgICAgdXJsID0gX3JlZjIudXJsLFxuICAgICAgICBuYW1lID0gX3JlZjIubmFtZSxcbiAgICAgICAgX3JlZjIkY2xhc3NMaXN0QXJyYXkgPSBfcmVmMi5jbGFzc0xpc3RBcnJheSxcbiAgICAgICAgY2xhc3NMaXN0QXJyYXkgPSBfcmVmMiRjbGFzc0xpc3RBcnJheSA9PT0gdm9pZCAwID8gW10gOiBfcmVmMiRjbGFzc0xpc3RBcnJheTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgdGhpcy5wYXJlbnQgPSB3aW5kb3c7XG4gICAgdGhpcy5mcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIHRoaXMuZnJhbWUubmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgdGhpcy5mcmFtZS5jbGFzc0xpc3QuYWRkLmFwcGx5KHRoaXMuZnJhbWUuY2xhc3NMaXN0LCBjbGFzc0xpc3RBcnJheSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZnJhbWUpO1xuICAgIHRoaXMuY2hpbGQgPSB0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgdGhpcy5mcmFtZS5jb250ZW50RG9jdW1lbnQucGFyZW50V2luZG93O1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbCB8fCB7fTtcbiAgICByZXR1cm4gdGhpcy5zZW5kSGFuZHNoYWtlKHVybCk7XG4gIH1cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgaGFuZHNoYWtlIHN0cmF0ZWd5XG4gICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCBhIGhhbmRzaGFrZSByZXF1ZXN0IHRvXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaGFuZHNoYWtlIGlzIGNvbXBsZXRlXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90bzMgPSBQb3N0bWF0ZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5zZW5kSGFuZHNoYWtlID0gZnVuY3Rpb24gc2VuZEhhbmRzaGFrZSh1cmwpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBjaGlsZE9yaWdpbiA9IHJlc29sdmVPcmlnaW4odXJsKTtcbiAgICB2YXIgYXR0ZW1wdCA9IDA7XG4gICAgdmFyIHJlc3BvbnNlSW50ZXJ2YWw7XG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXBseSA9IGZ1bmN0aW9uIHJlcGx5KGUpIHtcbiAgICAgICAgaWYgKCFzYW5pdGl6ZShlLCBjaGlsZE9yaWdpbikpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnaGFuZHNoYWtlLXJlcGx5Jykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVzcG9uc2VJbnRlcnZhbCk7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdQYXJlbnQ6IFJlY2VpdmVkIGhhbmRzaGFrZSByZXBseSBmcm9tIENoaWxkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXM0LnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVwbHksIGZhbHNlKTtcblxuICAgICAgICAgIF90aGlzNC5jaGlsZE9yaWdpbiA9IGUub3JpZ2luO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnUGFyZW50OiBTYXZpbmcgQ2hpbGQgb3JpZ2luJywgX3RoaXM0LmNoaWxkT3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgUGFyZW50QVBJKF90aGlzNCkpO1xuICAgICAgICB9IC8vIE1pZ2h0IG5lZWQgdG8gcmVtb3ZlIHNpbmNlIHBhcmVudCBtaWdodCBiZSByZWNlaXZpbmcgZGlmZmVyZW50IG1lc3NhZ2VzXG4gICAgICAgIC8vIGZyb20gZGlmZmVyZW50IGhvc3RzXG5cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGxvZygnUGFyZW50OiBJbnZhbGlkIGhhbmRzaGFrZSByZXBseScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlamVjdCgnRmFpbGVkIGhhbmRzaGFrZScpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXM0LnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVwbHksIGZhbHNlKTtcblxuICAgICAgdmFyIGRvU2VuZCA9IGZ1bmN0aW9uIGRvU2VuZCgpIHtcbiAgICAgICAgYXR0ZW1wdCsrO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKFwiUGFyZW50OiBTZW5kaW5nIGhhbmRzaGFrZSBhdHRlbXB0IFwiICsgYXR0ZW1wdCwge1xuICAgICAgICAgICAgY2hpbGRPcmlnaW46IGNoaWxkT3JpZ2luXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczQuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHBvc3RtYXRlOiAnaGFuZHNoYWtlJyxcbiAgICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgICBtb2RlbDogX3RoaXM0Lm1vZGVsXG4gICAgICAgIH0sIGNoaWxkT3JpZ2luKTtcblxuICAgICAgICBpZiAoYXR0ZW1wdCA9PT0gbWF4SGFuZHNoYWtlUmVxdWVzdHMpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHJlc3BvbnNlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgbG9hZGVkID0gZnVuY3Rpb24gbG9hZGVkKCkge1xuICAgICAgICBkb1NlbmQoKTtcbiAgICAgICAgcmVzcG9uc2VJbnRlcnZhbCA9IHNldEludGVydmFsKGRvU2VuZCwgNTAwKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChfdGhpczQuZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgX3RoaXM0LmZyYW1lLmF0dGFjaEV2ZW50KCdvbmxvYWQnLCBsb2FkZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXM0LmZyYW1lLm9ubG9hZCA9IGxvYWRlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nKCdQYXJlbnQ6IExvYWRpbmcgZnJhbWUnLCB7XG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzNC5mcmFtZS5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFBvc3RtYXRlO1xufSgpO1xuLyoqXG4gKiBUaGUgZW50cnkgcG9pbnQgb2YgdGhlIENoaWxkXG4gKiBAdHlwZSB7Q2xhc3N9XG4gKi9cblxuXG5Qb3N0bWF0ZS5kZWJ1ZyA9IGZhbHNlO1xuXG5Qb3N0bWF0ZS5Qcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cgPyB3aW5kb3cuUHJvbWlzZSA6IFByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSgpO1xuXG5Qb3N0bWF0ZS5Nb2RlbCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY2hpbGQsIG1vZGVsLCBwYXJlbnQsIGFuZCByZXNwb25kcyB0byB0aGUgUGFyZW50cyBoYW5kc2hha2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsIEhhc2ggb2YgdmFsdWVzLCBmdW5jdGlvbnMsIG9yIHByb21pc2VzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIFRoZSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaGFuZHNoYWtlIGhhcyBiZWVuIHJlY2VpdmVkXG4gICAqL1xuICBmdW5jdGlvbiBNb2RlbChtb2RlbCkge1xuICAgIHRoaXMuY2hpbGQgPSB3aW5kb3c7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gdGhpcy5jaGlsZC5wYXJlbnQ7XG4gICAgcmV0dXJuIHRoaXMuc2VuZEhhbmRzaGFrZVJlcGx5KCk7XG4gIH1cbiAgLyoqXG4gICAqIFJlc3BvbmRzIHRvIGEgaGFuZHNoYWtlIGluaXRpYXRlZCBieSB0aGUgUGFyZW50XG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVzIGFuIG9iamVjdCB0aGF0IGV4cG9zZXMgYW4gQVBJIGZvciB0aGUgQ2hpbGRcbiAgICovXG5cblxuICB2YXIgX3Byb3RvNCA9IE1vZGVsLnByb3RvdHlwZTtcblxuICBfcHJvdG80LnNlbmRIYW5kc2hha2VSZXBseSA9IGZ1bmN0aW9uIHNlbmRIYW5kc2hha2VSZXBseSgpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUG9zdG1hdGUuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgc2hha2UgPSBmdW5jdGlvbiBzaGFrZShlKSB7XG4gICAgICAgIGlmICghZS5kYXRhLnBvc3RtYXRlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2hhbmRzaGFrZScpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogUmVjZWl2ZWQgaGFuZHNoYWtlIGZyb20gUGFyZW50Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXM1LmNoaWxkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBzaGFrZSwgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnQ2hpbGQ6IFNlbmRpbmcgaGFuZHNoYWtlIHJlcGx5IHRvIFBhcmVudCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUuc291cmNlLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHBvc3RtYXRlOiAnaGFuZHNoYWtlLXJlcGx5JyxcbiAgICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlXG4gICAgICAgICAgfSwgZS5vcmlnaW4pO1xuICAgICAgICAgIF90aGlzNS5wYXJlbnRPcmlnaW4gPSBlLm9yaWdpbjsgLy8gRXh0ZW5kIG1vZGVsIHdpdGggdGhlIG9uZSBwcm92aWRlZCBieSB0aGUgcGFyZW50XG5cbiAgICAgICAgICB2YXIgZGVmYXVsdHMgPSBlLmRhdGEubW9kZWw7XG5cbiAgICAgICAgICBpZiAoZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgX3RoaXM1Lm1vZGVsW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIGxvZygnQ2hpbGQ6IEluaGVyaXRlZCBhbmQgZXh0ZW5kZWQgbW9kZWwgZnJvbSBQYXJlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogU2F2aW5nIFBhcmVudCBvcmlnaW4nLCBfdGhpczUucGFyZW50T3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgQ2hpbGRBUEkoX3RoaXM1KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVqZWN0KCdIYW5kc2hha2UgUmVwbHkgRmFpbGVkJyk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpczUuY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHNoYWtlLCBmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1vZGVsO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0bWF0ZTtcbiIsImltcG9ydCAqIGFzIFBvc3RtYXRlIGZyb20gJ3Bvc3RtYXRlJztcblxuaW1wb3J0IHR5cGUgeyBERENsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQge1xuICAgIFVpQXBwQ2FwYWJpbGl0eVR5cGUsXG4gICAgVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyLCBMb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHtcbiAgICBBcHBDb250ZXh0LFxuICAgIENsaWVudE9wdGlvbnMsXG4gICAgRXZlbnRIYW5kbGVyLFxuICAgIEhhbmRsZUV2ZW50UGFyYW1zXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IERlZmVycmVkLCB1bmlxdWVJbnQgfSBmcm9tICcuLi91dGlscyc7XG5cbnR5cGUgU3Vic2NyaXB0aW9ucyA9IHtcbiAgICBba2V5IGluIFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGVdOiB7IFtpZDogbnVtYmVyXTogRXZlbnRIYW5kbGVyIH07XG59O1xuXG5jb25zdCBpbml0U3Vic2NyaXB0aW9ucyA9ICgpOiBTdWJzY3JpcHRpb25zID0+IHtcbiAgICBjb25zdCBzdWJjcmlwdGlvbnM6IFBhcnRpYWw8U3Vic2NyaXB0aW9ucz4gPSB7fTtcblxuICAgIE9iamVjdC52YWx1ZXMoVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSkuZm9yRWFjaChldmVudFR5cGUgPT4ge1xuICAgICAgICBzdWJjcmlwdGlvbnNbZXZlbnRUeXBlXSA9IHt9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YmNyaXB0aW9ucyBhcyBTdWJzY3JpcHRpb25zO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgICBhYnN0cmFjdCB0eXBlOiBVaUFwcENhcGFiaWxpdHlUeXBlO1xuICAgIGFic3RyYWN0IGV2ZW50c1RvU3Vic2NyaWJlOiBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlW107XG4gICAgYWJzdHJhY3QgZXZlbnRzVG9UcmlnZ2VyOiBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGhvc3Q6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVidWc6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBoYW5kc2hha2U6IFBvc3RtYXRlLk1vZGVsO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZXh0OiBEZWZlcnJlZDxBcHBDb250ZXh0PjtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IHtcbiAgICAgICAgW2tleSBpbiBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlXTogeyBbaWQ6IG51bWJlcl06IEV2ZW50SGFuZGxlciB9O1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgb3B0aW9uczogUmVxdWlyZWQ8Q2xpZW50T3B0aW9ucz4sXG4gICAgICAgIGhhbmRzaGFrZTogUG9zdG1hdGUuTW9kZWwsXG4gICAgICAgIGNvbnRleHQ6IERlZmVycmVkPEFwcENvbnRleHQ+XG4gICAgKSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdDtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWc7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gZ2V0TG9nZ2VyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmhhbmRzaGFrZSA9IGhhbmRzaGFrZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gaW5pdFN1YnNjcmlwdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHBsYWNlIGZvciBldmVudHVhbCBleHRlbnNpb25zIG9mIHRoZSBiYXNlIGNsaWVudCBtZXRob2RzLCBzcGVjaWZpYyB0byBhIGNhcGFiaWxpdHlcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqIHByaXZhdGUgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfSB7XG4gICAgICogICByZXR1cm4gIHtcbiAgICAgKiAgICAgZ2V0VGltZVNlcmllczogKCkgPT4gdGhpcy5nZXRUaW1lU2VyaWVzKCk7XG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEFkZGl0aW9uYWxDbGllbnRNZXRob2RzKCk6IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uIH07XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhZGRpdGlvbmFsIG1ldGhvZHMgaW4gYSBjaGVjayBhZ2FpbnN0IHRoZSBjYXBhYmlsaXR5IHR5cGUsIHRoZW4gYXBwbGllcyB0byBwcm92aWRlZCBjbGllbnQgb2JqZWN0LiBEbyBub3Qgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBhcHBseUFkZGl0aW9uYWxNZXRob2RzKGNsaWVudDogRERDbGllbnQpIHtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbE1ldGhvZHMgPSB0aGlzLmdldEFkZGl0aW9uYWxDbGllbnRNZXRob2RzKCk7XG5cbiAgICAgICAgY29uc3Qgd3JhcHBlZE1ldGhvZHM6IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uIH0gPSB7fTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhhZGRpdGlvbmFsTWV0aG9kcykuZm9yRWFjaCgoW2tleSwgbWV0aG9kXSkgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZE1ldGhvZHNba2V5XSA9IGFzeW5jICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IGF3YWl0IHRoaXMuaXNFbmFibGVkKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2QoLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBgVGhlICR7dGhpcy50eXBlfSBjYXBhYmlsaXR5IG11c3QgYmUgZW5hYmxlZCB0byBwZXJmb3JtIHRoaXMgYWN0aW9uYFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oY2xpZW50LCB3cmFwcGVkTWV0aG9kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBjbGllbnQgdG8gcmVnaXN0ZXIgYW4gZXZlbnQgaGFuZGxlciBtYW5hZ2VkIGJ5IHRoaXMgY2FwYWJpbGl0eS4gRG8gbm90IG92ZXJyaWRlXG4gICAgICovXG4gICAgc3Vic2NyaWJlSGFuZGxlcjxUPihcbiAgICAgICAgZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlLFxuICAgICAgICBoYW5kbGVyOiBFdmVudEhhbmRsZXI8VD5cbiAgICApOiAoKSA9PiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSB1bmlxdWVJbnQoKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRUeXBlXVtzdWJzY3JpcHRpb25JZF0gPSBoYW5kbGVyO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgW3N1YnNjcmlwdGlvbklkXTogXyxcbiAgICAgICAgICAgICAgICAuLi5vdGhlclN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRUeXBlXTtcblxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV0gPSBvdGhlclN1YnNjcmlwdGlvbnM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBjbGllbnQgdG8gZGVsZWdhdGUgZXZlbnQgaGFuZGxpbmcuIERvIG5vdCBvdmVycmlkZVxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZUV2ZW50PFQ+KHsgZXZlbnRUeXBlLCBkYXRhIH06IEhhbmRsZUV2ZW50UGFyYW1zPFQ+KSB7XG4gICAgICAgIGNvbnN0IGhhc0hhbmRsZXJzID0gdGhpcy5oYXNIYW5kbGVycyhldmVudFR5cGUpO1xuXG4gICAgICAgIGlmICghaGFzSGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IGF3YWl0IHRoaXMuaXNFbmFibGVkKCk7XG5cbiAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9ucyA9IHRoaXMuc3Vic2NyaXB0aW9uc1tldmVudFR5cGVdO1xuXG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHN1YnNjcmlwdGlvbnMpLmZvckVhY2goaGFuZGxlciA9PiBoYW5kbGVyKGRhdGEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICAgIGBUaGUgJHt0aGlzLnR5cGV9IGNhcGFiaWxpdHkgbXVzdCBiZSBlbmFibGVkIHRvIHJlc3BvbmQgdG8gZXZlbnRzIG9mIHR5cGUgJHtldmVudFR5cGV9LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB0cmlnZ2VyRXZlbnQoZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZSwgZGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IGF3YWl0IHRoaXMuaXNFbmFibGVkKCk7XG5cbiAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gYXdhaXQgdGhpcy5oYW5kc2hha2U7XG4gICAgICAgICAgICBwYXJlbnQuZW1pdChldmVudFR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgICAgYFRoZSAke3RoaXMudHlwZX0gY2FwYWJpbGl0eSBtdXN0IGJlIGVuYWJsZWQgdG8gdHJpZ2dlciBldmVudHMgb2YgdHlwZSAke2V2ZW50VHlwZX0uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlzRW5hYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgeyBjYXBhYmlsaXRpZXMgfSA9IGF3YWl0IHRoaXMuY29udGV4dC5wcm9taXNlO1xuXG4gICAgICAgIHJldHVybiBjYXBhYmlsaXRpZXMuaW5jbHVkZXModGhpcy50eXBlKTtcbiAgICB9XG5cbiAgICBoYXNIYW5kbGVycyhldmVudFR5cGU6IFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhT2JqZWN0LmtleXModGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV0pLmxlbmd0aDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIFVpQXBwQ2FwYWJpbGl0eVR5cGUsXG4gICAgVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBDYXBhYmlsaXR5TWFuYWdlciB9IGZyb20gJy4vY2FwYWJpbGl0eU1hbmFnZXInO1xuXG5leHBvcnQgdHlwZSB7IENhcGFiaWxpdHlNYW5hZ2VyIH0gZnJvbSAnLi9jYXBhYmlsaXR5TWFuYWdlcic7XG5cbmNsYXNzIERhc2hib2FyZENvZ01lbnVNYW5hZ2VyIGV4dGVuZHMgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIHR5cGUgPSBVaUFwcENhcGFiaWxpdHlUeXBlLkRBU0hCT0FSRF9DT0dfTUVOVTtcbiAgICBldmVudHNUb1N1YnNjcmliZSA9IFtVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlLkRBU0hCT0FSRF9DT0dfTUVOVV9DT05URVhUXTtcbiAgICBldmVudHNUb1RyaWdnZXIgPSBbXTtcblxuICAgIGdldEFkZGl0aW9uYWxDbGllbnRNZXRob2RzKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5jbGFzcyBBcHBSb3V0aW5nTWFuYWdlciBleHRlbmRzIENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgICB0eXBlID0gVWlBcHBDYXBhYmlsaXR5VHlwZS5BUFBfUk9VVElORztcbiAgICBldmVudHNUb1N1YnNjcmliZSA9IFtdO1xuICAgIGV2ZW50c1RvVHJpZ2dlciA9IFtcbiAgICAgICAgVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUuUkVMT0FEX0ZSQU1FLFxuICAgICAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZS5PUEVOX1VSTFxuICAgIF07XG5cbiAgICBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhcGFiaWxpdHlNYW5hZ2VycyA9IFtEYXNoYm9hcmRDb2dNZW51TWFuYWdlciwgQXBwUm91dGluZ01hbmFnZXJdO1xuIiwiaW1wb3J0IFBvc3RtYXRlIGZyb20gJ3Bvc3RtYXRlJztcblxuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tICcuL2NhcGFiaWxpdGVzL2NhcGFiaWxpdHlNYW5hZ2VyJztcbmltcG9ydCB7IGNhcGFiaWxpdHlNYW5hZ2VycyB9IGZyb20gJy4vY2FwYWJpbGl0ZXMnO1xuaW1wb3J0IHtcbiAgICBIb3N0LFxuICAgIFVpQXBwQ2FwYWJpbGl0eVR5cGUsXG4gICAgVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRMb2dnZXIsIExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7XG4gICAgQXBwQ29udGV4dCxcbiAgICBFdmVudEhhbmRsZXIsXG4gICAgSGFuZGxlRXZlbnRQYXJhbXMsXG4gICAgQ2xpZW50T3B0aW9uc1xufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IERlZmVycmVkLCBkZWZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgaG9zdDogSG9zdC5TVEFHRSxcbiAgICBkZWJ1ZzogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBERENsaWVudCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBob3N0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhhbmRzaGFrZTogUG9zdG1hdGUuTW9kZWw7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXI6IExvZ2dlcjtcbiAgICBwcml2YXRlIGNvbnRleHQ6IERlZmVycmVkPEFwcENvbnRleHQ+O1xuICAgIHByaXZhdGUgY2FwYWJpbGl0eU1hbmFnZXJzOiBDYXBhYmlsaXR5TWFuYWdlcltdO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2xpZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdCB8fCBERUZBVUxUX09QVElPTlMuaG9zdDtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgREVGQVVMVF9PUFRJT05TLmRlYnVnO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBkZWZlcigpO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcihvcHRpb25zKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIFBvc3RtYXRlLmRlYnVnID0gdGhpcy5fZGVidWc7XG5cbiAgICAgICAgdGhpcy5oYW5kc2hha2UgPSBuZXcgUG9zdG1hdGUuTW9kZWwoe1xuICAgICAgICAgICAgaW5pdDogKGNvbnRleHQ6IEFwcENvbnRleHQpID0+IHRoaXMuaW5pdChjb250ZXh0KSxcbiAgICAgICAgICAgIGhhbmRsZUV2ZW50OiAocGFyYW1zOiBIYW5kbGVFdmVudFBhcmFtcykgPT4gdGhpcy5oYW5kbGVFdmVudChwYXJhbXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzID0gY2FwYWJpbGl0eU1hbmFnZXJzLm1hcChcbiAgICAgICAgICAgIE1hbmFnZXIgPT5cbiAgICAgICAgICAgICAgICBuZXcgTWFuYWdlcihcbiAgICAgICAgICAgICAgICAgICAgeyBob3N0OiB0aGlzLmhvc3QsIGRlYnVnOiB0aGlzLmRlYnVnIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZm9yRWFjaChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmFwcGx5QWRkaXRpb25hbE1ldGhvZHModGhpcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBvbiBhIGNlcnRhaW4gZXZlbnQgdHlwZSBmcm9tIHRoZSBwYXJlbnQuIFdpbGwgcHJpbnRcbiAgICAgKiBhbiBlcnJvciBpZiB0aGUgaW5zdGFsbGVkIGFwcCBkb2VzIG5vdCBoYXZlIHRoZSByZXF1aXJlZCBjYXBhYmlsaXR5LiBSZXR1cm5zIGFuIHVuc3Vic2NyaWJlXG4gICAgICogbWV0aG9kLiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIGJlZm9yZSBoYW5kc2hha2UgaXMgc3VjY2Vzc2Z1bCwgYnV0IGhhbmRsZXJzIHdpbGwgbm90IGV4ZWN1dGUgdW50aWxcbiAgICAgKiBhZnRlciBzdWNjZXNzc2Z1bCBoYW5kc2hha2UuXG4gICAgICovXG4gICAgb248VCA9IGFueT4oXG4gICAgICAgIGV2ZW50VHlwZTogVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICAgICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyPFQ+XG4gICAgKTogKCkgPT4gdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VG9TdWJzY3JpYmVUeXBlKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKCFtYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignVW5rbm93biBldmVudCB0eXBlJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYW5hZ2VyLnN1YnNjcmliZUhhbmRsZXI8VD4oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbiBldmVudCB0eXBlIHRvIGJlIGhhbmRsZWQgaW4gdGhlIHBhcmVudC4gV2lsbCBwcmludFxuICAgICAqIGFuIGVycm9yIGlmIHRoZSBpbnN0YWxsZWQgYXBwIGRvZXMgbm90IGhhdmUgdGhlIHJlcXVpcmVkIGNhcGFiaWxpdHkuXG4gICAgICogVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCBiZWZvcmUgaGFuZHNoYWtlIGlzIHN1Y2Nlc3NmdWwsIGJ1dCBoYW5kbGVycyB3aWxsIG5vdCBleGVjdXRlIHVudGlsXG4gICAgICogYWZ0ZXIgc3VjY2Vzc3NmdWwgaGFuZHNoYWtlLlxuICAgICAqL1xuXG4gICAgdHJpZ2dlckV2ZW50KGV2ZW50VHlwZTogVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUsIGRhdGE6IGFueSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VG9UcmlnZ2VyVHlwZShldmVudFR5cGUpO1xuICAgICAgICBpZiAoIW1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdVbmtub3duIGV2ZW50IHR5cGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hbmFnZXIudHJpZ2dlckV2ZW50KGV2ZW50VHlwZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFwcCBjb250ZXh0IGRhdGEsIGFmdGVyIGl0IGlzIHNlbnQgZnJvbSB0aGUgcGFyZW50XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q29udGV4dCgpOiBQcm9taXNlPEFwcENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN5bnRhY3RpYyBzdWdhciB0cmlnZ2VyIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLlJFTE9BRF9GUkFNRSB3aGljaCByZWxvYWRzIHRoZSBjdXJyZW50IGNoaWxkIGZyYW1lIGFuZCByZS1pbml0aWF0ZSB0aGUgaGFuZHNoYWtlIHdpdGggdGhlIHBhcmVudFxuICAgICAqL1xuICAgIHJlbG9hZEZyYW1lKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZS5SRUxPQURfRlJBTUUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZHMgdGhlIGN1cnJlbnQgY2hpbGQgZnJhbWUgYW5kIHJlLWluaXRpYXRlIHRoZSBoYW5kc2hha2Ugd2l0aCB0aGUgcGFyZW50XG4gICAgICovXG4gICAgYXN5bmMgbG9hZEZyYW1lV2l0aFVSTCh1cmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBhd2FpdCB0aGlzLmhhbmRzaGFrZTtcbiAgICAgICAgcGFyZW50LmVtaXQoJ2xvYWRGcmFtZVdpdGhVUkwnLCB1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluaXQgbWV0aG9kIGlzIGV4cG9zZWQgaW4gdGhlIHBvc3RtYXRlIG1vZGVsLiBJdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgb3RoZXIgb3BlcmF0aW9ucyBtYXkgcHJvY2VlZCxcbiAgICAgKiBpbiBvcmRlciB0byBpbmZvcm0gY2xpZW50IG9mIGFwcCBjb250ZXh0XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KGNvbnRleHQ6IEFwcENvbnRleHQpIHtcbiAgICAgICAgLy8gcGFyZW50IHNob3VsZCBvbmx5IGJlIGFibGUgdG8gY2FsbCB0aGlzIGFmdGVyIGhhbmRzaGFrZSBpcyBjb21wbGV0ZSwgYnV0IGl0cyB3b3J0aCBhIGNoZWNrIGFueXdheXNcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kc2hha2U7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnJlc29sdmUoY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKFxuICAgICAgICAgICAgJ2RkLWFwcHM6IHNkayBoYW5kc2hha2U6IHBhcmVudCA8LT4gY2hpbGQgaGFuZHNoYWtlIGlzIGNvbXBsZXRlJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZUV2ZW50IGlzIHRoZSBtYWluIG1ldGhvZCBjYWxsZWQgYnkgdGhlIHBhcmVudCB0aHJvdWdoIHBvc3RtYXRlIChjaGlsZC5oYW5kbGVFdmVudCgnZXhlYycsIHsuLi59KSkuXG4gICAgICogSXQgYWNjZXB0cyBhIGtleWVkIGV2ZW50IHR5cGUgYW5kIGFyYml0cmFyeSBkYXRhIHRvIGJlIHBhc3NlZCB0byBldmVudCBoYW5kbGVycy4gSXQgd2lsbCBsb2cgYW4gZXJyb3JcbiAgICAgKiBtZXNzYWdlIGlmIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHJlcXVpcmVkIGNhcGFiaWxpdHkgZW5hYmxlZFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgaGFuZGxlRXZlbnQ8VD4oeyBldmVudFR5cGUsIGRhdGEgfTogSGFuZGxlRXZlbnRQYXJhbXM8VD4pIHtcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IHRoaXMuZ2V0TWFuYWdlckJ5RXZlbnRUb1N1YnNjcmliZVR5cGUoZXZlbnRUeXBlKTtcblxuICAgICAgICBpZiAoIW1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICAgICdDb3VsZCBub3QgaGFuZGxlIGV2ZW50OiBubyBjb3JyZXNwb25kaW5nIG1hbmFnZXIgZm91bmQnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLmhhbmRsZUV2ZW50KHsgZXZlbnRUeXBlLCBkYXRhIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWFuYWdlckJ5VHlwZShcbiAgICAgICAgY2FwYWJpbGl0eVR5cGU6IFVpQXBwQ2FwYWJpbGl0eVR5cGVcbiAgICApOiBDYXBhYmlsaXR5TWFuYWdlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdHlNYW5hZ2Vycy5maW5kKFxuICAgICAgICAgICAgbWFuYWdlciA9PiBtYW5hZ2VyLnR5cGUgPT09IGNhcGFiaWxpdHlUeXBlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNYW5hZ2VyQnlFdmVudFRvU3Vic2NyaWJlVHlwZShcbiAgICAgICAgZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlXG4gICAgKTogQ2FwYWJpbGl0eU1hbmFnZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZmluZChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmV2ZW50c1RvU3Vic2NyaWJlLmluY2x1ZGVzKGV2ZW50VHlwZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1hbmFnZXJCeUV2ZW50VG9UcmlnZ2VyVHlwZShcbiAgICAgICAgZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxuICAgICk6IENhcGFiaWxpdHlNYW5hZ2VyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzLmZpbmQobWFuYWdlciA9PlxuICAgICAgICAgICAgbWFuYWdlci5ldmVudHNUb1RyaWdnZXIuaW5jbHVkZXMoZXZlbnRUeXBlKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImV4cG9ydCBlbnVtIEhvc3Qge1xuICAgIFBST0QgPSAnaHR0cHM6Ly9hcHAuZGF0YWRvZ2hxLmNvbS8nLFxuICAgIFNUQUdFID0gJ2h0dHBzOi8vZGQuZGF0YWQwZy5jb20vJ1xufVxuXG5leHBvcnQgZW51bSBVaUFwcENhcGFiaWxpdHlUeXBlIHtcbiAgICBBUFBfQ09OVEVYVCA9ICdhcHBfY29udGV4dCcsXG4gICAgREFTSEJPQVJEX0NPR19NRU5VID0gJ2Rhc2hib2FyZF9jb2dfbWVudScsXG4gICAgREFTSEJPQVJEX0NVU1RPTV9XSURHRVQgPSAnZGFzaGJvYXJkX2N1c3RvbV93aWRnZXQnLFxuICAgIEFQUF9ST1VUSU5HID0gJ2FwcF9yb3V0aW5nJ1xufVxuXG5leHBvcnQgZW51bSBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlIHtcbiAgICBEQVNIQk9BUkRfQ09HX01FTlVfQ09OVEVYVCA9ICdkYXNoYm9hcmRfY29nX21lbnVfY29udGV4dCdcbn1cbmV4cG9ydCBlbnVtIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlIHtcbiAgICBSRUxPQURfRlJBTUUgPSAncmVsb2FkX2ZyYW1lJyxcbiAgICBPUEVOX1VSTCA9ICdvcGVuX3VybCdcbn1cbiIsImltcG9ydCB7IEREQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgQXBwQ29udGV4dCwgQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5sZXQgY2xpZW50OiBERENsaWVudDtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIGNsaWVudCwgb3IgcmV0dXJucyBhbiBleGlzdGluZyBvbmUgaWYgYWxyZWFkeSBpbml0aWFsaXplZC4gVXNlciBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2l0aCBhcHAgY29udGV4dCBkYXRhIHdoZW4gaXQgaXMgc2VudCBmcm9tIHRoZSBwYXJlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0ID0gKFxuICAgIG9wdGlvbnM/OiBDbGllbnRPcHRpb25zLFxuICAgIGNhbGxiYWNrPzogKGNvbnRleHQ6IEFwcENvbnRleHQpID0+IHZvaWRcbik6IEREQ2xpZW50ID0+IHtcbiAgICBpZiAoIWNsaWVudCkge1xuICAgICAgICBjbGllbnQgPSBuZXcgRERDbGllbnQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNsaWVudC5nZXRDb250ZXh0KCkudGhlbihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudDtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBDbGllbnRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyIHtcbiAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0TG9nZ2VyID0gKG9wdGlvbnM6IENsaWVudE9wdGlvbnMpOiBMb2dnZXIgPT4ge1xuICAgIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGBkZC1hcHBzOiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoYGRkLWFwcHM6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9nKCkge30sXG4gICAgICAgICAgICBlcnJvcigpIHt9XG4gICAgICAgIH07XG4gICAgfVxufTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgRGVmZXJyZWQ8VD4ge1xuICAgIHJlc29sdmU6ICh0OiBUKSA9PiB2b2lkO1xuICAgIHJlamVjdDogKHQ6IFQpID0+IHZvaWQ7XG4gICAgcHJvbWlzZTogUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVmZmVycmVkIG9iamVjdCwgaW5jbHVkaW5nIHByb21pc2UgYW5kIHJlc29sdmUgKyByZWplY3QgbWV0aG9kcyB0byBiZSBleGVjdXRlZCBsYXRlclxuICovXG5leHBvcnQgY29uc3QgZGVmZXIgPSA8VD4oKTogRGVmZXJyZWQ8VD4gPT4ge1xuICAgIGxldCByZXNvbHZlOiAodDogVCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIGxldCByZWplY3Q6ICh0OiBUKSA9PiB2b2lkID0gKCkgPT4ge307XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXMsIHJlaikgPT4ge1xuICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlLFxuICAgICAgICByZWplY3QsXG4gICAgICAgIHByb21pc2VcbiAgICB9O1xufTtcblxubGV0IGluY3JlbWVudDogbnVtYmVyID0gMDtcblxuLy8gZ2VuZXJhdGVzIGFuIGludGVnZXIsIGd1YXJhbnRlZWQgdG8gYmUgdW5pcXVlIGJlY3Vhc2UgaXQncyBpbmNyZW1lbnRlZCA6KVxuZXhwb3J0IGNvbnN0IHVuaXF1ZUludCA9ICgpOiBudW1iZXIgPT4ge1xuICAgIGluY3JlbWVudCsrO1xuXG4gICAgcmV0dXJuIGluY3JlbWVudDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9