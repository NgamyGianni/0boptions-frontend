/* eslint-disable import/no-mutable-exports */
import Framework7 from 'framework7/lite';
import { extend, unsetRouterIds } from './utils';
var f7;
var f7events;
var theme = {};
var f7routers = {
  views: [],
  tabs: [],
  modals: null
};

var setTheme = function setTheme() {
  if (!f7) return;
  theme.ios = f7.theme === 'ios';
  theme.md = f7.theme === 'md';
  theme.aurora = f7.theme === 'aurora';
};

var cleanup = function cleanup() {
  unsetRouterIds();
  delete theme.ios;
  delete theme.md;
  delete theme.aurora;
  f7routers.views = [];
  f7routers.tabs = [];
  f7routers.modals = null;
};

var f7initEvents = function f7initEvents() {
  f7events = new Framework7.Events();
};

var f7init = function f7init(rootEl, params, init) {
  if (params === void 0) {
    params = {};
  }

  if (init === void 0) {
    init = true;
  }

  var f7Params = extend({}, params, {
    el: rootEl,
    init: init
  });
  if (typeof params.store !== 'undefined') f7Params.store = params.store;
  if (!f7Params.routes) f7Params.routes = [];

  if (f7Params.userAgent && (f7Params.theme === 'auto' || !f7Params.theme)) {
    var device = Framework7.getDevice({
      userAgent: f7Params.userAgent
    }, true);
    theme.ios = !!device.ios;
    theme.aurora = device.desktop && device.electron;
    theme.md = !theme.ios && !theme.aurora;
  } // eslint-disable-next-line


  if (f7 && typeof window !== 'undefined') return; // eslint-disable-next-line

  if (typeof window === 'undefined') cleanup();
  var instance = new Framework7(f7Params);
  f7 = instance;
  setTheme();

  if (instance.initialized) {
    f7 = instance;
    f7events.emit('ready', f7);
  } else {
    instance.on('init', function () {
      f7 = instance;
      f7events.emit('ready', f7);
    });
  }
};

var f7ready = function f7ready(callback) {
  if (!callback) return;
  if (f7 && f7.initialized) callback(f7);else {
    f7events.once('ready', callback);
  }
};

export { f7, theme, f7ready, f7events, f7init, f7routers, f7initEvents, setTheme };