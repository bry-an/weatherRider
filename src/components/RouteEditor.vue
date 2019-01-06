<template>
  <div>
    <v-btn @click="removeLeg(); $emit('directions-renderer')">Undo</v-btn>
    <v-btn>Return Straight</v-btn>
    <v-btn>Out and Back</v-btn>
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
  methods: {
    removeLeg() {
      store.dispatch("removeLeg", this.getPreviousRoute);
    }
  }
};
</script>
