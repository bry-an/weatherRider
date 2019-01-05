<template>
  <div>
    <v-form>
      <v-text-field v-model="originInput" label="Origin" ref="origin" placeholder="Enter origin"/>
      <v-text-field
        v-model="destinationInput"
        label="Destination"
        ref="destination"
        placeholder="Enter destination"
      />
    </v-form>
    <v-btn @click="directionsService">Get Directions</v-btn>

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
        const placeObject = autocomplete.getPlace();
        const place = {
          lat: placeObject.geometry.location.lat(),
          lng: placeObject.geometry.location.lng()
        };
        if (ref === this.$refs.origin) {
          this.origin = place;
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



