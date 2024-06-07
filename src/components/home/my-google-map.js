import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { memo, useCallback, useState } from "react";
import { geocodeByAddress } from "../widgets/geocoder";

const containerStyle = {
  width: "300px",
  height: "300px",
};

const MyGoogleMap = ({ address }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
  });

  const [center, setCenter] = useState();

  const onLoad = useCallback(
    function callback(map) {
      geocodeByAddress(address).then((latLng) => setCenter(latLng));
    },
    [address],
  );

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle}
center={center}
zoom={10}
onLoad={onLoad}>
      <MarkerF position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(MyGoogleMap);
