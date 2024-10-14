import React, { useState } from 'react';
import {
    TextField, Button, Grid, Snackbar, Alert, Box, Typography, Select, MenuItem, CircularProgress, SelectChangeEvent,
} from '@mui/material';
import { useTaxiPOST } from './hooks/hook';
import { useDriverAllGET } from '../Drivers/hooks/driversGET';

function CreateTaxi() {
    const taxiPost = useTaxiPOST(); // هوك لإضافة التاكسي
    const { data: driversData, isLoading: isDriversLoading, error: driversError } = useDriverAllGET(); // هوك لجلب السائقين
    const [formData, setFormData] = useState({
        driver_id: '',        
        car_name: '',         
        lamp_number: '',      
        plate_number: '',     
        car_details: '',      
    });
    const [errors, setErrors] = useState({
        driver_id: '',
        car_name: '',
        lamp_number: '',
        plate_number: '',
        car_details: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // التعامل مع التغييرات في الحقول النصية (TextField)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // التعامل مع التغييرات في Select (اختيار السائق)
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        setFormData({ ...formData, driver_id: value });
    };

    // دالة الفلديشن
    const validateFields = () => {
        const newErrors = {
            driver_id: formData.driver_id ? '' : 'Driver is required.',
            car_name: formData.car_name ? '' : 'Car name is required.',
            lamp_number: formData.lamp_number ? '' : 'Lamp number is required.',
            plate_number: formData.plate_number ? '' : 'Plate number is required.',
            car_details: formData.car_details ? '' : 'Car details are required.',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== ''); // يتحقق إذا كانت جميع الحقول صالحة
    };

    // إرسال البيانات عند الضغط على الزر
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateFields()) {
            taxiPost.mutate(formData, {
                onSuccess: () => {
                    setSnackbarOpen(true); // عرض رسالة نجاح
                    // إعادة تعيين الفورم بعد الإرسال الناجح
                    setFormData({
                        driver_id: '',
                        car_name: '',
                        lamp_number: '',
                        plate_number: '',
                        car_details: '',
                    });
                },
                onError: (error) => {
                    console.error("Error adding taxi:", error);
                },
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // تصفية السائقين الذين لا يملكون سيارات
    const availableDrivers = driversData?.data?.filter((driver) => driver?.has_taxi === false);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Add New Taxi
            </Typography>

            {/* إذا كان هناك تحميل أو خطأ في جلب السائقين */}
            {isDriversLoading ? (
                <CircularProgress />
            ) : driversError ? (
                <Alert severity="error">Failed to load drivers</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* اختيار السائق */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Select
                                label="Driver"
                                name="driver_id"
                                value={formData.driver_id}
                                onChange={handleSelectChange} // دالة التغيير لـ Select
                                fullWidth
                                required
                                size='small'
                                error={!!errors.driver_id}
                            >
                                <MenuItem value="" disabled>
                                    Select Driver
                                </MenuItem>
                                {/* عرض السائقين الذين لا يملكون سيارات */}
                                {availableDrivers?.map((driver) => (
                                    <MenuItem key={driver?.driver_id} value={driver?.driver_id}>
                                        {driver.name} - {driver.email}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.driver_id && <Typography color="error">{errors.driver_id}</Typography>}
                        </Grid>

                        {/* اسم السيارة */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                label="Car Name"
                                name="car_name"
                                value={formData.car_name}
                                onChange={handleInputChange} // دالة التغيير لـ TextField
                                fullWidth
                                required
                                error={!!errors.car_name}
                                helperText={errors.car_name}
                            />
                        </Grid>

                        {/* رقم اللمبة */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                label="Lamp Number"
                                name="lamp_number"
                                value={formData.lamp_number}
                                onChange={handleInputChange} // دالة التغيير لـ TextField
                                fullWidth
                                required
                                error={!!errors.lamp_number}
                                helperText={errors.lamp_number}
                            />
                        </Grid>

                        {/* لوحة الأرقام */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                                label="Plate Number"
                                name="plate_number"
                                value={formData.plate_number}
                                onChange={handleInputChange} // دالة التغيير لـ TextField
                                fullWidth
                                required
                                error={!!errors.plate_number}
                                helperText={errors.plate_number}
                            />
                        </Grid>

                        {/* تفاصيل السيارة */}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <TextField
                                label="Car Details"
                                name="car_details"
                                value={formData.car_details}
                                onChange={handleInputChange} // دالة التغيير لـ TextField
                                fullWidth
                                multiline
                                rows={4}
                                required
                                error={!!errors.car_details}
                                helperText={errors.car_details}
                            />
                        </Grid>

                        {/* زر الإرسال */}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Taxi
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}

            {/* Snackbar لعرض رسالة النجاح */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Taxi added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CreateTaxi;
