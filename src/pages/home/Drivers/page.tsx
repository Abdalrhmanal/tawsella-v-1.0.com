import { Avatar, Box, Grid, Link, Stack, Tooltip, Typography, IconButton, Dialog, Skeleton } from "@mui/material";
import { Delete, Info } from '@mui/icons-material';
import TopSellingProduct from "components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct";
import { GridColDef } from "@mui/x-data-grid";
import { useDriverAllGET } from "./hooks/driversGET";
import { useState } from "react";
import { useDriverDELETE } from "./hooks/driverDELETE";
import Detailse from "./Detailse";

function DriversAll() {
  const { data: apiData, isLoading, isError, refetch } = useDriverAllGET();
  const { mutate: deleteDriver } = useDriverDELETE();
  const [open, setOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const data = Array.isArray(apiData?.data) ? apiData.data : [];
  const columnsC: GridColDef[] = [
    {
      field: 'driver_id',
      headerName: 'ID',
      width: 60,
      renderCell: (params) => (
        <span>#{params.api.getRowIndexRelativeToVisibleRows(params.row.driver_id) + 1}</span>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Grid container spacing={2}>
          <Stack direction="row" gap={1.5} component={Link}>
            <Tooltip title={params.row.name} placement="top" arrow enterDelay={0} leaveDelay={0}>
              <Avatar src={`http://https://tawsella.online/api${params.row.avatar}`} alt={params.row.name} />
            </Tooltip>
            <Stack component="div">
              <Typography variant="body1" color="text.primary">
                {params.row.name || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="#000000">
                {params.row.gender || 'N/A'}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      ),
    },
    { field: 'unBring', headerName: 'Points', width: 100 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'phone_number', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    {
      field: 'created_at',
      headerName: 'Joining Date',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.row.created_at);
        const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: 'driver_state',
      headerName: 'Driver State',
      width: 120,
      renderCell: (params) => {
        let backgroundColor = '';
        let color = '';

        switch (params.row.driver_state) {
          case 'Ready':
            backgroundColor = '#E0F7FA';
            color = '#0277BD';
            break;
          case 'InBreak':
            backgroundColor = '#FFF3E0';
            color = '#FB8C00';
            break;
          case 'Reserved':
            backgroundColor = '#E0F2F1';
            color = '#00796B';
            break;
          default:
            backgroundColor = '#EEEEEE';
            color = '#757575';
        }

        return (
          <Box
            sx={{
              backgroundColor,
              color,
              borderRadius: '16px',
              fontWeight: 500,
              textAlign: 'center',
              minWidth: '80px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1, 
            }}
          >
            {params.row.driver_state}
          </Box>
        );
      }
    },


    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
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

  const handleDetails = (row: any) => {
    setSelectedDriver(row);
    setOpen(true);
  };

  const handleDelete = (row: any) => {
    deleteDriver(row, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Error deleting driver:', error);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <><Skeleton variant="rounded" width={'96%'} height={'90%'} /></>;
  if (isError) return <p>Error loading data</p>;

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <TopSellingProduct
        columns={columnsC}
        rows={data}
        title="Data Driver"
        searchPlaceholder="Search Driver..."
        pageSizeOptions={[5, 10, 20]}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Detailse selectedDriver={selectedDriver} handleClose={handleClose} />
      </Dialog>
    </Box>
  );
}

export default DriversAll;
