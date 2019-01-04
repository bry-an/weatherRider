addLeg = leg => {
  state.legCount++;
  if (state.legCount === 1) {
    state.route.geocoded_waypoints[0] = leg.geocoded_waypoints[0];
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
};

metersToMi = meters => {
  return meters / 1609.344;
};
