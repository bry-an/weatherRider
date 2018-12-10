<script>
export default {
  name: "DirectionsService",
  data() {
    return {
      start: null,
      end: null
    };
  },
  methods: {
    directionsService() {
      const google = this.$store.getters.getGoogleObject;
      const directionsService = new google.maps.DirectionsService();
    }
  }
};
</script>
