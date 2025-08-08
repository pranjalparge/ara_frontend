import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography, Input } from '@mui/material';
import { useGetBrandMutation, useEditBrandMutation } from 'src/redux/slices/admin/menu';
import { toast } from 'src/components/snackbar';


const EditBrand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = new URLSearchParams(location.search).get('id');

  const [getBrand, { data, isLoading, error }] = useGetBrandMutation();
  const [editBrand, { isLoading: isUpdating, error: updateError }] = useEditBrandMutation();

  const [formData, setFormData] = useState({
    heading: '',
    headingColor: '',
    subheading1: '',
    subcontent1: '',
    subheading2: '',
    subheading3: '',
    subcontent3: '',
    subheadingColor: '',
    urlContent: '',
    redirectUrl: '',
    image: '',
    ratings: [],
    hide: 0, // 0 is for visible, 1 is for hidden
  });
  const [fileInputs, setFileInputs] = useState({
      image: null,
    });

  const [loading, setLoading] = useState(true);
  const [existingImage, setExistingImage] = useState('');

   useEffect(() => {
     if (brandId) {
       getBrand({ brandId });
     }
   }, [brandId]);

  // Fetch and prefill brand data
  useEffect(() => {
    console.log('Fetched app data:', data); // Debugging step
    if (data && Array.isArray(data)) {
      const selectedApp = data.find((app) => app._id === brandId); // Search by _id
      if (selectedApp) {
        setFormData({
          heading: selectedApp.heading || '',
          content: selectedApp.content || '',
          subheading1: selectedApp.subheading1 || '',
          subcontent1: selectedApp.subcontent1 || '',
          subheading2: selectedApp.subheading2 || '',
          subcontent3: selectedApp.subcontent3 || '',
          subheading3: selectedApp.subheading3 || '',
          ratings: selectedApp.ratings || [],
          summary: selectedApp.summary || '',
          headingColor: selectedApp.headingColor || '',
          subheadingColor: selectedApp.subheadingColor || '',
          urlContent: selectedApp.urlContent || '',
          redirectUrl: selectedApp.redirectUrl || '',
          image: selectedApp.image || '',
          hide: selectedApp.hide || 0,
        });
      } else {
        console.log('App with the given ID not found.');
      }
    }
  }, [data, brandId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedRatings = [...formData.ratings];
    updatedRatings[index][field] = value;
    setFormData((prev) => ({ ...prev, ratings: updatedRatings }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append('id', brandId);
      fd.append('heading', formData.heading);
      fd.append('headingColor', formData.headingColor);
      fd.append('subheading1', formData.subheading1);
      fd.append('subcontent1', formData.subcontent1);
      fd.append('subheading2', formData.subheading2);
      fd.append('subheading3', formData.subheading3);
      fd.append('subcontent3', formData.subcontent3);
      fd.append('subheadingColor', formData.subheadingColor);
      fd.append('redirectUrl', formData.redirectUrl);
      fd.append('urlContent', formData.urlContent);

      if (fileInputs.image) {
        fd.append('image', fileInputs.image);
      }

      formData.ratings.forEach((feature, index) => {
        fd.append(`ratings[${index}][heading]`, feature.heading);
        fd.append(`ratings[${index}][content]`, feature.content);
        fd.append(`ratings[${index}][rating]`, feature.rating);
      });

      await editBrand(fd).unwrap();
      toast.success('App Updated Successfully');
      navigate(`/admin/admin/list-our-brand`);
    } catch (error) {
      console.error('Failed to update app:', error);
      toast.error(error?.data?.message || 'Failed to update app');
    }
  };

  // if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Brand
      </Typography>

      {/* Form Fields */}
      {[
        'heading',
        'headingColor',
        'subheading1',
        'subcontent1',
        'subheading2',
        'subheading3',
        'subcontent3',
        'subheadingColor',
        'redirectUrl',
        'urlContent',
      ].map((field) => (
        <TextField
          key={field}
          label={field.replace(/([A-Z])/g, ' $1')}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
      ))}

      {/* Image Upload & Preview */}
      {existingImage && (
        <Box sx={{ mb: 2 }}>
          <Typography>Existing Image:</Typography>
          <img src={existingImage} alt="Brand" width="150" />
        </Box>
      )}
      <Input type="file" name="image" onChange={handleChange} sx={{ mb: 2 }} fullWidth />

      {/* Ratings (Features) */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Key Features
      </Typography>
      {formData.ratings.map((feature, index) => (
        <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mb: 2, borderRadius: 1 }}>
          <TextField
            label="Feature Heading"
            value={feature.heading}
            onChange={(e) => handleFeatureChange(index, 'heading', e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Feature Content"
            value={feature.content}
            onChange={(e) => handleFeatureChange(index, 'content', e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Rating"
            type="number"
            inputProps={{ min: 0, max: 5 }}
            value={feature.rating}
            onChange={(e) => handleFeatureChange(index, 'rating', parseInt(e.target.value))}
            fullWidth
          />
        </Box>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditBrand;
