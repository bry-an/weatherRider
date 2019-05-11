export default {
  getMapCenter: state => state.mapCenter,
  getRoute: state => state.route,
  getClickedPoint: state => state.clickedPoint,
  getOrigin: state => state.origin,
  getHeightDiff: state => state.heightDiff,
  getLegOrigin: state => state.legOrigin,
  getLegDestination: state => state.legDestination,
  getCurrentLeg: state => state.currentLeg,
  getPreviousRoute: state => state.routeStack[state.routeStack.length - 2],
  getCurrentWeatherOrigin: state => state.currentWeather[0],
  getCurrentWeatherDestination: state => state.currentWeather[state.currentWeather.length - 1]
};
