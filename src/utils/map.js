export function calculateDistance(location1, location2) {
  const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
    location1,
    location2,
  );

  // Convert the distance from meters to miles.
  const distanceInMiles = distance / 1609.34;
  return distanceInMiles;
}
