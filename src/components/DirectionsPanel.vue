<template>
  <v-list>
    <template v-for="step in steps">
      <v-card :key="step.encoded_lat_lngs">
        <span v-html="step.instructions"/>
      </v-card>
      <v-divider :key="step.encoded_lat_lngs + 1"/>
    </template>
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
