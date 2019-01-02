import _ from "lodash";

export default {
  setClickedPoint(state, payload) {
    state.clickedPoint = payload;
  },
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  setOrigin(state, payload) {
    state.origin = payload;
  },
  setLegOrigin(state, payload) {
    state.legOrigin = payload;
  },
  setLegDestination(state, payload) {
    state.legDestination = payload;
  },
  addLeg(state, payload) {
    const oldRoute = state.route;
    const newRoute = _.merge(oldRoute, payload);
    state.route = newRoute;
    state.routeStack.push(newRoute);
    state.currentLeg = payload;
  }
};
