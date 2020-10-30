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
                parent.emit(eventType, data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERF9TREsvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0REX1NESy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ERF9TREsvLi9ub2RlX21vZHVsZXMvcG9zdG1hdGUvYnVpbGQvcG9zdG1hdGUuZXMuanMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2NhcGFiaWxpdGVzL2NhcGFiaWxpdHlNYW5hZ2VyLnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9jYXBhYmlsaXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9ERF9TREsvLi9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0REX1NESy8uL3NyYy9sb2dnZXIudHMiLCJ3ZWJwYWNrOi8vRERfU0RLLy4vc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztR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QVksT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRCxDQUFDO1NBQ0osQ0FBQztLQUNMO1NBQU07UUFDSCxPQUFPO1lBQ0gsR0FBRyxLQUFJLENBQUM7WUFDUixLQUFLLEtBQUksQ0FBQztTQUNiLENBQUM7S0FDTDtBQUNMLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCRjs7R0FFRztBQUNVLGFBQUssR0FBRyxHQUFtQixFQUFFO0lBQ3RDLElBQUksT0FBTyxHQUFtQixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDdkMsSUFBSSxNQUFNLEdBQW1CLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN4QyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU87UUFDSCxPQUFPO1FBQ1AsTUFBTTtRQUNOLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0FBRTFCLDRFQUE0RTtBQUMvRCxpQkFBUyxHQUFHLEdBQVcsRUFBRTtJQUNsQyxTQUFTLEVBQUUsQ0FBQztJQUVaLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRERfU0RLXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkREX1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKipcbiAgcG9zdG1hdGUgLSBBIHBvd2VyZnVsLCBzaW1wbGUsIHByb21pc2UtYmFzZWQgcG9zdE1lc3NhZ2UgbGlicmFyeVxuICBAdmVyc2lvbiB2MS41LjJcbiAgQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RvbGxhcnNoYXZlY2x1Yi9wb3N0bWF0ZVxuICBAYXV0aG9yIEphY29iIEtlbGxleSA8amFraWU4QGdtYWlsLmNvbT5cbiAgQGxpY2Vuc2UgTUlUXG4qKi9cbi8qKlxuICogVGhlIHR5cGUgb2YgbWVzc2FnZXMgb3VyIGZyYW1lcyBvdXIgc2VuZGluZ1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIG1lc3NhZ2VUeXBlID0gJ2FwcGxpY2F0aW9uL3gtcG9zdG1hdGUtdjEranNvbic7XG4vKipcbiAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhdHRlbXB0cyB0byBzZW5kIGEgaGFuZHNoYWtlIHJlcXVlc3QgdG8gdGhlIHBhcmVudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuXG52YXIgbWF4SGFuZHNoYWtlUmVxdWVzdHMgPSA1O1xuLyoqXG4gKiBBIHVuaXF1ZSBtZXNzYWdlIElEIHRoYXQgaXMgdXNlZCB0byBlbnN1cmUgcmVzcG9uc2VzIGFyZSBzZW50IHRvIHRoZSBjb3JyZWN0IHJlcXVlc3RzXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5cbnZhciBfbWVzc2FnZUlkID0gMDtcbi8qKlxuICogSW5jcmVtZW50cyBhbmQgcmV0dXJucyBhIG1lc3NhZ2UgSURcbiAqIEByZXR1cm4ge051bWJlcn0gQSB1bmlxdWUgSUQgZm9yIGEgbWVzc2FnZVxuICovXG5cbnZhciBnZW5lcmF0ZU5ld01lc3NhZ2VJZCA9IGZ1bmN0aW9uIGdlbmVyYXRlTmV3TWVzc2FnZUlkKCkge1xuICByZXR1cm4gKytfbWVzc2FnZUlkO1xufTtcbi8qKlxuICogUG9zdG1hdGUgbG9nZ2luZyBmdW5jdGlvbiB0aGF0IGVuYWJsZXMvZGlzYWJsZXMgdmlhIGNvbmZpZ1xuICogQHBhcmFtICB7T2JqZWN0fSAuLi5hcmdzIFJlc3QgQXJndW1lbnRzXG4gKi9cblxudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBQb3N0bWF0ZS5kZWJ1ZyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuLyoqXG4gKiBUYWtlcyBhIFVSTCBhbmQgcmV0dXJucyB0aGUgb3JpZ2luXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgZnVsbCBVUkwgYmVpbmcgcmVxdWVzdGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICBUaGUgVVJMcyBvcmlnaW5cbiAqL1xuXG52YXIgcmVzb2x2ZU9yaWdpbiA9IGZ1bmN0aW9uIHJlc29sdmVPcmlnaW4odXJsKSB7XG4gIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIHZhciBwcm90b2NvbCA9IGEucHJvdG9jb2wubGVuZ3RoID4gNCA/IGEucHJvdG9jb2wgOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gIHZhciBob3N0ID0gYS5ob3N0Lmxlbmd0aCA/IGEucG9ydCA9PT0gJzgwJyB8fCBhLnBvcnQgPT09ICc0NDMnID8gYS5ob3N0bmFtZSA6IGEuaG9zdCA6IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICByZXR1cm4gYS5vcmlnaW4gfHwgcHJvdG9jb2wgKyBcIi8vXCIgKyBob3N0O1xufTtcbnZhciBtZXNzYWdlVHlwZXMgPSB7XG4gIGhhbmRzaGFrZTogMSxcbiAgJ2hhbmRzaGFrZS1yZXBseSc6IDEsXG4gIGNhbGw6IDEsXG4gIGVtaXQ6IDEsXG4gIHJlcGx5OiAxLFxuICByZXF1ZXN0OiAxXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgYSBtZXNzYWdlIGlzIHNhZmUgdG8gaW50ZXJwcmV0XG4gICAqIEBwYXJhbSAge09iamVjdH0gbWVzc2FnZSBUaGUgcG9zdG1hdGUgbWVzc2FnZSBiZWluZyBzZW50XG4gICAqIEBwYXJhbSAge1N0cmluZ3xCb29sZWFufSBhbGxvd2VkT3JpZ2luIFRoZSB3aGl0ZWxpc3RlZCBvcmlnaW4gb3IgZmFsc2UgdG8gc2tpcCBvcmlnaW4gY2hlY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbn07XG52YXIgc2FuaXRpemUgPSBmdW5jdGlvbiBzYW5pdGl6ZShtZXNzYWdlLCBhbGxvd2VkT3JpZ2luKSB7XG4gIGlmICh0eXBlb2YgYWxsb3dlZE9yaWdpbiA9PT0gJ3N0cmluZycgJiYgbWVzc2FnZS5vcmlnaW4gIT09IGFsbG93ZWRPcmlnaW4pIHJldHVybiBmYWxzZTtcbiAgaWYgKCFtZXNzYWdlLmRhdGEpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBtZXNzYWdlLmRhdGEgPT09ICdvYmplY3QnICYmICEoJ3Bvc3RtYXRlJyBpbiBtZXNzYWdlLmRhdGEpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChtZXNzYWdlLmRhdGEudHlwZSAhPT0gbWVzc2FnZVR5cGUpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFtZXNzYWdlVHlwZXNbbWVzc2FnZS5kYXRhLnBvc3RtYXRlXSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4vKipcbiAqIFRha2VzIGEgbW9kZWwsIGFuZCBzZWFyY2hlcyBmb3IgYSB2YWx1ZSBieSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSAge09iamVjdH0gbW9kZWwgICAgIFRoZSBkaWN0aW9uYXJ5IHRvIHNlYXJjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3BlcnR5ICBBIHBhdGggd2l0aGluIGEgZGljdGlvbmFyeSAoaS5lLiAnd2luZG93LmxvY2F0aW9uLmhyZWYnKVxuICogQHBhcmFtICB7T2JqZWN0fSBkYXRhICAgICAgQWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBnZXQgcmVxdWVzdCB0aGF0IGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzZWQgdG8gZnVuY3Rpb25zIGluIHRoZSBjaGlsZCBtb2RlbFxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuXG52YXIgcmVzb2x2ZVZhbHVlID0gZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKG1vZGVsLCBwcm9wZXJ0eSkge1xuICB2YXIgdW53cmFwcGVkQ29udGV4dCA9IHR5cGVvZiBtb2RlbFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicgPyBtb2RlbFtwcm9wZXJ0eV0oKSA6IG1vZGVsW3Byb3BlcnR5XTtcbiAgcmV0dXJuIFBvc3RtYXRlLlByb21pc2UucmVzb2x2ZSh1bndyYXBwZWRDb250ZXh0KTtcbn07XG4vKipcbiAqIENvbXBvc2VzIGFuIEFQSSB0byBiZSB1c2VkIGJ5IHRoZSBwYXJlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIEluZm9ybWF0aW9uIG9uIHRoZSBjb25zdW1lclxuICovXG5cbnZhciBQYXJlbnRBUEkgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQYXJlbnRBUEkoaW5mbykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnBhcmVudCA9IGluZm8ucGFyZW50O1xuICAgIHRoaXMuZnJhbWUgPSBpbmZvLmZyYW1lO1xuICAgIHRoaXMuY2hpbGQgPSBpbmZvLmNoaWxkO1xuICAgIHRoaXMuY2hpbGRPcmlnaW4gPSBpbmZvLmNoaWxkT3JpZ2luO1xuICAgIHRoaXMuZXZlbnRzID0ge307XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdQYXJlbnQ6IFJlZ2lzdGVyaW5nIEFQSScpO1xuICAgICAgbG9nKCdQYXJlbnQ6IEF3YWl0aW5nIG1lc3NhZ2VzLi4uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIXNhbml0aXplKGUsIF90aGlzLmNoaWxkT3JpZ2luKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLyoqXG4gICAgICAgKiB0aGUgYXNzaWdubWVudHMgYmVsb3cgZW5zdXJlcyB0aGF0IGUsIGRhdGEsIGFuZCB2YWx1ZSBhcmUgYWxsIGRlZmluZWRcbiAgICAgICAqL1xuXG4gICAgICB2YXIgX3JlZiA9ICgoZSB8fCB7fSkuZGF0YSB8fCB7fSkudmFsdWUgfHwge30sXG4gICAgICAgICAgZGF0YSA9IF9yZWYuZGF0YSxcbiAgICAgICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnZW1pdCcpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsb2coXCJQYXJlbnQ6IFJlY2VpdmVkIGV2ZW50IGVtaXNzaW9uOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgaW4gX3RoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgX3RoaXMuZXZlbnRzW25hbWVdLmNhbGwoX3RoaXMsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmxpc3RlbmVyLCBmYWxzZSk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdQYXJlbnQ6IEF3YWl0aW5nIGV2ZW50IGVtaXNzaW9ucyBmcm9tIENoaWxkJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIF9wcm90byA9IFBhcmVudEFQSS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmdldCA9IGZ1bmN0aW9uIGdldChwcm9wZXJ0eSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAvLyBFeHRyYWN0IGRhdGEgZnJvbSByZXNwb25zZSBhbmQga2lsbCBsaXN0ZW5lcnNcbiAgICAgIHZhciB1aWQgPSBnZW5lcmF0ZU5ld01lc3NhZ2VJZCgpO1xuXG4gICAgICB2YXIgdHJhbnNhY3QgPSBmdW5jdGlvbiB0cmFuc2FjdChlKSB7XG4gICAgICAgIGlmIChlLmRhdGEudWlkID09PSB1aWQgJiYgZS5kYXRhLnBvc3RtYXRlID09PSAncmVwbHknKSB7XG4gICAgICAgICAgX3RoaXMyLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdHJhbnNhY3QsIGZhbHNlKTtcblxuICAgICAgICAgIHJlc29sdmUoZS5kYXRhLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gUHJlcGFyZSBmb3IgcmVzcG9uc2UgZnJvbSBDaGlsZC4uLlxuXG5cbiAgICAgIF90aGlzMi5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRyYW5zYWN0LCBmYWxzZSk7IC8vIFRoZW4gYXNrIGNoaWxkIGZvciBpbmZvcm1hdGlvblxuXG5cbiAgICAgIF90aGlzMi5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHBvc3RtYXRlOiAncmVxdWVzdCcsXG4gICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHVpZDogdWlkXG4gICAgICB9LCBfdGhpczIuY2hpbGRPcmlnaW4pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jYWxsID0gZnVuY3Rpb24gY2FsbChwcm9wZXJ0eSwgZGF0YSkge1xuICAgIC8vIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGNoaWxkXG4gICAgdGhpcy5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICBwb3N0bWF0ZTogJ2NhbGwnLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgdGhpcy5jaGlsZE9yaWdpbik7XG4gIH07XG5cbiAgX3Byb3RvLm9uID0gZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBjYWxsYmFjaztcbiAgfTtcblxuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBEZXN0cm95aW5nIFBvc3RtYXRlIGluc3RhbmNlJyk7XG4gICAgfVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmxpc3RlbmVyLCBmYWxzZSk7XG4gICAgdGhpcy5mcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZnJhbWUpO1xuICB9O1xuXG4gIHJldHVybiBQYXJlbnRBUEk7XG59KCk7XG4vKipcbiAqIENvbXBvc2VzIGFuIEFQSSB0byBiZSB1c2VkIGJ5IHRoZSBjaGlsZFxuICogQHBhcmFtIHtPYmplY3R9IGluZm8gSW5mb3JtYXRpb24gb24gdGhlIGNvbnN1bWVyXG4gKi9cblxudmFyIENoaWxkQVBJID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2hpbGRBUEkoaW5mbykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5tb2RlbCA9IGluZm8ubW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSBpbmZvLnBhcmVudDtcbiAgICB0aGlzLnBhcmVudE9yaWdpbiA9IGluZm8ucGFyZW50T3JpZ2luO1xuICAgIHRoaXMuY2hpbGQgPSBpbmZvLmNoaWxkO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnQ2hpbGQ6IFJlZ2lzdGVyaW5nIEFQSScpO1xuICAgICAgbG9nKCdDaGlsZDogQXdhaXRpbmcgbWVzc2FnZXMuLi4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFzYW5pdGl6ZShlLCBfdGhpczMucGFyZW50T3JpZ2luKSkgcmV0dXJuO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2coJ0NoaWxkOiBSZWNlaXZlZCByZXF1ZXN0JywgZS5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgdmFyIF9lJGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAgcHJvcGVydHkgPSBfZSRkYXRhLnByb3BlcnR5LFxuICAgICAgICAgIHVpZCA9IF9lJGRhdGEudWlkLFxuICAgICAgICAgIGRhdGEgPSBfZSRkYXRhLmRhdGE7XG5cbiAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdjYWxsJykge1xuICAgICAgICBpZiAocHJvcGVydHkgaW4gX3RoaXMzLm1vZGVsICYmIHR5cGVvZiBfdGhpczMubW9kZWxbcHJvcGVydHldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgX3RoaXMzLm1vZGVsW3Byb3BlcnR5XShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUmVwbHkgdG8gUGFyZW50XG5cblxuICAgICAgcmVzb2x2ZVZhbHVlKF90aGlzMy5tb2RlbCwgcHJvcGVydHkpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBlLnNvdXJjZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHBvc3RtYXRlOiAncmVwbHknLFxuICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICAgIHVpZDogdWlkLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9LCBlLm9yaWdpbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfcHJvdG8yID0gQ2hpbGRBUEkucHJvdG90eXBlO1xuXG4gIF9wcm90bzIuZW1pdCA9IGZ1bmN0aW9uIGVtaXQobmFtZSwgZGF0YSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coXCJDaGlsZDogRW1pdHRpbmcgRXZlbnQgXFxcIlwiICsgbmFtZSArIFwiXFxcIlwiLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICBwb3N0bWF0ZTogJ2VtaXQnLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9XG4gICAgfSwgdGhpcy5wYXJlbnRPcmlnaW4pO1xuICB9O1xuXG4gIHJldHVybiBDaGlsZEFQSTtcbn0oKTtcbi8qKlxuICAqIFRoZSBlbnRyeSBwb2ludCBvZiB0aGUgUGFyZW50LlxuICogQHR5cGUge0NsYXNzfVxuICovXG5cbnZhciBQb3N0bWF0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgY3JhcHMgaXRzZWxmXG5cbiAgLyoqXG4gICAqIFNldHMgb3B0aW9ucyByZWxhdGVkIHRvIHRoZSBQYXJlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZWxlbWVudCB0byBpbmplY3QgdGhlIGZyYW1lIGludG8sIGFuZCB0aGUgdXJsXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmdW5jdGlvbiBQb3N0bWF0ZShfcmVmMikge1xuICAgIHZhciBfcmVmMiRjb250YWluZXIgPSBfcmVmMi5jb250YWluZXIsXG4gICAgICAgIGNvbnRhaW5lciA9IF9yZWYyJGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdHlwZW9mIGNvbnRhaW5lciAhPT0gJ3VuZGVmaW5lZCcgPyBjb250YWluZXIgOiBkb2N1bWVudC5ib2R5IDogX3JlZjIkY29udGFpbmVyLFxuICAgICAgICBtb2RlbCA9IF9yZWYyLm1vZGVsLFxuICAgICAgICB1cmwgPSBfcmVmMi51cmwsXG4gICAgICAgIG5hbWUgPSBfcmVmMi5uYW1lLFxuICAgICAgICBfcmVmMiRjbGFzc0xpc3RBcnJheSA9IF9yZWYyLmNsYXNzTGlzdEFycmF5LFxuICAgICAgICBjbGFzc0xpc3RBcnJheSA9IF9yZWYyJGNsYXNzTGlzdEFycmF5ID09PSB2b2lkIDAgPyBbXSA6IF9yZWYyJGNsYXNzTGlzdEFycmF5O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgICB0aGlzLnBhcmVudCA9IHdpbmRvdztcbiAgICB0aGlzLmZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgdGhpcy5mcmFtZS5uYW1lID0gbmFtZSB8fCAnJztcbiAgICB0aGlzLmZyYW1lLmNsYXNzTGlzdC5hZGQuYXBwbHkodGhpcy5mcmFtZS5jbGFzc0xpc3QsIGNsYXNzTGlzdEFycmF5KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFtZSk7XG4gICAgdGhpcy5jaGlsZCA9IHRoaXMuZnJhbWUuY29udGVudFdpbmRvdyB8fCB0aGlzLmZyYW1lLmNvbnRlbnREb2N1bWVudC5wYXJlbnRXaW5kb3c7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgIHJldHVybiB0aGlzLnNlbmRIYW5kc2hha2UodXJsKTtcbiAgfVxuICAvKipcbiAgICogQmVnaW5zIHRoZSBoYW5kc2hha2Ugc3RyYXRlZ3lcbiAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBzZW5kIGEgaGFuZHNoYWtlIHJlcXVlc3QgdG9cbiAgICogQHJldHVybiB7UHJvbWlzZX0gICAgIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBoYW5kc2hha2UgaXMgY29tcGxldGVcbiAgICovXG5cblxuICB2YXIgX3Byb3RvMyA9IFBvc3RtYXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLnNlbmRIYW5kc2hha2UgPSBmdW5jdGlvbiBzZW5kSGFuZHNoYWtlKHVybCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgdmFyIGNoaWxkT3JpZ2luID0gcmVzb2x2ZU9yaWdpbih1cmwpO1xuICAgIHZhciBhdHRlbXB0ID0gMDtcbiAgICB2YXIgcmVzcG9uc2VJbnRlcnZhbDtcbiAgICByZXR1cm4gbmV3IFBvc3RtYXRlLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcGx5ID0gZnVuY3Rpb24gcmVwbHkoZSkge1xuICAgICAgICBpZiAoIXNhbml0aXplKGUsIGNoaWxkT3JpZ2luKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdoYW5kc2hha2UtcmVwbHknKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChyZXNwb25zZUludGVydmFsKTtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ1BhcmVudDogUmVjZWl2ZWQgaGFuZHNoYWtlIHJlcGx5IGZyb20gQ2hpbGQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpczQucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCByZXBseSwgZmFsc2UpO1xuXG4gICAgICAgICAgX3RoaXM0LmNoaWxkT3JpZ2luID0gZS5vcmlnaW47XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdQYXJlbnQ6IFNhdmluZyBDaGlsZCBvcmlnaW4nLCBfdGhpczQuY2hpbGRPcmlnaW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBQYXJlbnRBUEkoX3RoaXM0KSk7XG4gICAgICAgIH0gLy8gTWlnaHQgbmVlZCB0byByZW1vdmUgc2luY2UgcGFyZW50IG1pZ2h0IGJlIHJlY2VpdmluZyBkaWZmZXJlbnQgbWVzc2FnZXNcbiAgICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgaG9zdHNcblxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKCdQYXJlbnQ6IEludmFsaWQgaGFuZHNoYWtlIHJlcGx5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVqZWN0KCdGYWlsZWQgaGFuZHNoYWtlJyk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpczQucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCByZXBseSwgZmFsc2UpO1xuXG4gICAgICB2YXIgZG9TZW5kID0gZnVuY3Rpb24gZG9TZW5kKCkge1xuICAgICAgICBhdHRlbXB0Kys7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsb2coXCJQYXJlbnQ6IFNlbmRpbmcgaGFuZHNoYWtlIGF0dGVtcHQgXCIgKyBhdHRlbXB0LCB7XG4gICAgICAgICAgICBjaGlsZE9yaWdpbjogY2hpbGRPcmlnaW5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzNC5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgcG9zdG1hdGU6ICdoYW5kc2hha2UnLFxuICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICAgIG1vZGVsOiBfdGhpczQubW9kZWxcbiAgICAgICAgfSwgY2hpbGRPcmlnaW4pO1xuXG4gICAgICAgIGlmIChhdHRlbXB0ID09PSBtYXhIYW5kc2hha2VSZXF1ZXN0cykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVzcG9uc2VJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBsb2FkZWQgPSBmdW5jdGlvbiBsb2FkZWQoKSB7XG4gICAgICAgIGRvU2VuZCgpO1xuICAgICAgICByZXNwb25zZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZG9TZW5kLCA1MDApO1xuICAgICAgfTtcblxuICAgICAgaWYgKF90aGlzNC5mcmFtZS5hdHRhY2hFdmVudCkge1xuICAgICAgICBfdGhpczQuZnJhbWUuYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGxvYWRlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczQuZnJhbWUub25sb2FkID0gbG9hZGVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2coJ1BhcmVudDogTG9hZGluZyBmcmFtZScsIHtcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3RoaXM0LmZyYW1lLnNyYyA9IHVybDtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUG9zdG1hdGU7XG59KCk7XG4vKipcbiAqIFRoZSBlbnRyeSBwb2ludCBvZiB0aGUgQ2hpbGRcbiAqIEB0eXBlIHtDbGFzc31cbiAqL1xuXG5cblBvc3RtYXRlLmRlYnVnID0gZmFsc2U7XG5cblBvc3RtYXRlLlByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdyA/IHdpbmRvdy5Qcm9taXNlIDogUHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59KCk7XG5cblBvc3RtYXRlLk1vZGVsID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjaGlsZCwgbW9kZWwsIHBhcmVudCwgYW5kIHJlc3BvbmRzIHRvIHRoZSBQYXJlbnRzIGhhbmRzaGFrZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kZWwgSGFzaCBvZiB2YWx1ZXMsIGZ1bmN0aW9ucywgb3IgcHJvbWlzZXNcbiAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgVGhlIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBoYW5kc2hha2UgaGFzIGJlZW4gcmVjZWl2ZWRcbiAgICovXG4gIGZ1bmN0aW9uIE1vZGVsKG1vZGVsKSB7XG4gICAgdGhpcy5jaGlsZCA9IHdpbmRvdztcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSB0aGlzLmNoaWxkLnBhcmVudDtcbiAgICByZXR1cm4gdGhpcy5zZW5kSGFuZHNoYWtlUmVwbHkoKTtcbiAgfVxuICAvKipcbiAgICogUmVzcG9uZHMgdG8gYSBoYW5kc2hha2UgaW5pdGlhdGVkIGJ5IHRoZSBQYXJlbnRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZXMgYW4gb2JqZWN0IHRoYXQgZXhwb3NlcyBhbiBBUEkgZm9yIHRoZSBDaGlsZFxuICAgKi9cblxuXG4gIHZhciBfcHJvdG80ID0gTW9kZWwucHJvdG90eXBlO1xuXG4gIF9wcm90bzQuc2VuZEhhbmRzaGFrZVJlcGx5ID0gZnVuY3Rpb24gc2VuZEhhbmRzaGFrZVJlcGx5KCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBzaGFrZSA9IGZ1bmN0aW9uIHNoYWtlKGUpIHtcbiAgICAgICAgaWYgKCFlLmRhdGEucG9zdG1hdGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnaGFuZHNoYWtlJykge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ0NoaWxkOiBSZWNlaXZlZCBoYW5kc2hha2UgZnJvbSBQYXJlbnQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpczUuY2hpbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHNoYWtlLCBmYWxzZSk7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogU2VuZGluZyBoYW5kc2hha2UgcmVwbHkgdG8gUGFyZW50Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZS5zb3VyY2UucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgcG9zdG1hdGU6ICdoYW5kc2hha2UtcmVwbHknLFxuICAgICAgICAgICAgdHlwZTogbWVzc2FnZVR5cGVcbiAgICAgICAgICB9LCBlLm9yaWdpbik7XG4gICAgICAgICAgX3RoaXM1LnBhcmVudE9yaWdpbiA9IGUub3JpZ2luOyAvLyBFeHRlbmQgbW9kZWwgd2l0aCB0aGUgb25lIHByb3ZpZGVkIGJ5IHRoZSBwYXJlbnRcblxuICAgICAgICAgIHZhciBkZWZhdWx0cyA9IGUuZGF0YS5tb2RlbDtcblxuICAgICAgICAgIGlmIChkZWZhdWx0cykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICBfdGhpczUubW9kZWxba2V5XSA9IGRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgbG9nKCdDaGlsZDogSW5oZXJpdGVkIGFuZCBleHRlbmRlZCBtb2RlbCBmcm9tIFBhcmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ0NoaWxkOiBTYXZpbmcgUGFyZW50IG9yaWdpbicsIF90aGlzNS5wYXJlbnRPcmlnaW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBDaGlsZEFQSShfdGhpczUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWplY3QoJ0hhbmRzaGFrZSBSZXBseSBGYWlsZWQnKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzNS5jaGlsZC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgc2hha2UsIGZhbHNlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTW9kZWw7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RtYXRlO1xuIiwiaW1wb3J0ICogYXMgUG9zdG1hdGUgZnJvbSAncG9zdG1hdGUnO1xuXG5pbXBvcnQgdHlwZSB7IEREQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7XG4gICAgVWlBcHBDYXBhYmlsaXR5VHlwZSxcbiAgICBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlLFxuICAgIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRMb2dnZXIsIExvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge1xuICAgIEFwcENvbnRleHQsXG4gICAgQ2xpZW50T3B0aW9ucyxcbiAgICBFdmVudEhhbmRsZXIsXG4gICAgSGFuZGxlRXZlbnRQYXJhbXNcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgRGVmZXJyZWQsIHVuaXF1ZUludCB9IGZyb20gJy4uL3V0aWxzJztcblxudHlwZSBTdWJzY3JpcHRpb25zID0ge1xuICAgIFtrZXkgaW4gVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZV06IHsgW2lkOiBudW1iZXJdOiBFdmVudEhhbmRsZXIgfTtcbn07XG5cbmNvbnN0IGluaXRTdWJzY3JpcHRpb25zID0gKCk6IFN1YnNjcmlwdGlvbnMgPT4ge1xuICAgIGNvbnN0IHN1YmNyaXB0aW9uczogUGFydGlhbDxTdWJzY3JpcHRpb25zPiA9IHt9O1xuXG4gICAgT2JqZWN0LnZhbHVlcyhVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlKS5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICAgIHN1YmNyaXB0aW9uc1tldmVudFR5cGVdID0ge307XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViY3JpcHRpb25zIGFzIFN1YnNjcmlwdGlvbnM7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIGFic3RyYWN0IHR5cGU6IFVpQXBwQ2FwYWJpbGl0eVR5cGU7XG4gICAgYWJzdHJhY3QgZXZlbnRzVG9TdWJzY3JpYmU6IFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGVbXTtcbiAgICBhYnN0cmFjdCBldmVudHNUb1RyaWdnZXI6IFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlW107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaG9zdDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbG9nZ2VyOiBMb2dnZXI7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGhhbmRzaGFrZTogUG9zdG1hdGUuTW9kZWw7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbnRleHQ6IERlZmVycmVkPEFwcENvbnRleHQ+O1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczoge1xuICAgICAgICBba2V5IGluIFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGVdOiB7IFtpZDogbnVtYmVyXTogRXZlbnRIYW5kbGVyIH07XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvcHRpb25zOiBSZXF1aXJlZDxDbGllbnRPcHRpb25zPixcbiAgICAgICAgaGFuZHNoYWtlOiBQb3N0bWF0ZS5Nb2RlbCxcbiAgICAgICAgY29udGV4dDogRGVmZXJyZWQ8QXBwQ29udGV4dD5cbiAgICApIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0O1xuICAgICAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZztcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaGFuZHNoYWtlID0gaGFuZHNoYWtlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBpbml0U3Vic2NyaXB0aW9ucygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcGxhY2UgZm9yIGV2ZW50dWFsIGV4dGVuc2lvbnMgb2YgdGhlIGJhc2UgY2xpZW50IG1ldGhvZHMsIHNwZWNpZmljIHRvIGEgY2FwYWJpbGl0eVxuICAgICAqIEV4YW1wbGU6XG4gICAgICogcHJpdmF0ZSBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbiB9IHtcbiAgICAgKiAgIHJldHVybiAge1xuICAgICAqICAgICBnZXRUaW1lU2VyaWVzOiAoKSA9PiB0aGlzLmdldFRpbWVTZXJpZXMoKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfTtcblxuICAgIC8qKlxuICAgICAqIFdyYXBzIGFkZGl0aW9uYWwgbWV0aG9kcyBpbiBhIGNoZWNrIGFnYWluc3QgdGhlIGNhcGFiaWxpdHkgdHlwZSwgdGhlbiBhcHBsaWVzIHRvIHByb3ZpZGVkIGNsaWVudCBvYmplY3QuIERvIG5vdCBvdmVycmlkZVxuICAgICAqL1xuICAgIGFwcGx5QWRkaXRpb25hbE1ldGhvZHMoY2xpZW50OiBERENsaWVudCkge1xuICAgICAgICBjb25zdCBhZGRpdGlvbmFsTWV0aG9kcyA9IHRoaXMuZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTtcblxuICAgICAgICBjb25zdCB3cmFwcGVkTWV0aG9kczogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfSA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGFkZGl0aW9uYWxNZXRob2RzKS5mb3JFYWNoKChba2V5LCBtZXRob2RdKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVkTWV0aG9kc1trZXldID0gYXN5bmMgKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgdGhpcy5pc0VuYWJsZWQoKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZCguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBUaGUgJHt0aGlzLnR5cGV9IGNhcGFiaWxpdHkgbXVzdCBiZSBlbmFibGVkIHRvIHBlcmZvcm0gdGhpcyBhY3Rpb25gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihjbGllbnQsIHdyYXBwZWRNZXRob2RzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGNsaWVudCB0byByZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIG1hbmFnZWQgYnkgdGhpcyBjYXBhYmlsaXR5LiBEbyBub3Qgb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBzdWJzY3JpYmVIYW5kbGVyPFQ+KFxuICAgICAgICBldmVudFR5cGU6IFVpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUsXG4gICAgICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlcjxUPlxuICAgICk6ICgpID0+IHZvaWQge1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25JZCA9IHVuaXF1ZUludCgpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1tldmVudFR5cGVdW3N1YnNjcmlwdGlvbklkXSA9IGhhbmRsZXI7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBbc3Vic2NyaXB0aW9uSWRdOiBfLFxuICAgICAgICAgICAgICAgIC4uLm90aGVyU3Vic2NyaXB0aW9uc1xuICAgICAgICAgICAgfSA9IHRoaXMuc3Vic2NyaXB0aW9uc1tldmVudFR5cGVdO1xuXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRUeXBlXSA9IG90aGVyU3Vic2NyaXB0aW9ucztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGNsaWVudCB0byBkZWxlZ2F0ZSBldmVudCBoYW5kbGluZy4gRG8gbm90IG92ZXJyaWRlXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlRXZlbnQ8VD4oeyBldmVudFR5cGUsIGRhdGEgfTogSGFuZGxlRXZlbnRQYXJhbXM8VD4pIHtcbiAgICAgICAgY29uc3QgaGFzSGFuZGxlcnMgPSB0aGlzLmhhc0hhbmRsZXJzKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKCFoYXNIYW5kbGVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgdGhpcy5pc0VuYWJsZWQoKTtcblxuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV07XG5cbiAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoc3Vic2NyaXB0aW9ucykuZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgICAgYFRoZSAke3RoaXMudHlwZX0gY2FwYWJpbGl0eSBtdXN0IGJlIGVuYWJsZWQgdG8gcmVzcG9uZCB0byBldmVudHMgb2YgdHlwZSAke2V2ZW50VHlwZX0uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHRyaWdnZXJFdmVudChldmVudFR5cGU6IFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgdGhpcy5pc0VuYWJsZWQoKTtcblxuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBhd2FpdCB0aGlzLmhhbmRzaGFrZTtcbiAgICAgICAgICAgIHBhcmVudC5lbWl0KGV2ZW50VHlwZSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICBgVGhlICR7dGhpcy50eXBlfSBjYXBhYmlsaXR5IG11c3QgYmUgZW5hYmxlZCB0byB0cmlnZ2VyIGV2ZW50cyBvZiB0eXBlICR7ZXZlbnRUeXBlfS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaXNFbmFibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCB7IGNhcGFiaWxpdGllcyB9ID0gYXdhaXQgdGhpcy5jb250ZXh0LnByb21pc2U7XG5cbiAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5pbmNsdWRlcyh0aGlzLnR5cGUpO1xuICAgIH1cblxuICAgIGhhc0hhbmRsZXJzKGV2ZW50VHlwZTogVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFPYmplY3Qua2V5cyh0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRUeXBlXSkubGVuZ3RoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgVWlBcHBDYXBhYmlsaXR5VHlwZSxcbiAgICBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlLFxuICAgIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmltcG9ydCB7IENhcGFiaWxpdHlNYW5hZ2VyIH0gZnJvbSAnLi9jYXBhYmlsaXR5TWFuYWdlcic7XG5cbmV4cG9ydCB0eXBlIHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tICcuL2NhcGFiaWxpdHlNYW5hZ2VyJztcblxuY2xhc3MgRGFzaGJvYXJkQ29nTWVudU1hbmFnZXIgZXh0ZW5kcyBDYXBhYmlsaXR5TWFuYWdlciB7XG4gICAgdHlwZSA9IFVpQXBwQ2FwYWJpbGl0eVR5cGUuREFTSEJPQVJEX0NPR19NRU5VO1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlID0gW1VpQXBwRXZlbnRUb1N1YnNjcmliZVR5cGUuREFTSEJPQVJEX0NPR19NRU5VX0NPTlRFWFRdO1xuICAgIGV2ZW50c1RvVHJpZ2dlciA9IFtdO1xuXG4gICAgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG5cbmNsYXNzIEFwcFJvdXRpbmdNYW5hZ2VyIGV4dGVuZHMgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIHR5cGUgPSBVaUFwcENhcGFiaWxpdHlUeXBlLkFQUF9ST1VUSU5HO1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlID0gW107XG4gICAgZXZlbnRzVG9UcmlnZ2VyID0gW1xuICAgICAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZS5SRUxPQURfRlJBTUUsXG4gICAgICAgIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLk9QRU5fVVJMXG4gICAgXTtcblxuICAgIGdldEFkZGl0aW9uYWxDbGllbnRNZXRob2RzKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuXG5jbGFzcyBEYXNoYm9hcmRDdXN0b21XaWRnZXRNYW5hZ2VyIGV4dGVuZHMgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIHR5cGUgPSBVaUFwcENhcGFiaWxpdHlUeXBlLkRBU0hCT0FSRF9DVVNUT01fV0lER0VUO1xuICAgIGV2ZW50c1RvU3Vic2NyaWJlID0gW107XG4gICAgZXZlbnRzVG9UcmlnZ2VyID0gW107XG5cbiAgICBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNhcGFiaWxpdHlNYW5hZ2VycyA9IFtcbiAgICBEYXNoYm9hcmRDb2dNZW51TWFuYWdlcixcbiAgICBBcHBSb3V0aW5nTWFuYWdlcixcbiAgICBEYXNoYm9hcmRDdXN0b21XaWRnZXRNYW5hZ2VyXG5dO1xuIiwiaW1wb3J0IFBvc3RtYXRlIGZyb20gJ3Bvc3RtYXRlJztcblxuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tICcuL2NhcGFiaWxpdGVzL2NhcGFiaWxpdHlNYW5hZ2VyJztcbmltcG9ydCB7IGNhcGFiaWxpdHlNYW5hZ2VycyB9IGZyb20gJy4vY2FwYWJpbGl0ZXMnO1xuaW1wb3J0IHtcbiAgICBIb3N0LFxuICAgIFVpQXBwQ2FwYWJpbGl0eVR5cGUsXG4gICAgVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRMb2dnZXIsIExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7XG4gICAgQXBwQ29udGV4dCxcbiAgICBFdmVudEhhbmRsZXIsXG4gICAgSGFuZGxlRXZlbnRQYXJhbXMsXG4gICAgQ2xpZW50T3B0aW9uc1xufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IERlZmVycmVkLCBkZWZlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgaG9zdDogSG9zdC5TVEFHRSxcbiAgICBkZWJ1ZzogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBERENsaWVudCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBob3N0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhhbmRzaGFrZTogUG9zdG1hdGUuTW9kZWw7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXI6IExvZ2dlcjtcbiAgICBwcml2YXRlIGNvbnRleHQ6IERlZmVycmVkPEFwcENvbnRleHQ+O1xuICAgIHByaXZhdGUgY2FwYWJpbGl0eU1hbmFnZXJzOiBDYXBhYmlsaXR5TWFuYWdlcltdO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2xpZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdCB8fCBERUZBVUxUX09QVElPTlMuaG9zdDtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWcgfHwgREVGQVVMVF9PUFRJT05TLmRlYnVnO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBkZWZlcigpO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcihvcHRpb25zKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIFBvc3RtYXRlLmRlYnVnID0gdGhpcy5fZGVidWc7XG5cbiAgICAgICAgdGhpcy5oYW5kc2hha2UgPSBuZXcgUG9zdG1hdGUuTW9kZWwoe1xuICAgICAgICAgICAgaW5pdDogKGNvbnRleHQ6IEFwcENvbnRleHQpID0+IHRoaXMuaW5pdChjb250ZXh0KSxcbiAgICAgICAgICAgIGhhbmRsZUV2ZW50OiAocGFyYW1zOiBIYW5kbGVFdmVudFBhcmFtcykgPT4gdGhpcy5oYW5kbGVFdmVudChwYXJhbXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzID0gY2FwYWJpbGl0eU1hbmFnZXJzLm1hcChcbiAgICAgICAgICAgIE1hbmFnZXIgPT5cbiAgICAgICAgICAgICAgICBuZXcgTWFuYWdlcihcbiAgICAgICAgICAgICAgICAgICAgeyBob3N0OiB0aGlzLmhvc3QsIGRlYnVnOiB0aGlzLmRlYnVnIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZm9yRWFjaChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmFwcGx5QWRkaXRpb25hbE1ldGhvZHModGhpcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBvbiBhIGNlcnRhaW4gZXZlbnQgdHlwZSBmcm9tIHRoZSBwYXJlbnQuIFdpbGwgcHJpbnRcbiAgICAgKiBhbiBlcnJvciBpZiB0aGUgaW5zdGFsbGVkIGFwcCBkb2VzIG5vdCBoYXZlIHRoZSByZXF1aXJlZCBjYXBhYmlsaXR5LiBSZXR1cm5zIGFuIHVuc3Vic2NyaWJlXG4gICAgICogbWV0aG9kLiBUaGlzIG1ldGhvZCBjYW4gYmUgY2FsbGVkIGJlZm9yZSBoYW5kc2hha2UgaXMgc3VjY2Vzc2Z1bCwgYnV0IGhhbmRsZXJzIHdpbGwgbm90IGV4ZWN1dGUgdW50aWxcbiAgICAgKiBhZnRlciBzdWNjZXNzc2Z1bCBoYW5kc2hha2UuXG4gICAgICovXG4gICAgb248VCA9IGFueT4oXG4gICAgICAgIGV2ZW50VHlwZTogVWlBcHBFdmVudFRvU3Vic2NyaWJlVHlwZSxcbiAgICAgICAgaGFuZGxlcjogRXZlbnRIYW5kbGVyPFQ+XG4gICAgKTogKCkgPT4gdm9pZCB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VG9TdWJzY3JpYmVUeXBlKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKCFtYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignVW5rbm93biBldmVudCB0eXBlJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYW5hZ2VyLnN1YnNjcmliZUhhbmRsZXI8VD4oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhbiBldmVudCB0eXBlIHRvIGJlIGhhbmRsZWQgaW4gdGhlIHBhcmVudC4gV2lsbCBwcmludFxuICAgICAqIGFuIGVycm9yIGlmIHRoZSBpbnN0YWxsZWQgYXBwIGRvZXMgbm90IGhhdmUgdGhlIHJlcXVpcmVkIGNhcGFiaWxpdHkuXG4gICAgICogVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCBiZWZvcmUgaGFuZHNoYWtlIGlzIHN1Y2Nlc3NmdWwsIGJ1dCBoYW5kbGVycyB3aWxsIG5vdCBleGVjdXRlIHVudGlsXG4gICAgICogYWZ0ZXIgc3VjY2Vzc3NmdWwgaGFuZHNoYWtlLlxuICAgICAqL1xuXG4gICAgdHJpZ2dlckV2ZW50KGV2ZW50VHlwZTogVWlBcHBFdmVudFRvVHJpZ2dlclR5cGUsIGRhdGE6IGFueSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VG9UcmlnZ2VyVHlwZShldmVudFR5cGUpO1xuICAgICAgICBpZiAoIW1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdVbmtub3duIGV2ZW50IHR5cGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hbmFnZXIudHJpZ2dlckV2ZW50KGV2ZW50VHlwZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFwcCBjb250ZXh0IGRhdGEsIGFmdGVyIGl0IGlzIHNlbnQgZnJvbSB0aGUgcGFyZW50XG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q29udGV4dCgpOiBQcm9taXNlPEFwcENvbnRleHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHN5bnRhY3RpYyBzdWdhciB0cmlnZ2VyIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlLlJFTE9BRF9GUkFNRSB3aGljaCByZWxvYWRzIHRoZSBjdXJyZW50IGNoaWxkIGZyYW1lIGFuZCByZS1pbml0aWF0ZSB0aGUgaGFuZHNoYWtlIHdpdGggdGhlIHBhcmVudFxuICAgICAqL1xuICAgIHJlbG9hZEZyYW1lKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZS5SRUxPQURfRlJBTUUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluaXQgbWV0aG9kIGlzIGV4cG9zZWQgaW4gdGhlIHBvc3RtYXRlIG1vZGVsLiBJdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgb3RoZXIgb3BlcmF0aW9ucyBtYXkgcHJvY2VlZCxcbiAgICAgKiBpbiBvcmRlciB0byBpbmZvcm0gY2xpZW50IG9mIGFwcCBjb250ZXh0XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0KGNvbnRleHQ6IEFwcENvbnRleHQpIHtcbiAgICAgICAgLy8gcGFyZW50IHNob3VsZCBvbmx5IGJlIGFibGUgdG8gY2FsbCB0aGlzIGFmdGVyIGhhbmRzaGFrZSBpcyBjb21wbGV0ZSwgYnV0IGl0cyB3b3J0aCBhIGNoZWNrIGFueXdheXNcbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kc2hha2U7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0LnJlc29sdmUoY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKFxuICAgICAgICAgICAgJ2RkLWFwcHM6IHNkayBoYW5kc2hha2U6IHBhcmVudCA8LT4gY2hpbGQgaGFuZHNoYWtlIGlzIGNvbXBsZXRlJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGhhbmRsZUV2ZW50IGlzIHRoZSBtYWluIG1ldGhvZCBjYWxsZWQgYnkgdGhlIHBhcmVudCB0aHJvdWdoIHBvc3RtYXRlIChjaGlsZC5oYW5kbGVFdmVudCgnZXhlYycsIHsuLi59KSkuXG4gICAgICogSXQgYWNjZXB0cyBhIGtleWVkIGV2ZW50IHR5cGUgYW5kIGFyYml0cmFyeSBkYXRhIHRvIGJlIHBhc3NlZCB0byBldmVudCBoYW5kbGVycy4gSXQgd2lsbCBsb2cgYW4gZXJyb3JcbiAgICAgKiBtZXNzYWdlIGlmIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHJlcXVpcmVkIGNhcGFiaWxpdHkgZW5hYmxlZFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgaGFuZGxlRXZlbnQ8VD4oeyBldmVudFR5cGUsIGRhdGEgfTogSGFuZGxlRXZlbnRQYXJhbXM8VD4pIHtcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IHRoaXMuZ2V0TWFuYWdlckJ5RXZlbnRUb1N1YnNjcmliZVR5cGUoZXZlbnRUeXBlKTtcblxuICAgICAgICBpZiAoIW1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICAgICdDb3VsZCBub3QgaGFuZGxlIGV2ZW50OiBubyBjb3JyZXNwb25kaW5nIG1hbmFnZXIgZm91bmQnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLmhhbmRsZUV2ZW50KHsgZXZlbnRUeXBlLCBkYXRhIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWFuYWdlckJ5VHlwZShcbiAgICAgICAgY2FwYWJpbGl0eVR5cGU6IFVpQXBwQ2FwYWJpbGl0eVR5cGVcbiAgICApOiBDYXBhYmlsaXR5TWFuYWdlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcGFiaWxpdHlNYW5hZ2Vycy5maW5kKFxuICAgICAgICAgICAgbWFuYWdlciA9PiBtYW5hZ2VyLnR5cGUgPT09IGNhcGFiaWxpdHlUeXBlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNYW5hZ2VyQnlFdmVudFRvU3Vic2NyaWJlVHlwZShcbiAgICAgICAgZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlXG4gICAgKTogQ2FwYWJpbGl0eU1hbmFnZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZmluZChtYW5hZ2VyID0+XG4gICAgICAgICAgICBtYW5hZ2VyLmV2ZW50c1RvU3Vic2NyaWJlLmluY2x1ZGVzKGV2ZW50VHlwZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1hbmFnZXJCeUV2ZW50VG9UcmlnZ2VyVHlwZShcbiAgICAgICAgZXZlbnRUeXBlOiBVaUFwcEV2ZW50VG9UcmlnZ2VyVHlwZVxuICAgICk6IENhcGFiaWxpdHlNYW5hZ2VyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzLmZpbmQobWFuYWdlciA9PlxuICAgICAgICAgICAgbWFuYWdlci5ldmVudHNUb1RyaWdnZXIuaW5jbHVkZXMoZXZlbnRUeXBlKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImV4cG9ydCBlbnVtIEhvc3Qge1xuICAgIFBST0QgPSAnaHR0cHM6Ly9hcHAuZGF0YWRvZ2hxLmNvbS8nLFxuICAgIFNUQUdFID0gJ2h0dHBzOi8vZGQuZGF0YWQwZy5jb20vJ1xufVxuXG5leHBvcnQgZW51bSBVaUFwcENhcGFiaWxpdHlUeXBlIHtcbiAgICBBUFBfQ09OVEVYVCA9ICdhcHBfY29udGV4dCcsXG4gICAgREFTSEJPQVJEX0NPR19NRU5VID0gJ2Rhc2hib2FyZF9jb2dfbWVudScsXG4gICAgREFTSEJPQVJEX0NVU1RPTV9XSURHRVQgPSAnZGFzaGJvYXJkX2N1c3RvbV93aWRnZXQnLFxuICAgIEFQUF9ST1VUSU5HID0gJ2FwcF9yb3V0aW5nJ1xufVxuXG5leHBvcnQgZW51bSBVaUFwcEV2ZW50VG9TdWJzY3JpYmVUeXBlIHtcbiAgICBEQVNIQk9BUkRfQ09HX01FTlVfQ09OVEVYVCA9ICdkYXNoYm9hcmRfY29nX21lbnVfY29udGV4dCdcbn1cbmV4cG9ydCBlbnVtIFVpQXBwRXZlbnRUb1RyaWdnZXJUeXBlIHtcbiAgICBSRUxPQURfRlJBTUUgPSAncmVsb2FkX2ZyYW1lJyxcbiAgICBPUEVOX1VSTCA9ICdvcGVuX3VybCdcbn1cbiIsImltcG9ydCB7IEREQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgQXBwQ29udGV4dCwgQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuXG5sZXQgY2xpZW50OiBERENsaWVudDtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIGNsaWVudCwgb3IgcmV0dXJucyBhbiBleGlzdGluZyBvbmUgaWYgYWxyZWFkeSBpbml0aWFsaXplZC4gVXNlciBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWQgd2l0aCBhcHAgY29udGV4dCBkYXRhIHdoZW4gaXQgaXMgc2VudCBmcm9tIHRoZSBwYXJlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0ID0gKFxuICAgIG9wdGlvbnM/OiBDbGllbnRPcHRpb25zLFxuICAgIGNhbGxiYWNrPzogKGNvbnRleHQ6IEFwcENvbnRleHQpID0+IHZvaWRcbik6IEREQ2xpZW50ID0+IHtcbiAgICBpZiAoIWNsaWVudCkge1xuICAgICAgICBjbGllbnQgPSBuZXcgRERDbGllbnQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNsaWVudC5nZXRDb250ZXh0KCkudGhlbihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudDtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBDbGllbnRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyIHtcbiAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0TG9nZ2VyID0gKG9wdGlvbnM6IENsaWVudE9wdGlvbnMpOiBMb2dnZXIgPT4ge1xuICAgIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGBkZC1hcHBzOiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoYGRkLWFwcHM6ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9nKCkge30sXG4gICAgICAgICAgICBlcnJvcigpIHt9XG4gICAgICAgIH07XG4gICAgfVxufTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgRGVmZXJyZWQ8VD4ge1xuICAgIHJlc29sdmU6ICh0OiBUKSA9PiB2b2lkO1xuICAgIHJlamVjdDogKHQ6IFQpID0+IHZvaWQ7XG4gICAgcHJvbWlzZTogUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVmZmVycmVkIG9iamVjdCwgaW5jbHVkaW5nIHByb21pc2UgYW5kIHJlc29sdmUgKyByZWplY3QgbWV0aG9kcyB0byBiZSBleGVjdXRlZCBsYXRlclxuICovXG5leHBvcnQgY29uc3QgZGVmZXIgPSA8VD4oKTogRGVmZXJyZWQ8VD4gPT4ge1xuICAgIGxldCByZXNvbHZlOiAodDogVCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIGxldCByZWplY3Q6ICh0OiBUKSA9PiB2b2lkID0gKCkgPT4ge307XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXMsIHJlaikgPT4ge1xuICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlLFxuICAgICAgICByZWplY3QsXG4gICAgICAgIHByb21pc2VcbiAgICB9O1xufTtcblxubGV0IGluY3JlbWVudDogbnVtYmVyID0gMDtcblxuLy8gZ2VuZXJhdGVzIGFuIGludGVnZXIsIGd1YXJhbnRlZWQgdG8gYmUgdW5pcXVlIGJlY3Vhc2UgaXQncyBpbmNyZW1lbnRlZCA6KVxuZXhwb3J0IGNvbnN0IHVuaXF1ZUludCA9ICgpOiBudW1iZXIgPT4ge1xuICAgIGluY3JlbWVudCsrO1xuXG4gICAgcmV0dXJuIGluY3JlbWVudDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9