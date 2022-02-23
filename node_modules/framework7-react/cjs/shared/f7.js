"use strict";

exports.__esModule = true;
exports.setTheme = exports.f7initEvents = exports.f7routers = exports.f7init = exports.f7events = exports.f7ready = exports.theme = exports.f7 = void 0;

var _lite = _interopRequireDefault(require("framework7/lite"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-mutable-exports */
var f7;
exports.f7 = f7;
var f7events;
exports.f7events = f7events;
var theme = {};
exports.theme = theme;
var f7routers = {
  views: [],
  tabs: [],
  modals: null
};
exports.f7routers = f7routers;

var setTheme = function setTheme() {
  if (!f7) return;
  theme.ios = f7.theme === 'ios';
  theme.md = f7.theme === 'md';
  theme.aurora = f7.theme === 'aurora';
};

exports.setTheme = setTheme;

var cleanup = function cleanup() {
  (0, _utils.unsetRouterIds)();
  delete theme.ios;
  delete theme.md;
  delete theme.aurora;
  f7routers.views = [];
  f7routers.tabs = [];
  f7routers.modals = null;
};

var f7initEvents = function f7initEvents() {
  exports.f7events = f7events = new _lite.default.Events();
};

exports.f7initEvents = f7initEvents;

var f7init = function f7init(rootEl, params, init) {
  if (params === void 0) {
    params = {};
  }

  if (init === void 0) {
    init = true;
  }

  var f7Params = (0, _utils.extend)({}, params, {
    el: rootEl,
    init: init
  });
  if (typeof params.store !== 'undefined') f7Params.store = params.store;
  if (!f7Params.routes) f7Params.routes = [];

  if (f7Params.userAgent && (f7Params.theme === 'auto' || !f7Params.theme)) {
    var device = _lite.default.getDevice({
      userAgent: f7Params.userAgent
    }, true);

    theme.ios = !!device.ios;
    theme.aurora = device.desktop && device.electron;
    theme.md = !theme.ios && !theme.aurora;
  } // eslint-disable-next-line


  if (f7 && typeof window !== 'undefined') return; // eslint-disable-next-line

  if (typeof window === 'undefined') cleanup();
  var instance = new _lite.default(f7Params);
  exports.f7 = f7 = instance;
  setTheme();

  if (instance.initialized) {
    exports.f7 = f7 = instance;
    f7events.emit('ready', f7);
  } else {
    instance.on('init', function () {
      exports.f7 = f7 = instance;
      f7events.emit('ready', f7);
    });
  }
};

exports.f7init = f7init;

var f7ready = function f7ready(callback) {
  if (!callback) return;
  if (f7 && f7.initialized) callback(f7);else {
    f7events.once('ready', callback);
  }
};

exports.f7ready = f7ready;