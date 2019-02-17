export default {
  calculateElevationGain(elevations) {
    let diff = 0;
    elevations.forEach((elevation, index) => {
      if (index > 0) {
        const stepDiff = elevation - elevations[index - 1];
        if (stepDiff > 0) {
          diff += stepDiff;
        }
      }
    });
    return diff;
  }
};
