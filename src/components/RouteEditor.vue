<template>
  <div>
    <v-btn @click="$emit('remove-leg')">Undo</v-btn>
    <v-btn @click="$emit('return-straight')">Return Straight</v-btn>
    <v-btn>Out and Back</v-btn>
    <v-btn @click="$emit('clear-map')">Clear map</v-btn>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  name: "RouteEditor",
  computed: {
    ...mapGetters(["route", "getPreviousRoute"])
  },
  methods: {}
};
</script>
