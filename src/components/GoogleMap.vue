<template>
  <div id="google-map" ref="map"></div>
</template>

<script>
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
    },
    google() {
      return this.$store.getters.getGoogleObject;
    }
  },
  methods: {
    initMap() {
      this.$store.commit("setGoogleObject", window.google);
      const mapRef = this.$refs.map;
      console.log(mapRef);
      const options = {
        zoom: 14,
        center: this.mapCenter
      };
      this.map = new this.google.maps.Map(mapRef, options);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style lang="sass" scoped>
#google-map
    height: 800px
    width: 50%
    margin: auto
    border-radius: 5px
</style>


