(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DDClient"] = factory();
	else
		root["DDClient"] = factory();
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

/***/ "./src/capabilites/DashboardCogMenuCapability.ts":
/*!*******************************************************!*\
  !*** ./src/capabilites/DashboardCogMenuCapability.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DashboardCogMenuCapability = void 0;
var baseCapability_1 = __webpack_require__(/*! ./baseCapability */ "./src/capabilites/baseCapability.ts");
var DashboardCogMenuCapability = /** @class */ (function (_super) {
    __extends(DashboardCogMenuCapability, _super);
    function DashboardCogMenuCapability() {
        return _super.call(this) || this;
    }
    DashboardCogMenuCapability.prototype.print = function () {
        return "child rrr";
    };
    return DashboardCogMenuCapability;
}(baseCapability_1.BaseCapability));
exports.DashboardCogMenuCapability = DashboardCogMenuCapability;


/***/ }),

/***/ "./src/capabilites/DashboardContextCapability.ts":
/*!*******************************************************!*\
  !*** ./src/capabilites/DashboardContextCapability.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DashboardContextCapability = void 0;
var baseCapability_1 = __webpack_require__(/*! ./baseCapability */ "./src/capabilites/baseCapability.ts");
var DashboardContextCapability = /** @class */ (function (_super) {
    __extends(DashboardContextCapability, _super);
    function DashboardContextCapability() {
        return _super.call(this) || this;
    }
    DashboardContextCapability.prototype.print = function () {
        return "child rrr";
    };
    return DashboardContextCapability;
}(baseCapability_1.BaseCapability));
exports.DashboardContextCapability = DashboardContextCapability;


/***/ }),

/***/ "./src/capabilites/baseCapability.ts":
/*!*******************************************!*\
  !*** ./src/capabilites/baseCapability.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.BaseCapability = void 0;
var BaseCapability = /** @class */ (function () {
    function BaseCapability() {
        console.log("xxx BaseCapability started");
    }
    BaseCapability.implementEventHandler = function (_a, resolve) {
        var eventType = _a.eventType, options = _a.options;
        // the base functionality is just to resolve options. Each capability can optionally imlement a custom logic.
        resolve(options);
    };
    return BaseCapability;
}());
exports.BaseCapability = BaseCapability;


/***/ }),

/***/ "./src/capabilites/capabilityManager.ts":
/*!**********************************************!*\
  !*** ./src/capabilites/capabilityManager.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
exports.__esModule = true;
exports.CapabilityManager = void 0;
var constants_1 = __webpack_require__(/*! ../constants */ "./src/constants.ts");
var DashboardCogMenuCapability_1 = __webpack_require__(/*! ./DashboardCogMenuCapability */ "./src/capabilites/DashboardCogMenuCapability.ts");
var DashboardContextCapability_1 = __webpack_require__(/*! ./DashboardContextCapability */ "./src/capabilites/DashboardContextCapability.ts");
var CapabilityManager = /** @class */ (function () {
    function CapabilityManager(config) {
        this.init = function () { };
        this.handleEvent = function (_a, resolve) {
            var eventType = _a.eventType, options = _a.options;
            // step1: check if the event is of a valid type [TODO]
            // step2: find the capability that this event belongs to
            var capability = CapabilityManager.findCapabilityByEventType(eventType);
            // step3: validate that this capability is enabled, reject if not [TODO]
            // step4: now simple let the capability handle the event
            capability.implementEventHandler({ eventType: eventType, options: options }, resolve);
        };
        // const capabilyTypes = Object.keys(config);
        // this._capabilities = capabilyTypes.map((capabilityType: CapabilityType) => {
        //   const capabilityClass =
        //     CapabilityManager.capabilityByType[capabilityType].klass;
        //   return new capabilityClass();
        // });
    }
    CapabilityManager.findCapabilityByEventType = function (eventType) {
        for (var _i = 0, _a = Object.entries(CapabilityManager.capabilityByType); _i < _a.length; _i++) {
            var _b = _a[_i], capabilityType = _b[0], _c = _b[1], klass = _c.klass, events = _c.events;
            if (events.indexOf(eventType) > -1) {
                return klass;
            }
        }
        return null;
    };
    CapabilityManager.capabilityByType = (_a = {},
        _a[constants_1.CapabilityType.DASHBOARD_COG_MENU] = {
            klass: DashboardCogMenuCapability_1.DashboardCogMenuCapability,
            events: [constants_1.EventType.DASHBOARD_COG_MENU_INIT],
        },
        _a[constants_1.CapabilityType.DASHBOARD_CONTEXT] = {
            klass: DashboardContextCapability_1.DashboardContextCapability,
            events: [],
        },
        _a);
    return CapabilityManager;
}());
exports.CapabilityManager = CapabilityManager;


