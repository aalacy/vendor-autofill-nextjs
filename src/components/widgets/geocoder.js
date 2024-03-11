export const geocodeByPlaceID = (placeId) => {
    const geocoder = new window.google.maps.Geocoder()
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ placeId }, (results, status) => {
        if (status !== window.google.maps.GeocoderStatus.OK) {
          reject(
            new Error(
              `Geocoding query for a place with an ID of '${placeId}' failed - response status: ${status}`,
            ),
          )
  
          return
        }
  
        resolve(results)
      })
    })
  }