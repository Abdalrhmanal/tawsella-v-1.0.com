import { Grid, Box, Typography, Stack, Tab, Tabs, Skeleton } from "@mui/material";
import { LifeTaxiMovement } from "pages/home/hooks/type";
import { useSearchParams } from "react-router-dom";

const formatTimeToTurkeyTime = (timeString: string | null | undefined): string => {
    if (!timeString) return "Invalid Date";

    const date = new Date(timeString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/Istanbul',
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

interface RouteListProps {
    lifitaxiorder: LifeTaxiMovement[];
    selectedRequestId: string | null;
    onRequestSelect: (requestId: string, startPoint?: any, endPoint?: any) => void;
}

function RouteList({ lifitaxiorder, selectedRequestId, onRequestSelect }: RouteListProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);

    const handleRequestClick = (request: LifeTaxiMovement) => {
        const requestId = 'id' in request ? request.id : '';
        let startPoint, endPoint;

        if ('path' in request && Array.isArray(request.path) && request.path.length > 0) {
            startPoint = request.path[0];
            endPoint = request.path[request.path.length - 1];
        }

        if (requestId) {
            onRequestSelect(requestId, startPoint, endPoint);
            setSearchParams({ requestId });
        }
    };


    return (
        <Box sx={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "10px", height: "80vh" }}>
            <Tabs value={0} centered sx={{ width: '100%' }}>
                <Tab label="New" sx={{
                    backgroundColor: "#fff4ea",
                    color: "#000000",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                    flexGrow: 1
                }} />
            </Tabs>
            <Box sx={{ p: 0.6 }}>
                {Array.isArray(lifitaxiorder) && lifitaxiorder.length > 0 ? (
                    lifitaxiorder.map((request: LifeTaxiMovement, index: number) => {
                        const requestId = 'id' in request ? request.id : '';

                        return (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor:
                                        selectedRequestId === requestId ? "#e0f7fa" : "#fff4ea",
                                    color: "#000000",
                                    p: 1,
                                    borderRadius: "10px",
                                    mt: 1,
                                    cursor: "pointer",
                                }}
                                onClick={() => handleRequestClick(request)}
                            >
                                <Grid container spacing={0} columns={12}>
                                    <Grid item xs={8} md={8}>
                                        <Stack direction="row" gap={1.5}>
                                            <Typography variant="body1" color="text.primary">
                                                {request.customer_name || "un/name"}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {request.gender}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack component="div">
                                            <Typography variant="body2" color="text.secondary">
                                                {request.start_address} to {request.destination_address}
                                                {formatTimeToTurkeyTime(request?.time)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            {request.customer_phone || "000 000 00"}
                                            -- {request.type || "N/A"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        );
                    })
                ) : (<>
                    <Skeleton variant="rounded" width={'250'} height={'75px'} sx={{ m: 1 }} />
                    <Skeleton variant="rounded" width={'250'} height={'75px'} sx={{ m: 1 }} />
                    <Skeleton variant="rounded" width={'250'} height={'75px'} sx={{ m: 1 }} />
                </>)}
            </Box>
        </Box>
    );
}

export default RouteList;
