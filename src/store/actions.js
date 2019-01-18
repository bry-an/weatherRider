import functions from "@/functions/addLeg";

export default {
  directionsService({ state, commit, dispatch }, payload) {
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
    if (map && route) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(route);
    }
  },
  addLeg({ state, commit }, payload) {
    functions.addLeg(state.currentLeg, payload);
    commit("setCurrentLeg", payload);
    const route = JSON.parse(JSON.stringify(state.route));
    commit("addToRouteStack", route);
  },
  removeLeg({ commit }, payload) {
    commit("decreaseLegCount");
    commit("setRoute", payload);
  }
};
