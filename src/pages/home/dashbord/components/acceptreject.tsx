import { useState } from 'react';
import { Button, Modal, TextField, Autocomplete, Alert, Box, Skeleton } from '@mui/material';
import { useAcceptPOST, useRejectPOST } from 'pages/home/hooks/hookd';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDriverAllGET } from 'pages/home/Drivers/hooks/driversGET';

const AcceptReject = () => {
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [rejectMessage, setRejectMessage] = useState('');
    const [selectedDriver, setSelectedDriver] = useState<{ id: string; name: string } | null>(null);
    const [isAccepted, setIsAccepted] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [searchParams] = useSearchParams();
    const requestId = searchParams.get('requestId') || '';
    const navigate = useNavigate();

    const { data: apiData, isLoading, isError } = useDriverAllGET();
    const { mutate: rejectRequest } = useRejectPOST({ id: requestId });
    const { mutate: acceptRequest } = useAcceptPOST({ id: requestId });

    if (!requestId) {
        return null;
    }

    const activeDrivers = Array.isArray(apiData?.data)
        ? apiData.data.filter((driver: any) => driver.is_active === 1 && driver.driver_state === 'Ready').map((driver: any) => ({
            id: driver.driver_id,
            name: driver.name,
        }))
        : [];

    const handleReject = () => {
        setOpenRejectModal(true);
    };

    const handleCloseRejectModal = () => {
        setOpenRejectModal(false);
    };

    const handleConfirmReject = () => {
        rejectRequest({ message: rejectMessage }, {
            onSuccess: () => {
                navigate('/');
            }
        });
        setOpenRejectModal(false);
    };

    const handleAccept = () => {
        setIsAccepted(true);
    };

    const handleConfirmAccept = () => {
        if (selectedDriver) {
            acceptRequest({ driver_id: selectedDriver.id }, {
                onSuccess: () => {
                    setShowSuccessAlert(true);
                    navigate('/');
                }
            });
        }
    };

    if (isLoading) {
        return <Skeleton variant="rounded" width={'100%'} height={'100%'} />;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {showSuccessAlert && (
                <Alert severity="success" sx={{ mb: 2, width: '100%' }}>Request accepted successfully!</Alert>
            )}

            {isError && (
                <Alert severity="error" sx={{ mb: 2, width: '100%' }}>Error loading data</Alert>
            )}

            {!isAccepted && (
                <Box display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" color="success" onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button variant="contained" color="error" onClick={handleReject}>
                        Reject
                    </Button>
                </Box>
            )}

            {isAccepted && (
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                    <Autocomplete
                        size="small"
                        options={activeDrivers}
                        getOptionLabel={(option: { name: string }) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select a driver" />}
                        onChange={(_, newValue) => setSelectedDriver(newValue as { id: string; name: string; } | null)}
                    />
                    <Button variant="contained" color="primary" onClick={handleConfirmAccept}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => setIsAccepted(false)}>
                        Cancel
                    </Button>
                </Box>
            )}

            <Modal open={openRejectModal} onClose={handleCloseRejectModal}>
                <Box sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    margin: '100px auto',
                    width: '400px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    boxShadow: 24
                }}>
                    <h3>Warning</h3>
                    <p>You will not be able to undo this action. Please provide a reason for rejection:</p>
                    <TextField
                        label="Rejection Reason"
                        fullWidth
                        value={rejectMessage}
                        onChange={(e) => setRejectMessage(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button variant="contained" color="error" onClick={handleConfirmReject}>
                            Confirm Rejection
                        </Button>
                        <Button variant="contained" onClick={handleCloseRejectModal}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AcceptReject;
