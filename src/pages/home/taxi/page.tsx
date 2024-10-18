import {
  Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField, Tooltip, Typography, Autocomplete,
  Skeleton,
} from "@mui/material";
import { Delete, Info, Edit, Save, Cancel } from '@mui/icons-material';
import TopSellingProduct from "components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useTaxiDELETE, useTaxiGET, useTaxiPUT } from "./hooks/hook";
import { useDriverAllGET } from "../Drivers/hooks/driversGET";
import logo from 'assets/logo/elegant-logo.png';
import Image from "components/base/Image";

function TaxiAll() {
  const { data: apiData, isLoading, isError, refetch } = useTaxiGET();
  const { data: driverData, isLoading: isDriversLoading, isError: isDriversError } = useDriverAllGET();
  const { mutate: deleteTaxi } = useTaxiDELETE();
  const { mutate: updateTaxi } = useTaxiPUT();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTaxi, setSelectedTaxi] = useState<any>(null);
  const [errors, setErrors] = useState({ car_name: '', lamp_number: '', driver_id: '', plate_number: '' });

  const data = Array.isArray(apiData?.data) ? apiData.data : [];
  const drivers = Array.isArray(driverData?.data) ? driverData.data : [];

  const validateFields = () => {
    let valid = true;
    const newErrors = { car_name: '', lamp_number: '', driver_id: '', plate_number: '' };

    if (!selectedTaxi?.car_name) {
      newErrors.car_name = 'Car name is required.';
      valid = false;
    }
    if (!selectedTaxi?.lamp_number) {
      newErrors.lamp_number = 'Lamp number is required.';
      valid = false;
    }
    if (!selectedTaxi?.driver_id) {
      newErrors.driver_id = 'Driver selection is required.';
      valid = false;
    }
    if (!selectedTaxi?.plate_number) {
      newErrors.plate_number = 'Plate number is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleDetails = (row: any) => {
    setSelectedTaxi(row);
    setOpen(true);
    setEditMode(false);
  };

  const handleDelete = (row: any) => {
    deleteTaxi(row.id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Error deleting Taxi:', error);
      },
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSaveEdit = () => {
    if (!validateFields()) return;

    updateTaxi(selectedTaxi, {
      onSuccess: () => {
        refetch();
        setOpen(false);
      },
      onError: (error) => {
        console.error('Error updating Taxi:', error);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTaxi({
      ...selectedTaxi,
      [e.target.name]: e.target.value,
    });
  };

  const handleDriverChange = ( newValue: any) => {
    setSelectedTaxi({
      ...selectedTaxi,
      driver_id: newValue ? newValue.driver_id : null,
      driverName: newValue ? newValue.name : '',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      renderCell: (params) => (
        <span>#{params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1}</span>
      ),
    },
    {
      field: 'car_name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body1" color="text.primary">
          {params.row.car_name || 'Unknown'}
        </Typography>),
    },
    {
      field: 'driverAvatar',
      headerName: 'Avatar',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Tooltip title={params.row.driverAvatar} placement="top" arrow enterDelay={0} leaveDelay={0}>
          <Avatar src={`http://https://tawsella.online/api${params.row.driverAvatar}`} alt={params.row.driverAvatar} />
        </Tooltip>),
    },
    { field: 'lamp_number', headerName: 'Lamp Number', width: 150 },
    { field: 'driverName', headerName: 'Driver Name', width: 150 },
    { field: 'plate_number', headerName: 'Plate Number', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            aria-label="details"
            onClick={() => handleDetails(params.row)}
          >
            <Info />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => handleDelete(params.row)}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];
  if (isLoading || isDriversLoading) return <><Skeleton variant="rounded" width={'96%'} height={'90%'} /></>;
  if (isError || isDriversError) return <p>Error loading data</p>;


  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
      <TopSellingProduct
        columns={columns}
        rows={data}
        title="Data Taxi"
        searchPlaceholder="Search Taxi..."
        pageSizeOptions={[5, 10, 20]}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Taxi Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={7}>
              <Stack spacing={2}>
                <TextField
                  label="Car Name"
                  name="car_name"
                  value={selectedTaxi?.car_name || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(errors.car_name)}
                  helperText={errors.car_name}
                  disabled={!editMode}
                />
                <TextField
                  label="Lamp Number"
                  name="lamp_number"
                  value={selectedTaxi?.lamp_number || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(errors.lamp_number)}
                  helperText={errors.lamp_number}
                  disabled={!editMode}
                />
                <Autocomplete
                  options={drivers}
                  getOptionLabel={(option) => option.name || ''}
                  value={drivers.find((d) => d.driver_id === selectedTaxi?.driver_id) || null}
                  onChange={handleDriverChange}
                  disabled={!editMode}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Driver"
                      fullWidth
                      error={Boolean(errors.driver_id)}
                      helperText={errors.driver_id}
                    />
                  )}
                  size="small"
                />
                <TextField
                  label="Plate Number"
                  name="plate_number"
                  value={selectedTaxi?.plate_number || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(errors.plate_number)}
                  helperText={errors.plate_number}
                  disabled={!editMode}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={5} md={5} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Image src={logo} width="75%" sx={{ mt: { xs: 2, sm: 6, md: 6 } }} />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={handleCancelEdit} startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} startIcon={<Save />} color="primary">
                Save
              </Button>
            </>
          ) : (
            <IconButton onClick={handleEdit} color="primary">
              <Edit />
            </IconButton>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TaxiAll;
