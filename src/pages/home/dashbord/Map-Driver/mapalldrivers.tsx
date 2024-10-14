import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: any;
    }
}

interface DriverData {
    driver_id: number;
    lat: number;
    lng: number;
}


const MapAllDrivers = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [realTimeData, setRealTimeData] = useState<DriverData[]>([]);
    const token = cookies.get('authToken');
    const user = cookies.get('userData');
    const googleMapsApiKey = "AIzaSyCz7MVXwh_VtjqnPh5auan0QCVwVce2JX0";

    window.Pusher = Pusher;
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: 'ni31bwqnyb4g9pbkk7sn',
        wsHost: 'localhost',
        wsPort: 8080,
        wssPort: null,
        forceTLS: false,
        enabledTransports: ['ws'],
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;

        window.Echo.private(`TaxiLocation.${userId}`)
            .listen('.TaxiLocation', (event: any) => {
                const newDriverData = {
                    driver_id: event.driver_id,
                    lat: event.lat,
                    lng: event.long,
                };

                setRealTimeData((prevData) => {
                    const existingDriverIndex = prevData.findIndex(driver => driver.driver_id === newDriverData.driver_id);
                    if (existingDriverIndex !== -1) {
                        const updatedData = [...prevData];
                        updatedData[existingDriverIndex] = newDriverData;
                        return updatedData;
                    } else {
                        return [...prevData, newDriverData];
                    }
                });

                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
                console.log('event: ', event);
            })
            .error((error: Error) => console.error('Error:', error));

        return () => {
            window.Echo.leave(`TaxiLocation.${userId}`);
        };
    }, [user?.id]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
    });

    const mapCenter = { lat: 24.7136, lng: 46.6753 };
    const mapZoom = 10;
    const mapRef = useRef<google.maps.Map | null>(null);

    if (!isLoaded) return <div>Loading...</div>;

    return (<>
        {showAlert && <div className="alert">New driver data received!</div>}
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            center={mapCenter}
            zoom={mapZoom}
            onLoad={(map) => {
                mapRef.current = map;
            }}
        >
            {realTimeData.map((driver) => (
                <Marker
                    key={driver.driver_id}
                    position={{ lat: driver.lat, lng: driver.lng }}
                    title={`Driver ${driver.driver_id}`}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    }}
                />
            ))}

            {realTimeData.length > 1 && (
                <Polyline
                    path={realTimeData.map(driver => ({ lat: driver.lat, lng: driver.lng }))}
                    options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                    }}
                />
            )}
        </GoogleMap>
    </>);
};

export default MapAllDrivers;
