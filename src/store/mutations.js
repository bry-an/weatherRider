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
    _.merge(state.route, payload);
    state.routeStack.push(state.route);
    state.currentLeg = payload;
  }
};
