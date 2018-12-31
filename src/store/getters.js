export default {
  getMapCenter: state => state.mapCenter,
  getRoutes: state => state.routes,
  getCombinedRoute: state => state.combinedRoute,
  getClickedPoint: state => state.clickedPoint,
  getOrigin: state => state.origin,
  getLegOrigin: state => state.legOrigin,
  getLeg: state => state.routes.pop()
};
