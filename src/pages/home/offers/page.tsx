import {
  Alert, Box, Card, CardContent, CircularProgress, Typography,
  IconButton, Button, Dialog, DialogContent, DialogTitle, Stack,
  Grid, DialogActions, TextField, Divider
} from '@mui/material';
import { useState } from 'react';
import { useOfferGET } from './hooks/useOfferGET';
import { useOfferDELETE } from './hooks/useOfferDELETE';
import { useOfferPUT } from './hooks/useOfferPUT';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const OffersAll = () => {
  const { data: offersData, isLoading, error } = useOfferGET();
  const { mutate: deleteOffer } = useOfferDELETE();
  const { mutate: updateOffer } = useOfferPUT();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedOffer, setEditedOffer] = useState<Offer | null>(null);

  const handleOpenDialog = (offer: Offer, editMode: boolean = false) => {
    setSelectedOffer(offer);
    setEditedOffer(offer);
    setIsEditMode(editMode);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOffer(null);
    setEditedOffer(null);
    setIsEditMode(false);
  };

  const handleUpdateOffer = () => {
    if (editedOffer) {
      updateOffer(editedOffer, {
        onSuccess: () => {
          handleCloseDialog();
        },
      });
    }
  };

  const handleDelete = (offerId: string) => {
    deleteOffer({ id: offerId }, {
      onSuccess: () => {
        console.log('Offer deleted successfully');
      },
      onError: (error) => {
        console.error('Error deleting offer:', error);
      },
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">An error occurred while loading data!</Alert>
      </Box>
    );
  }

  const offers = offersData ? offersData.data : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => window.location.href = '/offers/o-create'}
      >
        Add New Offer
      </Button>
      <Grid container spacing={2}>

        {offers.length > 0 ? (
          offers.map((offer: Offer) => (
            <Grid item xs={12} sm={6} key={offer.id}>
              <Card sx={{ backgroundColor: '#fff', mb: 2, border: '1px solid #ddd', borderRadius: 2, width: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: '#FFEB3B', mb: 1 }}>
                    {offer.offer}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Description: {offer.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.primary">
                    Discount Value: {offer.value_of_discount}%
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Expiry Date: {offer.valid_date}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Price: {offer.price} SAR
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <IconButton color="primary" onClick={() => handleOpenDialog(offer)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDialog(offer, true)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(offer.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No offers available at the moment.
          </Typography>
        )}
      </Grid>

      {selectedOffer && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {isEditMode ? 'Edit Offer' : 'Offer Details'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Typography variant="h6" sx={{ mt: 2 }}>{selectedOffer.offer}</Typography>
              <Grid container spacing={2} sx={{ mt: 2, width: '100%' }}>
                <Grid item xs={6}>
                  <TextField
                    label="Offer Description"
                    value={editedOffer?.description || ''}
                    onChange={(e) => setEditedOffer({ ...editedOffer!, description: e.target.value })}
                    fullWidth
                    disabled={!isEditMode}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Discount Value"
                    value={editedOffer?.value_of_discount || ''}
                    onChange={(e) => setEditedOffer({ ...editedOffer!, value_of_discount: Number(e.target.value) })}
                    fullWidth
                    disabled={!isEditMode}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Price"
                    value={editedOffer?.price || ''}
                    onChange={(e) => setEditedOffer({ ...editedOffer!, price: Number(e.target.value) })}
                    fullWidth
                    disabled={!isEditMode}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date"
                    value={editedOffer?.valid_date || ''}
                    onChange={(e) => setEditedOffer({ ...editedOffer!, valid_date: e.target.value })}
                    fullWidth
                    disabled={!isEditMode}
                  />
                </Grid>
              </Grid>
              {isEditMode && (
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdateOffer}>
                  Save Changes
                </Button>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default OffersAll;
