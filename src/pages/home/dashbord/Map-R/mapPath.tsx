/* import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
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


const MapPath = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [realTimeData, setRealTimeData] = useState<{ lat: number; lng: number }[]>([]);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
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
                const newPoint = { lat: event.lat, lng: event.long };
                setRealTimeData((prevData) => [...prevData, newPoint]);

                if (realTimeData.length > 1) {  
                    calculateRoute(realTimeData[0], newPoint);  
                }
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

    // Function to calculate route between two points
    const calculateRoute = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions: ${status}`);
                }
            }
        );
    };

    useEffect(() => {
        if (isLoaded && realTimeData.length > 0) {
            mapRef.current?.panTo(realTimeData[realTimeData.length - 1]);
        }
    }, [isLoaded, realTimeData]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>
        {showAlert && <div className="alert">New data received!</div>}
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            center={realTimeData.length > 0 ? realTimeData[0] : mapCenter}
            zoom={mapZoom}
            onLoad={(map) => {
                mapRef.current = map;
            }}
        >
            {realTimeData.length > 0 && (
                <>
                    <Marker position={realTimeData[0]} title="Start Location" />
                    <Marker position={realTimeData[realTimeData.length - 1]} title="Current Location" />
                </>
            )}

            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                        },
                    }}
                />
            )}
        </GoogleMap>
   </> );
};

export default MapPath;
 */


import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import Pusher from 'pusher-js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const MapPath = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [realTimeData, setRealTimeData] = useState<{ lat: number; lng: number }[]>([]);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const user = cookies.get('userData');
    const googleMapsApiKey = "AIzaSyCz7MVXwh_VtjqnPh5auan0QCVwVce2JX0";

    window.Pusher = Pusher;

    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;

        const pusher = new Pusher('769b65d85da71dd4cdff', {
            cluster: 'eu',
        });

        // الاستماع إلى الأحداث في القناة TaxiLocation مع Pusher
        const channel = pusher.subscribe(`TaxiLocation.${userId}`);

        channel.bind('TaxiLocation', (event: any) => {
            const newPoint = { lat: event.lat, lng: event.long };
            setRealTimeData((prevData) => [...prevData, newPoint]);

            // إذا كان لدينا نقطتين أو أكثر، نحسب المسار بين أول وآخر نقطة
            if (realTimeData.length > 1) {  
                calculateRoute(realTimeData[0], newPoint);  
            }

            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
            console.log('event: ', event);
        });

        return () => {
            pusher.unsubscribe(`TaxiLocation.${userId}`);
        };
    }, [user?.id]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
    });

    // المركز الافتراضي على سوريا
    const mapCenter = { lat: 34.8021, lng: 38.9968 }; // سوريا
    const mapZoom = 7; // تكبير مناسب لسوريا
    const mapRef = useRef<google.maps.Map | null>(null);

    // Function to calculate route between two points
    const calculateRoute = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                } else {
                    console.error(`error fetching directions: ${status}`);
                }
            }
        );
    };

    useEffect(() => {
        if (isLoaded && realTimeData.length > 0) {
            mapRef.current?.panTo(realTimeData[realTimeData.length - 1]);
        }
    }, [isLoaded, realTimeData]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>
        {showAlert && <div className="alert">New data received!</div>}
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            center={realTimeData.length > 0 ? realTimeData[0] : mapCenter} // التركيز على سوريا أولاً
            zoom={realTimeData.length > 0 ? 14 : mapZoom} // تكبير السائقين إذا كانت البيانات موجودة
            onLoad={(map) => {
                mapRef.current = map;
            }}
        >
            {realTimeData.length > 0 && (
                <>
                    <Marker position={realTimeData[0]} title="Start Location" />
                    <Marker position={realTimeData[realTimeData.length - 1]} title="Current Location" />
                </>
            )}

            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                        },
                    }}
                />
            )}
        </GoogleMap>
   </> );
};

export default MapPath;
