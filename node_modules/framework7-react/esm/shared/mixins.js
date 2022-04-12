import { isStringProp } from './utils';
export function colorClasses(props) {
  var _ref;

  var color = props.color,
      colorTheme = props.colorTheme,
      textColor = props.textColor,
      bgColor = props.bgColor,
      borderColor = props.borderColor,
      rippleColor = props.rippleColor,
      themeDark = props.themeDark;
  return _ref = {
    'theme-dark': themeDark
  }, _ref["color-" + color] = color, _ref["color-theme-" + colorTheme] = colorTheme, _ref["text-color-" + textColor] = textColor, _ref["bg-color-" + bgColor] = bgColor, _ref["border-color-" + borderColor] = borderColor, _ref["ripple-color-" + rippleColor] = rippleColor, _ref;
}
export function routerAttrs(props) {
  var force = props.force,
      reloadCurrent = props.reloadCurrent,
      reloadPrevious = props.reloadPrevious,
      reloadAll = props.reloadAll,
      reloadDetail = props.reloadDetail,
      animate = props.animate,
      ignoreCache = props.ignoreCache,
      routeTabId = props.routeTabId,
      view = props.view,
      transition = props.transition,
      openIn = props.openIn;
  var dataAnimate;

  if ('animate' in props && typeof animate !== 'undefined') {
    dataAnimate = animate.toString();
  }

  var dataReloadDetail;

  if ('reloadDetail' in props && typeof reloadDetail !== 'undefined') {
    dataReloadDetail = reloadDetail.toString();
  }

  return {
    'data-force': force || undefined,
    'data-reload-current': reloadCurrent || undefined,
    'data-reload-all': reloadAll || undefined,
    'data-reload-previous': reloadPrevious || undefined,
    'data-reload-detail': dataReloadDetail,
    'data-animate': dataAnimate,
    'data-ignore-cache': ignoreCache || undefined,
    'data-route-tab-id': routeTabId || undefined,
    'data-view': isStringProp(view) ? view : undefined,
    'data-transition': isStringProp(transition) ? transition : undefined,
    'data-open-in': isStringProp(openIn) ? openIn : undefined
  };
}
export function routerClasses(props) {
  var back = props.back,
      linkBack = props.linkBack,
      external = props.external,
      preventRouter = props.preventRouter;
  return {
    back: back || linkBack,
    external: external,
    'prevent-router': preventRouter
  };
}
export function actionsAttrs(props) {
  var searchbarEnable = props.searchbarEnable,
      searchbarDisable = props.searchbarDisable,
      searchbarClear = props.searchbarClear,
      searchbarToggle = props.searchbarToggle,
      panelOpen = props.panelOpen,
      panelClose = props.panelClose,
      panelToggle = props.panelToggle,
      popupOpen = props.popupOpen,
      popupClose = props.popupClose,
      actionsOpen = props.actionsOpen,
      actionsClose = props.actionsClose,
      popoverOpen = props.popoverOpen,
      popoverClose = props.popoverClose,
      loginScreenOpen = props.loginScreenOpen,
      loginScreenClose = props.loginScreenClose,
      sheetOpen = props.sheetOpen,
      sheetClose = props.sheetClose,
      sortableEnable = props.sortableEnable,
      sortableDisable = props.sortableDisable,
      sortableToggle = props.sortableToggle,
      cardOpen = props.cardOpen,
      cardClose = props.cardClose;
  return {
    'data-searchbar': isStringProp(searchbarEnable) && searchbarEnable || isStringProp(searchbarDisable) && searchbarDisable || isStringProp(searchbarClear) && searchbarClear || isStringProp(searchbarToggle) && searchbarToggle || undefined,
    'data-panel': isStringProp(panelOpen) && panelOpen || isStringProp(panelClose) && panelClose || isStringProp(panelToggle) && panelToggle || undefined,
    'data-popup': isStringProp(popupOpen) && popupOpen || isStringProp(popupClose) && popupClose || undefined,
    'data-actions': isStringProp(actionsOpen) && actionsOpen || isStringProp(actionsClose) && actionsClose || undefined,
    'data-popover': isStringProp(popoverOpen) && popoverOpen || isStringProp(popoverClose) && popoverClose || undefined,
    'data-sheet': isStringProp(sheetOpen) && sheetOpen || isStringProp(sheetClose) && sheetClose || undefined,
    'data-login-screen': isStringProp(loginScreenOpen) && loginScreenOpen || isStringProp(loginScreenClose) && loginScreenClose || undefined,
    'data-sortable': isStringProp(sortableEnable) && sortableEnable || isStringProp(sortableDisable) && sortableDisable || isStringProp(sortableToggle) && sortableToggle || undefined,
    'data-card': isStringProp(cardOpen) && cardOpen || isStringProp(cardClose) && cardClose || undefined
  };
}
export function actionsClasses(props) {
  var searchbarEnable = props.searchbarEnable,
      searchbarDisable = props.searchbarDisable,
      searchbarClear = props.searchbarClear,
      searchbarToggle = props.searchbarToggle,
      panelOpen = props.panelOpen,
      panelClose = props.panelClose,
      panelToggle = props.panelToggle,
      popupOpen = props.popupOpen,
      popupClose = props.popupClose,
      actionsClose = props.actionsClose,
      actionsOpen = props.actionsOpen,
      popoverOpen = props.popoverOpen,
      popoverClose = props.popoverClose,
      loginScreenOpen = props.loginScreenOpen,
      loginScreenClose = props.loginScreenClose,
      sheetOpen = props.sheetOpen,
      sheetClose = props.sheetClose,
      sortableEnable = props.sortableEnable,
      sortableDisable = props.sortableDisable,
      sortableToggle = props.sortableToggle,
      cardOpen = props.cardOpen,
      cardPreventOpen = props.cardPreventOpen,
      cardClose = props.cardClose,
      menuClose = props.menuClose;
  return {
    'searchbar-enable': searchbarEnable || searchbarEnable === '',
    'searchbar-disable': searchbarDisable || searchbarDisable === '',
    'searchbar-clear': searchbarClear || searchbarClear === '',
    'searchbar-toggle': searchbarToggle || searchbarToggle === '',
    'panel-close': panelClose || panelClose === '',
    'panel-open': panelOpen || panelOpen === '',
    'panel-toggle': panelToggle || panelToggle === '',
    'popup-close': popupClose || popupClose === '',
    'popup-open': popupOpen || popupOpen === '',
    'actions-close': actionsClose || actionsClose === '',
    'actions-open': actionsOpen || actionsOpen === '',
    'popover-close': popoverClose || popoverClose === '',
    'popover-open': popoverOpen || popoverOpen === '',
    'sheet-close': sheetClose || sheetClose === '',
    'sheet-open': sheetOpen || sheetOpen === '',
    'login-screen-close': loginScreenClose || loginScreenClose === '',
    'login-screen-open': loginScreenOpen || loginScreenOpen === '',
    'sortable-enable': sortableEnable || sortableEnable === '',
    'sortable-disable': sortableDisable || sortableDisable === '',
    'sortable-toggle': sortableToggle || sortableToggle === '',
    'card-close': cardClose || cardClose === '',
    'card-open': cardOpen || cardOpen === '',
    'card-prevent-open': cardPreventOpen || cardPreventOpen === '',
    'menu-close': menuClose || menuClose === ''
  };
}