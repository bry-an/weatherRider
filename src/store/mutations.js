export default {
  setMapCenter(state, payload) {
    state.mapCenter = payload;
  },
  setGoogleObject(state, payload) {
    state.google = payload;
  },
  setOrigin(state, payload) {
    state.origin = payload;
  }
};
