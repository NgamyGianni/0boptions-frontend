/* eslint no-underscore-dangle: "off" */
import { f7events, f7routers } from './f7';
import { extend, getComponentId } from './utils';

var getChildrenArray = function getChildrenArray(el) {
  var arr = [];

  for (var i = 0; i < el.children.length; i += 1) {
    arr.push(el.children[i]);
  }

  return arr;
};

var hasSameChildren = function hasSameChildren(childrenBefore, childrenAfter) {
  if (childrenBefore.length !== childrenAfter.length) return false;
  var set = new Set([].concat(childrenBefore, childrenAfter));
  if (set.size === childrenBefore.length) return true;
  return false;
};

export default {
  proto: {
    pageComponentLoader: function pageComponentLoader(_ref) {
      var routerEl = _ref.routerEl,
          component = _ref.component,
          options = _ref.options,
          resolve = _ref.resolve,
          reject = _ref.reject;
      var router = this;
      var routerId = router.id;
      var el = routerEl;
      var viewRouter;
      f7routers.views.forEach(function (data) {
        if (data.el && data.el === routerEl || data.routerId && data.routerId === routerId) {
          viewRouter = data;
        }
      });

      if (!viewRouter) {
        reject();
        return;
      }

      var pageData = {
        component: component,
        id: getComponentId(),
        props: extend({
          f7route: options.route,
          f7router: router
        }, options.route.params, options.props || {})
      };
      var resolved;
      var childrenBefore = getChildrenArray(el);

      function onDidUpdate(componentRouterData) {
        if (componentRouterData !== viewRouter || resolved) return;
        var childrenAfter = getChildrenArray(el);
        if (hasSameChildren(childrenBefore, childrenAfter)) return;
        f7events.off('viewRouterDidUpdate', onDidUpdate);
        var pageEl = el.children[el.children.length - 1];
        pageData.el = pageEl;
        resolve(pageEl);
        resolved = true;
      }

      f7events.on('viewRouterDidUpdate', onDidUpdate);
      viewRouter.pages.push(pageData);
      viewRouter.setPages(viewRouter.pages);
    },
    removePage: function removePage($pageEl) {
      if (!$pageEl) return;
      var router = this;
      var f7Page;
      if ('length' in $pageEl && $pageEl[0]) f7Page = $pageEl[0].f7Page;else f7Page = $pageEl.f7Page;

      if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
        router.app.$($pageEl).remove();
        return;
      }

      var viewRouter;
      f7routers.views.forEach(function (data) {
        if (data.el && data.el === router.el) {
          viewRouter = data;
        }
      });
      var pageEl;

      if ('length' in $pageEl) {
        // Dom7
        if ($pageEl.length === 0) return;
        pageEl = $pageEl[0];
      } else {
        pageEl = $pageEl;
      }

      if (!pageEl) return;
      var pageComponentFound;
      viewRouter.pages.forEach(function (page, index) {
        if (page.el === pageEl) {
          pageComponentFound = true;
          viewRouter.pages.splice(index, 1);
          viewRouter.setPages(viewRouter.pages);
        }
      });

      if (!pageComponentFound) {
        pageEl.parentNode.removeChild(pageEl);
      }
    },
    tabComponentLoader: function tabComponentLoader(_temp) {
      var _ref2 = _temp === void 0 ? {} : _temp,
          tabEl = _ref2.tabEl,
          component = _ref2.component,
          options = _ref2.options,
          resolve = _ref2.resolve,
          reject = _ref2.reject;

      var router = this;
      if (!tabEl) reject();
      var tabRouter;
      f7routers.tabs.forEach(function (tabData) {
        if (tabData.el && tabData.el === tabEl) {
          tabRouter = tabData;
        }
      });

      if (!tabRouter) {
        reject();
        return;
      }

      var id = getComponentId();
      var tabContent = {
        id: id,
        component: component,
        props: extend({
          f7route: options.route,
          f7router: router
        }, options.route.route && options.route.route.tab && options.route.route.tab.options && options.route.route.tab.options.props || {}, options.route.params, options.props || {})
      };
      var resolved;

      function onDidUpdate(componentRouterData) {
        if (componentRouterData !== tabRouter || resolved) return;
        f7events.off('tabRouterDidUpdate', onDidUpdate);
        var tabContentEl = tabEl.children[0];
        resolve(tabContentEl);
        resolved = true;
      }

      f7events.on('tabRouterDidUpdate', onDidUpdate);
      tabRouter.setTabContent(tabContent);
    },
    removeTabContent: function removeTabContent(tabEl) {
      if (!tabEl) return;
      var tabRouter;
      f7routers.tabs.forEach(function (tabData) {
        if (tabData.el && tabData.el === tabEl) {
          tabRouter = tabData;
        }
      });

      if (!tabRouter) {
        tabEl.innerHTML = ''; // eslint-disable-line

        return;
      }

      tabRouter.setTabContent(null);
    },
    modalComponentLoader: function modalComponentLoader(_temp2) {
      var _ref3 = _temp2 === void 0 ? {} : _temp2,
          component = _ref3.component,
          options = _ref3.options,
          resolve = _ref3.resolve,
          reject = _ref3.reject;

      var router = this;
      var modalsRouter = f7routers.modals;

      if (!modalsRouter) {
        reject();
        return;
      }

      var modalData = {
        component: component,
        id: getComponentId(),
        props: extend({
          f7route: options.route,
          f7router: router
        }, options.route.params, options.props || {})
      };
      var resolved;

      function onDidUpdate() {
        if (resolved) return;
        f7events.off('modalsRouterDidUpdate', onDidUpdate);
        var modalEl = modalsRouter.el.children[modalsRouter.el.children.length - 1];
        modalData.el = modalEl;
        resolve(modalEl);
        resolved = true;
      }

      f7events.on('modalsRouterDidUpdate', onDidUpdate);
      modalsRouter.modals.push(modalData);
      modalsRouter.setModals(modalsRouter.modals);
    },
    removeModal: function removeModal(modalEl) {
      var modalsRouter = f7routers.modals;
      if (!modalsRouter) return;
      var modalDataToRemove;
      modalsRouter.modals.forEach(function (modalData) {
        if (modalData.el === modalEl) modalDataToRemove = modalData;
      });
      modalsRouter.modals.splice(modalsRouter.modals.indexOf(modalDataToRemove), 1);
      modalsRouter.setModals(modalsRouter.modals);
    }
  }
};