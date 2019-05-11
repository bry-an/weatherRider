import store from "@/store";

export default {
  addLeg(state, leg) {
    store.commit("increaseLegCount");
    if (state.legCount === 1) {
      store.commit("setRoute", leg);
      return;
    }
    state.route.geocoded_waypoints[1] = leg.geocoded_waypoints[1];


    state.route.routes[0].legs[0].distance.value +=
      leg.routes[0].legs[0].distance.value;
    state.route.routes[0].legs[0].distance.text =
      this.metersToMi(state.route.routes[0].legs[0].distance.value)
        .toFixed(2)
        .toString() + " mi";
    state.route.routes[0].legs[0].duration.value +=
      leg.routes[0].legs[0].duration.value;
    state.route.routes[0].legs[0].duration.text =
      this.secondsToMin(
        state.route.routes[0].legs[0].duration.value
      ).toString() + " mins";

    state.route.routes[0].legs[0].end_address =
      leg.routes[0].legs[0].end_address;
    state.route.routes[0].legs[0].end_location =
      leg.routes[0].legs[0].end_location;

    state.route.routes[0].legs[0].steps.push(...leg.routes[0].legs[0].steps);

    state.route.routes[0].overview_path.push(...leg.routes[0].overview_path);

    state.route.routes[0].overview_polyline = google.maps.geometry.encoding.encodePath(
      state.route.routes[0].overview_path
    );

    state.route.routes[0].summary = leg.routes[0].summary;
  },

  metersToMi(meters) {
    return meters / 1609.344;
  },
  secondsToMin(seconds) {
    return seconds / 60;
  }
};
