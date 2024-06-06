import { calculateDistance } from "src/utils";

export const geocodeByPlaceID = (placeId) => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(
          new Error(
            `Geocoding query for a place with an ID of '${placeId}' failed - response status: ${status}`,
          ),
        );

        return;
      }

      resolve(results);
    });
  });
};

export const geocodeByAddress = (address) => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(
          new Error(
            `Geocoding query for a place with an addr of '${address}' failed - response status: ${status}`,
          ),
        );

        return;
      }

      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();

      console.log("{ lat, lng }", { lat, lng });

      // Return the latitude and longitude coordinates.
      return resolve({ lat, lng });
    });
  });
};

export const calculateDistanceByRoute = (startValue, endValue) => {
  const distanceService = new window.google.maps.DistanceMatrixService();

  return new Promise((resolve, reject) => {
    distanceService
      .getDistanceMatrix({
        origins: [startValue],
        destinations: [endValue],
        travelMode: "DRIVING",
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      })
      .then((response) => {
        if (response.rows.length > 0) {
          const distance = response.rows[0].elements[0]?.distance?.value ?? 0;
          resolve(distance * 0.000621371);
        } else {
          resolve(calculateDistance(startValue, endValue));
        }
      })
      .catch((e) => reject(e));
  });
};
