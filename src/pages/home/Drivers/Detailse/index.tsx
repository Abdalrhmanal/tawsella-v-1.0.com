import React, { useState } from "react";
import { Avatar, Box, Button, DialogActions, DialogContent, Grid, Stack, TextField, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { jsPDF } from "jspdf";
import { useDriverPUT } from "../hooks/driverPOST";

function Detailse({ selectedDriver, handleClose }: { selectedDriver: any; handleClose: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [driverData, setDriverData] = useState(selectedDriver || {});
  const { mutate: updateDriver } = useDriverPUT();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverData({
      ...driverData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateDriver({ driver_id: driverData.driver_id, ...driverData });
    setIsEditing(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Driver Details", 105, 20, { align: "center" });

    doc.setFontSize(12);
    if (driverData) {
      doc.text(`Driver ID: ${driverData.driver_id}`, 20, 40);
      doc.text(`Name: ${driverData.name || 'N/A'}`, 20, 50);
      doc.text(`Gender: ${driverData.gender}`, 20, 60);
      doc.text(`Email: ${driverData.email}`, 20, 70);
      doc.text(`Phone: ${driverData.phone_number || 'N/A'}`, 20, 80);
      doc.text(`Plate Number: ${driverData.plate_number || 'N/A'}`, 20, 90);
      doc.text(`Driver State: ${driverData.driver_state}`, 20, 100);
    }

    doc.save("driver-details.pdf");
  };

  return (
    <>
      <DialogContent sx={{ p: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              src={driverData.avatar ? `http://127.0.0.1:8000${driverData.avatar}` : "/default-avatar.png"}
              alt={driverData.name || "Driver Avatar"}
              sx={{ width: 100, height: 100 }}
            />
            {isEditing && (
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Upload New Image
                <input type="file" hidden />
              </Button>
            )}
          </Box>
          <Typography variant="h5" color="text.primary" textAlign="center">
            Driver Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Driver ID"
                name="driver_id"
                value={driverData.driver_id || 'N/A'}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                value={driverData.name || ''}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gender"
                name="gender"
                value={driverData.gender || ''}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={driverData.email || ''}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                value={driverData.phone_number || 'N/A'}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Plate Number"
                name="plate_number"
                value={driverData.plate_number || 'N/A'}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Driver State"
                name="driver_state"
                value={driverData.driver_state || ''}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <Button onClick={handleSave} color="secondary" variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
        <Button onClick={handleExportPDF} color="secondary" variant="contained">
          Export PDF
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </>
  );
}

export default Detailse;
