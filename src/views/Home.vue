<template>
  <div>
    <auto-complete/>
    <google-map/>
  </div>
</template>

<script>
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
