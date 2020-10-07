!(function (t, e) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.DDClient = e())
        : (t.DDClient = e());
})(window, function () {
    return (function (t) {
        var e = {};
        function n(r) {
            if (e[r]) return e[r].exports;
            var i = (e[r] = { i: r, l: !1, exports: {} });
            return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
        }
        return (
            (n.m = t),
            (n.c = e),
            (n.d = function (t, e, r) {
                n.o(t, e) ||
                    Object.defineProperty(t, e, { enumerable: !0, get: r });
            }),
            (n.r = function (t) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                        value: 'Module'
                    }),
                    Object.defineProperty(t, '__esModule', { value: !0 });
            }),
            (n.t = function (t, e) {
                if ((1 & e && (t = n(t)), 8 & e)) return t;
                if (4 & e && 'object' == typeof t && t && t.__esModule)
                    return t;
                var r = Object.create(null);
                if (
                    (n.r(r),
                    Object.defineProperty(r, 'default', {
                        enumerable: !0,
                        value: t
                    }),
                    2 & e && 'string' != typeof t)
                )
                    for (var i in t)
                        n.d(
                            r,
                            i,
                            function (e) {
                                return t[e];
                            }.bind(null, i)
                        );
                return r;
            }),
            (n.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return n.d(e, 'a', e), e;
            }),
            (n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.p = ''),
            n((n.s = 2))
        );
    })([
        function (t, e, n) {
            'use strict';
            (e.__esModule = !0),
                (e.getLogger = void 0),
                (e.getLogger = function (t) {
                    return t.debug
                        ? {
                              log: function (t) {
                                  return console.log('dd-apps: ' + t);
                              },
                              error: function (t) {
                                  return console.log('dd-apps: ' + t);
                              }
                          }
                        : { log: function () {}, error: function () {} };
                });
        },
        function (t, e, n) {
            'use strict';
            (e.__esModule = !0),
                (e.uniqueInt = e.defer = void 0),
                (e.defer = function () {
                    var t,
                        e,
                        n = new Promise(function (n, r) {
                            (t = n), (e = r);
                        });
                    return { resolve: t, reject: e, promise: n };
                });
            var r = 0;
            e.uniqueInt = function () {
                return (r += 1);
            };
        },
        function (t, e, n) {
            'use strict';
            var r = n(3);
            t.exports = r.DDClient;
        },
        function (t, e, n) {
            'use strict';
            var r =
                    (this && this.__awaiter) ||
                    function (t, e, n, r) {
                        return new (n || (n = Promise))(function (i, o) {
                            function a(t) {
                                try {
                                    u(r.next(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function s(t) {
                                try {
                                    u(r.throw(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function u(t) {
                                var e;
                                t.done
                                    ? i(t.value)
                                    : ((e = t.value),
                                      e instanceof n
                                          ? e
                                          : new n(function (t) {
                                                t(e);
                                            })).then(a, s);
                            }
                            u((r = r.apply(t, e || [])).next());
                        });
                    },
                i =
                    (this && this.__generator) ||
                    function (t, e) {
                        var n,
                            r,
                            i,
                            o,
                            a = {
                                label: 0,
                                sent: function () {
                                    if (1 & i[0]) throw i[1];
                                    return i[1];
                                },
                                trys: [],
                                ops: []
                            };
                        return (
                            (o = { next: s(0), throw: s(1), return: s(2) }),
                            'function' == typeof Symbol &&
                                (o[Symbol.iterator] = function () {
                                    return this;
                                }),
                            o
                        );
                        function s(o) {
                            return function (s) {
                                return (function (o) {
                                    if (n)
                                        throw new TypeError(
                                            'Generator is already executing.'
                                        );
                                    for (; a; )
                                        try {
                                            if (
                                                ((n = 1),
                                                r &&
                                                    (i =
                                                        2 & o[0]
                                                            ? r.return
                                                            : o[0]
                                                            ? r.throw ||
                                                              ((i = r.return) &&
                                                                  i.call(r),
                                                              0)
                                                            : r.next) &&
                                                    !(i = i.call(r, o[1])).done)
                                            )
                                                return i;
                                            switch (
                                                ((r = 0),
                                                i && (o = [2 & o[0], i.value]),
                                                o[0])
                                            ) {
                                                case 0:
                                                case 1:
                                                    i = o;
                                                    break;
                                                case 4:
                                                    return (
                                                        a.label++,
                                                        {
                                                            value: o[1],
                                                            done: !1
                                                        }
                                                    );
                                                case 5:
                                                    a.label++,
                                                        (r = o[1]),
                                                        (o = [0]);
                                                    continue;
                                                case 7:
                                                    (o = a.ops.pop()),
                                                        a.trys.pop();
                                                    continue;
                                                default:
                                                    if (
                                                        !((i = a.trys),
                                                        (i =
                                                            i.length > 0 &&
                                                            i[i.length - 1]) ||
                                                            (6 !== o[0] &&
                                                                2 !== o[0]))
                                                    ) {
                                                        a = 0;
                                                        continue;
                                                    }
                                                    if (
                                                        3 === o[0] &&
                                                        (!i ||
                                                            (o[1] > i[0] &&
                                                                o[1] < i[3]))
                                                    ) {
                                                        a.label = o[1];
                                                        break;
                                                    }
                                                    if (
                                                        6 === o[0] &&
                                                        a.label < i[1]
                                                    ) {
                                                        (a.label = i[1]),
                                                            (i = o);
                                                        break;
                                                    }
                                                    if (i && a.label < i[2]) {
                                                        (a.label = i[2]),
                                                            a.ops.push(o);
                                                        break;
                                                    }
                                                    i[2] && a.ops.pop(),
                                                        a.trys.pop();
                                                    continue;
                                            }
                                            o = e.call(t, a);
                                        } catch (t) {
                                            (o = [6, t]), (r = 0);
                                        } finally {
                                            n = i = 0;
                                        }
                                    if (5 & o[0]) throw o[1];
                                    return {
                                        value: o[0] ? o[1] : void 0,
                                        done: !0
                                    };
                                })([o, s]);
                            };
                        }
                    },
                o =
                    (this && this.__importDefault) ||
                    function (t) {
                        return t && t.__esModule ? t : { default: t };
                    };
            (e.__esModule = !0), (e.DDClient = void 0);
            var a = n(4),
                s = n(5),
                u = o(n(7)),
                c = n(0),
                l = n(1),
                p = { host: a.Host.STAGE, debug: !1 },
                f = (function () {
                    function t(t) {
                        var e = this;
                        void 0 === t && (t = {}),
                            (this.host = t.host || p.host),
                            (this.debug = t.debug || p.debug),
                            (this.context = l.defer()),
                            (this.logger = c.getLogger(t)),
                            (u.default.debug = this._debug),
                            (this.handshake = new u.default.Model({
                                init: function (t) {
                                    return e.init(t);
                                },
                                handleEvent: function (t) {
                                    return e.handleEvent(t);
                                }
                            })),
                            (this.capabilityManagers = s.capabilityManagers.map(
                                function (n) {
                                    return new n(t, e.handshake, e.context);
                                }
                            )),
                            this.capabilityManagers.forEach(function (t) {
                                return t.applyAdditionalMethods(e);
                            });
                    }
                    return (
                        (t.prototype.on = function (t, e) {
                            return Object.values(a.UiAppEventType).includes(t)
                                ? this.getManagerByEventType(
                                      t
                                  ).subscribeHandler(t, e)
                                : (this.logger.error('Unknown event type'),
                                  function () {});
                        }),
                        (t.prototype.init = function (t) {
                            return r(this, void 0, void 0, function () {
                                return i(this, function (e) {
                                    switch (e.label) {
                                        case 0:
                                            return [4, this.handshake];
                                        case 1:
                                            return (
                                                e.sent(),
                                                this.context.resolve(t),
                                                this.logger.log(
                                                    'dd-apps: sdk handshake: parent <-> child handshake is complete'
                                                ),
                                                this.handleEvent({
                                                    eventType:
                                                        a.UiAppEventType
                                                            .APP_CONTEXT,
                                                    data: t
                                                }),
                                                [2]
                                            );
                                    }
                                });
                            });
                        }),
                        (t.prototype.handleEvent = function (t) {
                            var e = t.eventType,
                                n = t.data;
                            return r(this, void 0, void 0, function () {
                                return i(this, function (t) {
                                    return (
                                        this.getManagerByEventType(
                                            e
                                        ).handleEvent({
                                            eventType: e,
                                            data: n
                                        }),
                                        [2]
                                    );
                                });
                            });
                        }),
                        (t.prototype.getManagerByType = function (t) {
                            return this.capabilityManagers.find(function (e) {
                                return e.type === t;
                            });
                        }),
                        (t.prototype.getManagerByEventType = function (t) {
                            return this.capabilityManagers.find(function (e) {
                                return e.events.includes(t);
                            });
                        }),
                        t
                    );
                })();
            e.DDClient = f;
        },
        function (t, e, n) {
            'use strict';
            (e.__esModule = !0),
                (e.UiAppEventType = e.UiAppCapabilityType = e.Host = void 0),
                (function (t) {
                    (t.PROD = 'https://app.datadoghq.com/'),
                        (t.STAGE = 'https://dd.datad0g.com/');
                })(e.Host || (e.Host = {})),
                (function (t) {
                    (t.APP_CONTEXT = 'app_context'),
                        (t.DASHBOARD_COG_MENU = 'dashboard_cog_menu');
                })(e.UiAppCapabilityType || (e.UiAppCapabilityType = {})),
                (function (t) {
                    (t.APP_CONTEXT = 'app_context'),
                        (t.DASHBOARD_COG_MENU_CONTEXT =
                            'dashboard_cog_menu_context');
                })(e.UiAppEventType || (e.UiAppEventType = {}));
        },
        function (t, e, n) {
            'use strict';
            var r,
                i =
                    (this && this.__extends) ||
                    ((r = function (t, e) {
                        return (r =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e)
                                    Object.prototype.hasOwnProperty.call(
                                        e,
                                        n
                                    ) && (t[n] = e[n]);
                            })(t, e);
                    }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        r(t, e),
                            (t.prototype =
                                null === e
                                    ? Object.create(e)
                                    : ((n.prototype = e.prototype), new n()));
                    }),
                o =
                    (this && this.__awaiter) ||
                    function (t, e, n, r) {
                        return new (n || (n = Promise))(function (i, o) {
                            function a(t) {
                                try {
                                    u(r.next(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function s(t) {
                                try {
                                    u(r.throw(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function u(t) {
                                var e;
                                t.done
                                    ? i(t.value)
                                    : ((e = t.value),
                                      e instanceof n
                                          ? e
                                          : new n(function (t) {
                                                t(e);
                                            })).then(a, s);
                            }
                            u((r = r.apply(t, e || [])).next());
                        });
                    },
                a =
                    (this && this.__generator) ||
                    function (t, e) {
                        var n,
                            r,
                            i,
                            o,
                            a = {
                                label: 0,
                                sent: function () {
                                    if (1 & i[0]) throw i[1];
                                    return i[1];
                                },
                                trys: [],
                                ops: []
                            };
                        return (
                            (o = { next: s(0), throw: s(1), return: s(2) }),
                            'function' == typeof Symbol &&
                                (o[Symbol.iterator] = function () {
                                    return this;
                                }),
                            o
                        );
                        function s(o) {
                            return function (s) {
                                return (function (o) {
                                    if (n)
                                        throw new TypeError(
                                            'Generator is already executing.'
                                        );
                                    for (; a; )
                                        try {
                                            if (
                                                ((n = 1),
                                                r &&
                                                    (i =
                                                        2 & o[0]
                                                            ? r.return
                                                            : o[0]
                                                            ? r.throw ||
                                                              ((i = r.return) &&
                                                                  i.call(r),
                                                              0)
                                                            : r.next) &&
                                                    !(i = i.call(r, o[1])).done)
                                            )
                                                return i;
                                            switch (
                                                ((r = 0),
                                                i && (o = [2 & o[0], i.value]),
                                                o[0])
                                            ) {
                                                case 0:
                                                case 1:
                                                    i = o;
                                                    break;
                                                case 4:
                                                    return (
                                                        a.label++,
                                                        {
                                                            value: o[1],
                                                            done: !1
                                                        }
                                                    );
                                                case 5:
                                                    a.label++,
                                                        (r = o[1]),
                                                        (o = [0]);
                                                    continue;
                                                case 7:
                                                    (o = a.ops.pop()),
                                                        a.trys.pop();
                                                    continue;
                                                default:
                                                    if (
                                                        !((i = a.trys),
                                                        (i =
                                                            i.length > 0 &&
                                                            i[i.length - 1]) ||
                                                            (6 !== o[0] &&
                                                                2 !== o[0]))
                                                    ) {
                                                        a = 0;
                                                        continue;
                                                    }
                                                    if (
                                                        3 === o[0] &&
                                                        (!i ||
                                                            (o[1] > i[0] &&
                                                                o[1] < i[3]))
                                                    ) {
                                                        a.label = o[1];
                                                        break;
                                                    }
                                                    if (
                                                        6 === o[0] &&
                                                        a.label < i[1]
                                                    ) {
                                                        (a.label = i[1]),
                                                            (i = o);
                                                        break;
                                                    }
                                                    if (i && a.label < i[2]) {
                                                        (a.label = i[2]),
                                                            a.ops.push(o);
                                                        break;
                                                    }
                                                    i[2] && a.ops.pop(),
                                                        a.trys.pop();
                                                    continue;
                                            }
                                            o = e.call(t, a);
                                        } catch (t) {
                                            (o = [6, t]), (r = 0);
                                        } finally {
                                            n = i = 0;
                                        }
                                    if (5 & o[0]) throw o[1];
                                    return {
                                        value: o[0] ? o[1] : void 0,
                                        done: !0
                                    };
                                })([o, s]);
                            };
                        }
                    };
            (e.__esModule = !0), (e.capabilityManagers = void 0);
            var s = n(6),
                u = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        i(e, t),
                        (e.prototype.isEnabled = function () {
                            return o(this, void 0, void 0, function () {
                                return a(this, function (t) {
                                    return [2, Promise.resolve(!0)];
                                });
                            });
                        }),
                        (e.prototype.getAdditionalClientMethods = function () {
                            return {};
                        }),
                        e
                    );
                })(s.CapabilityManager),
                c = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        i(e, t),
                        (e.prototype.getAdditionalClientMethods = function () {
                            return {};
                        }),
                        e
                    );
                })(s.CapabilityManager);
            e.capabilityManagers = [u, c];
        },
        function (t, e, n) {
            'use strict';
            var r =
                    (this && this.__awaiter) ||
                    function (t, e, n, r) {
                        return new (n || (n = Promise))(function (i, o) {
                            function a(t) {
                                try {
                                    u(r.next(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function s(t) {
                                try {
                                    u(r.throw(t));
                                } catch (t) {
                                    o(t);
                                }
                            }
                            function u(t) {
                                var e;
                                t.done
                                    ? i(t.value)
                                    : ((e = t.value),
                                      e instanceof n
                                          ? e
                                          : new n(function (t) {
                                                t(e);
                                            })).then(a, s);
                            }
                            u((r = r.apply(t, e || [])).next());
                        });
                    },
                i =
                    (this && this.__generator) ||
                    function (t, e) {
                        var n,
                            r,
                            i,
                            o,
                            a = {
                                label: 0,
                                sent: function () {
                                    if (1 & i[0]) throw i[1];
                                    return i[1];
                                },
                                trys: [],
                                ops: []
                            };
                        return (
                            (o = { next: s(0), throw: s(1), return: s(2) }),
                            'function' == typeof Symbol &&
                                (o[Symbol.iterator] = function () {
                                    return this;
                                }),
                            o
                        );
                        function s(o) {
                            return function (s) {
                                return (function (o) {
                                    if (n)
                                        throw new TypeError(
                                            'Generator is already executing.'
                                        );
                                    for (; a; )
                                        try {
                                            if (
                                                ((n = 1),
                                                r &&
                                                    (i =
                                                        2 & o[0]
                                                            ? r.return
                                                            : o[0]
                                                            ? r.throw ||
                                                              ((i = r.return) &&
                                                                  i.call(r),
                                                              0)
                                                            : r.next) &&
                                                    !(i = i.call(r, o[1])).done)
                                            )
                                                return i;
                                            switch (
                                                ((r = 0),
                                                i && (o = [2 & o[0], i.value]),
                                                o[0])
                                            ) {
                                                case 0:
                                                case 1:
                                                    i = o;
                                                    break;
                                                case 4:
                                                    return (
                                                        a.label++,
                                                        {
                                                            value: o[1],
                                                            done: !1
                                                        }
                                                    );
                                                case 5:
                                                    a.label++,
                                                        (r = o[1]),
                                                        (o = [0]);
                                                    continue;
                                                case 7:
                                                    (o = a.ops.pop()),
                                                        a.trys.pop();
                                                    continue;
                                                default:
                                                    if (
                                                        !((i = a.trys),
                                                        (i =
                                                            i.length > 0 &&
                                                            i[i.length - 1]) ||
                                                            (6 !== o[0] &&
                                                                2 !== o[0]))
                                                    ) {
                                                        a = 0;
                                                        continue;
                                                    }
                                                    if (
                                                        3 === o[0] &&
                                                        (!i ||
                                                            (o[1] > i[0] &&
                                                                o[1] < i[3]))
                                                    ) {
                                                        a.label = o[1];
                                                        break;
                                                    }
                                                    if (
                                                        6 === o[0] &&
                                                        a.label < i[1]
                                                    ) {
                                                        (a.label = i[1]),
                                                            (i = o);
                                                        break;
                                                    }
                                                    if (i && a.label < i[2]) {
                                                        (a.label = i[2]),
                                                            a.ops.push(o);
                                                        break;
                                                    }
                                                    i[2] && a.ops.pop(),
                                                        a.trys.pop();
                                                    continue;
                                            }
                                            o = e.call(t, a);
                                        } catch (t) {
                                            (o = [6, t]), (r = 0);
                                        } finally {
                                            n = i = 0;
                                        }
                                    if (5 & o[0]) throw o[1];
                                    return {
                                        value: o[0] ? o[1] : void 0,
                                        done: !0
                                    };
                                })([o, s]);
                            };
                        }
                    },
                o =
                    (this && this.__rest) ||
                    function (t, e) {
                        var n = {};
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) &&
                                e.indexOf(r) < 0 &&
                                (n[r] = t[r]);
                        if (
                            null != t &&
                            'function' == typeof Object.getOwnPropertySymbols
                        ) {
                            var i = 0;
                            for (
                                r = Object.getOwnPropertySymbols(t);
                                i < r.length;
                                i++
                            )
                                e.indexOf(r[i]) < 0 &&
                                    Object.prototype.propertyIsEnumerable.call(
                                        t,
                                        r[i]
                                    ) &&
                                    (n[r[i]] = t[r[i]]);
                        }
                        return n;
                    };
            (e.__esModule = !0), (e.CapabilityManager = void 0);
            var a = n(0),
                s = n(1),
                u = (function () {
                    function t(t, e, n) {
                        (this.host = t.host),
                            (this.debug = t.debug),
                            (this.logger = a.getLogger(t)),
                            (this.handshake = e),
                            (this.context = n);
                    }
                    return (
                        (t.prototype.applyAdditionalMethods = function (t) {
                            var e = this,
                                n = this.getAdditionalClientMethods(),
                                o = {};
                            Object.entries(n).forEach(function (t) {
                                var n = t[0],
                                    a = t[1];
                                o[n] = function () {
                                    for (
                                        var t = [], n = 0;
                                        n < arguments.length;
                                        n++
                                    )
                                        t[n] = arguments[n];
                                    return r(e, void 0, void 0, function () {
                                        return i(this, function (e) {
                                            switch (e.label) {
                                                case 0:
                                                    return [
                                                        4,
                                                        this.isEnabled()
                                                    ];
                                                case 1:
                                                    return e.sent()
                                                        ? [
                                                              2,
                                                              a.apply(void 0, t)
                                                          ]
                                                        : (this.logger.error(
                                                              'The ' +
                                                                  this.type +
                                                                  ' capability must be enabled to perform this action'
                                                          ),
                                                          [2]);
                                            }
                                        });
                                    });
                                };
                            }),
                                Object.assign(t, o);
                        }),
                        (t.prototype.subscribeHandler = function (t, e) {
                            var n = this,
                                r = s.uniqueInt();
                            return (
                                (this.subscriptions[t][r] = e),
                                function () {
                                    var e = n.subscriptions[t],
                                        i = r,
                                        a =
                                            (e[i],
                                            o(e, [
                                                'symbol' == typeof i
                                                    ? i
                                                    : i + ''
                                            ]));
                                    n.subscriptions[t] = a;
                                }
                            );
                        }),
                        (t.prototype.handleEvent = function (t) {
                            var e = t.eventType,
                                n = t.data;
                            return r(this, void 0, void 0, function () {
                                var t;
                                return i(this, function (r) {
                                    switch (r.label) {
                                        case 0:
                                            return this.hasHandlers(e)
                                                ? [4, this.isEnabled()]
                                                : [2];
                                        case 1:
                                            return (
                                                r.sent()
                                                    ? ((t = this.subscriptions[
                                                          e
                                                      ]),
                                                      Object.values(t).forEach(
                                                          function (t) {
                                                              return t(n);
                                                          }
                                                      ))
                                                    : this.logger.error(
                                                          'The ' +
                                                              this.type +
                                                              ' capability must be enabled to respond to events of type ' +
                                                              e +
                                                              '.'
                                                      ),
                                                [2]
                                            );
                                    }
                                });
                            });
                        }),
                        (t.prototype.isEnabled = function () {
                            return r(this, void 0, void 0, function () {
                                return i(this, function (t) {
                                    switch (t.label) {
                                        case 0:
                                            return [4, this.context.promise];
                                        case 1:
                                            return [
                                                2,
                                                t
                                                    .sent()
                                                    .capabilities.includes(
                                                        this.type
                                                    )
                                            ];
                                    }
                                });
                            });
                        }),
                        (t.prototype.hasHandlers = function (t) {
                            return !!Object.keys(this.subscriptions[t]).length;
                        }),
                        t
                    );
                })();
            e.CapabilityManager = u;
        },
        function (t, e, n) {
            'use strict';
            n.r(e);
            /**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.5.2
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/
            var r = 'application/x-postmate-v1+json',
                i = 0,
                o = {
                    handshake: 1,
                    'handshake-reply': 1,
                    call: 1,
                    emit: 1,
                    reply: 1,
                    request: 1
                },
                a = function (t, e) {
                    return (
                        ('string' != typeof e || t.origin === e) &&
                        !!t.data &&
                        ('object' != typeof t.data || 'postmate' in t.data) &&
                        t.data.type === r &&
                        !!o[t.data.postmate]
                    );
                },
                s = (function () {
                    function t(t) {
                        var e = this;
                        (this.parent = t.parent),
                            (this.frame = t.frame),
                            (this.child = t.child),
                            (this.childOrigin = t.childOrigin),
                            (this.events = {}),
                            (this.listener = function (t) {
                                if (!a(t, e.childOrigin)) return !1;
                                var n = ((t || {}).data || {}).value || {},
                                    r = n.data,
                                    i = n.name;
                                'emit' === t.data.postmate &&
                                    i in e.events &&
                                    e.events[i].call(e, r);
                            }),
                            this.parent.addEventListener(
                                'message',
                                this.listener,
                                !1
                            );
                    }
                    var e = t.prototype;
                    return (
                        (e.get = function (t) {
                            var e = this;
                            return new c.Promise(function (n) {
                                var o = ++i;
                                e.parent.addEventListener(
                                    'message',
                                    function t(r) {
                                        r.data.uid === o &&
                                            'reply' === r.data.postmate &&
                                            (e.parent.removeEventListener(
                                                'message',
                                                t,
                                                !1
                                            ),
                                            n(r.data.value));
                                    },
                                    !1
                                ),
                                    e.child.postMessage(
                                        {
                                            postmate: 'request',
                                            type: r,
                                            property: t,
                                            uid: o
                                        },
                                        e.childOrigin
                                    );
                            });
                        }),
                        (e.call = function (t, e) {
                            this.child.postMessage(
                                {
                                    postmate: 'call',
                                    type: r,
                                    property: t,
                                    data: e
                                },
                                this.childOrigin
                            );
                        }),
                        (e.on = function (t, e) {
                            this.events[t] = e;
                        }),
                        (e.destroy = function () {
                            window.removeEventListener(
                                'message',
                                this.listener,
                                !1
                            ),
                                this.frame.parentNode.removeChild(this.frame);
                        }),
                        t
                    );
                })(),
                u = (function () {
                    function t(t) {
                        var e = this;
                        (this.model = t.model),
                            (this.parent = t.parent),
                            (this.parentOrigin = t.parentOrigin),
                            (this.child = t.child),
                            this.child.addEventListener('message', function (
                                t
                            ) {
                                if (a(t, e.parentOrigin)) {
                                    0;
                                    var n = t.data,
                                        i = n.property,
                                        o = n.uid,
                                        s = n.data;
                                    'call' !== t.data.postmate
                                        ? (function (t, e) {
                                              var n =
                                                  'function' == typeof t[e]
                                                      ? t[e]()
                                                      : t[e];
                                              return c.Promise.resolve(n);
                                          })(e.model, i).then(function (e) {
                                              return t.source.postMessage(
                                                  {
                                                      property: i,
                                                      postmate: 'reply',
                                                      type: r,
                                                      uid: o,
                                                      value: e
                                                  },
                                                  t.origin
                                              );
                                          })
                                        : i in e.model &&
                                          'function' == typeof e.model[i] &&
                                          e.model[i](s);
                                }
                            });
                    }
                    return (
                        (t.prototype.emit = function (t, e) {
                            this.parent.postMessage(
                                {
                                    postmate: 'emit',
                                    type: r,
                                    value: { name: t, data: e }
                                },
                                this.parentOrigin
                            );
                        }),
                        t
                    );
                })(),
                c = (function () {
                    function t(t) {
                        var e = t.container,
                            n =
                                void 0 === e
                                    ? void 0 !== n
                                        ? n
                                        : document.body
                                    : e,
                            r = t.model,
                            i = t.url,
                            o = t.name,
                            a = t.classListArray,
                            s = void 0 === a ? [] : a;
                        return (
                            (this.parent = window),
                            (this.frame = document.createElement('iframe')),
                            (this.frame.name = o || ''),
                            this.frame.classList.add.apply(
                                this.frame.classList,
                                s
                            ),
                            n.appendChild(this.frame),
                            (this.child =
                                this.frame.contentWindow ||
                                this.frame.contentDocument.parentWindow),
                            (this.model = r || {}),
                            this.sendHandshake(i)
                        );
                    }
                    return (
                        (t.prototype.sendHandshake = function (e) {
                            var n,
                                i = this,
                                o = (function (t) {
                                    var e = document.createElement('a');
                                    e.href = t;
                                    var n =
                                            e.protocol.length > 4
                                                ? e.protocol
                                                : window.location.protocol,
                                        r = e.host.length
                                            ? '80' === e.port ||
                                              '443' === e.port
                                                ? e.hostname
                                                : e.host
                                            : window.location.host;
                                    return e.origin || n + '//' + r;
                                })(e),
                                u = 0;
                            return new t.Promise(function (t, c) {
                                i.parent.addEventListener(
                                    'message',
                                    function e(r) {
                                        return (
                                            !!a(r, o) &&
                                            ('handshake-reply' ===
                                            r.data.postmate
                                                ? (clearInterval(n),
                                                  i.parent.removeEventListener(
                                                      'message',
                                                      e,
                                                      !1
                                                  ),
                                                  (i.childOrigin = r.origin),
                                                  t(new s(i)))
                                                : c('Failed handshake'))
                                        );
                                    },
                                    !1
                                );
                                var l = function () {
                                        u++,
                                            i.child.postMessage(
                                                {
                                                    postmate: 'handshake',
                                                    type: r,
                                                    model: i.model
                                                },
                                                o
                                            ),
                                            5 === u && clearInterval(n);
                                    },
                                    p = function () {
                                        l(), (n = setInterval(l, 500));
                                    };
                                i.frame.attachEvent
                                    ? i.frame.attachEvent('onload', p)
                                    : (i.frame.onload = p),
                                    (i.frame.src = e);
                            });
                        }),
                        t
                    );
                })();
            (c.debug = !1),
                (c.Promise = (function () {
                    try {
                        return window ? window.Promise : Promise;
                    } catch (t) {
                        return null;
                    }
                })()),
                (c.Model = (function () {
                    function t(t) {
                        return (
                            (this.child = window),
                            (this.model = t),
                            (this.parent = this.child.parent),
                            this.sendHandshakeReply()
                        );
                    }
                    return (
                        (t.prototype.sendHandshakeReply = function () {
                            var t = this;
                            return new c.Promise(function (e, n) {
                                t.child.addEventListener(
                                    'message',
                                    function i(o) {
                                        if (o.data.postmate) {
                                            if (
                                                'handshake' === o.data.postmate
                                            ) {
                                                0,
                                                    t.child.removeEventListener(
                                                        'message',
                                                        i,
                                                        !1
                                                    ),
                                                    o.source.postMessage(
                                                        {
                                                            postmate:
                                                                'handshake-reply',
                                                            type: r
                                                        },
                                                        o.origin
                                                    ),
                                                    (t.parentOrigin = o.origin);
                                                var a = o.data.model;
                                                return (
                                                    a &&
                                                        Object.keys(a).forEach(
                                                            function (e) {
                                                                t.model[e] =
                                                                    a[e];
                                                            }
                                                        ),
                                                    e(new u(t))
                                                );
                                            }
                                            return n('Handshake Reply Failed');
                                        }
                                    },
                                    !1
                                );
                            });
                        }),
                        t
                    );
                })()),
                (e.default = c);
        }
    ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ERENsaWVudC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRERDbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovL0REQ2xpZW50Ly4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL0REQ2xpZW50Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0REQ2xpZW50Ly4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly9ERENsaWVudC8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9zcmMvY2FwYWJpbGl0ZXMvY2FwYWJpbGl0eU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vRERDbGllbnQvLi9ub2RlX21vZHVsZXMvcG9zdG1hdGUvYnVpbGQvcG9zdG1hdGUuZXMuanMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwid2luZG93IiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImdldExvZ2dlciIsIm9wdGlvbnMiLCJkZWJ1ZyIsImxvZyIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJkZWZlciIsInJlc29sdmUiLCJyZWplY3QiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsImluY3JlbWVudCIsInVuaXF1ZUludCIsIkREQ2xpZW50IiwiREVGQVVMVF9PUFRJT05TIiwiaG9zdCIsIkhvc3QiLCJTVEFHRSIsInRoaXMiLCJjb250ZXh0IiwibG9nZ2VyIiwiX2RlYnVnIiwiaGFuZHNoYWtlIiwiTW9kZWwiLCJpbml0IiwiaGFuZGxlRXZlbnQiLCJwYXJhbXMiLCJjYXBhYmlsaXR5TWFuYWdlcnMiLCJtYXAiLCJNYW5hZ2VyIiwiZm9yRWFjaCIsIm1hbmFnZXIiLCJhcHBseUFkZGl0aW9uYWxNZXRob2RzIiwib24iLCJldmVudFR5cGUiLCJoYW5kbGVyIiwidmFsdWVzIiwiVWlBcHBFdmVudFR5cGUiLCJpbmNsdWRlcyIsImdldE1hbmFnZXJCeUV2ZW50VHlwZSIsInN1YnNjcmliZUhhbmRsZXIiLCJBUFBfQ09OVEVYVCIsImRhdGEiLCJnZXRNYW5hZ2VyQnlUeXBlIiwiY2FwYWJpbGl0eVR5cGUiLCJmaW5kIiwidHlwZSIsImV2ZW50cyIsIlVpQXBwQ2FwYWJpbGl0eVR5cGUiLCJpc0VuYWJsZWQiLCJnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcyIsIkNhcGFiaWxpdHlNYW5hZ2VyIiwiQXBwQ29udGV4dE1hbmFnZXIiLCJEYXNoYm9hcmRDb2dNZW51TWFuYWdlciIsImNsaWVudCIsImFkZGl0aW9uYWxNZXRob2RzIiwid3JhcHBlZE1ldGhvZHMiLCJlbnRyaWVzIiwibWV0aG9kIiwiYXJncyIsImFzc2lnbiIsInN1YnNjcmlwdGlvbklkIiwic3Vic2NyaXB0aW9ucyIsIm90aGVyU3Vic2NyaXB0aW9ucyIsImhhc0hhbmRsZXJzIiwia2V5cyIsImxlbmd0aCIsIm1lc3NhZ2VUeXBlIiwiX21lc3NhZ2VJZCIsIm1lc3NhZ2VUeXBlcyIsImVtaXQiLCJyZXBseSIsInJlcXVlc3QiLCJzYW5pdGl6ZSIsImFsbG93ZWRPcmlnaW4iLCJvcmlnaW4iLCJwb3N0bWF0ZSIsIlBhcmVudEFQSSIsImluZm8iLCJfdGhpcyIsInBhcmVudCIsImZyYW1lIiwiY2hpbGQiLCJjaGlsZE9yaWdpbiIsImxpc3RlbmVyIiwiZSIsIl9yZWYiLCJhZGRFdmVudExpc3RlbmVyIiwiX3Byb3RvIiwiX3RoaXMyIiwiUG9zdG1hdGUiLCJ1aWQiLCJ0cmFuc2FjdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwb3N0TWVzc2FnZSIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwiZGVzdHJveSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIkNoaWxkQVBJIiwiX3RoaXMzIiwibW9kZWwiLCJwYXJlbnRPcmlnaW4iLCJfZSRkYXRhIiwidW53cmFwcGVkQ29udGV4dCIsInJlc29sdmVWYWx1ZSIsInRoZW4iLCJzb3VyY2UiLCJfcmVmMiIsIl9yZWYyJGNvbnRhaW5lciIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiYm9keSIsInVybCIsIl9yZWYyJGNsYXNzTGlzdEFycmF5IiwiY2xhc3NMaXN0QXJyYXkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwbHkiLCJhcHBlbmRDaGlsZCIsImNvbnRlbnRXaW5kb3ciLCJjb250ZW50RG9jdW1lbnQiLCJwYXJlbnRXaW5kb3ciLCJzZW5kSGFuZHNoYWtlIiwicmVzcG9uc2VJbnRlcnZhbCIsIl90aGlzNCIsImEiLCJocmVmIiwicHJvdG9jb2wiLCJsb2NhdGlvbiIsInBvcnQiLCJob3N0bmFtZSIsInJlc29sdmVPcmlnaW4iLCJhdHRlbXB0IiwiY2xlYXJJbnRlcnZhbCIsImRvU2VuZCIsImxvYWRlZCIsInNldEludGVydmFsIiwiYXR0YWNoRXZlbnQiLCJvbmxvYWQiLCJzcmMiLCJzZW5kSGFuZHNoYWtlUmVwbHkiLCJfdGhpczUiLCJzaGFrZSIsImRlZmF1bHRzIl0sIm1hcHBpbmdzIjoiQ0FBQSxTQUEyQ0EsRUFBTUMsR0FDMUIsaUJBQVpDLFNBQTBDLGlCQUFYQyxPQUN4Q0EsT0FBT0QsUUFBVUQsSUFDUSxtQkFB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IihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkREQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkREQ2xpZW50XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG4iLCJpbXBvcnQgeyBDbGllbnRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyIHtcbiAgICBsb2cobWVzc2FnZTogc3RyaW5nKTogdm9pZDtcbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0TG9nZ2VyID0gKG9wdGlvbnM6IENsaWVudE9wdGlvbnMpOiBMb2dnZXIgPT4ge1xuICAgIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2cobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGBkZC1hcHBzOiAke21lc3NhZ2V9YClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coYGRkLWFwcHM6ICR7bWVzc2FnZX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvZygpIHt9LFxuICAgICAgICAgICAgZXJyb3IoKSB7fSxcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIERlZmVycmVkPFQ+IHtcbiAgICByZXNvbHZlOiAodDogVCkgPT4gdm9pZFxuICAgIHJlamVjdDogKHQ6IFQpID0+IHZvaWRcbiAgICBwcm9taXNlOiBQcm9taXNlPFQ+XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlZmZlcnJlZCBvYmplY3QsIGluY2x1ZGluZyBwcm9taXNlIGFuZCByZXNvbHZlICsgcmVqZWN0IG1ldGhvZHMgdG8gYmUgZXhlY3V0ZWQgbGF0ZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmVyID0gPFQ+KCk6IERlZmVycmVkPFQ+ID0+IHtcbiAgICBsZXQgcmVzb2x2ZTogKHQ6IFQpID0+IHZvaWQ7XG4gICAgbGV0IHJlamVjdDogKHQ6IFQpID0+IHZvaWQ7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFQ+KChyZXMsIHJlaikgPT4ge1xuICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICByZWplY3QgPSByZWo7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc29sdmUsXG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcHJvbWlzZSxcbiAgICB9XG59XG5cbmxldCBpbmNyZW1lbnQ6IG51bWJlciA9IDA7XG5cbi8vIGdlbmVyYXRlcyBhbiBpbnRlZ2VyLCBndWFyYW50ZWVkIHRvIGJlIHVuaXF1ZSBiZWN1YXNlIGl0J3MgaW5jcmVtZW50ZWQgOilcbmV4cG9ydCBjb25zdCB1bmlxdWVJbnQgPSAoKTogbnVtYmVyID0+IHtcbiAgICBpbmNyZW1lbnQgPSBpbmNyZW1lbnQgKyAxO1xuXG4gICAgcmV0dXJuIGluY3JlbWVudDtcbn0iLCJpbXBvcnQgeyBERENsaWVudCB9IGZyb20gXCIuL2NsaWVudFwiO1xuXG5leHBvcnQgPSBERENsaWVudDtcbiIsImltcG9ydCB7IEFwcENvbnRleHQsIEV2ZW50SGFuZGxlciwgSGFuZGxlRXZlbnRQYXJhbXMsIENsaWVudE9wdGlvbnMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgSG9zdCwgVWlBcHBDYXBhYmlsaXR5VHlwZSwgVWlBcHBFdmVudFR5cGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjYXBhYmlsaXR5TWFuYWdlcnMgfSBmcm9tICcuL2NhcGFiaWxpdGVzJztcbmltcG9ydCBQb3N0bWF0ZSBmcm9tIFwicG9zdG1hdGVcIjtcbmltcG9ydCB7IGdldExvZ2dlciwgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgQ2FwYWJpbGl0eU1hbmFnZXIgfSBmcm9tIFwiLi9jYXBhYmlsaXRlcy9jYXBhYmlsaXR5TWFuYWdlclwiO1xuaW1wb3J0IHsgRGVmZXJyZWQsIGRlZmVyLCB1bmlxdWVJbnQgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICBob3N0OiBIb3N0LlNUQUdFLFxuICBkZWJ1ZzogZmFsc2UsXG59O1xuXG5leHBvcnQgY2xhc3MgRERDbGllbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IGhvc3Q6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBkZWJ1ZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSByZWFkb25seSBoYW5kc2hha2U6IFBvc3RtYXRlLk1vZGVsO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyO1xuICBwcml2YXRlIGNvbnRleHQ6IERlZmVycmVkPEFwcENvbnRleHQ+XG4gIHByaXZhdGUgY2FwYWJpbGl0eU1hbmFnZXJzOiBDYXBhYmlsaXR5TWFuYWdlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG9wdGlvbnM6IENsaWVudE9wdGlvbnM9IHt9XG4gICkge1xuICAgIHRoaXMuaG9zdCA9IG9wdGlvbnMuaG9zdCB8fCBERUZBVUxUX09QVElPTlMuaG9zdDtcbiAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZyB8fCBERUZBVUxUX09QVElPTlMuZGVidWc7XG4gICAgdGhpcy5jb250ZXh0ID0gZGVmZXIoKTtcbiAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcihvcHRpb25zKTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBQb3N0bWF0ZS5kZWJ1ZyA9IHRoaXMuX2RlYnVnO1xuXG4gICAgdGhpcy5oYW5kc2hha2UgPSBuZXcgUG9zdG1hdGUuTW9kZWwoe1xuICAgICAgaW5pdDogKGNvbnRleHQ6IEFwcENvbnRleHQpID0+IHRoaXMuaW5pdChjb250ZXh0KSxcbiAgICAgIGhhbmRsZUV2ZW50OiAocGFyYW1zOiBIYW5kbGVFdmVudFBhcmFtcykgPT4gdGhpcy5oYW5kbGVFdmVudChwYXJhbXMpLCBcbiAgICB9KTtcblxuICAgIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzID0gY2FwYWJpbGl0eU1hbmFnZXJzLm1hcChNYW5hZ2VyID0+IG5ldyBNYW5hZ2VyKG9wdGlvbnMsIHRoaXMuaGFuZHNoYWtlLCB0aGlzLmNvbnRleHQpKTtcblxuICAgIHRoaXMuY2FwYWJpbGl0eU1hbmFnZXJzLmZvckVhY2gobWFuYWdlciA9PiBtYW5hZ2VyLmFwcGx5QWRkaXRpb25hbE1ldGhvZHModGhpcykpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXIgdG8gZXhlY3V0ZSBvbiBhIGNlcnRhaW4gZXZlbnQgdHlwZSBmcm9tIHRoZSBwYXJlbnQuIFdpbGwgcHJpbnRcbiAgICogYW4gZXJyb3IgaWYgdGhlIGluc3RhbGxlZCBhcHAgZG9lcyBub3QgaGF2ZSB0aGUgcmVxdWlyZWQgY2FwYWJpbGl0eS4gUmV0dXJucyBhbiB1bnN1YnNjcmliZVxuICAgKiBtZXRob2QuIFRoaXMgbWV0aG9kIGNhbiBiZSBjYWxsZWQgYmVmb3JlIGhhbmRzaGFrZSBpcyBzdWNjZXNzZnVsLCBidXQgaGFuZGxlcnMgd2lsbCBub3QgZXhlY3V0ZSB1bnRpbFxuICAgKiBhZnRlciBzdWNjZXNzc2Z1bCBoYW5kc2hha2UuXG4gICAqL1xuICBvbjxUID0gYW55PihldmVudFR5cGU6IFVpQXBwRXZlbnRUeXBlLCBoYW5kbGVyOiBFdmVudEhhbmRsZXI8VD4pOiAoKSA9PiB2b2lkIHtcbiAgICBpZiAoIU9iamVjdC52YWx1ZXMoVWlBcHBFdmVudFR5cGUpLmluY2x1ZGVzKGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdVbmtub3duIGV2ZW50IHR5cGUnKTtcblxuICAgICAgcmV0dXJuICgpID0+IHt9O1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VHlwZShldmVudFR5cGUpO1xuXG4gICAgcmV0dXJuIG1hbmFnZXIuc3Vic2NyaWJlSGFuZGxlcjxUPihldmVudFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgbWV0aG9kIGlzIGV4cG9zZWQgaW4gdGhlIHBvc3RtYXRlIG1vZGVsLiBJdCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgb3RoZXIgb3BlcmF0aW9ucyBtYXkgcHJvY2VlZCxcbiAgICogaW4gb3JkZXIgdG8gaW5mb3JtIGNsaWVudCBvZiBhcHAgY29udGV4dFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBpbml0KGNvbnRleHQ6IEFwcENvbnRleHQpIHtcbiAgICAvLyBwYXJlbnQgc2hvdWxkIG9ubHkgYmUgYWJsZSB0byBjYWxsIHRoaXMgYWZ0ZXIgaGFuZHNoYWtlIGlzIGNvbXBsZXRlLCBidXQgaXRzIHdvcnRoIGEgY2hlY2sgYW55d2F5c1xuICAgIGF3YWl0IHRoaXMuaGFuZHNoYWtlO1xuXG4gICAgdGhpcy5jb250ZXh0LnJlc29sdmUoY29udGV4dCk7XG4gIFxuICAgIHRoaXMubG9nZ2VyLmxvZyhcbiAgICAgIFwiZGQtYXBwczogc2RrIGhhbmRzaGFrZTogcGFyZW50IDwtPiBjaGlsZCBoYW5kc2hha2UgaXMgY29tcGxldGVcIlxuICAgICk7XG4gICAgXG4gICAgLy8gZXhlYyBhbnkgYXBwX2luaXQgZXZlbnQgaGFuZGxlcnMgcmVnaXN0ZXJlZCBieSBjb25zdW1lclxuICAgIHRoaXMuaGFuZGxlRXZlbnQoeyBldmVudFR5cGU6IFVpQXBwRXZlbnRUeXBlLkFQUF9DT05URVhULCBkYXRhOiBjb250ZXh0IH0pXG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlRXZlbnQgaXMgdGhlIG1haW4gbWV0aG9kIGNhbGxlZCBieSB0aGUgcGFyZW50IHRocm91Z2ggcG9zdG1hdGUgKGNoaWxkLmhhbmRsZUV2ZW50KCdleGVjJywgey4uLn0pKS4gXG4gICAqIEl0IGFjY2VwdHMgYSBrZXllZCBldmVudCB0eXBlIGFuZCBhcmJpdHJhcnkgZGF0YSB0byBiZSBwYXNzZWQgdG8gZXZlbnQgaGFuZGxlcnMuIEl0IHdpbGwgbG9nIGFuIGVycm9yIFxuICAgKiBtZXNzYWdlIGlmIHRoZSB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHJlcXVpcmVkIGNhcGFiaWxpdHkgZW5hYmxlZFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVFdmVudDxUPih7IGV2ZW50VHlwZSwgZGF0YSB9OiBIYW5kbGVFdmVudFBhcmFtczxUPikge1xuICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLmdldE1hbmFnZXJCeUV2ZW50VHlwZShldmVudFR5cGUpO1xuXG4gICAgbWFuYWdlci5oYW5kbGVFdmVudCh7IGV2ZW50VHlwZSwgZGF0YSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWFuYWdlckJ5VHlwZShjYXBhYmlsaXR5VHlwZTogVWlBcHBDYXBhYmlsaXR5VHlwZSk6IENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZmluZChtYW5hZ2VyID0+IG1hbmFnZXIudHlwZSA9PT0gY2FwYWJpbGl0eVR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYW5hZ2VyQnlFdmVudFR5cGUoZXZlbnRUeXBlOiBVaUFwcEV2ZW50VHlwZSk6IENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXR5TWFuYWdlcnMuZmluZChtYW5hZ2VyID0+IG1hbmFnZXIuZXZlbnRzLmluY2x1ZGVzKGV2ZW50VHlwZSkpO1xuICB9XG59XG4iLCJleHBvcnQgZW51bSBIb3N0IHtcbiAgUFJPRCA9ICAnaHR0cHM6Ly9hcHAuZGF0YWRvZ2hxLmNvbS8nLFxuICBTVEFHRSA9ICdodHRwczovL2RkLmRhdGFkMGcuY29tLydcbn1cblxuZXhwb3J0IGVudW0gVWlBcHBDYXBhYmlsaXR5VHlwZSB7XG4gIEFQUF9DT05URVhUID0gICdhcHBfY29udGV4dCcsXG4gIERBU0hCT0FSRF9DT0dfTUVOVSA9IFwiZGFzaGJvYXJkX2NvZ19tZW51XCIsXG59XG5cbmV4cG9ydCBlbnVtIFVpQXBwRXZlbnRUeXBlIHtcbiAgQVBQX0NPTlRFWFQgPSAnYXBwX2NvbnRleHQnLFxuICBEQVNIQk9BUkRfQ09HX01FTlVfQ09OVEVYVCA9ICdkYXNoYm9hcmRfY29nX21lbnVfY29udGV4dCdcbn1cbiIsImltcG9ydCB7IFVpQXBwQ2FwYWJpbGl0eVR5cGUsIFVpQXBwRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENhcGFiaWxpdHlNYW5hZ2VyIH0gZnJvbSAnLi9jYXBhYmlsaXR5TWFuYWdlcic7XG5leHBvcnQgdHlwZSB7IENhcGFiaWxpdHlNYW5hZ2VyIH0gZnJvbSAnLi9jYXBhYmlsaXR5TWFuYWdlcic7XG5cbmNsYXNzIEFwcENvbnRleHRNYW5hZ2VyIGV4dGVuZHMgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICB0eXBlOiBVaUFwcENhcGFiaWxpdHlUeXBlLkFQUF9DT05URVhUO1xuICBldmVudHM6IFtVaUFwcEV2ZW50VHlwZS5BUFBfQ09OVEVYVF1cblxuICAvLyBUaGlzIG92ZXJyaWRlIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGFwcF9jb250ZXh0IHNpbmNlIGl0J3MgYWx3YXlzIGVuYWJsZWRcbiAgYXN5bmMgaXNFbmFibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gIH1cblxuICBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpIHtcbiAgICByZXR1cm4ge31cbiAgfVxufVxuXG5jbGFzcyBEYXNoYm9hcmRDb2dNZW51TWFuYWdlciBleHRlbmRzIENhcGFiaWxpdHlNYW5hZ2VyIHtcbiAgdHlwZTogVWlBcHBDYXBhYmlsaXR5VHlwZS5EQVNIQk9BUkRfQ09HX01FTlU7XG4gIGV2ZW50czogW1VpQXBwRXZlbnRUeXBlLkRBU0hCT0FSRF9DT0dfTUVOVV9DT05URVhUXTtcblxuICBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpIHtcbiAgICByZXR1cm4ge31cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2FwYWJpbGl0eU1hbmFnZXJzID0gW1xuICBBcHBDb250ZXh0TWFuYWdlcixcbiAgRGFzaGJvYXJkQ29nTWVudU1hbmFnZXIsXG5dIiwiaW1wb3J0IHsgQXBwQ29udGV4dCwgQ2xpZW50T3B0aW9ucywgRXZlbnRIYW5kbGVyLCBIYW5kbGVFdmVudFBhcmFtcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFVpQXBwQ2FwYWJpbGl0eVR5cGUsIFVpQXBwRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldExvZ2dlciwgTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCAqIGFzIFBvc3RtYXRlIGZyb20gXCJwb3N0bWF0ZVwiO1xuaW1wb3J0IHsgRGVmZXJyZWQsIHVuaXF1ZUludCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgRERDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FwYWJpbGl0eU1hbmFnZXIge1xuICAgIGFic3RyYWN0IHR5cGU6IFVpQXBwQ2FwYWJpbGl0eVR5cGU7XG4gICAgYWJzdHJhY3QgZXZlbnRzOiBVaUFwcEV2ZW50VHlwZVtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGhvc3Q6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVidWc6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBoYW5kc2hha2U6IFBvc3RtYXRlLk1vZGVsO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZXh0OiBEZWZlcnJlZDxBcHBDb250ZXh0PlxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogeyBba2V5IGluIFVpQXBwRXZlbnRUeXBlXT86IHsgW2lkOiBudW1iZXJdOiBFdmVudEhhbmRsZXJ9fVxuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ2xpZW50T3B0aW9ucywgaGFuZHNoYWtlOiBQb3N0bWF0ZS5Nb2RlbCwgY29udGV4dDogRGVmZXJyZWQ8QXBwQ29udGV4dD4pIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gb3B0aW9ucy5ob3N0O1xuICAgICAgICB0aGlzLmRlYnVnID0gb3B0aW9ucy5kZWJ1ZztcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaGFuZHNoYWtlID0gaGFuZHNoYWtlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgcGxhY2UgZm9yIGV2ZW50dWFsIGV4dGVuc2lvbnMgb2YgdGhlIGJhc2UgY2xpZW50IG1ldGhvZHMsIHNwZWNpZmljIHRvIGEgY2FwYWJpbGl0eVxuICAgICAqIEV4YW1wbGU6XG4gICAgICogcHJpdmF0ZSBnZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpOiB7IFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbiB9IHtcbiAgICAgKiAgIHJldHVybiAge1xuICAgICAqICAgICBnZXRUaW1lU2VyaWVzOiAoKSA9PiB0aGlzLmdldFRpbWVTZXJpZXMoKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0QWRkaXRpb25hbENsaWVudE1ldGhvZHMoKTogeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb24gfVxuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYWRkaXRpb25hbCBtZXRob2RzIGluIGEgY2hlY2sgYWdhaW5zdCB0aGUgY2FwYWJpbGl0eSB0eXBlLCB0aGVuIGFwcGxpZXMgdG8gcHJvdmlkZWQgY2xpZW50IG9iamVjdC4gRG8gbm90IG92ZXJyaWRlXG4gICAgICovXG4gICAgYXBwbHlBZGRpdGlvbmFsTWV0aG9kcyhjbGllbnQ6IEREQ2xpZW50KSB7XG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRob2RzID0gdGhpcy5nZXRBZGRpdGlvbmFsQ2xpZW50TWV0aG9kcygpO1xuXG4gICAgICAgIGNvbnN0IHdyYXBwZWRNZXRob2RzID0ge307XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMoYWRkaXRpb25hbE1ldGhvZHMpLmZvckVhY2goKFtrZXksIG1ldGhvZF0pID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRNZXRob2RzW2tleV0gPSBhc3luYyAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IGF3YWl0IHRoaXMuaXNFbmFibGVkKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2QoLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYFRoZSAke3RoaXMudHlwZX0gY2FwYWJpbGl0eSBtdXN0IGJlIGVuYWJsZWQgdG8gcGVyZm9ybSB0aGlzIGFjdGlvbmApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oY2xpZW50LCB3cmFwcGVkTWV0aG9kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBjbGllbnQgdG8gcmVnaXN0ZXIgYW4gZXZlbnQgaGFuZGxlciBtYW5hZ2VkIGJ5IHRoaXMgY2FwYWJpbGl0eS4gRG8gbm90IG92ZXJyaWRlXG4gICAgICovXG4gICAgc3Vic2NyaWJlSGFuZGxlcjxUPihldmVudFR5cGU6IFVpQXBwRXZlbnRUeXBlLCBoYW5kbGVyOiBFdmVudEhhbmRsZXI8VD4pOiAoKSA9PiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSWQgPSB1bmlxdWVJbnQoKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRUeXBlXVtzdWJzY3JpcHRpb25JZF0gPSBoYW5kbGVyO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IFtzdWJzY3JpcHRpb25JZF06IF8sIC4uLm90aGVyU3Vic2NyaXB0aW9ucyB9ID0gdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV07XG5cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1tldmVudFR5cGVdID0gb3RoZXJTdWJzY3JpcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBjbGllbnQgdG8gZGVsZ2F0ZSBldmVudCBoYW5kbGluZy4gRG8gbm90IG92ZXJyaWRlXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlRXZlbnQ8VD4oeyBldmVudFR5cGUsIGRhdGEgfTogSGFuZGxlRXZlbnRQYXJhbXM8VD4pIHtcbiAgICAgICAgY29uc3QgaGFzSGFuZGxlcnMgPSB0aGlzLmhhc0hhbmRsZXJzKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgaWYgKCFoYXNIYW5kbGVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gYXdhaXQgdGhpcy5pc0VuYWJsZWQoKTtcblxuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV07XG5cbiAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoc3Vic2NyaXB0aW9ucykuZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIoZGF0YSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgVGhlICR7dGhpcy50eXBlfSBjYXBhYmlsaXR5IG11c3QgYmUgZW5hYmxlZCB0byByZXNwb25kIHRvIGV2ZW50cyBvZiB0eXBlICR7ZXZlbnRUeXBlfS5gKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaXNFbmFibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCB7IGNhcGFiaWxpdGllcyB9ID0gYXdhaXQgdGhpcy5jb250ZXh0LnByb21pc2U7XG5cbiAgICAgICAgcmV0dXJuIGNhcGFiaWxpdGllcy5pbmNsdWRlcyh0aGlzLnR5cGUpO1xuICAgIH1cblxuICAgIGhhc0hhbmRsZXJzKGV2ZW50VHlwZTogVWlBcHBFdmVudFR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhT2JqZWN0LmtleXModGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50VHlwZV0pLmxlbmd0aFxuICAgIH1cbn0iLCIvKipcbiAgcG9zdG1hdGUgLSBBIHBvd2VyZnVsLCBzaW1wbGUsIHByb21pc2UtYmFzZWQgcG9zdE1lc3NhZ2UgbGlicmFyeVxuICBAdmVyc2lvbiB2MS41LjJcbiAgQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2RvbGxhcnNoYXZlY2x1Yi9wb3N0bWF0ZVxuICBAYXV0aG9yIEphY29iIEtlbGxleSA8amFraWU4QGdtYWlsLmNvbT5cbiAgQGxpY2Vuc2UgTUlUXG4qKi9cbi8qKlxuICogVGhlIHR5cGUgb2YgbWVzc2FnZXMgb3VyIGZyYW1lcyBvdXIgc2VuZGluZ1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIG1lc3NhZ2VUeXBlID0gJ2FwcGxpY2F0aW9uL3gtcG9zdG1hdGUtdjEranNvbic7XG4vKipcbiAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhdHRlbXB0cyB0byBzZW5kIGEgaGFuZHNoYWtlIHJlcXVlc3QgdG8gdGhlIHBhcmVudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuXG52YXIgbWF4SGFuZHNoYWtlUmVxdWVzdHMgPSA1O1xuLyoqXG4gKiBBIHVuaXF1ZSBtZXNzYWdlIElEIHRoYXQgaXMgdXNlZCB0byBlbnN1cmUgcmVzcG9uc2VzIGFyZSBzZW50IHRvIHRoZSBjb3JyZWN0IHJlcXVlc3RzXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5cbnZhciBfbWVzc2FnZUlkID0gMDtcbi8qKlxuICogSW5jcmVtZW50cyBhbmQgcmV0dXJucyBhIG1lc3NhZ2UgSURcbiAqIEByZXR1cm4ge051bWJlcn0gQSB1bmlxdWUgSUQgZm9yIGEgbWVzc2FnZVxuICovXG5cbnZhciBnZW5lcmF0ZU5ld01lc3NhZ2VJZCA9IGZ1bmN0aW9uIGdlbmVyYXRlTmV3TWVzc2FnZUlkKCkge1xuICByZXR1cm4gKytfbWVzc2FnZUlkO1xufTtcbi8qKlxuICogUG9zdG1hdGUgbG9nZ2luZyBmdW5jdGlvbiB0aGF0IGVuYWJsZXMvZGlzYWJsZXMgdmlhIGNvbmZpZ1xuICogQHBhcmFtICB7T2JqZWN0fSAuLi5hcmdzIFJlc3QgQXJndW1lbnRzXG4gKi9cblxudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBQb3N0bWF0ZS5kZWJ1ZyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuLyoqXG4gKiBUYWtlcyBhIFVSTCBhbmQgcmV0dXJucyB0aGUgb3JpZ2luXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgZnVsbCBVUkwgYmVpbmcgcmVxdWVzdGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICBUaGUgVVJMcyBvcmlnaW5cbiAqL1xuXG52YXIgcmVzb2x2ZU9yaWdpbiA9IGZ1bmN0aW9uIHJlc29sdmVPcmlnaW4odXJsKSB7XG4gIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIHZhciBwcm90b2NvbCA9IGEucHJvdG9jb2wubGVuZ3RoID4gNCA/IGEucHJvdG9jb2wgOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gIHZhciBob3N0ID0gYS5ob3N0Lmxlbmd0aCA/IGEucG9ydCA9PT0gJzgwJyB8fCBhLnBvcnQgPT09ICc0NDMnID8gYS5ob3N0bmFtZSA6IGEuaG9zdCA6IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICByZXR1cm4gYS5vcmlnaW4gfHwgcHJvdG9jb2wgKyBcIi8vXCIgKyBob3N0O1xufTtcbnZhciBtZXNzYWdlVHlwZXMgPSB7XG4gIGhhbmRzaGFrZTogMSxcbiAgJ2hhbmRzaGFrZS1yZXBseSc6IDEsXG4gIGNhbGw6IDEsXG4gIGVtaXQ6IDEsXG4gIHJlcGx5OiAxLFxuICByZXF1ZXN0OiAxXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoYXQgYSBtZXNzYWdlIGlzIHNhZmUgdG8gaW50ZXJwcmV0XG4gICAqIEBwYXJhbSAge09iamVjdH0gbWVzc2FnZSBUaGUgcG9zdG1hdGUgbWVzc2FnZSBiZWluZyBzZW50XG4gICAqIEBwYXJhbSAge1N0cmluZ3xCb29sZWFufSBhbGxvd2VkT3JpZ2luIFRoZSB3aGl0ZWxpc3RlZCBvcmlnaW4gb3IgZmFsc2UgdG8gc2tpcCBvcmlnaW4gY2hlY2tcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG5cbn07XG52YXIgc2FuaXRpemUgPSBmdW5jdGlvbiBzYW5pdGl6ZShtZXNzYWdlLCBhbGxvd2VkT3JpZ2luKSB7XG4gIGlmICh0eXBlb2YgYWxsb3dlZE9yaWdpbiA9PT0gJ3N0cmluZycgJiYgbWVzc2FnZS5vcmlnaW4gIT09IGFsbG93ZWRPcmlnaW4pIHJldHVybiBmYWxzZTtcbiAgaWYgKCFtZXNzYWdlLmRhdGEpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBtZXNzYWdlLmRhdGEgPT09ICdvYmplY3QnICYmICEoJ3Bvc3RtYXRlJyBpbiBtZXNzYWdlLmRhdGEpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChtZXNzYWdlLmRhdGEudHlwZSAhPT0gbWVzc2FnZVR5cGUpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFtZXNzYWdlVHlwZXNbbWVzc2FnZS5kYXRhLnBvc3RtYXRlXSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4vKipcbiAqIFRha2VzIGEgbW9kZWwsIGFuZCBzZWFyY2hlcyBmb3IgYSB2YWx1ZSBieSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSAge09iamVjdH0gbW9kZWwgICAgIFRoZSBkaWN0aW9uYXJ5IHRvIHNlYXJjaCBhZ2FpbnN0XG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3BlcnR5ICBBIHBhdGggd2l0aGluIGEgZGljdGlvbmFyeSAoaS5lLiAnd2luZG93LmxvY2F0aW9uLmhyZWYnKVxuICogQHBhcmFtICB7T2JqZWN0fSBkYXRhICAgICAgQWRkaXRpb25hbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBnZXQgcmVxdWVzdCB0aGF0IGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzZWQgdG8gZnVuY3Rpb25zIGluIHRoZSBjaGlsZCBtb2RlbFxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuXG52YXIgcmVzb2x2ZVZhbHVlID0gZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKG1vZGVsLCBwcm9wZXJ0eSkge1xuICB2YXIgdW53cmFwcGVkQ29udGV4dCA9IHR5cGVvZiBtb2RlbFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicgPyBtb2RlbFtwcm9wZXJ0eV0oKSA6IG1vZGVsW3Byb3BlcnR5XTtcbiAgcmV0dXJuIFBvc3RtYXRlLlByb21pc2UucmVzb2x2ZSh1bndyYXBwZWRDb250ZXh0KTtcbn07XG4vKipcbiAqIENvbXBvc2VzIGFuIEFQSSB0byBiZSB1c2VkIGJ5IHRoZSBwYXJlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIEluZm9ybWF0aW9uIG9uIHRoZSBjb25zdW1lclxuICovXG5cbnZhciBQYXJlbnRBUEkgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQYXJlbnRBUEkoaW5mbykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnBhcmVudCA9IGluZm8ucGFyZW50O1xuICAgIHRoaXMuZnJhbWUgPSBpbmZvLmZyYW1lO1xuICAgIHRoaXMuY2hpbGQgPSBpbmZvLmNoaWxkO1xuICAgIHRoaXMuY2hpbGRPcmlnaW4gPSBpbmZvLmNoaWxkT3JpZ2luO1xuICAgIHRoaXMuZXZlbnRzID0ge307XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdQYXJlbnQ6IFJlZ2lzdGVyaW5nIEFQSScpO1xuICAgICAgbG9nKCdQYXJlbnQ6IEF3YWl0aW5nIG1lc3NhZ2VzLi4uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoIXNhbml0aXplKGUsIF90aGlzLmNoaWxkT3JpZ2luKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLyoqXG4gICAgICAgKiB0aGUgYXNzaWdubWVudHMgYmVsb3cgZW5zdXJlcyB0aGF0IGUsIGRhdGEsIGFuZCB2YWx1ZSBhcmUgYWxsIGRlZmluZWRcbiAgICAgICAqL1xuXG4gICAgICB2YXIgX3JlZiA9ICgoZSB8fCB7fSkuZGF0YSB8fCB7fSkudmFsdWUgfHwge30sXG4gICAgICAgICAgZGF0YSA9IF9yZWYuZGF0YSxcbiAgICAgICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnZW1pdCcpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsb2coXCJQYXJlbnQ6IFJlY2VpdmVkIGV2ZW50IGVtaXNzaW9uOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgaW4gX3RoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgX3RoaXMuZXZlbnRzW25hbWVdLmNhbGwoX3RoaXMsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmxpc3RlbmVyLCBmYWxzZSk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgbG9nKCdQYXJlbnQ6IEF3YWl0aW5nIGV2ZW50IGVtaXNzaW9ucyBmcm9tIENoaWxkJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIF9wcm90byA9IFBhcmVudEFQSS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmdldCA9IGZ1bmN0aW9uIGdldChwcm9wZXJ0eSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAvLyBFeHRyYWN0IGRhdGEgZnJvbSByZXNwb25zZSBhbmQga2lsbCBsaXN0ZW5lcnNcbiAgICAgIHZhciB1aWQgPSBnZW5lcmF0ZU5ld01lc3NhZ2VJZCgpO1xuXG4gICAgICB2YXIgdHJhbnNhY3QgPSBmdW5jdGlvbiB0cmFuc2FjdChlKSB7XG4gICAgICAgIGlmIChlLmRhdGEudWlkID09PSB1aWQgJiYgZS5kYXRhLnBvc3RtYXRlID09PSAncmVwbHknKSB7XG4gICAgICAgICAgX3RoaXMyLnBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdHJhbnNhY3QsIGZhbHNlKTtcblxuICAgICAgICAgIHJlc29sdmUoZS5kYXRhLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gUHJlcGFyZSBmb3IgcmVzcG9uc2UgZnJvbSBDaGlsZC4uLlxuXG5cbiAgICAgIF90aGlzMi5wYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRyYW5zYWN0LCBmYWxzZSk7IC8vIFRoZW4gYXNrIGNoaWxkIGZvciBpbmZvcm1hdGlvblxuXG5cbiAgICAgIF90aGlzMi5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHBvc3RtYXRlOiAncmVxdWVzdCcsXG4gICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHVpZDogdWlkXG4gICAgICB9LCBfdGhpczIuY2hpbGRPcmlnaW4pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jYWxsID0gZnVuY3Rpb24gY2FsbChwcm9wZXJ0eSwgZGF0YSkge1xuICAgIC8vIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGNoaWxkXG4gICAgdGhpcy5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICBwb3N0bWF0ZTogJ2NhbGwnLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgdGhpcy5jaGlsZE9yaWdpbik7XG4gIH07XG5cbiAgX3Byb3RvLm9uID0gZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBjYWxsYmFjaztcbiAgfTtcblxuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnUGFyZW50OiBEZXN0cm95aW5nIFBvc3RtYXRlIGluc3RhbmNlJyk7XG4gICAgfVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmxpc3RlbmVyLCBmYWxzZSk7XG4gICAgdGhpcy5mcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZnJhbWUpO1xuICB9O1xuXG4gIHJldHVybiBQYXJlbnRBUEk7XG59KCk7XG4vKipcbiAqIENvbXBvc2VzIGFuIEFQSSB0byBiZSB1c2VkIGJ5IHRoZSBjaGlsZFxuICogQHBhcmFtIHtPYmplY3R9IGluZm8gSW5mb3JtYXRpb24gb24gdGhlIGNvbnN1bWVyXG4gKi9cblxudmFyIENoaWxkQVBJID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2hpbGRBUEkoaW5mbykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5tb2RlbCA9IGluZm8ubW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSBpbmZvLnBhcmVudDtcbiAgICB0aGlzLnBhcmVudE9yaWdpbiA9IGluZm8ucGFyZW50T3JpZ2luO1xuICAgIHRoaXMuY2hpbGQgPSBpbmZvLmNoaWxkO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvZygnQ2hpbGQ6IFJlZ2lzdGVyaW5nIEFQSScpO1xuICAgICAgbG9nKCdDaGlsZDogQXdhaXRpbmcgbWVzc2FnZXMuLi4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKCFzYW5pdGl6ZShlLCBfdGhpczMucGFyZW50T3JpZ2luKSkgcmV0dXJuO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2coJ0NoaWxkOiBSZWNlaXZlZCByZXF1ZXN0JywgZS5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgdmFyIF9lJGRhdGEgPSBlLmRhdGEsXG4gICAgICAgICAgcHJvcGVydHkgPSBfZSRkYXRhLnByb3BlcnR5LFxuICAgICAgICAgIHVpZCA9IF9lJGRhdGEudWlkLFxuICAgICAgICAgIGRhdGEgPSBfZSRkYXRhLmRhdGE7XG5cbiAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdjYWxsJykge1xuICAgICAgICBpZiAocHJvcGVydHkgaW4gX3RoaXMzLm1vZGVsICYmIHR5cGVvZiBfdGhpczMubW9kZWxbcHJvcGVydHldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgX3RoaXMzLm1vZGVsW3Byb3BlcnR5XShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUmVwbHkgdG8gUGFyZW50XG5cblxuICAgICAgcmVzb2x2ZVZhbHVlKF90aGlzMy5tb2RlbCwgcHJvcGVydHkpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBlLnNvdXJjZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgIHBvc3RtYXRlOiAncmVwbHknLFxuICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICAgIHVpZDogdWlkLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9LCBlLm9yaWdpbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBfcHJvdG8yID0gQ2hpbGRBUEkucHJvdG90eXBlO1xuXG4gIF9wcm90bzIuZW1pdCA9IGZ1bmN0aW9uIGVtaXQobmFtZSwgZGF0YSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBsb2coXCJDaGlsZDogRW1pdHRpbmcgRXZlbnQgXFxcIlwiICsgbmFtZSArIFwiXFxcIlwiLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICBwb3N0bWF0ZTogJ2VtaXQnLFxuICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9XG4gICAgfSwgdGhpcy5wYXJlbnRPcmlnaW4pO1xuICB9O1xuXG4gIHJldHVybiBDaGlsZEFQSTtcbn0oKTtcbi8qKlxuICAqIFRoZSBlbnRyeSBwb2ludCBvZiB0aGUgUGFyZW50LlxuICogQHR5cGUge0NsYXNzfVxuICovXG5cbnZhciBQb3N0bWF0ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgY3JhcHMgaXRzZWxmXG5cbiAgLyoqXG4gICAqIFNldHMgb3B0aW9ucyByZWxhdGVkIHRvIHRoZSBQYXJlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZWxlbWVudCB0byBpbmplY3QgdGhlIGZyYW1lIGludG8sIGFuZCB0aGUgdXJsXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAqL1xuICBmdW5jdGlvbiBQb3N0bWF0ZShfcmVmMikge1xuICAgIHZhciBfcmVmMiRjb250YWluZXIgPSBfcmVmMi5jb250YWluZXIsXG4gICAgICAgIGNvbnRhaW5lciA9IF9yZWYyJGNvbnRhaW5lciA9PT0gdm9pZCAwID8gdHlwZW9mIGNvbnRhaW5lciAhPT0gJ3VuZGVmaW5lZCcgPyBjb250YWluZXIgOiBkb2N1bWVudC5ib2R5IDogX3JlZjIkY29udGFpbmVyLFxuICAgICAgICBtb2RlbCA9IF9yZWYyLm1vZGVsLFxuICAgICAgICB1cmwgPSBfcmVmMi51cmwsXG4gICAgICAgIG5hbWUgPSBfcmVmMi5uYW1lLFxuICAgICAgICBfcmVmMiRjbGFzc0xpc3RBcnJheSA9IF9yZWYyLmNsYXNzTGlzdEFycmF5LFxuICAgICAgICBjbGFzc0xpc3RBcnJheSA9IF9yZWYyJGNsYXNzTGlzdEFycmF5ID09PSB2b2lkIDAgPyBbXSA6IF9yZWYyJGNsYXNzTGlzdEFycmF5O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgICB0aGlzLnBhcmVudCA9IHdpbmRvdztcbiAgICB0aGlzLmZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgdGhpcy5mcmFtZS5uYW1lID0gbmFtZSB8fCAnJztcbiAgICB0aGlzLmZyYW1lLmNsYXNzTGlzdC5hZGQuYXBwbHkodGhpcy5mcmFtZS5jbGFzc0xpc3QsIGNsYXNzTGlzdEFycmF5KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5mcmFtZSk7XG4gICAgdGhpcy5jaGlsZCA9IHRoaXMuZnJhbWUuY29udGVudFdpbmRvdyB8fCB0aGlzLmZyYW1lLmNvbnRlbnREb2N1bWVudC5wYXJlbnRXaW5kb3c7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgIHJldHVybiB0aGlzLnNlbmRIYW5kc2hha2UodXJsKTtcbiAgfVxuICAvKipcbiAgICogQmVnaW5zIHRoZSBoYW5kc2hha2Ugc3RyYXRlZ3lcbiAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBzZW5kIGEgaGFuZHNoYWtlIHJlcXVlc3QgdG9cbiAgICogQHJldHVybiB7UHJvbWlzZX0gICAgIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBoYW5kc2hha2UgaXMgY29tcGxldGVcbiAgICovXG5cblxuICB2YXIgX3Byb3RvMyA9IFBvc3RtYXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLnNlbmRIYW5kc2hha2UgPSBmdW5jdGlvbiBzZW5kSGFuZHNoYWtlKHVybCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgdmFyIGNoaWxkT3JpZ2luID0gcmVzb2x2ZU9yaWdpbih1cmwpO1xuICAgIHZhciBhdHRlbXB0ID0gMDtcbiAgICB2YXIgcmVzcG9uc2VJbnRlcnZhbDtcbiAgICByZXR1cm4gbmV3IFBvc3RtYXRlLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcGx5ID0gZnVuY3Rpb24gcmVwbHkoZSkge1xuICAgICAgICBpZiAoIXNhbml0aXplKGUsIGNoaWxkT3JpZ2luKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChlLmRhdGEucG9zdG1hdGUgPT09ICdoYW5kc2hha2UtcmVwbHknKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChyZXNwb25zZUludGVydmFsKTtcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ1BhcmVudDogUmVjZWl2ZWQgaGFuZHNoYWtlIHJlcGx5IGZyb20gQ2hpbGQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpczQucGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCByZXBseSwgZmFsc2UpO1xuXG4gICAgICAgICAgX3RoaXM0LmNoaWxkT3JpZ2luID0gZS5vcmlnaW47XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdQYXJlbnQ6IFNhdmluZyBDaGlsZCBvcmlnaW4nLCBfdGhpczQuY2hpbGRPcmlnaW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBQYXJlbnRBUEkoX3RoaXM0KSk7XG4gICAgICAgIH0gLy8gTWlnaHQgbmVlZCB0byByZW1vdmUgc2luY2UgcGFyZW50IG1pZ2h0IGJlIHJlY2VpdmluZyBkaWZmZXJlbnQgbWVzc2FnZXNcbiAgICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgaG9zdHNcblxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbG9nKCdQYXJlbnQ6IEludmFsaWQgaGFuZHNoYWtlIHJlcGx5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVqZWN0KCdGYWlsZWQgaGFuZHNoYWtlJyk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpczQucGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCByZXBseSwgZmFsc2UpO1xuXG4gICAgICB2YXIgZG9TZW5kID0gZnVuY3Rpb24gZG9TZW5kKCkge1xuICAgICAgICBhdHRlbXB0Kys7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBsb2coXCJQYXJlbnQ6IFNlbmRpbmcgaGFuZHNoYWtlIGF0dGVtcHQgXCIgKyBhdHRlbXB0LCB7XG4gICAgICAgICAgICBjaGlsZE9yaWdpbjogY2hpbGRPcmlnaW5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzNC5jaGlsZC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgcG9zdG1hdGU6ICdoYW5kc2hha2UnLFxuICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICAgIG1vZGVsOiBfdGhpczQubW9kZWxcbiAgICAgICAgfSwgY2hpbGRPcmlnaW4pO1xuXG4gICAgICAgIGlmIChhdHRlbXB0ID09PSBtYXhIYW5kc2hha2VSZXF1ZXN0cykge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVzcG9uc2VJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHZhciBsb2FkZWQgPSBmdW5jdGlvbiBsb2FkZWQoKSB7XG4gICAgICAgIGRvU2VuZCgpO1xuICAgICAgICByZXNwb25zZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZG9TZW5kLCA1MDApO1xuICAgICAgfTtcblxuICAgICAgaWYgKF90aGlzNC5mcmFtZS5hdHRhY2hFdmVudCkge1xuICAgICAgICBfdGhpczQuZnJhbWUuYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGxvYWRlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczQuZnJhbWUub25sb2FkID0gbG9hZGVkO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBsb2coJ1BhcmVudDogTG9hZGluZyBmcmFtZScsIHtcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3RoaXM0LmZyYW1lLnNyYyA9IHVybDtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gUG9zdG1hdGU7XG59KCk7XG4vKipcbiAqIFRoZSBlbnRyeSBwb2ludCBvZiB0aGUgQ2hpbGRcbiAqIEB0eXBlIHtDbGFzc31cbiAqL1xuXG5cblBvc3RtYXRlLmRlYnVnID0gZmFsc2U7XG5cblBvc3RtYXRlLlByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdyA/IHdpbmRvdy5Qcm9taXNlIDogUHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59KCk7XG5cblBvc3RtYXRlLk1vZGVsID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjaGlsZCwgbW9kZWwsIHBhcmVudCwgYW5kIHJlc3BvbmRzIHRvIHRoZSBQYXJlbnRzIGhhbmRzaGFrZVxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kZWwgSGFzaCBvZiB2YWx1ZXMsIGZ1bmN0aW9ucywgb3IgcHJvbWlzZXNcbiAgICogQHJldHVybiB7UHJvbWlzZX0gICAgICAgVGhlIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBoYW5kc2hha2UgaGFzIGJlZW4gcmVjZWl2ZWRcbiAgICovXG4gIGZ1bmN0aW9uIE1vZGVsKG1vZGVsKSB7XG4gICAgdGhpcy5jaGlsZCA9IHdpbmRvdztcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5wYXJlbnQgPSB0aGlzLmNoaWxkLnBhcmVudDtcbiAgICByZXR1cm4gdGhpcy5zZW5kSGFuZHNoYWtlUmVwbHkoKTtcbiAgfVxuICAvKipcbiAgICogUmVzcG9uZHMgdG8gYSBoYW5kc2hha2UgaW5pdGlhdGVkIGJ5IHRoZSBQYXJlbnRcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmVzb2x2ZXMgYW4gb2JqZWN0IHRoYXQgZXhwb3NlcyBhbiBBUEkgZm9yIHRoZSBDaGlsZFxuICAgKi9cblxuXG4gIHZhciBfcHJvdG80ID0gTW9kZWwucHJvdG90eXBlO1xuXG4gIF9wcm90bzQuc2VuZEhhbmRzaGFrZVJlcGx5ID0gZnVuY3Rpb24gc2VuZEhhbmRzaGFrZVJlcGx5KCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQb3N0bWF0ZS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBzaGFrZSA9IGZ1bmN0aW9uIHNoYWtlKGUpIHtcbiAgICAgICAgaWYgKCFlLmRhdGEucG9zdG1hdGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5kYXRhLnBvc3RtYXRlID09PSAnaGFuZHNoYWtlJykge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ0NoaWxkOiBSZWNlaXZlZCBoYW5kc2hha2UgZnJvbSBQYXJlbnQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpczUuY2hpbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHNoYWtlLCBmYWxzZSk7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgbG9nKCdDaGlsZDogU2VuZGluZyBoYW5kc2hha2UgcmVwbHkgdG8gUGFyZW50Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZS5zb3VyY2UucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgcG9zdG1hdGU6ICdoYW5kc2hha2UtcmVwbHknLFxuICAgICAgICAgICAgdHlwZTogbWVzc2FnZVR5cGVcbiAgICAgICAgICB9LCBlLm9yaWdpbik7XG4gICAgICAgICAgX3RoaXM1LnBhcmVudE9yaWdpbiA9IGUub3JpZ2luOyAvLyBFeHRlbmQgbW9kZWwgd2l0aCB0aGUgb25lIHByb3ZpZGVkIGJ5IHRoZSBwYXJlbnRcblxuICAgICAgICAgIHZhciBkZWZhdWx0cyA9IGUuZGF0YS5tb2RlbDtcblxuICAgICAgICAgIGlmIChkZWZhdWx0cykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICBfdGhpczUubW9kZWxba2V5XSA9IGRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgbG9nKCdDaGlsZDogSW5oZXJpdGVkIGFuZCBleHRlbmRlZCBtb2RlbCBmcm9tIFBhcmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICBsb2coJ0NoaWxkOiBTYXZpbmcgUGFyZW50IG9yaWdpbicsIF90aGlzNS5wYXJlbnRPcmlnaW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKG5ldyBDaGlsZEFQSShfdGhpczUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWplY3QoJ0hhbmRzaGFrZSBSZXBseSBGYWlsZWQnKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzNS5jaGlsZC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgc2hha2UsIGZhbHNlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTW9kZWw7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBvc3RtYXRlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
