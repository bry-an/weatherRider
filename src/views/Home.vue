<template>
  <div>
    <button>Home</button>
    <auto-complete/>
    <google-map/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from "../components/GoogleMap";
import AutoComplete from "../components/AutoComplete";
export default {
  name: "home",
  components: {
    GoogleMap,
    AutoComplete
  }
};
</script>
