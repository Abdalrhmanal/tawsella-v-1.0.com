import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Alert,
  Grid,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDriverPOST } from '../hooks/driverPOST';

// Define error type
interface FormErrors {
  name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  password_confirmation?: string;
}

const CreateDriver = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    gender: 'male',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isLoading, isError, isSuccess } = useDriverPOST();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Validate form fields
  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
    if (!formData.phone_number || !/^\d{10,15}$/.test(formData.phone_number)) newErrors.phone_number = 'Valid phone number is required (10-15 digits).';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      mutate(formData);
    }
  };

  // Handle showing messages for success or error
  useEffect(() => {
    if (isSuccess || isError) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSuccess, isError]);

  // Render helper text based on error
  const renderHelperText = (field: keyof FormErrors) => errors[field] || '';

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>Add New Driver</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={renderHelperText('email')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            error={!!errors.name}
            helperText={renderHelperText('name')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={renderHelperText('password')}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phone_number}
            helperText={renderHelperText('phone_number')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirm Password"
            name="password_confirmation"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.password_confirmation}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password_confirmation}
            helperText={renderHelperText('password_confirmation')}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Submitting...' : 'Add Driver'}
      </Button>
      {showMessage && (
        <Box sx={{ mt: 2 }}>
          {isSuccess && <Alert severity="success">Driver added successfully.</Alert>}
          {isError && <Alert severity="error">Error adding driver.</Alert>}
        </Box>
      )}
    </Box>
  );
};

export default CreateDriver;
