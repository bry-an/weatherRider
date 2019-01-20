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
  clearRoute(state) {
    state.route = {};
  },
  setLegDestination(state, payload) {
    state.legDestination = payload;
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
    state.currentLeg = payload;
  },
  decreaseLegCount(state) {
    state.legCount--;
  },
  increaseLegCount(state) {
    state.legCount++;
  }
};
