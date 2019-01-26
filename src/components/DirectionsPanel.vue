<template>
  <div>
    <v-card>Total Elevation Gain: {{ heightDiff }} feet</v-card>
    <v-btn @click="toggleDirections()">Display Directions</v-btn>
    <v-list v-if="directions">
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
  data() {
    return {
      directions: false
    };
  },
  computed: {
    route() {
      return store.getters["getRoute"];
    },
    steps() {
      return store.getters["getRoute"].routes[0].legs[0].steps;
    },
    heightDiff() {
      return store.getters["getHeightDiff"].toFixed(2);
    }
  },
  methods: {
    toggleDirections() {
      this.directions = !this.directions;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
