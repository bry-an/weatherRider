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
  setLegDestination(state, payload) {
    state.legDestination = payload;
  },
  addLeg(state, payload) {
    functions.addLeg(state, payload);
    state.routeStack.push(state.route);
    state.currentLeg = payload;
  },
  removeLeg(state) {
    state.legCount--;
    state.routeStack.pop();
    state.route = state.routeStack.pop();
  }
};
