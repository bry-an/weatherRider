import { shallowMount } from "@vue/test-utils";
import GoogleMap from "../../src/components/GoogleMap";

describe("GoogleMaps", () => {
  const build = () => {
    const wrapper = shallowMount(GoogleMap);

    return {
      wrapper
    };
  };

  it("renders correctly", () => {
    const { wrapper } = build();
    expect(wrapper.element).toMatchSnapshot();
  });
});
