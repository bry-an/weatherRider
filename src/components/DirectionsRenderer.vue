<template></template>

<script>
export default {
  name: "DirectionsRenderer",
  props: {
    route: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    }
  },
  methods: {
    directionsRenderer() {
      const google = window.google;
      const directionsDisplay = new google.maps.directionsRenderer({
        map: this.$store
      });
    }
  }
};
</script>
