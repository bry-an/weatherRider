<template>
  <v-container>
    <auto-complete @comp-display-route="computeAndDisplayRoute()"/>
    <v-layout row>
      <v-flex xs8>
        <div id="google-map" ref="map"></div>
      </v-flex>
      <v-flex xs4>
        <div id="directions-panel" ref="directionsPanel">
          <template v-if="route">
            <directions-panel/>
            <route-editor @remove-leg="removeLeg" @clear-map="clearMap"/>
          </template>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DirectionsPanel from "./DirectionsPanel";
import RouteEditor from "./RouteEditor";
import AutoComplete from "@/components/AutoComplete";

import store from "@/store";
const google = window.google;
import { mapGetters } from "vuex";
export default {
  name: "GoogleMap",
  components: { DirectionsPanel, RouteEditor, AutoComplete },
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
    ...mapGetters({
      mapCenter: "getMapCenter",
      route: "getRoute",
      clickedPoint: "getClickedPoint",
      previousRoute: "getPreviousRoute",
      steps: "getSteps"
    }),
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
    }
  },
  methods: {
    computeAndDisplayRoute() {
      store
        .dispatch("directionsService", {
          origin: this.legOrigin,
          destination: clickedPoint
        })
        .then(() => {
          this.directionsRenderer();
          this.legOrigin = this.legDestination;
        });
    },
    initMap() {
      const mapRef = this.$refs.map;
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
      store.dispatch("directionsRenderer", {
        directionsDisplay: this.directionsDisplay,
        map: this.map,
        route: this.route
      });
    },
    removeLeg() {
      store.commit("removeLeg");
      if (!this.previousRoute) {
        console.log("!this.previousRoute");
        this.clearMap();
      } else {
        store.dispatch("removeLeg", this.previousRoute).then(() => {
          store.dispatch("directionsRenderer", {
            directionsDisplay: this.directionsDisplay,
            map: this.map,
            route: this.route
          });
        });
      }
    },
    clearMap() {
      store.dispatch("directionsRenderer", {
        directionsDisplay: this.directionsDisplay,
        map: this.map
      });
      store.commit("emptyRouteStack");
      store.commit("clearRoute");
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
    width: 100%
    margin: auto
    border-radius: 5px

#directions-panel
  border-radius: 5px
  margin-left: 3px
</style>


