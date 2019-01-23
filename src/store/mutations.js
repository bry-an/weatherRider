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
    if (payload === "none") {
      state.origin = null;
    } else state.origin = payload;
  },
  setLegOrigin(state, payload) {
    if (payload === "none") {
      state.legOrigin = null;
    } else state.legOrigin = payload;
  },
  setRoute(state, payload) {
    state.route = payload;
  },
  clearRoute(state) {
    state.route = null;
  },
  setHeightDiff(state, payload) {
    state.heightDiff += payload;
  },
  setLegDestination(state, payload) {
    if (payload === "none") {
      state.legDestination = null;
    } else state.legDestination = payload;
  },
  addToRouteStack(state, payload) {
    const route = {
      geocoded_waypoints: payload.geocoded_waypoints,
      request: payload.request,
      routes: payload.routes
    };
    state.routeStack.push(route);
  },
  popRouteStack(state) {
    state.routeStack.pop();
  },
  emptyRouteStack(state) {
    state.routeStack = [];
  },
  setCurrentLeg(state, payload) {
    if (payload === "none") {
      state.currentLeg = null;
    } else state.currentLeg = payload;
  },
  decreaseLegCount(state, payload) {
    if (payload === "none") {
      state.legCount = 0;
    } else state.legCount--;
  },
  increaseLegCount(state) {
    state.legCount++;
  }
};
