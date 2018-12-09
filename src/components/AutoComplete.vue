<template>
  <div>
    <input type="text" ref="place" v-model="placeInput" placeholder="Enter Location">
    <button @click="setOrigin">Set origin</button>
  </div>
</template>
<script>
const google = window.google;
export default {
  name: "AutoComplete",
  data() {
    return {
      placeInput: "",
      place: null
    };
  },
  methods: {
    autoComplete() {
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs.place
      );
      autocomplete.setFields(["geometry"]);
      const infowindow = new google.maps.InfoWindow();
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
    }
  },
  mounted() {
    this.autoComplete();
  }
};
</script>



