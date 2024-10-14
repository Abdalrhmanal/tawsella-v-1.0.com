import React, { useState } from 'react';
import { useAboutusGET, useAboutusPUT, useAboutusDELETE, useAboutusPOST } from './hooks/hooks';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { AboutusRecord, AdditionalInfo } from './hooks/hooks'; // استيراد الأنواع الصحيحة

function About() {
    const { data, isLoading, isError, refetch } = useAboutusGET(); // جلب البيانات
    const { mutate: updateAboutus } = useAboutusPUT(); // هوك التحديث
    const { mutate: deleteAboutus } = useAboutusDELETE(); // هوك الحذف
    const { mutate: addAboutus } = useAboutusPOST(); // هوك الإضافة

    // حالات التحكم في الحقول والمربعات
    const [open, setOpen] = useState(false);
    const [editedData, setEditedData] = useState<AboutusRecord | null>(null);
    const [newRecord, setNewRecord] = useState({ title: '', description: '', complaints_number: '' });
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (record: AboutusRecord) => {
        setEditedData(record);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        deleteAboutus(id, {
            onSuccess: () => refetch(),
            onError: (error) => console.error('Error deleting Aboutus:', error),
        });
    };

    const handleSaveEdit = () => {
        if (!editedData || !editedData.id) {
            console.error('Edited data is null or undefined.');
            return;
        }
        const sanitizedData = {
            ...editedData,
            image: editedData.image === null ? undefined : editedData.image,
        };
        updateAboutus(sanitizedData, {
            onSuccess: () => {
                refetch();
                setOpen(false);
            },
            onError: (error) => console.error('Error updating Aboutus:', error),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData({
            ...editedData!,
            [e.target.name]: e.target.value,
        });
    };

    const handleNewRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecord({
            ...newRecord,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = () => {
        setOpen(false);
        setEditedData(null);
    };

    const handleAddNewRecord = () => {
        if (!newRecord.title || !newRecord.description || !newRecord.complaints_number) {
            console.error('Please fill in all fields for the new record.');
            return;
        }
        // استدعاء هوك الإضافة لإرسال الطلب إلى الـ API
        addAboutus(newRecord, {
            onSuccess: () => {
                refetch(); // تحديث البيانات بعد الإضافة الناجحة
                setIsAdding(false); // إغلاق الحقول
                setNewRecord({ title: '', description: '', complaints_number: '' }); // إعادة تعيين البيانات
            },
            onError: (error) => console.error('Error adding new Aboutus record:', error),
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {data?.aboutUsRecords && data.aboutUsRecords.length > 0 ? (
                        data.aboutUsRecords.map((record: AboutusRecord) => (
                            <Card key={record.id} sx={{ mb: 2, width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5">{record.title}</Typography>
                                    <Typography variant="body1">{record.description}</Typography>
                                    <Typography variant="body2">Complaints Number: {record.complaints_number}</Typography>
                                    <Button
                                        onClick={() => handleEdit(record)}
                                        startIcon={<Edit />}
                                        color="primary"
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(record.id)}
                                        startIcon={<Delete />}
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1">No records found.</Typography>
                    )}

                    <hr />
                    {data?.additional_info && data.additional_info.length > 0 ? (
                        data.additional_info.map((record_in: AdditionalInfo) => (
                            <Card key={record_in.id} sx={{ mb: 2, width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5">{record_in.title}</Typography>
                                    <Typography variant="body1">{record_in.description}</Typography>
                                    <Button
                                        onClick={() => handleEdit(record_in as AboutusRecord)}
                                        startIcon={<Edit />}
                                        color="primary"
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(record_in.id)}
                                        startIcon={<Delete />}
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1">No additional information found.</Typography>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setIsAdding(!isAdding)} 
                        sx={{ mb: 2 }}
                    >
                        {isAdding ? 'Cancel' : 'Add New Record'}
                    </Button>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <TextField
                                label="Title"
                                name="title"
                                value={newRecord.title}
                                onChange={handleNewRecordChange}
                                fullWidth
                                disabled={!isAdding}
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={newRecord.description}
                                onChange={handleNewRecordChange}
                                fullWidth
                                multiline
                                rows={4}
                                disabled={!isAdding}
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                label="Complaints Number"
                                name="complaints_number"
                                value={newRecord.complaints_number}
                                onChange={handleNewRecordChange}
                                fullWidth
                                disabled={!isAdding}
                                sx={{ mb: 1 }}
                            />
                            <Button onClick={handleAddNewRecord} variant="contained" color="primary" disabled={!isAdding}>
                                Add Record
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit About Us</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        value={editedData?.title || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={editedData?.description || ''}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Complaints Number"
                        name="complaints_number"
                        value={editedData?.complaints_number || ''}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<Cancel />}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} startIcon={<Save />} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default About;
