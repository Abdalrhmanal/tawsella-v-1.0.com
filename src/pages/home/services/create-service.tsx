import React, { useState } from 'react';
import { useMovementTypePOST } from './hooks/useMovementTypePOST';
import {
  TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, Grid, Snackbar, Alert, Box, Typography, SelectChangeEvent
} from '@mui/material';

type FormData = {
  type: string;
  price: number;
  description: string;
  is_onKM: boolean;
  payment: string;
  is_general: boolean;
};

const CreateService: React.FC = () => {
  const movementTypePost = useMovementTypePOST();
  const [formData, setFormData] = useState<FormData>({
    type: '',
    price: 0,
    description: '',
    is_onKM: false,
    payment: '',
    is_general: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.type.trim()) newErrors.type = 'Type is required.';
    if (formData.price <= 0) newErrors.price = 'Price must be a positive number.';
    if (!formData.payment) newErrors.payment = 'Payment type is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      movementTypePost.mutate(formData, { 
        onSuccess: () => {
          setSnackbarOpen(true);
          setFormData({
            type: '',
            price: 0,
            description: '',
            is_onKM: false,
            payment: '',
            is_general: false,
          });
          setErrors({});
        },
        onError: (error) => {
          console.error("Error adding movement type:", error);
        },
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Add New Movement Type
          </Typography>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.type}
                  helperText={errors.type}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  error={!!errors.price}
                  helperText={errors.price}
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter a brief description of the movement type."
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_onKM}
                      onChange={handleCheckboxChange}
                      name="is_onKM"
                    />
                  }
                  label="Is based on KM"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_general}
                      onChange={handleCheckboxChange}
                      name="is_general"
                    />
                  }
                  label="Is General"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  label="Payment"
                  name="payment"
                  value={formData.payment}
                  onChange={handleSelectChange}
                  fullWidth
                  required
                  displayEmpty
                  error={!!errors.payment}
                >
                  <MenuItem value="" disabled>
                    Select Payment Type
                  </MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="TL">TL</MenuItem>
                </Select>
                {errors.payment && <Typography color="error">{errors.payment}</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Add Movement Type
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Movement Type added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateService;
