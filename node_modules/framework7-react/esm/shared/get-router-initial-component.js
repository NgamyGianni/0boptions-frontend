function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { getComponentId } from './utils';
export var getRouterInitialComponent = function getRouterInitialComponent(router, initialComponent) {
  var initialComponentData;

  var _router$getInitialUrl = router.getInitialUrl(),
      initialUrl = _router$getInitialUrl.initialUrl;

  var initialRoute = router.findMatchingRoute(initialUrl);
  var routeProps = {};

  if (initialRoute && initialRoute.route && initialRoute.route.options) {
    routeProps = initialRoute.route.options.props;
  }

  var isMasterRoute = function isMasterRoute(route) {
    if (route.master === true) return true;
    if (typeof route.master === 'function') return route.master(router.app);
    return false;
  };

  if (initialRoute && initialRoute.route && (initialRoute.route.component || initialRoute.route.asyncComponent) && !isMasterRoute(initialRoute.route)) {
    initialComponentData = {
      component: initialRoute.route.component || initialRoute.route.asyncComponent,
      initialComponent: initialComponent,
      id: getComponentId(),
      isAsync: !!initialRoute.route.asyncComponent,
      props: _extends({
        f7route: initialRoute,
        f7router: router
      }, routeProps, initialRoute.params)
    };
  }

  return {
    initialPage: initialComponentData,
    initialRoute: initialRoute
  };
};