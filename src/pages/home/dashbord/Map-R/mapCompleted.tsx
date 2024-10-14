import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { MovementDTO, path } from "pages/home/hooks/type";
interface MapPathProps {
    orderData: MovementDTO | null; 
}

const MapPathCompleted = ({ orderData }: MapPathProps) => {
    const googleMapsApiKey = "AIzaSyCz7MVXwh_VtjqnPh5auan0QCVwVce2JX0";

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
    });

    const mapCenter = { lat: 24.7136, lng: 46.6753 };
    const mapZoom = 10;
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

   

    const pathPoints = orderData?.path ? orderData.path.map((point: path) => ({
        lat: point.latitude,
        lng: point.longitude
    })) : [];

    const origin = pathPoints.length > 0 ? pathPoints[0] : null;
    const destination = pathPoints.length > 0 ? pathPoints[pathPoints.length - 1] : null;

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
                    waypoints: pathPoints.slice(1, -1).map((point) => ({ location: point })) || []
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
    }, [isLoaded, origin, destination, pathPoints, directionsResponse]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            center={origin || mapCenter}
            zoom={mapZoom}
            onLoad={(map) => {
                mapRef.current = map;
            }}
        >
            {origin && <Marker position={origin} title="Start Location" />}
            {destination && <Marker position={destination} title="End Location" />}

            {directionsResponse ? (
                <DirectionsRenderer directions={directionsResponse} />
            ) : (
                pathPoints.length === 0 && <div>No path available for this order.</div>
            )}
        </GoogleMap>
    );
};

export default MapPathCompleted;
