export default {
  directionsService({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const google = window.google;
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: payload.origin,
          destination: payload.destination,
          travelMode: "BICYCLING"
        },
        (response, status) => {
          if (status === "OK") {
            resolve(response);
            commit("addLeg", response);
          } else reject();
        }
      );
    });
  }
};
