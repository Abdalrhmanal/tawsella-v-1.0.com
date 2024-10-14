import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress, Alert, Grid, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import { useOfferPOST } from './hooks/useOfferPOST';
import { useMovementTypeGET } from '../services/hooks/useMovementTypeGET';

const CreateOffer = () => {
  const [formData, setFormData] = useState({
    movement_type_id: '', 
    offer: '',
    value_of_discount: 0,
    valid_date: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    movement_type_id: '',
    offer: '',
    value_of_discount: '',
    valid_date: '',
    description: '',
  });

  const { mutate: addOffer, isLoading, isSuccess } = useOfferPOST();
  const { data, isLoading: isMovementLoading, error: movementError } = useMovementTypeGET();
  const movements = data?.data?.movements || []; 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      movement_type_id: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { movement_type_id: '', offer: '', value_of_discount: '', valid_date: '', description: '' };

    if (!formData.movement_type_id) {
      newErrors.movement_type_id = 'Movement type is required';
      isValid = false;
    }
    if (!formData.offer) {
      newErrors.offer = 'Offer is required';
      isValid = false;
    }
    if (formData.value_of_discount <= 0) {
      newErrors.value_of_discount = 'Value of discount must be greater than 0';
      isValid = false;
    }
    if (!formData.valid_date) {
      newErrors.valid_date = 'Valid date is required';
      isValid = false;
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addOffer(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto', padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}> Add New Offers </Typography>
      {isMovementLoading ? (
        <CircularProgress />
      ) : movementError ? (
        <Alert severity="error">Failed to load movements</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              label="Select Movement"
              name="movement_type_id"
              value={formData.movement_type_id}
              onChange={handleSelectChange} 
              fullWidth
              required
              error={Boolean(errors.movement_type_id)}
              displayEmpty
              renderValue={(selected) => selected || "Select Movement"}
            >
              <MenuItem value="" disabled>Select Movement</MenuItem>
              {movements.map((movement) => (
                <MenuItem key={movement.id} value={movement.id}>
                  {movement.type}
                </MenuItem>
              ))}
            </Select>
            {errors.movement_type_id && <Typography color="error">{errors.movement_type_id}</Typography>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Offer"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              required
              error={Boolean(errors.offer)}
              helperText={errors.offer}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Value of Discount"
              name="value_of_discount"
              value={formData.value_of_discount}
              onChange={handleChange}
              type="number"
              required
              error={Boolean(errors.value_of_discount)}
              helperText={errors.value_of_discount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Valid Date"
              name="valid_date"
              value={formData.valid_date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              error={Boolean(errors.valid_date)}
              helperText={errors.valid_date}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
          </Grid>
        </Grid>
      )}

      {isSuccess && <Alert severity="success" sx={{ mt: 2 }}>تم إضافة العرض بنجاح!</Alert>}

      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} /> : 'إضافة العرض'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateOffer;
