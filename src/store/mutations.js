import _ from "lodash";
import functions from "@/functions/addLeg";

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
  setRoute(state, payload) {
    state.route = payload;
  },
  setLegDestination(state, payload) {
    state.legDestination = payload;
  },
  addToRouteStack(state, payload) {
    state.routeStack.push(payload);
  },
  setCurrentLeg(state, payload) {
    state.currentLeg = payload;
  },
  decreaseLegCount(state) {
    state.legCount--;
  }
};
