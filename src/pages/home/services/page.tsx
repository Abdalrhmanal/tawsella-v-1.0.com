import React, { useState } from 'react';
import { useMovementTypeDELETE, useMovementTypeGET } from './hooks/useMovementTypeGET'; // استيراد هوك التعديل
import { Movement, MovementType } from './type';
import {
  Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert, DialogContentText,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMovementTypePUT } from './hooks/useMovementTypePOST';

const ServicesAll: React.FC = () => {
  const { data, isLoading, error, refetch } = useMovementTypeGET();
  const deleteMovementType = useMovementTypeDELETE();
  const updateMovementType = useMovementTypePUT(); // هوك التعديل

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // لإدارة فتح نافذة التعديل
  const [selectedMovementType, setSelectedMovementType] = useState<MovementType | null>(null); // لتحديد الحركة التي سيتم تعديلها
  const [formData, setFormData] = useState({
    type: '',
    price: 0,
    description: '',
    payment: '',
    is_general: true,
    is_onKM: false
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMovementType.mutate({ id: selectedId }, {
        onSuccess: () => {
          setSnackbarOpen(true);
          handleCloseDeleteDialog();
          refetch();
        }
      });
    }
  };

  // فتح نافذة التعديل وتعبئة البيانات
  const handleOpenEditDialog = (movementType: MovementType) => {
    setSelectedMovementType(movementType);
    setFormData({
      type: movementType.type,
      price: movementType.price,
      description: movementType.description || '',
      payment: movementType.payment,
      is_general: !!movementType.is_general,  // تحويل العدد أو null إلى boolean
      is_onKM: !!movementType.is_onKM,        // تحويل العدد أو null إلى boolean
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedMovementType(null);
  };

  // التعامل مع التعديل في الحقول النصية
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // التعامل مع التعديل في Checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // التعامل مع التعديل في Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إرسال البيانات المعدلة عند النقر على "Save"
  const handleSaveEdit = () => {
    if (selectedMovementType) {
      updateMovementType.mutate(
        {
          ...selectedMovementType,
          ...formData,
        },
        {
          onSuccess: () => {
            setSnackbarOpen(true);
            handleCloseEditDialog();
            refetch(); // إعادة جلب البيانات لتحديث القائمة بعد التعديل
          },
        }
      );
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Movement Types
      </Typography>
      <Grid container spacing={4}>
        {data?.data?.movementTypes.map((movementType: MovementType) => (
          <Grid item key={movementType.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/image-File.png"
                  alt={movementType.type}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movementType.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movementType.description ?? 'No description available'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  {movementType.price || 'no price'} {movementType.payment || ''}
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEditDialog(movementType)} // فتح نافذة التعديل عند النقر
                >
                  <EditNoteIcon />
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenDeleteDialog(movementType.id)}
                >
                  <DeleteOutlineIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
        Movements
      </Typography>
      <Grid container spacing={4}>
        {data?.data?.movements.map((movement: Movement) => (
          <Grid item key={movement.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images.png"
                  alt={movement.type}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movement.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movement.description ?? 'No description available'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  {movement.price || 'no price'} {movement.payment || ''}
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEditDialog(movement)} // فتح نافذة التعديل عند النقر
                >
                  <EditNoteIcon />
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOpenDeleteDialog(movement.id)}
                >
                  <DeleteOutlineIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this movement? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* نافذة تعديل البيانات */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Movement Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_onKM}
                onChange={handleCheckboxChange}
                name="is_onKM"
              />
            }
            label="Is on KM"
          />
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
          <Select
            label="Payment"
            name="payment"
            value={formData.payment}
            onChange={handleSelectChange} // استخدم دالة التغيير الصحيحة هنا
            fullWidth
            margin="dense" // تعديل `margin` ليصبح متوافقاً مع MUI
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="TL">TL</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Action completed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ServicesAll;
