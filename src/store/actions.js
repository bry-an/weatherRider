import functions from "@/functions/addLeg";

export default {
  directionsService({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const google = window.google;
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: payload.origin,
          destination: payload.destination,
          travelMode: "BICYCLING"
        },
        (response, status) => {
          if (status === "OK") {
            resolve(response);
            dispatch("addLeg", response);
          } else reject();
        }
      );
    });
  },
  directionsRenderer({ state }, { directionsDisplay, map, route }) {
    directionsDisplay.setMap(null);
    directionsDisplay.setMap(map);
    directionsDisplay.setDirections(route);
  },
  addLeg({ state, commit, getters }, payload) {
    if (state.route) {
      const route = getters.getRoute;
      commit("addToRouteStack", route);
    }
    functions.addLeg(state, payload);
    commit("setCurrentLeg", payload);
  },
  removeLeg({ state, commit, dispatch }, payload) {
    commit("decreaseLegCount");
    commit("setRoute", payload);
  }
};
