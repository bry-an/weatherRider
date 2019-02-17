import store from "@/store";
export default {
  computed: {
    routeIsLoaded() {
      return !!Object.keys(store.state.route).length;
    }
  }
};
