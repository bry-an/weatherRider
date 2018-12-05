<template>
  <div class="google-map" ref="map"></div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      map: null,
      center: null,
      markers: []
    };
  },
  computed: {
    mapCenter() {
      return this.$store.getters.getMapCenter;
    }
  },
  methods: {
    initMap() {
      const mapRef = this.$refs.map;
      const options = {
        zoom: 14,
        center: this.mapCenter
      };
    }
  }
};
</script>

