import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { jsPDF } from "jspdf";
import { useProfileGET, useProfilePOST } from "./hooks/profhook"; // Import hooks

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to handle selected file

  // Use the useProfileGET hook to fetch profile data
  const { data, isLoading, error } = useProfileGET();

  // Use the useProfilePOST hook to update profile data
  const { mutate: updateProfile } = useProfilePOST();

  // Set the fetched profile data into the local state when available
  useEffect(() => {
    if (data && data.data) {
      setProfileData(data.data);
    }
  }, [data]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading profile data</Typography>;

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file change (for image upload)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save (POST request to update profile)
  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("phone_number", profileData.phone_number);

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Admin Profile details", 105, 20, { align: "center" });

    if (profileData) {
      doc.setFontSize(12);
      doc.text(`Name: ${profileData.name}`, 20, 40);
      doc.text(`Email: ${profileData.email}`, 20, 50);
      doc.text(`Phone: ${profileData.phone_number}`, 20, 60);
      doc.text(`Gender: ${profileData.gender === 0 ? "Male" : "Female"}`, 20, 70);
    }

    doc.save("Admin-profile.pdf");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        p: 4,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <DialogContent>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Avatar
              src={profileData?.avatar || ''}
              alt={profileData?.name}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Admin Profile
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={profileData?.name || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={profileData?.email || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone_number"
              value={profileData?.phone_number || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>

          {isEditing && (
            <Grid item xs={12} display="flex" justifyContent="center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outlined" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 3 }}>
        {isEditing ? (
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ mr: 2 }}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            color="primary"
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mr: 2 }}
          >
            Edit Profile
          </Button>
        )}
        <Button
          onClick={handleExportPDF}
          color="secondary"
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
        >
          Export PDF
        </Button>
      </DialogActions>
    </Box>
  );
}

export default Profile;
