import { useEffect } from 'react';
import Echo from 'laravel-echo';
//import Pusher from 'pusher-js';

function NotificationsTest() {
    const userId = '2c680d5b-2570-451c-acf1-fe66bbdc44e0';

    useEffect(() => {
        // Create an instance of Echo
        const echo = new Echo({
            broadcaster: 'reverb',
           // client: Pusher,
            key: process.env.VITE_REVERB_APP_KEY,
          //  cluster: 'your-pusher-cluster', // Replace with your actual Pusher cluster
           // encrypted: true,
            host: `${process.env.VITE_REVERB_SCHEME}://${process.env.VITE_REVERB_HOST}:${process.env.VITE_REVERB_PORT}`,
        });

        // Subscribe to the notification channel
        const channel = echo.private(`Notification-to-user-id-${userId}`);
        channel.listen('.Notifications', (event: any) => {
            console.log('Notification received:', event);
            // Handle the notification data here
        });

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            channel.stopListening('.Notifications');
        };
    }, [userId]);

    return null; // Or return some JSX if you want to render something
}

export default NotificationsTest;
