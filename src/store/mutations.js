export default {
  setClickedPoint(state, payload) {
    state.clickedPoint = payload
  },
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  setGoogleObject(state, payload) {
    state.google = payload;
  },
  setOrigin(state, payload) {
    state.origin = payload;
  },
  setRoute(state, payload) {
    state.route = payload;
  }
};
