<template>
  <div id="google-map" ref="map"></div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      map: null,
      markers: [],
      google: this.$root.$data.google
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
      console.log(mapRef);
      const options = {
        zoom: 14,
        center: this.mapCenter
      };
      this.map = new google.maps.Map(mapRef, options);
    }
  },
  mounted() {
    this.$store.commit("setGoogleObject", window.google);
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


