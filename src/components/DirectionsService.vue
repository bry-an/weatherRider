<template></template>

<script>
const google = window.google;

export default {
  name: "DirectionsService",
  data() {
    return {};
  },
  methods: {
    directionsService() {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: this.origin,
          destination: this.destination,
          travelMode: "BICYCLING"
        },
        (response, status) => {
          if (status === "OK") {
            this.$store.commit("setRoute", response);
          }
        }
      );
    }
  },
  props: {
    origin: {
      type: Object,
      required: true
    },
    destination: {
      type: Object,
      required: true
    }
  },
  watch: {
    destination: {
      handler() {
        this.directionsService();
      }
    }
  }
};
</script>
