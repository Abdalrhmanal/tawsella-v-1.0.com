import { ReactElement, useEffect, useState } from 'react';
import { Button, Modal, TextField, Autocomplete, Alert, Box, Grid } from '@mui/material';
import { drawerWidth } from 'layouts/main-layout';
import RouteList from './components/Route';
import { LifeTaxiMovement } from './hooks/type';
import SaleInfoCards from 'components/sections/dashboard/Home/Sales/SaleInfoSection/SaleInfoCards';
import Cookies from 'universal-cookie';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useDashboardGET, useAcceptPOST, useRejectPOST } from './hooks/hookd';
import { useSearchParams } from 'react-router-dom';
import soundFile from './../../../public/sound-file.mp3';
import { useDriverAllGET } from 'pages/home/Drivers/hooks/driversGET';
import Loding from './components/Route/Loding';
import MapCustomat from './dashbord/Map-R/mapCustomat';
import MapAllDrivers from './dashbord/Map-Driver/mapalldrivers';

const cookies = new Cookies();

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: any;
  }
}

const Home = (): ReactElement => {
  const token = cookies.get('authToken');
  const user = cookies.get('userData');
  const { data: DashboardData, isLoading, isError, refetch } = useDashboardGET();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRequestId = searchParams.get("requestId") || '';

  const [realTimeData, setRealTimeData] = useState<LifeTaxiMovement[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'warning' | 'info' | 'success' | 'error'>('info');
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<{ id: string; name: string } | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
  console.log(realTimeData);
  const { data: apiData } = useDriverAllGET();
  const activeDrivers = Array.isArray(apiData?.data)
    ? apiData.data.filter((driver: any) => driver.is_active === 1 && driver.driver_state === 'Ready').map((driver: any) => ({
      id: driver.driver_id,
      name: driver.name,
    }))
    : [];

  const { mutate: rejectRequest } = useRejectPOST({ id: selectedRequestId });
  const { mutate: acceptRequest } = useAcceptPOST({ id: selectedRequestId });

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    window.Echo.private(`Taxi-movement.${userId}`)
      .listen('.requesting-transportation-service', (event: any) => {
        setRealTimeData((prevData) => [...prevData, event]);
        setAlertMessage(event.message || 'Transportation service requested!');
        setAlertSeverity('warning');
        setShowAlert(true);
        const audio = new Audio(soundFile);
        audio.play();
        setTimeout(() => setShowAlert(false), 5000);
      })
      .error((error: Error) => console.error('Error:', error));

    refetch();
    return () => {
      window.Echo.leave(`Taxi-movement.${userId}`);
    };
  }, [user?.id]);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    window.Echo.private(`foundCustomer.${userId}`)
      .listen('.found-customer', (event: any) => {
        setRealTimeData((prevData) => [...prevData, event]);
        setAlertMessage(event.message || 'Customer found!');
        setAlertSeverity('info');
        setShowAlert(true);
        const audio = new Audio(soundFile);
        audio.play();
        setTimeout(() => setShowAlert(false), 5000);
      })
      .error((error: Error) => console.error('Error:', error));

    refetch();
    return () => {
      window.Echo.leave(`foundCustomer.${userId}`);
    };
  }, [user?.id]);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    window.Echo.private(`admin-customer-cancel.${userId}`)
      .listen('.canceledTransportationServiceRequest', (event: any) => {
        setRealTimeData((prevData) => [...prevData, event]);
        setAlertMessage(event.message || 'Transportation service request canceled!');
        setAlertSeverity('error');
        setShowAlert(true);
        const audio = new Audio(soundFile);
        audio.play();
        setTimeout(() => setShowAlert(false), 5000);
      })
      .error((error: Error) => console.error('Error:', error));
    refetch();
    return () => {
      window.Echo.leave(`admin-customer-cancel.${userId}`);
    };
  }, [user?.id]);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const handleReject = () => {
    setOpenRejectModal(true);
  };

  const handleConfirmReject = () => {
    rejectRequest({ message: rejectMessage }, {
      onSuccess: () => {
        setShowAlert(false);
        setOpenRejectModal(false);
        setSearchParams({});
        setIsAccepted(false);
        refetch();
      }
    });
  };

  const handleAccept = () => {
    setIsAccepted(true);
  };

  const handleConfirmAccept = () => {
    if (selectedDriver) {
      acceptRequest({ driver_id: selectedDriver.id }, {
        onSuccess: () => {
          setShowSuccessAlert(true);
          setShowAlert(false);
          setSearchParams({});
          setIsAccepted(false);
          refetch();
        }
      });
    }
  };
  if (isLoading) return <><Loding /></>;
  if (isError) return <p>Error loading data</p>;

  return (
    <Grid container component="main" columns={12} spacing={3.75} flexGrow={1} pt={4.375} pb={0} sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, pl: { xs: 3.75, lg: 0 }, }} >
      {showAlert && (
        <Box sx={{ position: 'fixed', top: 80, right: 20, zIndex: 9999, width: '500px' }}>
          <Alert variant="filled" severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Box>
      )}

      <Grid xs={12} sx={{ p: '10px' }}>
        <SaleInfoCards totalDrivers={DashboardData?.data?.totalDrivers} totalTaxi={DashboardData?.data?.totalTaxi} requests={DashboardData?.data?.requests} />
      </Grid>

      <Grid item xs={4} md={4}>
        <RouteList lifitaxiorder={DashboardData?.data?.lifeTaxiMovements || []} selectedRequestId={selectedRequestId} onRequestSelect={(requestId: string) => setSearchParams({ requestId })} />
      </Grid>

      <Grid item xs={8} md={8}>
        <Grid xs={12}>
          {showSuccessAlert && (
            <Alert severity="success">Request accepted successfully!</Alert>
          )}
          {selectedRequestId && !isAccepted ? (
            <Box>
              <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>
              <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
            </Box>
          ) : (
            isAccepted && (
              <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                  <Autocomplete
                    size="small"
                    options={activeDrivers}
                    getOptionLabel={(option: { name: string }) => option.name}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Select a driver" />}
                    onChange={(_, newValue) => setSelectedDriver(newValue as { id: string; name: string; } | null)}
                  />
                </Grid>
                <Grid item xs={6} display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                  <Button variant="contained" color="primary" onClick={handleConfirmAccept}>Confirm</Button>
                  <Button variant="contained" color="warning" onClick={() => setIsAccepted(false)}>Cancel</Button>
                </Grid>
              </Grid>
            )
          )}

          <Modal open={openRejectModal} onClose={() => setOpenRejectModal(false)}>
            <Box style={{ background: 'white', padding: '20px', margin: '100px auto', width: '400px', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Warning</h3>
              <TextField label="Rejection Reason" fullWidth value={rejectMessage} onChange={(e) => setRejectMessage(e.target.value)} />
              <Button variant="contained" color="error" onClick={handleConfirmReject}>Confirm Rejection</Button>
              <Button variant="contained" onClick={() => setOpenRejectModal(false)}>Cancel</Button>
            </Box>
          </Modal>
        </Grid>

        <Grid xs={12}>
          {selectedRequestId ? (
            <MapCustomat />
          ) : (
            <MapAllDrivers />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
