export default {
    directionsService({ commit }, payload) {
        const google = window.google
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: payload.origin,
                destination: payload.destination,
                travelMode: "BICYCLING"
            },
            (response, status) => {
                if (status === "OK") {
                    commit("setRoute", response);
                }
            })
    }
}