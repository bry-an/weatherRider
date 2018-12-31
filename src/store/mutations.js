import _ from "lodash";

export default {
  setClickedPoint(state, payload) {
    state.clickedPoint = payload;
  },
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  setGoogleObject(state, payload) {
    state.google = payload;
  },
  setOrigin(state, payload) {
    state.origin = payload;
  },
  setCombinedRoute(state, payload) {
    state.route = payload;
  },
  setLegOrigin(state, payload) {
    state.legOrigin = payload;
  },
  setLegDestination(state, payload) {
    state.legDestination = payload;
  },
  addLeg(state, payload) {
    state.routes.push(payload);
  },
  setCurrentLeg(state, payload) {
    state.currentLeg = payload;
  }
};
