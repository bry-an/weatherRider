import { shallowMount, createLocalVue } from "@vue/test-utils";
import GoogleMap from "../../src/components/GoogleMap";
import initialState from "@/store";
import Vuex from "vuex";
const googleObject = require("../fixtures/googleObject.json");

const localVue = createLocalVue();

describe("GoogleMaps", () => {
  const google = window.google;
  let state;
  const build = () => {
    const wrapper = shallowMount(GoogleMap, {
      localVue,
      store: new Vuex.Store({
        state
      }),
      mocks: {
        map: googleObject.maps.Map()
      }
    });

    return {
      wrapper
    };
  };

  beforeEach(() => {
    window.google = google;
    state = { ...initialState };
  });

  xit("renders correctly", () => {
    const { wrapper } = build();
    console.info(wrapper.google);
  });
});
