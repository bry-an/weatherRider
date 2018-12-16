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
    },
    origin() {
      return this.$store.getters.getOrigin;
    },
    legOrigin: {
      get() {
        return this.$store.getters.legOrigin;
      },
      set(newVal) {
        this.$store.commit("setLegOrigin", newVal);
      }
    },
    legDestination: {
      get() {
        return this.$store.getters.legDestination;
      },
      set(newVal) {
        this.$store.commit("setLegDestination", newVal);
      }
    },
    clickedPoint() {
      return this.$store.getters.getClickedPoint;
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
      this.map.addListener("click", e => {
        const point = e.latLng;
        this.$store.commit("setClickedPoint", point);
        this.legDestination = point;
        if (this.origin) {
          console.log("Firing directions service");
          this.$store.dispatch("directionsService", {
            origin: this.legOrigin,
            destination: point
          });
          this.legOrigin = point;
        }
      });
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


