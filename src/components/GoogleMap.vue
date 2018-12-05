<template>
  <div class="google-map" ref="map"></div>
</template>

<script>
import google from window.google
export default {
  name: "GoogleMap",
  data() {
    return {
      map: null,
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
      this.map = new google.maps.Map(mapRef, options);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style lang="sass" scoped>
#map
    height: 800px
</style>


