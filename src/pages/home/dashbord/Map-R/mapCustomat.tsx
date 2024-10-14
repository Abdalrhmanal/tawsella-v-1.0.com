import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useDashboardDetailseGET } from "pages/home/hooks/hookd";
import { useSearchParams } from "react-router-dom";

const MapCustomat = () => {
  const googleMapsApiKey = "AIzaSyCz7MVXwh_VtjqnPh5auan0QCVwVce2JX0";

  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId') || '';

  const { data: dashDetailse } = useDashboardDetailseGET(
    { id: requestId },
    { enabled: !!requestId }
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const mapCenter = { lat: 24.7136, lng: 46.6753 };
  const mapZoom = 10;

  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const origin = dashDetailse?.data?.start_latitude && dashDetailse?.data?.start_longitude
    ? { lat: dashDetailse.data.start_latitude, lng: dashDetailse.data.start_longitude }
    : null;

 /*  const destination = dashDetailse?.data?.end_latitude && dashDetailse?.data?.end_longitude
    ? { lat: dashDetailse.data.end_latitude, lng: dashDetailse.data.end_longitude }
    : null; */

    const destination = dashDetailse?.data?.start_latitude && dashDetailse?.data?.start_longitude
    ? { lat: dashDetailse.data.start_latitude, lng: dashDetailse.data.start_longitude }
    : null;
  useEffect(() => {
    if (isLoaded && origin) {
      mapRef.current?.panTo(origin);
    }
  }, [isLoaded, origin]);

  useEffect(() => {
    if (isLoaded && origin && destination && !directionsResponse) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result);
          } else {
            console.error("Directions request failed due to ", status);
          }
        }
      );
    }
  }, [isLoaded, origin, destination, directionsResponse]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "75vh" }}
      center={origin || mapCenter}
      zoom={mapZoom}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {/* دبوس نقطة البداية */}
      {origin && (
        <Marker
          position={origin}
          title="Start Location"
          icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png" 
        />
      )}

      {/* دبوس نقطة النهاية */}
      {destination && (
        <Marker
          position={destination}
          title="End Location"
          icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
        />
      )}

      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  );
};

export default MapCustomat;
