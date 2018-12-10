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

    <!-- <button @click="setOrigin">Set origin</button> -->
  </div>
</template>
<script>
export default {
  name: "AutoComplete",
  data() {
    return {
      originInput: "",
      destinationInput: "",
      place: null,
      google: window.google
    };
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
        console.log(placeObject);
        this.place = placeObject.geometry.location;
        this.$store.commit("setMapCenter", {
          lat: this.place.lat(),
          lng: this.place.lng()
        });
      });
    },
    setOrigin() {
      this.$store.commit("setOrigin", this.place);
    },
    log() {
      console.log("placeinput in component", this.placeInput);
    }
  },
  mounted() {
    this.autoComplete(this.$refs.origin);
    this.autoComplete(this.$refs.destination);
  }
};
</script>



