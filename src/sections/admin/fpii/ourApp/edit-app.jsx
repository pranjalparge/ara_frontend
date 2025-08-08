import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAppMutation, useEditAppMutation } from 'src/redux/slices/admin/menu';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Input } from '@mui/material'; // For file upload input
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'; // For radio buttons
import { Typography } from '@mui/material';
import { toast } from 'src/components/snackbar';

const EditApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [getAppDetails, { data, isLoading, error }] = useGetAppMutation();
  const [editApp, { isLoading: isUpdating, error: updateError }] = useEditAppMutation();

  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    heading2: '',
    content2: '',
    heading3: '',
    keyFeatures: [],
    summary: '',
    heading_starColor: '',
    contentColor: '',
    store: [],
    image: '',
    // autImage: '',
    hide: 0, // 0 is for visible, 1 is for hidden
  });

  const [fileInputs, setFileInputs] = useState({
    image: null,
  });


  useEffect(() => {
    if (id) {
      getAppDetails({ id });
    }
  }, [id]);

  useEffect(() => {
    console.log('Fetched app data:', data); // Debugging step
    if (data && Array.isArray(data)) {
      const selectedApp = data.find((app) => app._id === id); // Search by _id
      if (selectedApp) {
        setFormData({
          heading: selectedApp.heading || '',
          content: selectedApp.content || '',
          heading2: selectedApp.heading2 || '',
          content2: selectedApp.content2 || '',
          heading3: selectedApp.heading3 || '',
          keyFeatures: selectedApp.keyFeatures || [],
          summary: selectedApp.summary || '',
          heading_starColor: selectedApp.heading_starColor || '',
          contentColor: selectedApp.contentColor || '',
          store: selectedApp.store || [],
          image: selectedApp.image || '',
          // autImage: selectedApp.autImage || '', // If this exists in the data
          hide: selectedApp.hide || 0,
        });
      } else {
        console.log('App with the given ID not found.');
      }
    }
  }, [data, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFileInputs({
      ...fileInputs,
      [name]: files[0],
    });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const formDataToSend = new FormData();

     // Append basic fields
     formDataToSend.append('id', id);
     formDataToSend.append('heading', formData.heading);
     formDataToSend.append('content', formData.content);
     formDataToSend.append('heading2', formData.heading2);
     formDataToSend.append('content2', formData.content2);
     formDataToSend.append('heading3', formData.heading3);
     formDataToSend.append('summary', formData.summary);
     formDataToSend.append('heading_starColor', formData.heading_starColor);
     formDataToSend.append('contentColor', formData.contentColor);
     formDataToSend.append('hide', formData.hide);

     // Append keyFeatures
     formData.keyFeatures.forEach((feature, index) => {
       formDataToSend.append(`keyFeatures[${index}][heading]`, feature.heading);
       formDataToSend.append(`keyFeatures[${index}][content]`, feature.content);
       formDataToSend.append(`keyFeatures[${index}][stars]`, feature.stars);
     });

     // Append store
     formData.store.forEach((storeItem, index) => {
       formDataToSend.append(`store[${index}][heading]`, storeItem.heading);
       formDataToSend.append(`store[${index}][content]`, storeItem.content);
       formDataToSend.append(`store[${index}][image]`, storeItem.image);
     });

     // Append images if selected
     if (fileInputs.image) {
       formDataToSend.append('image', fileInputs.image);
     }

     // Log the FormData content to check the structure
     for (let [key, value] of formDataToSend.entries()) {
       console.log(key, value);
     }

     // Send the request
     await editApp(formDataToSend).unwrap();
     toast.success('App Updated Successfully');
     navigate(`/admin/admin/list-our-app`);
   } catch (error) {
     console.error('Failed to update app:', error);
     toast.error(error?.data?.message || 'Failed to update app');
   }
 };


  return (
    <Container maxWidth="md">
      <h2>Edit App</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && data && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Heading 2"
            name="heading2"
            value={formData.heading2}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Content 2"
            name="content2"
            value={formData.content2}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Heading 3"
            name="heading3"
            value={formData.heading3}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Heading Star Color"
            name="heading_starColor"
            value={formData.heading_starColor}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Content Color"
            name="contentColor"
            value={formData.contentColor}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />

          {/* Key Features (Dynamically create fields if needed) */}
          {formData.keyFeatures.map((feature, index) => (
            <Box key={index} sx={{ marginBottom: '16px' }}>
              <TextField
                label={`Key Feature ${index + 1} Heading`}
                name={`keyFeature${index}Heading`}
                value={feature.heading}
                onChange={(e) => {
                  const updatedKeyFeatures = [...formData.keyFeatures];
                  updatedKeyFeatures[index].heading = e.target.value;
                  setFormData({ ...formData, keyFeatures: updatedKeyFeatures });
                }}
                fullWidth
                sx={{ marginBottom: '8px' }}
              />
              <TextField
                label={`Key Feature ${index + 1} Content`}
                name={`keyFeature${index}Content`}
                value={feature.content}
                onChange={(e) => {
                  const updatedKeyFeatures = [...formData.keyFeatures];
                  updatedKeyFeatures[index].content = e.target.value;
                  setFormData({ ...formData, keyFeatures: updatedKeyFeatures });
                }}
                fullWidth
                sx={{ marginBottom: '8px' }}
              />
              <TextField
                label={`Key Feature ${index + 1} Stars`}
                name={`keyFeature${index}Stars`}
                value={feature.stars}
                onChange={(e) => {
                  const updatedKeyFeatures = [...formData.keyFeatures];
                  updatedKeyFeatures[index].stars = e.target.value;
                  setFormData({ ...formData, keyFeatures: updatedKeyFeatures });
                }}
                fullWidth
                sx={{ marginBottom: '8px' }}
              />
            </Box>
          ))}

          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          {/* <Input
            type="file"
            name="autImage"
            onChange={handleFileChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          /> */}

          <Typography>App Status on Website</Typography>
          <RadioGroup
            name="hide"
            value={formData.hide}
            onChange={handleChange}
            row
            sx={{ marginBottom: '16px' }}
          >
            <FormControlLabel value={0} control={<Radio />} label="Visible" />
            <FormControlLabel value={1} control={<Radio />} label="Hidden" />
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update App'}
            </Button>
            <Button onClick={() => navigate(`/admin/admin/list-our-app`)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default EditApp;
