<template>
  <v-container>
    <v-layout row>
      <v-flex xs8>
        <div id="google-map" ref="map"></div>
      </v-flex>
      <v-flex xs4>
        <div id="directions-panel" ref="directionsPanel">
          <template v-if="route">
            <directions-panel/>
            <route-editor/>
          </template>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DirectionsPanel from "./DirectionsPanel";
import RouteEditor from "./RouteEditor";
import store from "@/store";
const google = window.google;
export default {
  name: "GoogleMap",
  components: { DirectionsPanel, RouteEditor },
  data() {
    return {
      map: null,
      markers: [],
      directionsDisplay: new google.maps.DirectionsRenderer({
        map: this.map,
        draggable: true,
        preserveViewport: true,
        suppressMarkers: true
      })
    };
  },
  computed: {
    mapCenter() {
      return store.getters.getMapCenter;
    },
    route() {
      return store.getters.getRoute;
    },
    origin: {
      get() {
        return store.getters.getOrigin;
      },
      set(newVal) {
        store.commit("setOrigin", newVal);
      }
    },
    legOrigin: {
      get() {
        return store.getters.getLegOrigin;
      },
      set(newVal) {
        store.commit("setLegOrigin", newVal);
      }
    },
    legDestination: {
      get() {
        return store.getters.getLegDestination;
      },
      set(newVal) {
        store.commit("setLegDestination", newVal);
      }
    },
    clickedPoint() {
      return store.getters.getClickedPoint;
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
        const clickedPoint = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        store.commit("setClickedPoint", clickedPoint);
        this.legDestination = clickedPoint;
        if (this.origin) {
          store
            .dispatch("directionsService", {
              origin: this.legOrigin,
              destination: clickedPoint
            })
            .then(() => {
              this.directionsRenderer();
              this.legOrigin = this.legDestination;
            });
        } else {
          this.origin = clickedPoint;
          this.legOrigin = clickedPoint;
        }
      });
    },
    directionsRenderer() {
      console.log("this.route", this.route);
      console.log("directionsrenderer");
      this.directionsDisplay.setMap(null);
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setDirections(this.route);
      // directionsDisplay.setPanel(this.$refs.directionsPanel);
    }
  },
  watch: {
    mapCenter: {
      handler() {
        this.map.setCenter(this.mapCenter);
      }
    }
    // route: {
    //   handler() {
    //     this.directionsRenderer();
    //   }
    // }
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


