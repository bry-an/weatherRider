import functions from "@/functions/addLeg";
import elevation from "@/functions/calculateElevationGain";

export default {
  directionsService({ state, commit, dispatch }, { origin, destination }) {
    return new Promise((resolve, reject) => {
      const google = window.google;
      console.log("Firing directionsService");
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: "BICYCLING"
        },
        (response, status) => {
          if (status === "OK") {
            resolve(response);
            dispatch("addLeg", response);
          } else reject();
        }
      );
      const elevator = new google.maps.ElevationService();
      elevator.getElevationAlongPath(
        {
          path: [origin, destination],
          samples: 12
        },
        (results, status) => {
          const elevations = results.map(x => x.elevation);
          console.log("elevations", elevations);
          let differential = elevation.calculateElevationGain(elevations);
          commit("setHeightDiff", differential);
        }
      );
    });
  },
  directionsRenderer({ state }, { directionsDisplay, map, route }) {
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
      directionsDisplay: directionsDisplay
    });
    commit("emptyRouteStack");
    commit("clearRoute");
    commit("setLegOrigin", "none");
    commit("setLegDestination", "none");
    commit("setOrigin", "none");
    commit("setCurrentLeg", "none");
    commit("decreaseLegCount", "none");
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
