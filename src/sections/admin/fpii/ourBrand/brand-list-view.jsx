import {
  Container,
  Typography,
  Grid,
  Button,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Add } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import {
  useGetBrandMutation,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} from 'src/redux/slices/admin/menu';

const BrandListView = () => {
  const [handleGetData, { data }] = useGetBrandMutation();
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation(); // Delete mutation
  const lastIndex = data?.length - 1;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    headingColor: '',
    subheading1: '',
    subcontent1: '',
    subheading2: '', // Added
    subheading3: '',
    subcontent3: '',
    subheadingColor: '',
    urlContent: '',
    redirectUrl: '',
    image: null,
    ratings: [{ heading: '', content: '', rating: 0 }],
  });

  // Handle key feature updates
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.ratings];
    updatedFeatures[index][field] = value;
    setFormData((prev) => ({ ...prev, ratings: updatedFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      ratings: [...prev.ratings, { heading: '', content: '', rating: 0 }],
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.ratings.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ratings: updatedFeatures }));
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append('heading', formData.heading);
      fd.append('headingColor', formData.headingColor);
      fd.append('subheading1', formData.subheading1);
      fd.append('subcontent1', formData.subcontent1);
      fd.append('subheading3', formData.subheading3);
      fd.append('subcontent3', formData.subcontent3);
      fd.append('subheadingColor', formData.subheadingColor);
      fd.append('redirectUrl', formData.redirectUrl);
      fd.append('urlContent', formData.urlContent);
      console.log('Image:', formData.image);
      if (formData.image) {
        fd.append('image', formData.image);
      }
      formData.ratings.forEach((rating, index) => {
        fd.append(`ratings[${index}][heading]`, rating.heading);
        fd.append(`ratings[${index}][content]`, rating.content);
        fd.append(`ratings[${index}][rating]`, rating.rating);
      });
      for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }
      const response = await createBrand(fd);
      console.log('API Response:', response);
      setOpen(false);
      // Optional: refetch the brand list
      handleGetData();
    } catch (err) {
      console.error('Error creating brand:', err);
    }
  };

   const handleDelete = async (id) => {
     try {
       const response = await deleteBrand({id: id}); // Pass the ID directly
       console.log('Delete Response:', response);

       if (response?.data) {
         refetch(); // Refetch data to update the UI
       }
     } catch (err) {
       console.error('Error deleting brand:', err);
     }
   };

    const handleEdit = (id) => {
      navigate(`/admin/admin/edit-brand?id=${id}`);
      console.log('Navigating to edit page with ID:', id);
    };

  return (
    <>
      <Container maxWidth="xxl" sx={{ py: 5, position: 'relative' }}>
        {/* Add New Brand Button */}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Add New Brand
          </Button>
        </Box>

        {/* TOP Section */}
        <Container maxWidth="xxl" sx={{ py: 5 }}>
          {data?.map((item, index) => (
            <>
              <Box
                sx={{
                  border: `1px solid ${item.headingColor}`,
                  my: 5,
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                }}
              >
                {/* Edit Icon Button */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 3,
                  }}
                >
                  <IconButton onClick={() => handleEdit(item._id)}>
                    <Icon icon="mdi:pencil" width={34} height={34} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} sx={{ ml: 1 }}>
                    <Icon icon="mdi:delete" width={34} height={34} color="red" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: '50%',
                    left: { md: '10%', xs: '50%' },
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    zIndex: 2,
                    backgroundColor: '#fff',
                    p: 1,
                    width: 'auto',
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Typography variant="h4" color={item.headingColor}>
                    {item.heading}
                  </Typography>
                </Box>
              </Box>
              <Grid
                container
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                spacing={3}
                sx={{ pb: 5 }}
              >
                <Grid item lg={8}>
                  {' '}
                  <Typography
                    variant="body1"
                    textAlign="left"
                    color={item.subheadingColor}
                    sx={{ mt: 2 }}
                  >
                    {item?.content}
                  </Typography>
                  <Box sx={{ my: 4, textAlign: 'left' }}>
                    <Typography variant="h5" fontWeight={600} color={item.headingColor}>
                      {item.subheading1}
                    </Typography>
                    <Typography variant="body2" maxWidth="md" color={item.subheadingColor}>
                      {item.subcontent1}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={4}>
                  {' '}
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {' '}
                    <img style={{ width: { md: '30%' } }} src={item.image} alt="" />{' '}
                  </Box>{' '}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {item?.ratings?.map((e) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      sx={{
                        border: `1px solid ${item.headingColor}`,
                        boxShadow: 6,
                        borderRadius: 2,
                        textAlign: 'left',
                        p: 1,
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                          {Array.from({ length: e.rating }).map((_, index) => (
                            <Icon
                              key={index}
                              icon="mdi:star"
                              color={item.headingColor}
                              width={20}
                              height={20}
                            />
                          ))}
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color={item.headingColor}
                          sx={{ fontSize: '1rem' }}
                        >
                          {e.heading}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={item.subheadingColor}
                          sx={{ fontSize: '.9rem' }}
                        >
                          {e.content}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Grid
                direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                container
                spacing={3}
                sx={{
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                  my: 1,
                }}
              >
                <Grid item lg={9}>
                  <Box
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    <Typography color={item.headingColor} variant="h6" fontWeight={600}>
                      {item.subheading3}
                    </Typography>
                    <Typography variant="body2" maxWidth="md" color={item.subheadingColor}>
                      {item.subcontent3}
                    </Typography>
                  </Box>
                </Grid>
                {index !== 0 && index !== lastIndex && (
                  <Grid item lg={3}>
                    <Button
                      href={item.redirectUrl}
                      target="_blank"
                      sx={{ border: `1px solid ${item.headingColor}`, p: 3 }}
                    >
                      <Typography color={item.headingColor} variant="subtitle1" fontWeight="bold">
                        {item.urlContent}
                      </Typography>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </>
          ))}
        </Container>

        {/* Dialog for New Brand Form */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Heading Color"
              name="headingColor"
              value={formData.headingColor}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subheading 1"
              name="subheading1"
              value={formData.subheading1}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subcontent 1"
              name="subcontent1"
              value={formData.subcontent1}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subheading 2"
              name="subheading2"
              value={formData.subheading2}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subheading 3"
              name="subheading3"
              value={formData.subheading3}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subcontent 3"
              name="subcontent3"
              value={formData.subcontent3}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Subheading Color"
              name="subheadingColor"
              value={formData.subheadingColor}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Redirect URL"
              name="redirectUrl"
              value={formData.redirectUrl}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="URL Content"
              name="urlContent"
              value={formData.urlContent}
              onChange={handleChange}
              fullWidth
            />
            <Box>
              <Typography variant="h6" gutterBottom>
                Key Features
              </Typography>
              {formData.ratings.map((feature, index) => (
                <Box key={index} sx={{ mb: 2, border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
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
                    label="rating"
                    type="number"
                    inputProps={{ min: 0, max: 5 }}
                    value={feature.rating}
                    onChange={(e) => handleFeatureChange(index, 'rating', parseInt(e.target.value))}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                  <Button color="error" onClick={() => removeFeature(index)}>
                    Remove Feature
                  </Button>
                </Box>
              ))}
              <Button variant="outlined" onClick={addFeature}>
                Add Feature
              </Button>
            </Box>

            <Button variant="outlined" component="label">
              Upload Image
              <input hidden type="file" name="image" onChange={handleChange} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default BrandListView;
