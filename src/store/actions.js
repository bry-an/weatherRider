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
  directionsRenderer({ state }, { directionsDisplay, map, route, clear }) {
    // if (clear) {
    //   directionsDisplay.setDirections(null);
    // }
    directionsDisplay.setMap(null);
    if (route) {
      directionsDisplay.setMap(map);
      directionsDisplay.setDirections(route);
    }
  },
  addLeg({ state, commit }, payload) {
    functions.addLeg(state, payload);
    commit("setCurrentLeg", payload);
    const route = JSON.parse(JSON.stringify(state.route));
    commit("addToRouteStack", route);
  },
  clearMap({ dispatch, commit }, { directionsDisplay, map }) {
    dispatch("directionsRenderer", {
      directionsDisplay: directionsDisplay,
      map: map,
      clear: true
    });
    commit("emptyRouteStack");
    commit("clearRoute");
    commit("setLegOrigin", "none");
    commit("setLegDestination", "none");
    commit("setOrigin", "none");
  },
  removeLeg({ commit, getters }) {
    const newRoute = getters["getPreviousRoute"];
    console.log("newRoute in removeLeg", newRoute);
    commit("decreaseLegCount");
    commit("setRoute", newRoute);
    commit("setLegOrigin", newRoute.request.destination.location);
    commit("popRouteStack");
  }
};
