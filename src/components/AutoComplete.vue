<template>
  <div>
    <input v-model="originInput" label="Origin" ref="origin" placeholder="Enter origin">
    <input
      v-model="destinationInput"
      label="Destination"
      ref="destination"
      placeholder="Enter destination"
    >
    <v-btn @click="$emit('comp-display-route')">Get Directions</v-btn>
  </div>
</template>
<script>
export default {
  name: "AutoComplete",
  components: {},
  data() {
    return {
      originInput: "",
      destinationInput: "",
      google: window.google
    };
  },
  computed: {
    origin: {
      get() {
        return this.$store.getters.getOrigin;
      },
      set(newVal) {
        this.$store.commit("setOrigin", newVal);
      }
    },
    legOrigin: {
      get() {
        return this.$store.getters["getLegOrigin"];
      },
      set(newVal) {
        this.$store.commit("setLegOrigin", newVal);
      }
    },
    destination: {
      get() {
        return this.$store.getters.getLegDestination;
      },
      set(newVal) {
        this.$store.commit("setLegDestination", newVal);
      }
    }
  },
  methods: {
    autoComplete(ref) {
      const googleMaps = this.google.maps;
      const autocomplete = new googleMaps.places.Autocomplete(ref);
      autocomplete.setFields(["geometry"]);
      const infowindow = new this.google.maps.InfoWindow();
      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        const placeObject = autocomplete.getPlace();
        const place = {
          lat: placeObject.geometry.location.lat(),
          lng: placeObject.geometry.location.lng()
        };
        if (ref === this.$refs.origin) {
          this.origin = place;
          this.legOrigin = place;

          this.$store.commit("setLegOrigin", this.origin);
        } else if (ref === this.$refs.destination) {
          this.destination = place;
        }
        this.$store.commit("setMapCenter", place);
      });
    },
    directionsService() {
      this.$store.dispatch("directionsService", {
        origin: this.origin,
        destination: this.destination
      });
    }
  },
  mounted() {
    this.autoComplete(this.$refs.origin);
    this.autoComplete(this.$refs.destination);
  }
};
</script>



