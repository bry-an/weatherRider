<template>
  <div>
    <label for="origin">Origin</label>
    <input type="text" ref="origin" v-model="originInput" placeholder="Enter Start Location">
    <label for="destination">Destination</label>
    <input
      type="text"
      ref="destination"
      v-model="destinationInput"
      placeholder="Enter End Location"
    >
    <button @click="directionsService">Get Directions</button>

    <!-- <button @click="setOrigin">Set origin</button> -->
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
    destination: {
      get() {
        return this.$store.getters.get;
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
        let placeObject = autocomplete.getPlace();
        if (ref === this.$refs.origin) {
          this.origin = placeObject.geometry.location;
        } else if (ref === this.$refs.destination) {
          this.destination = placeObject.geometry.location;
        }
        this.place = placeObject.geometry.location;
        this.$store.commit("setMapCenter", {
          lat: this.place.lat(),
          lng: this.place.lng()
        });
      });
    },
    directionsService() {
      this.$store.dispatch("directionsService", {
        origin: this.origin,
        destination: this.destination
      });
    },
    setOrigin() {
      this.$store.commit("setOrigin", this.place);
    }
  },
  mounted() {
    this.autoComplete(this.$refs.origin);
    this.autoComplete(this.$refs.destination);
  }
};
</script>



