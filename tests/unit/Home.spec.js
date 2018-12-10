import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("home view", () => {
  const build = () => {
    const wrapper = shallowMount(Home);

    return {
      wrapper
    };
  };

  it("renders correctly", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
