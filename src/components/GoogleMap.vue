<template>
  <v-container>
    <v-layout row>
      <v-flex xs8>
        <div id="google-map" ref="map"></div>
      </v-flex>
      <v-flex xs4>
        <div id="directions-panel" ref="directionsPanel">Directions</div>
      </v-flex>
    </v-layout>
  </v-container>
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
    route() {
      return this.$store.getters.getRoute;
    },
    origin() {
      return this.$store.getters.getOrigin;
    },
    legOrigin: {
      get() {
        return this.$store.getters.getLegOrigin;
      },
      set(newVal) {
        this.$store.commit("setLegOrigin", newVal);
      }
    },
    legDestination: {
      get() {
        return this.$store.getters.getLegDestination;
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
        const point = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        this.$store.commit("setClickedPoint", point);
        this.legDestination = point;
        if (this.origin) {
          this.$store.dispatch("directionsService", {
            origin: this.legOrigin,
            destination: point
          });
          this.legOrigin = point;
        }
        this.directionsRenderer();
      });
    },
    directionsRenderer() {
      console.log("this.route", this.route);
      console.log("directionsrenderer");
      const directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map,
        draggable: true,
        preserveViewport: true,
        suppressMarkers: true
      });
      directionsDisplay.setMap(this.map);
      directionsDisplay.setDirections(this.route);
      directionsDisplay.setPanel(this.$refs.directionsPanel);
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
    width: 100%
    margin: auto
    border-radius: 5px

#directions-panel
  border-radius: 5px
  margin-left: 3px
</style>


