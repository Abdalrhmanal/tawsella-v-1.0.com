import { Avatar, Box, Typography, Stack, Skeleton, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import TopSellingProduct from "components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct";
import { useCalculationsGET, useCalculationsDELETE, useCalculationsPOST } from "./hooks/hook";
import { Delete, MonetizationOn } from '@mui/icons-material';
import { useState } from "react";

function Calculations() {
    const { data, isLoading, isError, refetch } = useCalculationsGET();
    const { mutate: deleteCalculation } = useCalculationsDELETE();
    const { mutate: postCalculation } = useCalculationsPOST();
    
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<any>(null);

    if (isLoading) return <Skeleton variant="rounded" width={'96%'} height={'90%'} />;
    if (isError) return <p>Error loading driver calculations</p>;

    // تسطيح البيانات وجعلها قائمة من العناصر
    const driverData = data?.data.flat() || [];

    // تعريف أعمدة الجدول
    const columns: GridColDef[] = [
        {
            field: 'driver_id',
            headerName: 'ID',
            flex: 1,
            renderCell: (params) => (
                <span>#{params.api.getRowIndexRelativeToVisibleRows(params.row.driver_id) + 1}</span>
            ),
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            flex: 1,
            renderCell: (params) => (
                <Tooltip title={params.row.name || 'Unknown'} placement="top" arrow enterDelay={0} leaveDelay={0}>
                    <Avatar src={`http://127.0.0.1:8000${params.row.avatar}`} alt={params.row.name || "No name"} />
                </Tooltip>
            ),
        },
        {
            field: 'name',
            headerName: 'Driver Name',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="body1" color="text.primary">
                    {params.row.name || 'Unknown'}
                </Typography>
            ),
        },
        {
            field: 'plate_number',
            headerName: 'Plate Number',
            flex: 1,
            renderCell: (params) => params.row.plate_number || 'N/A'
        },
        {
            field: 'today_account',
            headerName: "Today's Account",
            flex: 1,
            renderCell: (params) => `$${params.row.today_account.toFixed(2)}`
        },
        {
            field: 'all_account',
            headerName: 'Total Account',
            flex: 1,
            renderCell: (params) => `$${params.row.all_account.toFixed(2)}`
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(params.row)}>
                        <Delete />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handlePaymentClick(params.row)}>
                        <MonetizationOn />
                    </IconButton>
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    // عند النقر على زر الحذف، افتح نافذة التأكيد
    const handleDeleteClick = (row: any) => {
        setSelectedDriver(row);
        setOpenDeleteDialog(true);
    };

    // تنفيذ عملية الحذف بعد تأكيد المستخدم
    const confirmDelete = () => {
        if (selectedDriver) {
            deleteCalculation(selectedDriver, {
                onSuccess: () => {
                    refetch();
                    setOpenDeleteDialog(false);
                }
            });
        }
    };

    // عند النقر على زر الدفع، افتح نافذة التأكيد للدفع
    const handlePaymentClick = (row: any) => {
        setSelectedDriver(row);
        setOpenPaymentDialog(true);
    };

    // تنفيذ عملية الدفع بعد التأكيد
    const confirmPayment = () => {
        if (selectedDriver) {
            postCalculation(selectedDriver, {
                onSuccess: () => {
                    refetch();
                    setOpenPaymentDialog(false);
                }
            });
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
            <TopSellingProduct
                columns={columns}
                rows={driverData}
                title="Driver Calculations"
                searchPlaceholder="Search Drivers..."
                pageSizeOptions={[5, 10, 20]}
            />

            {/* نافذة تأكيد الحذف */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete calculations for {selectedDriver?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* نافذة تأكيد الدفع */}
            <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
                <DialogTitle>Confirm Payment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with the payment for {selectedDriver?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPaymentDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmPayment} color="primary">Confirm Payment</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Calculations;
