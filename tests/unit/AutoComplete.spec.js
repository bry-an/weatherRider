import { shallowMount } from "@vue/test-utils";
import AutoComplete from "@/components/AutoComplete.vue";
import googleObject from "../fixtures/googleObject.js";

describe("AutoComplete", () => {
  const build = () => {
    const wrapper = shallowMount(AutoComplete);
    wrapper.setData({
      google: googleObject,
      placeInput: "hello"
    });
    return {
      wrapper
    };
  };

  it("displays correctly", () => {
    const { wrapper } = build();
    console.info(wrapper.vm.placeInput);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