/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.DDClient = void 0;
var postmate_1 = __webpack_require__(/*! postmate */ "./node_modules/postmate/build/postmate.es.js");
var capabilityManager_1 = __webpack_require__(/*! ./capabilites/capabilityManager */ "./src/capabilites/capabilityManager.ts");
var DEFAULT_OPTIONS = {
    host: "datad0g.com",
    debug: false,
};
var Client = /** @class */ (function () {
    function Client(config, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this._config = config;
        this._host = options.host || DEFAULT_OPTIONS.host;
        this._debug = options.debug || DEFAULT_OPTIONS.debug;
        this._capabilityManager = new capabilityManager_1.CapabilityManager(this._config);
        postmate_1["default"].debug = this._debug;
        this._handshake = new postmate_1["default"].Model({
            config: function () { return _this._config; },
        });
        this._handshake.then(function (parent) {
            console.log("dd-apps: sdk handshake: parent <-> child handshake is complete");
            _this._capabilityManager.init();
        });
    }
    Client.prototype.handleEvent = function (eventType) {
        var _this = this;
        return new Promise(function (resolve) {
            var handshake = new postmate_1["default"].Model({
                handleEvent: function (eventprops) {
                    _this._capabilityManager.handleEvent(eventprops, resolve);
                },
            });
            _this._handshake.then(function (parent) {
                console.log("dd-apps: sdk handshake 2nd pass: parent <-> child handshake is complete");
            });
        });
    };
    return Client;
}());
exports.DDClient = {
    init: function (config) {
        console.log("dd-apps: sdk init");
        var client = new Client(config);
        return client;
    },
    on: function (eventType) {
        var client = new Client({});
        return client.handleEvent(eventType);
    },
};


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.EventType = exports.CapabilityType = void 0;
var CapabilityType;
(function (CapabilityType) {
    CapabilityType["DASHBOARD_COG_MENU"] = "dashboard_cog_menu";
    CapabilityType["DASHBOARD_CONTEXT"] = "dashboard_context";
})(CapabilityType = exports.CapabilityType || (exports.CapabilityType = {}));
var EventType;
(function (EventType) {
    EventType["DASHBOARD_COG_MENU_INIT"] = "dashboard_cog_menu_init";
})(EventType = exports.EventType || (exports.EventType = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var client_1 = __webpack_require__(/*! ./client */ "./src/client.ts");
module.exports = client_1.DDClient;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERENsaWVudC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRERDbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9ub2RlX21vZHVsZXMvcG9zdG1hdGUvYnVpbGQvcG9zdG1hdGUuZXMuanMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvRGFzaGJvYXJkQ29nTWVudUNhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvRGFzaGJvYXJkQ29udGV4dENhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvYmFzZUNhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvY2FwYWJpbGl0eU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL0REQ2xpZW50Ly4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ERENsaWVudC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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QkFBa0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUNULHlFQUF5RSxDQUMxRSxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQztBQUVZLGdCQUFRLEdBQUc7SUFDdEIsSUFBSSxFQUFFLFVBQUMsTUFBaUI7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxFQUFFLEVBQUUsVUFBQyxTQUFvQjtRQUN2QixJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUYsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3hCLDJEQUF5QztJQUN6Qyx5REFBdUM7QUFDekMsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBRUQsSUFBWSxTQUVYO0FBRkQsV0FBWSxTQUFTO0lBQ25CLGdFQUFtRDtBQUNyRCxDQUFDLEVBRlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFFcEI7Ozs7Ozs7Ozs7Ozs7O0FDUEQsc0VBQW9DO0FBRXBDLGlCQUFTLGlCQUFRLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkREQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkREQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8qKlxuICBwb3N0bWF0ZSAtIEEgcG93ZXJmdWwsIHNpbXBsZSwgcHJvbWlzZS1iYXNlZCBwb3N0TWVzc2FnZSBsaWJyYXJ5XG4gIEB2ZXJzaW9uIHYxLjUuMlxuICBAbGluayBodHRwczovL2dpdGh1Yi5jb20vZG9sbGFyc2hhdmVjbHViL3Bvc3RtYXRlXG4gIEBhdXRob3IgSmFjb2IgS2VsbGV5IDxqYWtpZThAZ21haWwuY29tPlxuICBAbGljZW5zZSBNSVRcbioqL1xuLyoqXG4gKiBUaGUgdHlwZSBvZiBtZXNzYWdlcyBvdXIgZnJhbWVzIG91ciBzZW5kaW5nXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG52YXIgbWVzc2FnZVR5cGUgPSAnYXBwbGljYXRpb24veC1wb3N0bWF0ZS12MStqc29uJztcbi8qKlxuICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGF0dGVtcHRzIHRvIHNlbmQgYSBoYW5kc2hha2UgcmVxdWVzdCB0byB0aGUgcGFyZW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5cbnZhciBtYXhIYW5kc2hha2VSZXF1ZXN0cyA9IDU7XG4vKipcbiAqIEEgdW5pcXVlIG1lc3NhZ2UgSUQgdGhhdCBpcyB1c2VkIHRvIGVuc3VyZSByZXNwb25zZXMgYXJlIHNlbnQgdG8gdGhlIGNvcnJlY3QgcmVxdWVzdHNcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cblxudmFyIF9tZXNzYWdlSWQgPSAwO1xuLyoqXG4gKiBJbmNyZW1lbnRzIGFuZCByZXR1cm5zIGEgbWVzc2FnZSBJRFxuICogQHJldHVybiB7TnVtYmVyfSBBIHVuaXF1ZSBJRCBmb3IgYSBtZXNzYWdlXG4gKi9cblxudmFyIGdlbmVyYXRlTmV3TWVzc2FnZUlkID0gZnVuY3Rpb24gZ2VuZXJhdGVOZXdNZXNzYWdlSWQoKSB7XG4gIHJldHVybiArK19tZXNzYWdlSWQ7XG59O1xuLyoqXG4gKiBQb3N0bWF0ZSBsb2dnaW5nIGZ1bmN0aW9uIHRoYXQgZW5hYmxlcy9kaXNhYmxlcyB2aWEgY29uZmlnXG4gKiBAcGFyYW0gIHtPYmplY3R9IC4uLmFyZ3MgUmVzdCBBcmd1bWVudHNcbiAqL1xuXG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIFBvc3RtYXRlLmRlYnVnID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4vKipcbiAqIFRha2VzIGEgVVJMIGFuZCByZXR1cm5zIHRoZSBvcmlnaW5cbiAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBmdWxsIFVSTCBiZWluZyByZXF1ZXN0ZWRcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgIFRoZSBVUkxzIG9yaWdpblxuICovXG5cbnZhciByZXNvbHZlT3JpZ2luID0gZnVuY3Rpb24gcmVzb2x2ZU9yaWdpbih1cmwpIHtcbiAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgdmFyIHByb3RvY29sID0gYS5wcm90b2NvbC5sZW5ndGggPiA0ID8gYS5wcm90b2NvbCA6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgdmFyIGhvc3QgPSBhLmhvc3QubGVuZ3RoID8gYS5wb3J0ID09PSAnODAnIHx8IGEucG9ydCA9PT0gJzQ0MycgPyBhLmhvc3RuYW1lIDogYS5ob3N0IDogd2luZG93LmxvY2F0aW9uLmhvc3Q7XG4gIHJldHVybiBhLm9yaWdpbiB8fCBwcm90b2NvbCArIFwiLy9cIiArIGhvc3Q7XG59O1xudmFyIG1lc3NhZ2VUeXBlcyA9IHtcbiAgaGFuZHNoYWtlOiAxLFxuICAnaGFuZHNoYWtlLXJlcGx5JzogMSxcbiAgY2FsbDogMSxcbiAgZW1pdDogMSxcbiAgcmVwbHk6IDEsXG4gIHJlcXVlc3Q6IDFcbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCBhIG1lc3NhZ2UgaXMgc2FmZSB0byBpbnRlcnByZXRcbiAgICogQHBhcmFtICB7T2JqZWN0fSBtZXNzYWdlIFRoZSBwb3N0bWF0ZSBtZXNzYWdlIGJlaW5nIHNlbnRcbiAgICogQHBhcmFtICB7U3RyaW5nfEJvb2xlYW59IGFsbG93ZWRPcmlnaW4gVGhlIHdoaXRlbGlzdGVkIG9yaWdpbiBvciBmYWxzZSB0byBza2lwIG9yaWdpbiBjaGVja1xuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cblxufTtcbnZhciBzYW5pdGl6ZSA9IGZ1bmN0aW9uIHNhbml0aXplKG1lc3NhZ2UsIGFsbG93ZWRPcmlnaW4pIHtcbiAgaWYgKHR5cGVvZiBhbGxvd2VkT3JpZ2luID09PSAnc3RyaW5nJyAmJiBtZXNzYWdlLm9yaWdpbiAhPT0gYWxsb3dlZE9yaWdpbikgcmV0dXJuIGZhbHNlO1xuICBpZiAoIW1lc3NhZ2UuZGF0YSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIG1lc3NhZ2UuZGF0YSA9PT0gJ29iamVjdCcgJiYgISgncG9zdG1hdGUnIGluIG1lc3NhZ2UuZGF0YSkpIHJldHVybiBmYWxzZTtcbiAgaWYgKG1lc3NhZ2UuZGF0YS50eXBlICE9PSBtZXNzYWdlVHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIW1lc3NhZ2VUeXBlc1ttZXNzYWdlLmRhdGEucG9zdG1hdGVdKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogVGFrZXMgYSBtb2RlbCwgYW5kIHNlYXJjaGVzIGZvciBhIHZhbHVlIGJ5IHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtICB7T2JqZWN0fSBtb2RlbCAgICAgVGhlIGRpY3Rpb25hcnkgdG8gc2VhcmNoIGFnYWluc3RcbiAqIEBwYXJhbSAge1N0cmluZ30gcHJvcGVydHkgIEEgcGF0aCB3aXRoaW4gYSBkaWN0aW9uYXJ5IChpLmUuICd3aW5kb3cubG9jYXRpb24uaHJlZicpXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgICAgICBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIGZyb20gdGhlIGdldCByZXF1ZXN0IHRoYXQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NlZCB0byBmdW5jdGlvbnMgaW4gdGhlIGNoaWxkIG1vZGVsXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5cbnZhciByZXNvbHZlVmFsdWUgPSBmdW5jdGlvbiByZXNvbHZlVmFsdWUobW9kZWwsIHByb3BlcnR5KSB7XG4gIHZhciB1bndyYXBwZWRDb250ZXh0ID0gdHlwZW9mIG1vZGVsW3Byb3BlcnR5XSA9PT0gJ2Z1bmN0aW9uJyA/IG1vZGVsW3Byb3BlcnR5XSgpIDogbW9kZWxbcHJvcGVydHldO1xuICByZXR1cm4gUG9zdG1hdGUuUHJvbWlzZS5yZXNvbHZlKHVud3JhcHBlZENvbnRleHQpO1xufTtcbi8qKlxuICogQ29tcG9zZXMgYW4gQVBJIHRvIGJlIHVzZWQgYnkgdGhlIHBhcmVudFxuICogQHBhcmFtIHtPYmplY3R9IGluZm8gSW5mb3JtYXRpb24gb24gdGhlIGNvbnN1bWVyXG4gKi9cblxudmFyIFBhcmVudEFQSSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBhcmVudEFQSShpbmZvKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMucGFyZW50ID0gaW5mby5wYXJlbnQ7XG4gICAgdGhpcy5mcmFtZSA9IGluZm8uZnJhbWU7XG4gICAgdGhpcy5jaGlsZCA9IGluZm8uY2hpbGQ7XG4gICAgdGhpcy5jaGlsZE9yaWdpbiA9IGluZm8uY2hpbGRPcmlnaW47XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ1BhcmVudDogUmVnaXN0ZXJpbmcgQVBJJyk7XG4gICAgICBsb2coJ1BhcmVudDogQXdhaXRpbmcgbWVzc2FnZXMuLi4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmxpc3RlbmVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghc2FuaXRpemUoZSwgX3RoaXMuY2hpbGRPcmlnaW4pKSByZXR1cm4gZmFsc2U7XG4gICAgICAvKipcbiAgICAgICAqIHRoZSBhc3NpZ25tZW50cyBiZWxvdyBlbnN1cmVzIHRoYXQgZSwgZGF0YSwgYW5kIHZhbHVlIGFyZSBhbGwgZGVmaW5lZFxuICAgICAgICovXG5cbiAgICAgIHZhciBfcmVmID0gKChlIHx8IHt9KS5kYXRhIHx8IHt9KS52YWx1ZSB8fCB7fSxcbiAgICAgICAgICBkYXRhID0gX3JlZi5kYXRhLFxuICAgICAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdlbWl0Jykge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGxvZyhcIlBhcmVudDogUmVjZWl2ZWQgZXZlbnQgZW1pc3Npb246IFwiICsgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZSBpbiBfdGhpcy5ldmVudHMpIHtcbiAgICAgICAgICBfdGhpcy5ldmVudHNbbmFtZV0uY2FsbChfdGhpcywgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMubGlzdGVuZXIsIGZhbHNlKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ1BhcmVudDogQXdhaXRpbmcgZXZlbnQgZW1pc3Npb25zIGZyb20gQ2hpbGQnKTtcbiAgICB9XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUGFyZW50QVBJLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KHByb3BlcnR5KSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFBvc3RtYXRlLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIC8vIEV4dHJhY3QgZGF0YSBmcm9tIHJlc3BvbnNlIGFuZCBraWxsIGxpc3RlbmVyc1xuICAgICAgdmFyIHVpZCA9IGdlbmVyYXRlTmV3TWVzc2FnZUlkKCk7XG5cbiAgICAgIHZhciB0cmFuc2FjdCA9IGZ1bmN0aW9uIHRyYW5zYWN0KGUpIHtcbiAgICAgICAgaWYgKGUuZGF0YS51aWQgPT09IHVpZCAmJiBlLmRhdGEucG9zdG1hdGUgPT09ICdyZXBseScpIHtcbiAgICAgICAgICBfdGhpczIucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0cmFuc2FjdCwgZmFsc2UpO1xuXG4gICAgICAgICAgcmVzb2x2ZShlLmRhdGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9OyAvLyBQcmVwYXJlIGZvciByZXNwb25zZSBmcm9tIENoaWxkLi4uXG5cblxuICAgICAgX3RoaXMyLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdHJhbnNhY3QsIGZhbHNlKTsgLy8gVGhlbiBhc2sgY2hpbGQgZm9yIGluZm9ybWF0aW9uXG5cblxuICAgICAgX3RoaXMyLmNoaWxkLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgcG9zdG1hdGU6ICdyZXF1ZXN0JyxcbiAgICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgdWlkOiB1aWRcbiAgICAgIH0sIF90aGlzMi5jaGlsZE9yaWdpbik7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmNhbGwgPSBmdW5jdGlvbiBjYWxsKHByb3BlcnR5LCBkYXRhKSB7XG4gICAgLy8gU2VuZCBpbmZvcm1hdGlvbiB0byB0aGUgY2hpbGRcbiAgICB0aGlzLmNoaWxkLnBvc3RNZXNzYWdlKHtcbiAgICAgIHBvc3RtYXRlOiAnY2FsbCcsXG4gICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9LCB0aGlzLmNoaWxkT3JpZ2luKTtcbiAgfTtcblxuICBfcHJvdG8ub24gPSBmdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICB9O1xuXG4gIF9wcm90by5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdQYXJlbnQ6IERlc3Ryb3lpbmcgUG9zdG1hdGUgaW5zdGFuY2UnKTtcbiAgICB9XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMubGlzdGVuZXIsIGZhbHNlKTtcbiAgICB0aGlzLmZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mcmFtZSk7XG4gIH07XG5cbiAgcmV0dXJuIFBhcmVudEFQSTtcbn0oKTtcbi8qKlxuICogQ29tcG9zZXMgYW4gQVBJIHRvIGJlIHVzZWQgYnkgdGhlIGNoaWxkXG4gKiBAcGFyYW0ge09iamVjdH0gaW5mbyBJbmZvcm1hdGlvbiBvbiB0aGUgY29uc3VtZXJcbiAqL1xuXG52YXIgQ2hpbGRBUEkgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDaGlsZEFQSShpbmZvKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB0aGlzLm1vZGVsID0gaW5mby5tb2RlbDtcbiAgICB0aGlzLnBhcmVudCA9IGluZm8ucGFyZW50O1xuICAgIHRoaXMucGFyZW50T3JpZ2luID0gaW5mby5wYXJlbnRPcmlnaW47XG4gICAgdGhpcy5jaGlsZCA9IGluZm8uY2hpbGQ7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdDaGlsZDogUmVnaXN0ZXJpbmcgQVBJJyk7XG4gICAgICBsb2coJ0NoaWxkOiBBd2FpdGluZyBtZXNzYWdlcy4uLicpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIXNhbml0aXplKGUsIF90aGlzMy5wYXJlbnRPcmlnaW4pKSByZXR1cm47XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGxvZygnQ2hpbGQ6IFJlY2VpdmVkIHJlcXVlc3QnLCBlLmRhdGEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgX2UkZGF0YSA9IGUuZGF0YSxcbiAgICAgICAgICBwcm9wZXJ0eSA9IF9lJGRhdGEucHJvcGVydHksXG4gICAgICAgICAgdWlkID0gX2UkZGF0YS51aWQsXG4gICAgICAgICAgZGF0YSA9IF9lJGRhdGEuZGF0YTtcblxuICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2NhbGwnKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSBpbiBfdGhpczMubW9kZWwgJiYgdHlwZW9mIF90aGlzMy5tb2RlbFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBfdGhpczMubW9kZWxbcHJvcGVydHldKGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBSZXBseSB0byBQYXJlbnRcblxuXG4gICAgICByZXNvbHZlVmFsdWUoX3RoaXMzLm1vZGVsLCBwcm9wZXJ0eSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGUuc291cmNlLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgcG9zdG1hdGU6ICdyZXBseScsXG4gICAgICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICAgICAgdWlkOiB1aWQsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0sIGUub3JpZ2luKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBDaGlsZEFQSS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi5lbWl0ID0gZnVuY3Rpb24gZW1pdChuYW1lLCBkYXRhKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZyhcIkNoaWxkOiBFbWl0dGluZyBFdmVudCBcXFwiXCIgKyBuYW1lICsgXCJcXFwiXCIsIGRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgIHBvc3RtYXRlOiAnZW1pdCcsXG4gICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH1cbiAgICB9LCB0aGlzLnBhcmVudE9yaWdpbik7XG4gIH07XG5cbiAgcmV0dXJuIENoaWxkQVBJO1xufSgpO1xuLyoqXG4gICogVGhlIGVudHJ5IHBvaW50IG9mIHRoZSBQYXJlbnQuXG4gKiBAdHlwZSB7Q2xhc3N9XG4gKi9cblxudmFyIFBvc3RtYXRlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBjcmFwcyBpdHNlbGZcblxuICAvKipcbiAgICogU2V0cyBvcHRpb25zIHJlbGF0ZWQgdG8gdGhlIFBhcmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBlbGVtZW50IHRvIGluamVjdCB0aGUgZnJhbWUgaW50bywgYW5kIHRoZSB1cmxcbiAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICovXG4gIGZ1bmN0aW9uIFBvc3RtYXRlKF9yZWYyKSB7XG4gICAgdmFyIF9yZWYyJGNvbnRhaW5lciA9IF9yZWYyLmNvbnRhaW5lcixcbiAgICAgICAgY29udGFpbmVyID0gX3JlZjIkY29udGFpbmVyID09PSB2b2lkIDAgPyB0eXBlb2YgY29udGFpbmVyICE9PSAndW5kZWZpbmVkJyA/IGNvbnRhaW5lciA6IGRvY3VtZW50LmJvZHkgOiBfcmVmMiRjb250YWluZXIsXG4gICAgICAgIG1vZGVsID0gX3JlZjIubW9kZWwsXG4gICAgICAgIHVybCA9IF9yZWYyLnVybCxcbiAgICAgICAgbmFtZSA9IF9yZWYyLm5hbWUsXG4gICAgICAgIF9yZWYyJGNsYXNzTGlzdEFycmF5ID0gX3JlZjIuY2xhc3NMaXN0QXJyYXksXG4gICAgICAgIGNsYXNzTGlzdEFycmF5ID0gX3JlZjIkY2xhc3NMaXN0QXJyYXkgPT09IHZvaWQgMCA/IFtdIDogX3JlZjIkY2xhc3NMaXN0QXJyYXk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgIHRoaXMucGFyZW50ID0gd2luZG93O1xuICAgIHRoaXMuZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICB0aGlzLmZyYW1lLm5hbWUgPSBuYW1lIHx8ICcnO1xuICAgIHRoaXMuZnJhbWUuY2xhc3NMaXN0LmFkZC5hcHBseSh0aGlzLmZyYW1lLmNsYXNzTGlzdCwgY2xhc3NMaXN0QXJyYXkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmZyYW1lKTtcbiAgICB0aGlzLmNoaWxkID0gdGhpcy5mcmFtZS5jb250ZW50V2luZG93IHx8IHRoaXMuZnJhbWUuY29udGVudERvY3VtZW50LnBhcmVudFdpbmRvdztcbiAgICB0aGlzLm1vZGVsID0gbW9kZWwgfHwge307XG4gICAgcmV0dXJuIHRoaXMuc2VuZEhhbmRzaGFrZSh1cmwpO1xuICB9XG4gIC8qKlxuICAgKiBCZWdpbnMgdGhlIGhhbmRzaGFrZSBzdHJhdGVneVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIHNlbmQgYSBoYW5kc2hha2UgcmVxdWVzdCB0b1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGhhbmRzaGFrZSBpcyBjb21wbGV0ZVxuICAgKi9cblxuXG4gIHZhciBfcHJvdG8zID0gUG9zdG1hdGUucHJvdG90eXBlO1xuXG4gIF9wcm90bzMuc2VuZEhhbmRzaGFrZSA9IGZ1bmN0aW9uIHNlbmRIYW5kc2hha2UodXJsKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgY2hpbGRPcmlnaW4gPSByZXNvbHZlT3JpZ2luKHVybCk7XG4gICAgdmFyIGF0dGVtcHQgPSAwO1xuICAgIHZhciByZXNwb25zZUludGVydmFsO1xuICAgIHJldHVybiBuZXcgUG9zdG1hdGUuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVwbHkgPSBmdW5jdGlvbiByZXBseShlKSB7XG4gICAgICAgIGlmICghc2FuaXRpemUoZSwgY2hpbGRPcmlnaW4pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2hhbmRzaGFrZS1yZXBseScpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHJlc3BvbnNlSW50ZXJ2YWwpO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnUGFyZW50OiBSZWNlaXZlZCBoYW5kc2hha2UgcmVwbHkgZnJvbSBDaGlsZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzNC5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHJlcGx5LCBmYWxzZSk7XG5cbiAgICAgICAgICBfdGhpczQuY2hpbGRPcmlnaW4gPSBlLm9yaWdpbjtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ1BhcmVudDogU2F2aW5nIENoaWxkIG9yaWdpbicsIF90aGlzNC5jaGlsZE9yaWdpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUobmV3IFBhcmVudEFQSShfdGhpczQpKTtcbiAgICAgICAgfSAvLyBNaWdodCBuZWVkIHRvIHJlbW92ZSBzaW5jZSBwYXJlbnQgbWlnaHQgYmUgcmVjZWl2aW5nIGRpZmZlcmVudCBtZXNzYWdlc1xuICAgICAgICAvLyBmcm9tIGRpZmZlcmVudCBob3N0c1xuXG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsb2coJ1BhcmVudDogSW52YWxpZCBoYW5kc2hha2UgcmVwbHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWplY3QoJ0ZhaWxlZCBoYW5kc2hha2UnKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzNC5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHJlcGx5LCBmYWxzZSk7XG5cbiAgICAgIHZhciBkb1NlbmQgPSBmdW5jdGlvbiBkb1NlbmQoKSB7XG4gICAgICAgIGF0dGVtcHQrKztcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGxvZyhcIlBhcmVudDogU2VuZGluZyBoYW5kc2hha2UgYXR0ZW1wdCBcIiArIGF0dGVtcHQsIHtcbiAgICAgICAgICAgIGNoaWxkT3JpZ2luOiBjaGlsZE9yaWdpblxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXM0LmNoaWxkLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBwb3N0bWF0ZTogJ2hhbmRzaGFrZScsXG4gICAgICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICAgICAgbW9kZWw6IF90aGlzNC5tb2RlbFxuICAgICAgICB9LCBjaGlsZE9yaWdpbik7XG5cbiAgICAgICAgaWYgKGF0dGVtcHQgPT09IG1heEhhbmRzaGFrZVJlcXVlc3RzKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChyZXNwb25zZUludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIGxvYWRlZCA9IGZ1bmN0aW9uIGxvYWRlZCgpIHtcbiAgICAgICAgZG9TZW5kKCk7XG4gICAgICAgIHJlc3BvbnNlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChkb1NlbmQsIDUwMCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoX3RoaXM0LmZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgIF90aGlzNC5mcmFtZS5hdHRhY2hFdmVudCgnb25sb2FkJywgbG9hZGVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzNC5mcmFtZS5vbmxvYWQgPSBsb2FkZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGxvZygnUGFyZW50OiBMb2FkaW5nIGZyYW1lJywge1xuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfdGhpczQuZnJhbWUuc3JjID0gdXJsO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBQb3N0bWF0ZTtcbn0oKTtcbi8qKlxuICogVGhlIGVudHJ5IHBvaW50IG9mIHRoZSBDaGlsZFxuICogQHR5cGUge0NsYXNzfVxuICovXG5cblxuUG9zdG1hdGUuZGVidWcgPSBmYWxzZTtcblxuUG9zdG1hdGUuUHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93ID8gd2luZG93LlByb21pc2UgOiBQcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0oKTtcblxuUG9zdG1hdGUuTW9kZWwgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNoaWxkLCBtb2RlbCwgcGFyZW50LCBhbmQgcmVzcG9uZHMgdG8gdGhlIFBhcmVudHMgaGFuZHNoYWtlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtb2RlbCBIYXNoIG9mIHZhbHVlcywgZnVuY3Rpb25zLCBvciBwcm9taXNlc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICBUaGUgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGhhbmRzaGFrZSBoYXMgYmVlbiByZWNlaXZlZFxuICAgKi9cbiAgZnVuY3Rpb24gTW9kZWwobW9kZWwpIHtcbiAgICB0aGlzLmNoaWxkID0gd2luZG93O1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnBhcmVudCA9IHRoaXMuY2hpbGQucGFyZW50O1xuICAgIHJldHVybiB0aGlzLnNlbmRIYW5kc2hha2VSZXBseSgpO1xuICB9XG4gIC8qKlxuICAgKiBSZXNwb25kcyB0byBhIGhhbmRzaGFrZSBpbml0aWF0ZWQgYnkgdGhlIFBhcmVudFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlcyBhbiBvYmplY3QgdGhhdCBleHBvc2VzIGFuIEFQSSBmb3IgdGhlIENoaWxkXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90bzQgPSBNb2RlbC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvNC5zZW5kSGFuZHNoYWtlUmVwbHkgPSBmdW5jdGlvbiBzZW5kSGFuZHNoYWtlUmVwbHkoKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFBvc3RtYXRlLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHNoYWtlID0gZnVuY3Rpb24gc2hha2UoZSkge1xuICAgICAgICBpZiAoIWUuZGF0YS5wb3N0bWF0ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdoYW5kc2hha2UnKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnQ2hpbGQ6IFJlY2VpdmVkIGhhbmRzaGFrZSBmcm9tIFBhcmVudCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzNS5jaGlsZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgc2hha2UsIGZhbHNlKTtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ0NoaWxkOiBTZW5kaW5nIGhhbmRzaGFrZSByZXBseSB0byBQYXJlbnQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlLnNvdXJjZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBwb3N0bWF0ZTogJ2hhbmRzaGFrZS1yZXBseScsXG4gICAgICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZVxuICAgICAgICAgIH0sIGUub3JpZ2luKTtcbiAgICAgICAgICBfdGhpczUucGFyZW50T3JpZ2luID0gZS5vcmlnaW47IC8vIEV4dGVuZCBtb2RlbCB3aXRoIHRoZSBvbmUgcHJvdmlkZWQgYnkgdGhlIHBhcmVudFxuXG4gICAgICAgICAgdmFyIGRlZmF1bHRzID0gZS5kYXRhLm1vZGVsO1xuXG4gICAgICAgICAgaWYgKGRlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgIF90aGlzNS5tb2RlbFtrZXldID0gZGVmYXVsdHNba2V5XTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICBsb2coJ0NoaWxkOiBJbmhlcml0ZWQgYW5kIGV4dGVuZGVkIG1vZGVsIGZyb20gUGFyZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnQ2hpbGQ6IFNhdmluZyBQYXJlbnQgb3JpZ2luJywgX3RoaXM1LnBhcmVudE9yaWdpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUobmV3IENoaWxkQVBJKF90aGlzNSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlamVjdCgnSGFuZHNoYWtlIFJlcGx5IEZhaWxlZCcpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXM1LmNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBzaGFrZSwgZmFsc2UpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNb2RlbDtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgUG9zdG1hdGU7XG4iLCJpbXBvcnQgeyBCYXNlQ2FwYWJpbGl0eSB9IGZyb20gXCIuL2Jhc2VDYXBhYmlsaXR5XCI7XG5cbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb2dNZW51Q2FwYWJpbGl0eSBleHRlbmRzIEJhc2VDYXBhYmlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBwcmludCgpIHtcbiAgICByZXR1cm4gXCJjaGlsZCBycnJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUNhcGFiaWxpdHkgfSBmcm9tIFwiLi9iYXNlQ2FwYWJpbGl0eVwiO1xuXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29udGV4dENhcGFiaWxpdHkgZXh0ZW5kcyBCYXNlQ2FwYWJpbGl0eSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgcHJpbnQoKSB7XG4gICAgcmV0dXJuIFwiY2hpbGQgcnJyXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcENvbmZpZywgRXZlbnRQcm9wcyB9IGZyb20gXCIuLi90eXBlc1wiO1xuZXhwb3J0IGNsYXNzIEJhc2VDYXBhYmlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coXCJ4eHggQmFzZUNhcGFiaWxpdHkgc3RhcnRlZFwiKTtcbiAgfVxuICBzdGF0aWMgaW1wbGVtZW50RXZlbnRIYW5kbGVyKHsgZXZlbnRUeXBlLCBvcHRpb25zIH06IEV2ZW50UHJvcHMsIHJlc29sdmUpIHtcbiAgICAvLyB0aGUgYmFzZSBmdW5jdGlvbmFsaXR5IGlzIGp1c3QgdG8gcmVzb2x2ZSBvcHRpb25zLiBFYWNoIGNhcGFiaWxpdHkgY2FuIG9wdGlvbmFsbHkgaW1sZW1lbnQgYSBjdXN0b20gbG9naWMuXG4gICAgcmVzb2x2ZShvcHRpb25zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwQ29uZmlnLCBFdmVudFByb3BzIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDYXBhYmlsaXR5VHlwZSwgRXZlbnRUeXBlIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29nTWVudUNhcGFiaWxpdHkgfSBmcm9tIFwiLi9EYXNoYm9hcmRDb2dNZW51Q2FwYWJpbGl0eVwiO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29udGV4dENhcGFiaWxpdHkgfSBmcm9tIFwiLi9EYXNoYm9hcmRDb250ZXh0Q2FwYWJpbGl0eVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IEFwcENvbmZpZykge1xuICAgIC8vIGNvbnN0IGNhcGFiaWx5VHlwZXMgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuICAgIC8vIHRoaXMuX2NhcGFiaWxpdGllcyA9IGNhcGFiaWx5VHlwZXMubWFwKChjYXBhYmlsaXR5VHlwZTogQ2FwYWJpbGl0eVR5cGUpID0+IHtcbiAgICAvLyAgIGNvbnN0IGNhcGFiaWxpdHlDbGFzcyA9XG4gICAgLy8gICAgIENhcGFiaWxpdHlNYW5hZ2VyLmNhcGFiaWxpdHlCeVR5cGVbY2FwYWJpbGl0eVR5cGVdLmtsYXNzO1xuICAgIC8vICAgcmV0dXJuIG5ldyBjYXBhYmlsaXR5Q2xhc3MoKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIGluaXQgPSAoKSA9PiB7fTtcblxuICBoYW5kbGVFdmVudCA9ICh7IGV2ZW50VHlwZSwgb3B0aW9ucyB9OiBFdmVudFByb3BzLCByZXNvbHZlKSA9PiB7XG4gICAgLy8gc3RlcDE6IGNoZWNrIGlmIHRoZSBldmVudCBpcyBvZiBhIHZhbGlkIHR5cGUgW1RPRE9dXG4gICAgLy8gc3RlcDI6IGZpbmQgdGhlIGNhcGFiaWxpdHkgdGhhdCB0aGlzIGV2ZW50IGJlbG9uZ3MgdG9cbiAgICBjb25zdCBjYXBhYmlsaXR5ID0gQ2FwYWJpbGl0eU1hbmFnZXIuZmluZENhcGFiaWxpdHlCeUV2ZW50VHlwZShldmVudFR5cGUpO1xuICAgIC8vIHN0ZXAzOiB2YWxpZGF0ZSB0aGF0IHRoaXMgY2FwYWJpbGl0eSBpcyBlbmFibGVkLCByZWplY3QgaWYgbm90IFtUT0RPXVxuICAgIC8vIHN0ZXA0OiBub3cgc2ltcGxlIGxldCB0aGUgY2FwYWJpbGl0eSBoYW5kbGUgdGhlIGV2ZW50XG4gICAgY2FwYWJpbGl0eS5pbXBsZW1lbnRFdmVudEhhbmRsZXIoeyBldmVudFR5cGUsIG9wdGlvbnMgfSwgcmVzb2x2ZSk7XG4gIH07XG5cbiAgc3RhdGljIGZpbmRDYXBhYmlsaXR5QnlFdmVudFR5cGUgPSAoZXZlbnRUeXBlOiBFdmVudFR5cGUpID0+IHtcbiAgICBmb3IgKGNvbnN0IFtjYXBhYmlsaXR5VHlwZSwgeyBrbGFzcywgZXZlbnRzIH1dIG9mIE9iamVjdC5lbnRyaWVzKFxuICAgICAgQ2FwYWJpbGl0eU1hbmFnZXIuY2FwYWJpbGl0eUJ5VHlwZVxuICAgICkpIHtcbiAgICAgIGlmIChldmVudHMuaW5kZXhPZihldmVudFR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGtsYXNzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBzdGF0aWMgY2FwYWJpbGl0eUJ5VHlwZToge1xuICAgIFtwcm9wOiBzdHJpbmddOiB7XG4gICAgICBrbGFzczogYW55O1xuICAgICAgZXZlbnRzOiBzdHJpbmdbXTtcbiAgICB9O1xuICB9ID0ge1xuICAgIFtDYXBhYmlsaXR5VHlwZS5EQVNIQk9BUkRfQ09HX01FTlVdOiB7XG4gICAgICBrbGFzczogRGFzaGJvYXJkQ29nTWVudUNhcGFiaWxpdHksXG4gICAgICBldmVudHM6IFtFdmVudFR5cGUuREFTSEJPQVJEX0NPR19NRU5VX0lOSVRdLFxuICAgIH0sXG4gICAgW0NhcGFiaWxpdHlUeXBlLkRBU0hCT0FSRF9DT05URVhUXToge1xuICAgICAga2xhc3M6IERhc2hib2FyZENvbnRleHRDYXBhYmlsaXR5LFxuICAgICAgZXZlbnRzOiBbXSxcbiAgICB9LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgQXBwQ29uZmlnLCBFdmVudFByb3BzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IFBvc3RtYXRlIGZyb20gXCJwb3N0bWF0ZVwiO1xuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tIFwiLi9jYXBhYmlsaXRlcy9jYXBhYmlsaXR5TWFuYWdlclwiO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gIGhvc3Q6IFwiZGF0YWQwZy5jb21cIixcbiAgZGVidWc6IGZhbHNlLFxufTtcblxuY2xhc3MgQ2xpZW50IHtcbiAgcmVhZG9ubHkgX2hvc3Q6IHN0cmluZztcbiAgcmVhZG9ubHkgX2RlYnVnOiBib29sZWFuO1xuICByZWFkb25seSBfY29uZmlnOiBBcHBDb25maWc7XG4gIHJlYWRvbmx5IF9jYXBhYmlsaXR5TWFuYWdlcjogQ2FwYWJpbGl0eU1hbmFnZXI7XG4gIF9oYW5kc2hha2U6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlnOiBBcHBDb25maWcsXG4gICAgb3B0aW9uczogeyBkZWJ1Zz86IGJvb2xlYW47IGhvc3Q/OiBzdHJpbmcgfSA9IHt9XG4gICkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9ob3N0ID0gb3B0aW9ucy5ob3N0IHx8IERFRkFVTFRfT1BUSU9OUy5ob3N0O1xuICAgIHRoaXMuX2RlYnVnID0gb3B0aW9ucy5kZWJ1ZyB8fCBERUZBVUxUX09QVElPTlMuZGVidWc7XG4gICAgdGhpcy5fY2FwYWJpbGl0eU1hbmFnZXIgPSBuZXcgQ2FwYWJpbGl0eU1hbmFnZXIodGhpcy5fY29uZmlnKTtcblxuICAgIFBvc3RtYXRlLmRlYnVnID0gdGhpcy5fZGVidWc7XG4gICAgdGhpcy5faGFuZHNoYWtlID0gbmV3IFBvc3RtYXRlLk1vZGVsKHtcbiAgICAgIGNvbmZpZzogKCkgPT4gdGhpcy5fY29uZmlnLFxuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRzaGFrZS50aGVuKChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcImRkLWFwcHM6IHNkayBoYW5kc2hha2U6IHBhcmVudCA8LT4gY2hpbGQgaGFuZHNoYWtlIGlzIGNvbXBsZXRlXCJcbiAgICAgICk7XG4gICAgICB0aGlzLl9jYXBhYmlsaXR5TWFuYWdlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudFR5cGU6IEV2ZW50VHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaGFuZHNoYWtlID0gbmV3IFBvc3RtYXRlLk1vZGVsKHtcbiAgICAgICAgaGFuZGxlRXZlbnQ6IChldmVudHByb3BzOiBFdmVudFByb3BzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fY2FwYWJpbGl0eU1hbmFnZXIuaGFuZGxlRXZlbnQoZXZlbnRwcm9wcywgcmVzb2x2ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2hhbmRzaGFrZS50aGVuKChwYXJlbnQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJkZC1hcHBzOiBzZGsgaGFuZHNoYWtlIDJuZCBwYXNzOiBwYXJlbnQgPC0+IGNoaWxkIGhhbmRzaGFrZSBpcyBjb21wbGV0ZVwiXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgRERDbGllbnQgPSB7XG4gIGluaXQ6IChjb25maWc6IEFwcENvbmZpZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiZGQtYXBwczogc2RrIGluaXRcIik7XG5cbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KGNvbmZpZyk7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9LFxuICBvbjogKGV2ZW50VHlwZTogRXZlbnRUeXBlKSA9PiB7XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7fSk7XG4gICAgcmV0dXJuIGNsaWVudC5oYW5kbGVFdmVudChldmVudFR5cGUpO1xuICB9LFxufTtcbiIsImV4cG9ydCBlbnVtIENhcGFiaWxpdHlUeXBlIHtcbiAgREFTSEJPQVJEX0NPR19NRU5VID0gXCJkYXNoYm9hcmRfY29nX21lbnVcIixcbiAgREFTSEJPQVJEX0NPTlRFWFQgPSBcImRhc2hib2FyZF9jb250ZXh0XCIsXG59XG5cbmV4cG9ydCBlbnVtIEV2ZW50VHlwZSB7XG4gIERBU0hCT0FSRF9DT0dfTUVOVV9JTklUID0gXCJkYXNoYm9hcmRfY29nX21lbnVfaW5pdFwiLFxufVxuIiwiaW1wb3J0IHsgRERDbGllbnQgfSBmcm9tIFwiLi9jbGllbnRcIjtcblxuZXhwb3J0ID0gRERDbGllbnQ7XG4iXSwic291cmNlUm9vdCI6IiJ9