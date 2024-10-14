import { useState } from "react";
import { Box, Typography, Tabs, Tab, Grid, Stack, Skeleton } from "@mui/material";
import { MovementDTO } from "pages/home/hooks/type";
import { useMovementCompletedGET, useMovementCurrentGET } from "pages/home/orders/hooks/hooks";
import MapPath from "../dashbord/Map-R/mapPath";
import MapPathCompleted from "../dashbord/Map-R/mapCompleted";
import MapAllDrivers from "../dashbord/Map-Driver/mapalldrivers";

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

function OrdersAll() {
  const [currentTab, setCurrentTab] = useState(0);
  const { data: currentOrders, isLoading: isCurrentLoading } = useMovementCurrentGET();
  const { data: completedOrders, isLoading: isCompletedLoading } = useMovementCompletedGET();
  const [selectedOrder, setSelectedOrder] = useState<MovementDTO | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setSelectedOrder(null);
  };

  const handleRequestClick = (request: MovementDTO) => {
    setSelectedOrder(request);
  };

  const displayedOrders = currentTab === 0 && currentOrders?.data
    ? currentOrders.data
    : currentTab === 1 && completedOrders?.data
      ? completedOrders.data
      : [];

  const isLoading = currentTab === 0 ? isCurrentLoading : isCompletedLoading;

  return (
    <Grid container spacing={1} columns={12}>
      <Grid item xs={4} md={4}>
        <Box sx={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "10px", height: "80vh" }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered variant="fullWidth" sx={{ width: '100%' }}>
            <Tab label="Live" sx={{
              backgroundColor: "#fff4ea",
              color: "#000000",
              padding: "10px",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              mb: 1,
              m: 1,
              flexGrow: 1
            }} />
            <Tab label="Completed" sx={{
              backgroundColor: "#fff4ea",
              color: "#000000",
              padding: "10px",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              mb: 1,
              m: 1,
              flexGrow: 1
            }} />
          </Tabs>

          <Box sx={{ p: 0.6 }}>
            {isLoading ? (
              <Skeleton variant="rounded" width={'250'} height={'75px'} sx={{m:1}}/>
            ) : Array.isArray(displayedOrders) ? (
              displayedOrders.map((request: MovementDTO, index: number) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: selectedOrder === request ? "#e0f7fa" : "#fff4ea",
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
                          {formatTimeToTurkeyTime((request as MovementDTO & { time?: string })?.time)}
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
              ))
            ) : null}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8} md={8}>
        {currentTab === 0 && selectedOrder && (
          <MapPath  />
        )}
        {currentTab === 1 && selectedOrder && (
          <MapPathCompleted orderData={selectedOrder} />
        )}
        {!selectedOrder && (
          <MapAllDrivers /> 
        )}
      </Grid>
    </Grid>
  );
}

export default OrdersAll;
