export default {
  addLeg(leg) {
    state.legCount++;
    if (state.legCount === 1) {
      state.route = leg;
    }
    state.route.geocoded_waypoints[1] = leg.geocoded_waypoints[1];

    if (leg.routes[0].bounds.fa.j < state.route.routes[0].bounds.fa.j) {
      state.route.routes[0].bounds.fa.j = leg.routes[0].bounds.fa.j;
    }
    if (leg.routes[0].bounds.fa.l > state.route.routes[0].bounds.fa.l) {
      state.route.routes[0].bounds.fa.l = leg.routes[0].bounds.fa.l;
    }
    if (leg.routes[0].bounds.ma.j < state.route.routes[0].bounds.ma.j) {
      state.route.routes[0].bounds.ma.j = leg.routes[0].bounds.ma.j;
    }
    if (leg.routes[0].bounds.ma.l > state.route.routes[0].bounds.ma.l) {
      state.route.routes[0].bounds.ma.l = leg.routes[0].bounds.ma.l;
    }

    state.route.routes[0].legs[0].distance.value +=
      leg.routes[0].legs[0].distance.value;
    state.route.routes[0].legs[0].distance.text =
      this.metersToMi(state.route.routes[0].legs[0].distance.value).toString() +
      " mi";
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

    state.routes[0].overview_polyline = google.maps.geometry.encoding.encodePath(
      state.route.routes[0].overview_path
    );

    state.routes[0].summary = leg.routes[0].summary;
  },

  metersToMi(meters) {
    return meters / 1609.344;
  },
  secondsToMin(seconds) {
    return seconds / 60;
  }
};
