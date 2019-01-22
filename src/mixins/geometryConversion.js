export default {
  methods: {
    metersToMiles(meters) {
      return meters / 1609.344;
    },
    metersToFeet(meters) {
      return meters * 3.28084;
    },
    secondsToMinutes(seconds) {
      return seconds / 60;
    }
  }
};
