<template>
  <div>
    <v-card>Total Elevation Change: {{ heightDiff }}</v-card>
    <v-list>
      <template v-for="step in steps">
        <v-card :key="step.encoded_lat_lngs">
          <span v-html="step.instructions"/>
        </v-card>
        <v-divider :key="step.encoded_lat_lngs + 1"/>
      </template>
    </v-list>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "DirectionsPanel",
  props: ["elevation"],
  computed: {
    route() {
      return store.getters["getRoute"];
    },
    steps() {
      return store.getters["getRoute"].routes[0].legs[0].steps;
    },
    heightDiff() {
      return store.getters["getHeightDiff"];
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
