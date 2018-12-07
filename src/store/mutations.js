import state from "./state";

export default {
  setMapCenter(payload) {
    state.mapCenter = payload;
  },
  setGoogleObject(payload) {
    state.google = payload;
  }
};
