/* import { useEffect, useRef, useState } from "react";
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
 */
import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import Pusher from 'pusher-js';
import Cookies from 'universal-cookie';
import { Skeleton } from "@mui/material";

const cookies = new Cookies();

interface DriverData {
    driver_id: string; 
    lat: number;
    lng: number;
    path?: { latitude: number, longitude: number }[];
}

const MapAllDrivers = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [realTimeData, setRealTimeData] = useState<DriverData[]>([]);
    const user = cookies.get('userData');
    const googleMapsApiKey = "AIzaSyCz7MVXwh_VtjqnPh5auan0QCVwVce2JX0";

    window.Pusher = Pusher;

    useEffect(() => {
        const userId = user?.id;
        if (!userId) return;

        const pusher = new Pusher('769b65d85da71dd4cdff', {
            cluster: 'eu',
        });

        const channel = pusher.subscribe(`TaxiLocation.${userId}`);

        channel.bind('TaxiLocation', (event: any) => {
            const newDriverData: DriverData = {
                driver_id: event.driver_id,
                lat: event.lat,
                lng: event.long, // تعديل: استخدام lng بدلاً من long
                path: event.path || [], // تعديل: التأكد من وجود المسار في البيانات
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
        });

        return () => {
            pusher.unsubscribe(`TaxiLocation.${userId}`);
        };
    }, [user?.id]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
    });

    const mapCenter = { lat: 34.8021, lng: 38.9968 }; // تعديل: المركز الافتراضي على سوريا
    const mapZoom = 7; // تكبير افتراضي على سوريا
    const mapRef = useRef<google.maps.Map | null>(null);
    const boundsRef = useRef<google.maps.LatLngBounds | null>(null);

    useEffect(() => {
        if (mapRef.current && realTimeData.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            realTimeData.forEach(driver => {
                bounds.extend(new window.google.maps.LatLng(driver.lat, driver.lng));
            });

            if (realTimeData.length === 1) {
                mapRef.current.setCenter({ lat: realTimeData[0].lat, lng: realTimeData[0].lng });
                mapRef.current.setZoom(14); // تكبير أكبر عندما يكون هناك سائق واحد فقط
            } else {
                mapRef.current.fitBounds(bounds); // تكبير تلقائي لاحتواء جميع السائقين
            }
        }
    }, [realTimeData]);

    if (!isLoaded) return <Skeleton variant="rounded" width={'100%'} height={'100%'} />;

    return (
        <>
            {showAlert && <div className="alert">New driver data received!</div>}
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "80vh" }}
                center={mapCenter}
                zoom={mapZoom}
                onLoad={(map) => {
                    mapRef.current = map;
                    boundsRef.current = new window.google.maps.LatLngBounds();
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

                {/* عرض المسار إذا كان أكثر من نقطة واحدة */}
                {realTimeData.map((driver) => (
                    driver.path && driver.path.length > 1 && (
                        <Polyline
                            key={driver.driver_id}
                            path={driver.path.map(p => ({ lat: p.latitude, lng: p.longitude }))}
                            options={{
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
                            }}
                        />
                    )
                ))}
            </GoogleMap>
        </>
    );
};

export default MapAllDrivers;
