import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useRef } from 'react';
import defaultTheme from './Theme';

const defaultOptions = {
  panControl: false,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickzoom: false,
  fullscreenControl: false,
  styles: defaultTheme(),
};

export default function GoogleMapBlock({ lat, lng }: any) {
  const center = {
    lat: lat,
    lng: lng,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
  });
  const mapRef = useRef(undefined);
  const onLoad = useCallback(function callback(map: any) {
    mapRef.current = undefined;
  }, []);
  const onUnmount = useCallback(function callback(map: any) {
    mapRef.current = map;
  }, []);
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          id="google-map"
          onLoad={onLoad}
          // onUnmount={onUnmount}
          mapContainerClassName={'rounded-b-lg w-full h-1/2'}
          center={center}
          zoom={11}
          options={defaultOptions}>
          <MarkerF position={center} />
        </GoogleMap>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
