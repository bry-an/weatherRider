export default {
  getMapCenter: state => state.mapCenter,
  getRoutes: state => state.routes,
  getClickedPoint: state => state.clickedPoint,
  getOrigin: state => state.origin,
  getLegOrigin: state => state.legOrigin,
  getLeg: state => state.routes.pop()
};
