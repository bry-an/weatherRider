<template>
  <v-container>
    <auto-complete @comp-display-route="computeAndDisplayRoute()"/>
    <v-layout row>
      <v-flex xs8>
        <div id="google-map" ref="map"></div>
      </v-flex>
      <v-flex xs4>
        <div id="directions-panel">
          <template v-if="route">
            <directions-panel :elevation="elevation"/>
            <route-editor
              @remove-leg="removeLeg"
              @clear-map="clearMap"
              @return-straight="returnStraight"
            />
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
import conversions from "@/mixins/geometryConversion";

import store from "@/store";
const google = window.google;
import { mapGetters } from "vuex";
export default {
  name: "GoogleMap",
  mixins: [conversions],
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
        // polylineOptions: { strokeColor }
      }),
      elevator: new google.maps.ElevationService(),
      elevation: null
    };
  },
  computed: {
    ...mapGetters({
      mapCenter: "getMapCenter",
      route: "getRoute",
      clickedPoint: "getClickedPoint",
      previousRoute: "getPreviousRoute"
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
          destination: this.legDestination
        })
        .then(() => {
          this.directionsRenderer();
        });
    },
    displayLocationElevation(location, elevator) {
      elevator.getElevationForLocations(
        {
          locations: [location]
        },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              this.elevation = this.metersToFeet(results[0].elevation);
            }
          }
        }
      );
    },
    initMap() {
      const mapRef = this.$refs.map;
      const options = {
        zoom: 14,
        center: this.mapCenter,
        mapTypeId: "terrain",
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      };
      this.map = new google.maps.Map(mapRef, options);

      this.map.addListener("click", e => {
        const clickedPoint = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        store.commit("setClickedPoint", clickedPoint);
        if (this.origin) {
          this.legDestination = clickedPoint;
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
    returnStraight() {
      store.commit("setLegDestination", this.origin);
      this.computeAndDisplayRoute();
      store.commit("setLegOrigin", this.origin)
    },
    clearMap() {
      store.dispatch("clearMap", {
        directionsDisplay: this.directionsDisplay,
        map: this.map
      });
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


