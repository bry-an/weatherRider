<template></template>

<script>
export default {
  name: "DirectionsRendered",
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  methods: {
    directionsRenderer() {
      const directionsDisplay = new google.maps.directionsRenderer({
        map: this.$store
      });
    }
  }
};
</script>
