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
    BaseCapability.prototype.printParent = function () {
        return "parent rrr";
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
        var capabilyTypes = Object.keys(config);
        capabilyTypes.forEach(function (capabilityType) {
            var capabilityClass = CapabilityManager.capabilityByType[capabilityType];
            var capability = new capabilityClass();
        });
    }
    CapabilityManager.capabilityByType = (_a = {},
        _a[constants_1.CapabilityType.DASHBOARD_COG_MENU] = DashboardCogMenuCapability_1.DashboardCogMenuCapability,
        _a[constants_1.CapabilityType.DASHBOARD_CONTEXT] = DashboardContextCapability_1.DashboardContextCapability,
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
    return Client;
}());
exports.DDClient = {
    init: function (config) {
        console.log("dd-apps: sdk init");
        var client = new Client(config);
        return client;
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
exports.CapabilityType = void 0;
var CapabilityType;
(function (CapabilityType) {
    CapabilityType["DASHBOARD_COG_MENU"] = "dashboard_cog_menu";
    CapabilityType["DASHBOARD_CONTEXT"] = "dashboard_context";
})(CapabilityType = exports.CapabilityType || (exports.CapabilityType = {}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERENsaWVudC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRERDbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9ub2RlX21vZHVsZXMvcG9zdG1hdGUvYnVpbGQvcG9zdG1hdGUuZXMuanMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvRGFzaGJvYXJkQ29nTWVudUNhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvRGFzaGJvYXJkQ29udGV4dENhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvYmFzZUNhcGFiaWxpdHkudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvY2FwYWJpbGl0eU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2xpZW50LnRzIiwid2VicGFjazovL0REQ2xpZW50Ly4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ERENsaWVudC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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QUFDLE1BQU07WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxnRUFBZ0UsQ0FDakUsQ0FBQztZQUNGLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQztBQUVZLGdCQUFRLEdBQUc7SUFDdEIsSUFBSSxFQUFFLFVBQUMsTUFBaUI7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0NGLElBQVksY0FHWDtBQUhELFdBQVksY0FBYztJQUN4QiwyREFBeUM7SUFDekMseURBQXVDO0FBQ3pDLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6Qjs7Ozs7Ozs7Ozs7Ozs7QUNIRCxzRUFBb0M7QUFFcEMsaUJBQVMsaUJBQVEsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRERDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRERDbGllbnRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXG4gIHBvc3RtYXRlIC0gQSBwb3dlcmZ1bCwgc2ltcGxlLCBwcm9taXNlLWJhc2VkIHBvc3RNZXNzYWdlIGxpYnJhcnlcbiAgQHZlcnNpb24gdjEuNS4yXG4gIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xsYXJzaGF2ZWNsdWIvcG9zdG1hdGVcbiAgQGF1dGhvciBKYWNvYiBLZWxsZXkgPGpha2llOEBnbWFpbC5jb20+XG4gIEBsaWNlbnNlIE1JVFxuKiovXG4vKipcbiAqIFRoZSB0eXBlIG9mIG1lc3NhZ2VzIG91ciBmcmFtZXMgb3VyIHNlbmRpbmdcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZhciBtZXNzYWdlVHlwZSA9ICdhcHBsaWNhdGlvbi94LXBvc3RtYXRlLXYxK2pzb24nO1xuLyoqXG4gKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXR0ZW1wdHMgdG8gc2VuZCBhIGhhbmRzaGFrZSByZXF1ZXN0IHRvIHRoZSBwYXJlbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cblxudmFyIG1heEhhbmRzaGFrZVJlcXVlc3RzID0gNTtcbi8qKlxuICogQSB1bmlxdWUgbWVzc2FnZSBJRCB0aGF0IGlzIHVzZWQgdG8gZW5zdXJlIHJlc3BvbnNlcyBhcmUgc2VudCB0byB0aGUgY29ycmVjdCByZXF1ZXN0c1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuXG52YXIgX21lc3NhZ2VJZCA9IDA7XG4vKipcbiAqIEluY3JlbWVudHMgYW5kIHJldHVybnMgYSBtZXNzYWdlIElEXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgdW5pcXVlIElEIGZvciBhIG1lc3NhZ2VcbiAqL1xuXG52YXIgZ2VuZXJhdGVOZXdNZXNzYWdlSWQgPSBmdW5jdGlvbiBnZW5lcmF0ZU5ld01lc3NhZ2VJZCgpIHtcbiAgcmV0dXJuICsrX21lc3NhZ2VJZDtcbn07XG4vKipcbiAqIFBvc3RtYXRlIGxvZ2dpbmcgZnVuY3Rpb24gdGhhdCBlbmFibGVzL2Rpc2FibGVzIHZpYSBjb25maWdcbiAqIEBwYXJhbSAge09iamVjdH0gLi4uYXJncyBSZXN0IEFyZ3VtZW50c1xuICovXG5cbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gUG9zdG1hdGUuZGVidWcgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbi8qKlxuICogVGFrZXMgYSBVUkwgYW5kIHJldHVybnMgdGhlIG9yaWdpblxuICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIGZ1bGwgVVJMIGJlaW5nIHJlcXVlc3RlZFxuICogQHJldHVybiB7U3RyaW5nfSAgICAgVGhlIFVSTHMgb3JpZ2luXG4gKi9cblxudmFyIHJlc29sdmVPcmlnaW4gPSBmdW5jdGlvbiByZXNvbHZlT3JpZ2luKHVybCkge1xuICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICB2YXIgcHJvdG9jb2wgPSBhLnByb3RvY29sLmxlbmd0aCA+IDQgPyBhLnByb3RvY29sIDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICB2YXIgaG9zdCA9IGEuaG9zdC5sZW5ndGggPyBhLnBvcnQgPT09ICc4MCcgfHwgYS5wb3J0ID09PSAnNDQzJyA/IGEuaG9zdG5hbWUgOiBhLmhvc3QgOiB3aW5kb3cubG9jYXRpb24uaG9zdDtcbiAgcmV0dXJuIGEub3JpZ2luIHx8IHByb3RvY29sICsgXCIvL1wiICsgaG9zdDtcbn07XG52YXIgbWVzc2FnZVR5cGVzID0ge1xuICBoYW5kc2hha2U6IDEsXG4gICdoYW5kc2hha2UtcmVwbHknOiAxLFxuICBjYWxsOiAxLFxuICBlbWl0OiAxLFxuICByZXBseTogMSxcbiAgcmVxdWVzdDogMVxuICAvKipcbiAgICogRW5zdXJlcyB0aGF0IGEgbWVzc2FnZSBpcyBzYWZlIHRvIGludGVycHJldFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG1lc3NhZ2UgVGhlIHBvc3RtYXRlIG1lc3NhZ2UgYmVpbmcgc2VudFxuICAgKiBAcGFyYW0gIHtTdHJpbmd8Qm9vbGVhbn0gYWxsb3dlZE9yaWdpbiBUaGUgd2hpdGVsaXN0ZWQgb3JpZ2luIG9yIGZhbHNlIHRvIHNraXAgb3JpZ2luIGNoZWNrXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuXG59O1xudmFyIHNhbml0aXplID0gZnVuY3Rpb24gc2FuaXRpemUobWVzc2FnZSwgYWxsb3dlZE9yaWdpbikge1xuICBpZiAodHlwZW9mIGFsbG93ZWRPcmlnaW4gPT09ICdzdHJpbmcnICYmIG1lc3NhZ2Uub3JpZ2luICE9PSBhbGxvd2VkT3JpZ2luKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbWVzc2FnZS5kYXRhKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgbWVzc2FnZS5kYXRhID09PSAnb2JqZWN0JyAmJiAhKCdwb3N0bWF0ZScgaW4gbWVzc2FnZS5kYXRhKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAobWVzc2FnZS5kYXRhLnR5cGUgIT09IG1lc3NhZ2VUeXBlKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbWVzc2FnZVR5cGVzW21lc3NhZ2UuZGF0YS5wb3N0bWF0ZV0pIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59O1xuLyoqXG4gKiBUYWtlcyBhIG1vZGVsLCBhbmQgc2VhcmNoZXMgZm9yIGEgdmFsdWUgYnkgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0gIHtPYmplY3R9IG1vZGVsICAgICBUaGUgZGljdGlvbmFyeSB0byBzZWFyY2ggYWdhaW5zdFxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wZXJ0eSAgQSBwYXRoIHdpdGhpbiBhIGRpY3Rpb25hcnkgKGkuZS4gJ3dpbmRvdy5sb2NhdGlvbi5ocmVmJylcbiAqIEBwYXJhbSAge09iamVjdH0gZGF0YSAgICAgIEFkZGl0aW9uYWwgaW5mb3JtYXRpb24gZnJvbSB0aGUgZ2V0IHJlcXVlc3QgdGhhdCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkIHRvIGZ1bmN0aW9ucyBpbiB0aGUgY2hpbGQgbW9kZWxcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cblxudmFyIHJlc29sdmVWYWx1ZSA9IGZ1bmN0aW9uIHJlc29sdmVWYWx1ZShtb2RlbCwgcHJvcGVydHkpIHtcbiAgdmFyIHVud3JhcHBlZENvbnRleHQgPSB0eXBlb2YgbW9kZWxbcHJvcGVydHldID09PSAnZnVuY3Rpb24nID8gbW9kZWxbcHJvcGVydHldKCkgOiBtb2RlbFtwcm9wZXJ0eV07XG4gIHJldHVybiBQb3N0bWF0ZS5Qcm9taXNlLnJlc29sdmUodW53cmFwcGVkQ29udGV4dCk7XG59O1xuLyoqXG4gKiBDb21wb3NlcyBhbiBBUEkgdG8gYmUgdXNlZCBieSB0aGUgcGFyZW50XG4gKiBAcGFyYW0ge09iamVjdH0gaW5mbyBJbmZvcm1hdGlvbiBvbiB0aGUgY29uc3VtZXJcbiAqL1xuXG52YXIgUGFyZW50QVBJID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyZW50QVBJKGluZm8pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXJlbnQgPSBpbmZvLnBhcmVudDtcbiAgICB0aGlzLmZyYW1lID0gaW5mby5mcmFtZTtcbiAgICB0aGlzLmNoaWxkID0gaW5mby5jaGlsZDtcbiAgICB0aGlzLmNoaWxkT3JpZ2luID0gaW5mby5jaGlsZE9yaWdpbjtcbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBSZWdpc3RlcmluZyBBUEknKTtcbiAgICAgIGxvZygnUGFyZW50OiBBd2FpdGluZyBtZXNzYWdlcy4uLicpO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFzYW5pdGl6ZShlLCBfdGhpcy5jaGlsZE9yaWdpbikpIHJldHVybiBmYWxzZTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlIGFzc2lnbm1lbnRzIGJlbG93IGVuc3VyZXMgdGhhdCBlLCBkYXRhLCBhbmQgdmFsdWUgYXJlIGFsbCBkZWZpbmVkXG4gICAgICAgKi9cblxuICAgICAgdmFyIF9yZWYgPSAoKGUgfHwge30pLmRhdGEgfHwge30pLnZhbHVlIHx8IHt9LFxuICAgICAgICAgIGRhdGEgPSBfcmVmLmRhdGEsXG4gICAgICAgICAgbmFtZSA9IF9yZWYubmFtZTtcblxuICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2VtaXQnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKFwiUGFyZW50OiBSZWNlaXZlZCBldmVudCBlbWlzc2lvbjogXCIgKyBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lIGluIF90aGlzLmV2ZW50cykge1xuICAgICAgICAgIF90aGlzLmV2ZW50c1tuYW1lXS5jYWxsKF90aGlzLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5saXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBBd2FpdGluZyBldmVudCBlbWlzc2lvbnMgZnJvbSBDaGlsZCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBQYXJlbnRBUEkucHJvdG90eXBlO1xuXG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQocHJvcGVydHkpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUG9zdG1hdGUuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgLy8gRXh0cmFjdCBkYXRhIGZyb20gcmVzcG9uc2UgYW5kIGtpbGwgbGlzdGVuZXJzXG4gICAgICB2YXIgdWlkID0gZ2VuZXJhdGVOZXdNZXNzYWdlSWQoKTtcblxuICAgICAgdmFyIHRyYW5zYWN0ID0gZnVuY3Rpb24gdHJhbnNhY3QoZSkge1xuICAgICAgICBpZiAoZS5kYXRhLnVpZCA9PT0gdWlkICYmIGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ3JlcGx5Jykge1xuICAgICAgICAgIF90aGlzMi5wYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRyYW5zYWN0LCBmYWxzZSk7XG5cbiAgICAgICAgICByZXNvbHZlKGUuZGF0YS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH07IC8vIFByZXBhcmUgZm9yIHJlc3BvbnNlIGZyb20gQ2hpbGQuLi5cblxuXG4gICAgICBfdGhpczIucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0cmFuc2FjdCwgZmFsc2UpOyAvLyBUaGVuIGFzayBjaGlsZCBmb3IgaW5mb3JtYXRpb25cblxuXG4gICAgICBfdGhpczIuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBwb3N0bWF0ZTogJ3JlcXVlc3QnLFxuICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICB1aWQ6IHVpZFxuICAgICAgfSwgX3RoaXMyLmNoaWxkT3JpZ2luKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY2FsbCA9IGZ1bmN0aW9uIGNhbGwocHJvcGVydHksIGRhdGEpIHtcbiAgICAvLyBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBjaGlsZFxuICAgIHRoaXMuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgcG9zdG1hdGU6ICdjYWxsJyxcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0sIHRoaXMuY2hpbGRPcmlnaW4pO1xuICB9O1xuXG4gIF9wcm90by5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gY2FsbGJhY2s7XG4gIH07XG5cbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ1BhcmVudDogRGVzdHJveWluZyBQb3N0bWF0ZSBpbnN0YW5jZScpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5saXN0ZW5lciwgZmFsc2UpO1xuICAgIHRoaXMuZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZyYW1lKTtcbiAgfTtcblxuICByZXR1cm4gUGFyZW50QVBJO1xufSgpO1xuLyoqXG4gKiBDb21wb3NlcyBhbiBBUEkgdG8gYmUgdXNlZCBieSB0aGUgY2hpbGRcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIEluZm9ybWF0aW9uIG9uIHRoZSBjb25zdW1lclxuICovXG5cbnZhciBDaGlsZEFQSSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENoaWxkQVBJKGluZm8pIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHRoaXMubW9kZWwgPSBpbmZvLm1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gaW5mby5wYXJlbnQ7XG4gICAgdGhpcy5wYXJlbnRPcmlnaW4gPSBpbmZvLnBhcmVudE9yaWdpbjtcbiAgICB0aGlzLmNoaWxkID0gaW5mby5jaGlsZDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coJ0NoaWxkOiBSZWdpc3RlcmluZyBBUEknKTtcbiAgICAgIGxvZygnQ2hpbGQ6IEF3YWl0aW5nIG1lc3NhZ2VzLi4uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghc2FuaXRpemUoZSwgX3RoaXMzLnBhcmVudE9yaWdpbikpIHJldHVybjtcblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nKCdDaGlsZDogUmVjZWl2ZWQgcmVxdWVzdCcsIGUuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBfZSRkYXRhID0gZS5kYXRhLFxuICAgICAgICAgIHByb3BlcnR5ID0gX2UkZGF0YS5wcm9wZXJ0eSxcbiAgICAgICAgICB1aWQgPSBfZSRkYXRhLnVpZCxcbiAgICAgICAgICBkYXRhID0gX2UkZGF0YS5kYXRhO1xuXG4gICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnY2FsbCcpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5IGluIF90aGlzMy5tb2RlbCAmJiB0eXBlb2YgX3RoaXMzLm1vZGVsW3Byb3BlcnR5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIF90aGlzMy5tb2RlbFtwcm9wZXJ0eV0oZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFJlcGx5IHRvIFBhcmVudFxuXG5cbiAgICAgIHJlc29sdmVWYWx1ZShfdGhpczMubW9kZWwsIHByb3BlcnR5KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZS5zb3VyY2UucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICBwb3N0bWF0ZTogJ3JlcGx5JyxcbiAgICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgICB1aWQ6IHVpZCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSwgZS5vcmlnaW4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IENoaWxkQVBJLnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmVtaXQgPSBmdW5jdGlvbiBlbWl0KG5hbWUsIGRhdGEpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKFwiQ2hpbGQ6IEVtaXR0aW5nIEV2ZW50IFxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIiwgZGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgcG9zdG1hdGU6ICdlbWl0JyxcbiAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfVxuICAgIH0sIHRoaXMucGFyZW50T3JpZ2luKTtcbiAgfTtcblxuICByZXR1cm4gQ2hpbGRBUEk7XG59KCk7XG4vKipcbiAgKiBUaGUgZW50cnkgcG9pbnQgb2YgdGhlIFBhcmVudC5cbiAqIEB0eXBlIHtDbGFzc31cbiAqL1xuXG52YXIgUG9zdG1hdGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGNyYXBzIGl0c2VsZlxuXG4gIC8qKlxuICAgKiBTZXRzIG9wdGlvbnMgcmVsYXRlZCB0byB0aGUgUGFyZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGVsZW1lbnQgdG8gaW5qZWN0IHRoZSBmcmFtZSBpbnRvLCBhbmQgdGhlIHVybFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgKi9cbiAgZnVuY3Rpb24gUG9zdG1hdGUoX3JlZjIpIHtcbiAgICB2YXIgX3JlZjIkY29udGFpbmVyID0gX3JlZjIuY29udGFpbmVyLFxuICAgICAgICBjb250YWluZXIgPSBfcmVmMiRjb250YWluZXIgPT09IHZvaWQgMCA/IHR5cGVvZiBjb250YWluZXIgIT09ICd1bmRlZmluZWQnID8gY29udGFpbmVyIDogZG9jdW1lbnQuYm9keSA6IF9yZWYyJGNvbnRhaW5lcixcbiAgICAgICAgbW9kZWwgPSBfcmVmMi5tb2RlbCxcbiAgICAgICAgdXJsID0gX3JlZjIudXJsLFxuICAgICAgICBuYW1lID0gX3JlZjIubmFtZSxcbiAgICAgICAgX3JlZjIkY2xhc3NMaXN0QXJyYXkgPSBfcmVmMi5jbGFzc0xpc3RBcnJheSxcbiAgICAgICAgY2xhc3NMaXN0QXJyYXkgPSBfcmVmMiRjbGFzc0xpc3RBcnJheSA9PT0gdm9pZCAwID8gW10gOiBfcmVmMiRjbGFzc0xpc3RBcnJheTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gICAgdGhpcy5wYXJlbnQgPSB3aW5kb3c7XG4gICAgdGhpcy5mcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIHRoaXMuZnJhbWUubmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgdGhpcy5mcmFtZS5jbGFzc0xpc3QuYWRkLmFwcGx5KHRoaXMuZnJhbWUuY2xhc3NMaXN0LCBjbGFzc0xpc3RBcnJheSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZnJhbWUpO1xuICAgIHRoaXMuY2hpbGQgPSB0aGlzLmZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgdGhpcy5mcmFtZS5jb250ZW50RG9jdW1lbnQucGFyZW50V2luZG93O1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbCB8fCB7fTtcbiAgICByZXR1cm4gdGhpcy5zZW5kSGFuZHNoYWtlKHVybCk7XG4gIH1cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgaGFuZHNoYWtlIHN0cmF0ZWd5XG4gICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gc2VuZCBhIGhhbmRzaGFrZSByZXF1ZXN0IHRvXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaGFuZHNoYWtlIGlzIGNvbXBsZXRlXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90bzMgPSBQb3N0bWF0ZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5zZW5kSGFuZHNoYWtlID0gZnVuY3Rpb24gc2VuZEhhbmRzaGFrZSh1cmwpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBjaGlsZE9yaWdpbiA9IHJlc29sdmVPcmlnaW4odXJsKTtcbiAgICB2YXIgYXR0ZW1wdCA9IDA7XG4gICAgdmFyIHJlc3BvbnNlSW50ZXJ2YWw7XG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXBseSA9IGZ1bmN0aW9uIHJlcGx5KGUpIHtcbiAgICAgICAgaWYgKCFzYW5pdGl6ZShlLCBjaGlsZE9yaWdpbikpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnaGFuZHNoYWtlLXJlcGx5Jykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVzcG9uc2VJbnRlcnZhbCk7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdQYXJlbnQ6IFJlY2VpdmVkIGhhbmRzaGFrZSByZXBseSBmcm9tIENoaWxkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXM0LnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVwbHksIGZhbHNlKTtcblxuICAgICAgICAgIF90aGlzNC5jaGlsZE9yaWdpbiA9IGUub3JpZ2luO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnUGFyZW50OiBTYXZpbmcgQ2hpbGQgb3JpZ2luJywgX3RoaXM0LmNoaWxkT3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgUGFyZW50QVBJKF90aGlzNCkpO1xuICAgICAgICB9IC8vIE1pZ2h0IG5lZWQgdG8gcmVtb3ZlIHNpbmNlIHBhcmVudCBtaWdodCBiZSByZWNlaXZpbmcgZGlmZmVyZW50IG1lc3NhZ2VzXG4gICAgICAgIC8vIGZyb20gZGlmZmVyZW50IGhvc3RzXG5cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGxvZygnUGFyZW50OiBJbnZhbGlkIGhhbmRzaGFrZSByZXBseScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlamVjdCgnRmFpbGVkIGhhbmRzaGFrZScpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXM0LnBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgcmVwbHksIGZhbHNlKTtcblxuICAgICAgdmFyIGRvU2VuZCA9IGZ1bmN0aW9uIGRvU2VuZCgpIHtcbiAgICAgICAgYXR0ZW1wdCsrO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKFwiUGFyZW50OiBTZW5kaW5nIGhhbmRzaGFrZSBhdHRlbXB0IFwiICsgYXR0ZW1wdCwge1xuICAgICAgICAgICAgY2hpbGRPcmlnaW46IGNoaWxkT3JpZ2luXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczQuY2hpbGQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHBvc3RtYXRlOiAnaGFuZHNoYWtlJyxcbiAgICAgICAgICB0eXBlOiBtZXNzYWdlVHlwZSxcbiAgICAgICAgICBtb2RlbDogX3RoaXM0Lm1vZGVsXG4gICAgICAgIH0sIGNoaWxkT3JpZ2luKTtcblxuICAgICAgICBpZiAoYXR0ZW1wdCA9PT0gbWF4SGFuZHNoYWtlUmVxdWVzdHMpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHJlc3BvbnNlSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgbG9hZGVkID0gZnVuY3Rpb24gbG9hZGVkKCkge1xuICAgICAgICBkb1NlbmQoKTtcbiAgICAgICAgcmVzcG9uc2VJbnRlcnZhbCA9IHNldEludGVydmFsKGRvU2VuZCwgNTAwKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChfdGhpczQuZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgX3RoaXM0LmZyYW1lLmF0dGFjaEV2ZW50KCdvbmxvYWQnLCBsb2FkZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXM0LmZyYW1lLm9ubG9hZCA9IGxvYWRlZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbG9nKCdQYXJlbnQ6IExvYWRpbmcgZnJhbWUnLCB7XG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzNC5mcmFtZS5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFBvc3RtYXRlO1xufSgpO1xuLyoqXG4gKiBUaGUgZW50cnkgcG9pbnQgb2YgdGhlIENoaWxkXG4gKiBAdHlwZSB7Q2xhc3N9XG4gKi9cblxuXG5Qb3N0bWF0ZS5kZWJ1ZyA9IGZhbHNlO1xuXG5Qb3N0bWF0ZS5Qcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cgPyB3aW5kb3cuUHJvbWlzZSA6IFByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufSgpO1xuXG5Qb3N0bWF0ZS5Nb2RlbCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY2hpbGQsIG1vZGVsLCBwYXJlbnQsIGFuZCByZXNwb25kcyB0byB0aGUgUGFyZW50cyBoYW5kc2hha2VcbiAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsIEhhc2ggb2YgdmFsdWVzLCBmdW5jdGlvbnMsIG9yIHByb21pc2VzXG4gICAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIFRoZSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaGFuZHNoYWtlIGhhcyBiZWVuIHJlY2VpdmVkXG4gICAqL1xuICBmdW5jdGlvbiBNb2RlbChtb2RlbCkge1xuICAgIHRoaXMuY2hpbGQgPSB3aW5kb3c7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMucGFyZW50ID0gdGhpcy5jaGlsZC5wYXJlbnQ7XG4gICAgcmV0dXJuIHRoaXMuc2VuZEhhbmRzaGFrZVJlcGx5KCk7XG4gIH1cbiAgLyoqXG4gICAqIFJlc3BvbmRzIHRvIGEgaGFuZHNoYWtlIGluaXRpYXRlZCBieSB0aGUgUGFyZW50XG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJlc29sdmVzIGFuIG9iamVjdCB0aGF0IGV4cG9zZXMgYW4gQVBJIGZvciB0aGUgQ2hpbGRcbiAgICovXG5cblxuICB2YXIgX3Byb3RvNCA9IE1vZGVsLnByb3RvdHlwZTtcblxuICBfcHJvdG80LnNlbmRIYW5kc2hha2VSZXBseSA9IGZ1bmN0aW9uIHNlbmRIYW5kc2hha2VSZXBseSgpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUG9zdG1hdGUuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgc2hha2UgPSBmdW5jdGlvbiBzaGFrZShlKSB7XG4gICAgICAgIGlmICghZS5kYXRhLnBvc3RtYXRlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUuZGF0YS5wb3N0bWF0ZSA9PT0gJ2hhbmRzaGFrZScpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogUmVjZWl2ZWQgaGFuZHNoYWtlIGZyb20gUGFyZW50Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXM1LmNoaWxkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBzaGFrZSwgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGxvZygnQ2hpbGQ6IFNlbmRpbmcgaGFuZHNoYWtlIHJlcGx5IHRvIFBhcmVudCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUuc291cmNlLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHBvc3RtYXRlOiAnaGFuZHNoYWtlLXJlcGx5JyxcbiAgICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlXG4gICAgICAgICAgfSwgZS5vcmlnaW4pO1xuICAgICAgICAgIF90aGlzNS5wYXJlbnRPcmlnaW4gPSBlLm9yaWdpbjsgLy8gRXh0ZW5kIG1vZGVsIHdpdGggdGhlIG9uZSBwcm92aWRlZCBieSB0aGUgcGFyZW50XG5cbiAgICAgICAgICB2YXIgZGVmYXVsdHMgPSBlLmRhdGEubW9kZWw7XG5cbiAgICAgICAgICBpZiAoZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgX3RoaXM1Lm1vZGVsW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIGxvZygnQ2hpbGQ6IEluaGVyaXRlZCBhbmQgZXh0ZW5kZWQgbW9kZWwgZnJvbSBQYXJlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogU2F2aW5nIFBhcmVudCBvcmlnaW4nLCBfdGhpczUucGFyZW50T3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShuZXcgQ2hpbGRBUEkoX3RoaXM1KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVqZWN0KCdIYW5kc2hha2UgUmVwbHkgRmFpbGVkJyk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpczUuY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHNoYWtlLCBmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1vZGVsO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0bWF0ZTtcbiIsImltcG9ydCB7IEJhc2VDYXBhYmlsaXR5IH0gZnJvbSBcIi4vYmFzZUNhcGFiaWxpdHlcIjtcblxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvZ01lbnVDYXBhYmlsaXR5IGV4dGVuZHMgQmFzZUNhcGFiaWxpdHkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHByaW50KCkge1xuICAgIHJldHVybiBcImNoaWxkIHJyclwiO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlQ2FwYWJpbGl0eSB9IGZyb20gXCIuL2Jhc2VDYXBhYmlsaXR5XCI7XG5cbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb250ZXh0Q2FwYWJpbGl0eSBleHRlbmRzIEJhc2VDYXBhYmlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBwcmludCgpIHtcbiAgICByZXR1cm4gXCJjaGlsZCBycnJcIjtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEJhc2VDYXBhYmlsaXR5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coXCJ4eHggQmFzZUNhcGFiaWxpdHkgc3RhcnRlZFwiKTtcbiAgfVxuICBwcmludFBhcmVudCgpIHtcbiAgICByZXR1cm4gXCJwYXJlbnQgcnJyXCI7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ2FwYWJpbGl0eVR5cGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb2dNZW51Q2FwYWJpbGl0eSB9IGZyb20gXCIuL0Rhc2hib2FyZENvZ01lbnVDYXBhYmlsaXR5XCI7XG5pbXBvcnQgeyBEYXNoYm9hcmRDb250ZXh0Q2FwYWJpbGl0eSB9IGZyb20gXCIuL0Rhc2hib2FyZENvbnRleHRDYXBhYmlsaXR5XCI7XG5cbmV4cG9ydCBjbGFzcyBDYXBhYmlsaXR5TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQXBwQ29uZmlnKSB7XG4gICAgY29uc3QgY2FwYWJpbHlUeXBlcyA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG4gICAgY2FwYWJpbHlUeXBlcy5mb3JFYWNoKChjYXBhYmlsaXR5VHlwZTogQ2FwYWJpbGl0eVR5cGUpID0+IHtcbiAgICAgIGNvbnN0IGNhcGFiaWxpdHlDbGFzcyA9XG4gICAgICAgIENhcGFiaWxpdHlNYW5hZ2VyLmNhcGFiaWxpdHlCeVR5cGVbY2FwYWJpbGl0eVR5cGVdO1xuICAgICAgY29uc3QgY2FwYWJpbGl0eSA9IG5ldyBjYXBhYmlsaXR5Q2xhc3MoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQgPSAoKSA9PiB7fTtcblxuICBzdGF0aWMgY2FwYWJpbGl0eUJ5VHlwZSA9IHtcbiAgICBbQ2FwYWJpbGl0eVR5cGUuREFTSEJPQVJEX0NPR19NRU5VXTogRGFzaGJvYXJkQ29nTWVudUNhcGFiaWxpdHksXG4gICAgW0NhcGFiaWxpdHlUeXBlLkRBU0hCT0FSRF9DT05URVhUXTogRGFzaGJvYXJkQ29udGV4dENhcGFiaWxpdHksXG4gIH07XG59XG4iLCJpbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IFBvc3RtYXRlIGZyb20gXCJwb3N0bWF0ZVwiO1xuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tIFwiLi9jYXBhYmlsaXRlcy9jYXBhYmlsaXR5TWFuYWdlclwiO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gIGhvc3Q6IFwiZGF0YWQwZy5jb21cIixcbiAgZGVidWc6IGZhbHNlLFxufTtcblxuY2xhc3MgQ2xpZW50IHtcbiAgcmVhZG9ubHkgX2hvc3Q6IHN0cmluZztcbiAgcmVhZG9ubHkgX2RlYnVnOiBib29sZWFuO1xuICByZWFkb25seSBfY29uZmlnOiBBcHBDb25maWc7XG4gIHJlYWRvbmx5IF9jYXBhYmlsaXR5TWFuYWdlcjogQ2FwYWJpbGl0eU1hbmFnZXI7XG4gIHJlYWRvbmx5IF9oYW5kc2hha2U6IGFueTtcbiAgY29uc3RydWN0b3IoXG4gICAgY29uZmlnOiBBcHBDb25maWcsXG4gICAgb3B0aW9uczogeyBkZWJ1Zz86IGJvb2xlYW47IGhvc3Q/OiBzdHJpbmcgfSA9IHt9XG4gICkge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICB0aGlzLl9ob3N0ID0gb3B0aW9ucy5ob3N0IHx8IERFRkFVTFRfT1BUSU9OUy5ob3N0O1xuICAgIHRoaXMuX2RlYnVnID0gb3B0aW9ucy5kZWJ1ZyB8fCBERUZBVUxUX09QVElPTlMuZGVidWc7XG4gICAgdGhpcy5fY2FwYWJpbGl0eU1hbmFnZXIgPSBuZXcgQ2FwYWJpbGl0eU1hbmFnZXIodGhpcy5fY29uZmlnKTtcblxuICAgIFBvc3RtYXRlLmRlYnVnID0gdGhpcy5fZGVidWc7XG4gICAgdGhpcy5faGFuZHNoYWtlID0gbmV3IFBvc3RtYXRlLk1vZGVsKHtcbiAgICAgIGNvbmZpZzogKCkgPT4gdGhpcy5fY29uZmlnLFxuICAgIH0pO1xuICAgIHRoaXMuX2hhbmRzaGFrZS50aGVuKChwYXJlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcImRkLWFwcHM6IHNkayBoYW5kc2hha2U6IHBhcmVudCA8LT4gY2hpbGQgaGFuZHNoYWtlIGlzIGNvbXBsZXRlXCJcbiAgICAgICk7XG4gICAgICB0aGlzLl9jYXBhYmlsaXR5TWFuYWdlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEREQ2xpZW50ID0ge1xuICBpbml0OiAoY29uZmlnOiBBcHBDb25maWcpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImRkLWFwcHM6IHNkayBpbml0XCIpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IENsaWVudChjb25maWcpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfSxcbn07XG4iLCJleHBvcnQgZW51bSBDYXBhYmlsaXR5VHlwZSB7XG4gIERBU0hCT0FSRF9DT0dfTUVOVSA9IFwiZGFzaGJvYXJkX2NvZ19tZW51XCIsXG4gIERBU0hCT0FSRF9DT05URVhUID0gXCJkYXNoYm9hcmRfY29udGV4dFwiLFxufVxuIiwiaW1wb3J0IHsgRERDbGllbnQgfSBmcm9tIFwiLi9jbGllbnRcIjtcblxuZXhwb3J0ID0gRERDbGllbnQ7XG4iXSwic291cmNlUm9vdCI6IiJ9