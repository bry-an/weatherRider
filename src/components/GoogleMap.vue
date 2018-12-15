<template>
  <div>
    <div id="google-map" ref="map"></div>
    <directions-renderer :map="map"/>
  </div>
</template>

<script>
const google = window.google;
import DirectionsRenderer from "@/src/components/DirectionsRenderer";
export default {
  name: "GoogleMap",
  components: {
    DirectionsRenderer
  },
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
      const mapRef = this.$refs.map;
      console.log(mapRef);
      const options = {
        zoom: 14,
        center: this.mapCenter
      };
      this.map = new google.maps.Map(mapRef, options);
    }
  },
  watch: {
    mapCenter: {
      handler() {
        this.map.setCenter(this.mapCenter);
      }
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


