<template>
  <div>
    <v-btn @click="removeLeg(); $emit('directions-renderer')">Undo</v-btn>
    <v-btn>Return Straight</v-btn>
    <v-btn>Out and Back</v-btn>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "RouteEditor",
  methods: {
    removeLeg() {
      store.commit("removeLeg");
    }
  }
};
</script>
