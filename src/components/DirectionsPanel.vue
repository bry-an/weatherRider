<template>
  <v-list>
    <v-list-tile v-for="step in steps" :key="step.encoded_lat_lngs">
      <span v-html="step.instructions"/>
    </v-list-tile>
  </v-list>
</template>

<script>
import store from "@/store";
export default {
  name: "DirectionsPanel",
  computed: {
    route() {
      return store.getters["getRoute"];
    },
    steps() {
      return store.getters["getRoute"].routes[0].legs[0].steps;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
