<template>
  <div>
    <div id="google-map" ref="map"></div>
  </div>
</template>

<script>
const google = window.google;
export default {
  name: "GoogleMap",
  components: {},
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
    },
    route() {
      return this.$store.getters.getRoute;
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
    },
    directionsRenderer() {
      console.log("directionsrenderer");
      const directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map
      });
      directionsDisplay.setMap(this.map);
      directionsDisplay.setDirections(this.route);
    }
  },
  watch: {
    mapCenter: {
      handler() {
        this.map.setCenter(this.mapCenter);
      }
    },
    route: {
      handler() {
        this.directionsRenderer();
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


