export default {
  calculateElevationGain(elevations) {
    let diff = 0;
    elevations.forEach((elevation, index) => {
      if (index > 0) {
        const stepDiff = elevations[index + 1] - elevation > 0;
        if (stepDiff > 0) {
          diff += stepDiff;
        }
      }
      return stepDiff;
    });
  }
};
