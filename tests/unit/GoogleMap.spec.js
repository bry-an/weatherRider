import { shallowMount, createLocalVue } from "@vue/test-utils";
import GoogleMap from "../../src/components/GoogleMap";
import initialState from "@/store";
import Vuex from "vuex";

const localVue = createLocalVue();

describe("GoogleMaps", () => {
  const google = window.google;
  let state;
  const build = () => {
    const wrapper = shallowMount(GoogleMap, {
      localVue,
      store: new Vuex.Store({
        state
      })
    });

    return {
      wrapper
    };
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  it("renders correctly", () => {
    const { wrapper } = build();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
