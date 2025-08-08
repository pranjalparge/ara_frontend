import { Container, Typography, Grid, Button, CardContent, Box, Card, Paper } from '@mui/material';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useGetAppMutation, useDeleteAppMutation } from 'src/redux/slices/admin/menu';
import { IconButton, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { TextField, FormLabel, Input, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';

export function AppListView() {
  const [handleGetData, { data }] = useGetAppMutation();
  const [deleteApp] = useDeleteAppMutation();
  const lastIndex = data?.length - 1;
  const navigate = useNavigate();
  useEffect(() => {
    handleGetData();
  }, []);

 

  const [open, setopen] = useState(false);
 const [state, setState] = useState({
   heading: '',
   content: '',
   heading2: '',
   content2: '',
   heading3: '',
   summary: '',
   heading_starColor: '',
   contentColor: '',
   store: [],
   keyFeatures: [], // ✅ this should be an array
   hide: 0,
 });


  const [fileInputs, setFileInputs] = useState({
    image: null,
    
  });
  const [isLoading, setIsLoading] = useState(false);

 const handleFileChange = (e) => {
   const { name, files } = e.target;
   const file = files[0];
   const preview = URL.createObjectURL(file);

   const previewKey =
     name === 'image' ? 'bgPreview' : name === 'autImage' ? 'authPreview' : `${name}Preview`;

   setFileInputs((prev) => ({
     ...prev,
     [name]: file,
     [previewKey]: preview,
   }));
 };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // For numeric radio fields like hide, cast to number
    const finalValue = name === 'hide' ? Number(value) : value;

    setState((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };


  const handelClose = () => {
    setopen(false);
    setState({
      heading: '',
      content: '',
      heading2: '',
      content2: '',
      heading3: '',
      summary: '',
      heading_starColor: '',
      contentColor: '',
      store: [],
      keyFeatures: [],
      hide: 0,
    });
    setFileInputs({
      image: null,
      
    });
  };

  const updateKeyFeature = (index, field, value) => {
    const updatedFeatures = [...state.keyFeatures];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setState((prev) => ({
      ...prev,
      keyFeatures: updatedFeatures,
    }));
  };

  const addKeyFeature = () => {
    setState((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, { heading: '', content: '', stars: 1 }],
    }));
  };


 const handleSubmit = async () => {
   setIsLoading(true);
   const formData = new FormData();

   // Update app-related fields here (e.g., heading, content)
   formData.append('heading', state.heading);
   formData.append('content', state.content);
   formData.append('heading2', state.heading2);
   formData.append('content2', state.content2);
   formData.append('heading3', state.heading3);
   formData.append('summary', state.summary);
   formData.append('heading_starColor', state.heading_starColor);
   formData.append('contentColor', state.contentColor);

   // Key Features (if you plan to implement them later)
   state.keyFeatures.forEach((feature, index) => {
     formData.append(`keyFeatures[${index}][heading]`, feature.heading);
     formData.append(`keyFeatures[${index}][content]`, feature.content);
     formData.append(`keyFeatures[${index}][stars]`, feature.stars);
   });


   // Append images
   if (fileInputs.image) {
     formData.append('image', fileInputs.image);
   } else {
     toast.error('Please upload a background image');
     setIsLoading(false);
     return;
   }

  //  if (fileInputs.authImage) {
  //    formData.append('authImage', fileInputs.authImage);
  //  } else {
  //    toast.error('Please upload an author image');
  //    setIsLoading(false);
  //    return;
  //  }

   // Assuming the API endpoint is the same for adding apps
   const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;

   try {
     const token = localStorage.getItem('adminToken');
     const response = await fetch(`${apiBaseUrl}api/fpii/homepageRoutes/app/post`, {
       method: 'POST',
       headers: {
         Authorization: `Bearer ${token}`,
       },
       body: formData,
     });

     const data = await response.json();

     if (!response.ok) {
       toast.error(data.message || 'Something went wrong');
       setIsLoading(false);
       return;
     }

     console.log('Success', data);
     toast.success(data.message || 'App Created Successfully');
     handelClose();
   } catch (error) {
     console.error('Error:', error);
     toast.error(error.message || 'An unexpected error occurred');
   } finally {
     setIsLoading(false);
   }
 };


  const handleEditApp = (id) => {
    navigate(`/admin/admin/edit-app?id=${id}`);
    console.log('Navigating to edit page with ID:', id);
  };

  const handleFileDelete = (name) => {
    const previewKey =
      name === 'image' ? 'bgPreview' : name === 'autImage' ? 'authPreview' : `${name}Preview`;

    setFileInputs((prev) => ({
      ...prev,
      [name]: null,
      [previewKey]: null,
    }));
  };


  const handleDeleteApp = async (id) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        const res = await deleteApp(id).unwrap();
        toast.success(res?.message || 'App deleted successfully');
        handleGetData(); // <== IMPORTANT: re-fetch updated data here
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || 'Failed to delete app');
      }
    }
  };



  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="App List"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              component={RouterLink}
              onClick={() => {
                setopen(true);
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New App
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <div>
          <Dialog
            onClose={() => handelClose()}
            open={open}
            maxWidth="lg"
            sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: '1200px' } }}
          >
            <DialogTitle>{state?.item_id ? 'Edit App' : 'Add App'}</DialogTitle>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              autoComplete="off"
            >
              <DialogContent>
                <Typography sx={{ mb: 3 }}>Fill out the App details below:</Typography>
                <Box display="flex" gap={2} flexDirection="column">
                  <TextField
                    label="Heading"
                    name="heading"
                    fullWidth
                    value={state.heading}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Content"
                    name="content"
                    fullWidth
                    multiline
                    rows={4}
                    value={state.content}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Heading 2"
                    name="heading2"
                    fullWidth
                    value={state.heading2}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Content 2"
                    name="content2"
                    fullWidth
                    multiline
                    rows={4}
                    value={state.content2}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Heading 3"
                    name="heading3"
                    fullWidth
                    value={state.heading3}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Summary"
                    name="summary"
                    fullWidth
                    value={state.summary}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Heading Star Color"
                    name="heading_starColor"
                    fullWidth
                    value={state.heading_starColor}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Content Color"
                    name="contentColor"
                    fullWidth
                    value={state.contentColor}
                    onChange={handleChange}
                  />

                  {/* Key Features */}
                  {/* {Array.isArray(data) &&
                    data.map((feature, index) => (
                      <Box key={index}>
                        <TextField
                          label={`Key Feature ${index + 1} Heading`}
                          fullWidth
                          value={feature.heading}
                          onChange={(e) => updateKeyFeature(index, 'heading', e.target.value)}
                        />
                        <TextField
                          label={`Key Feature ${index + 1} Content`}
                          fullWidth
                          value={feature.content}
                          onChange={(e) => updateKeyFeature(index, 'content', e.target.value)}
                        />
                        <TextField
                          label={`Key Feature ${index + 1} Stars`}
                          fullWidth
                          value={feature.stars}
                          onChange={(e) => updateKeyFeature(index, 'stars', e.target.value)}
                        />
                      </Box>
                    ))} */}

                  {/* Key Features */}
                  <Typography variant="h6">Key Features</Typography>
                  {state.keyFeatures.map((feature, index) => (
                    <Box
                      key={index}
                      display="flex"
                      gap={2}
                      alignItems="center"
                      flexWrap="wrap"
                      mb={2}
                    >
                      <TextField
                        label={`Heading ${index + 1}`}
                        value={feature.heading}
                        onChange={(e) => updateKeyFeature(index, 'heading', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label={`Content ${index + 1}`}
                        value={feature.content}
                        onChange={(e) => updateKeyFeature(index, 'content', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label={`Stars ${index + 1}`}
                        type="number"
                        inputProps={{ min: 1, max: 5 }}
                        value={feature.stars}
                        onChange={(e) => updateKeyFeature(index, 'stars', parseInt(e.target.value))}
                        sx={{ width: 100 }}
                      />
                    </Box>
                  ))}
                  <Button onClick={addKeyFeature} variant="outlined" size="small">
                    Add Key Feature
                  </Button>

                  {/* Image Uploads */}
                  <FormLabel>Select Icon Image</FormLabel>
                  <Input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                  {fileInputs.image && (
                    <TextField
                      label="Background Image Name"
                      fullWidth
                      value={fileInputs.image.name}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                  {/* {fileInputs.bgPreview && (
                    <img
                      src={fileInputs.bgPreview}
                      alt="BG Preview"
                      width="100"
                      style={{ marginTop: '10px' }}
                    />
                  )} */}

                  {/* <FormLabel>Select Author Image</FormLabel>
                  <Input type="file" name="autImage" accept="image/*" onChange={handleFileChange} />
                  {fileInputs.autImage && (
                    <TextField
                      label="Author Image Name"
                      fullWidth
                      value={fileInputs.autImage.name}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                  {fileInputs.authPreview && (
                    <img
                      src={fileInputs.authPreview}
                      alt="Author Preview"
                      width="100"
                      style={{ marginTop: '10px' }}
                    />
                  )} */}

                  {/* Visibility */}
                  {/* <Typography>App Status on Website</Typography>
                  <RadioGroup name="hide" value={state.hide} onChange={handleChange} row>
                    <FormControlLabel value={0} control={<Radio />} label="Visible" />
                    <FormControlLabel value={1} control={<Radio />} label="Hidden" />
                  </RadioGroup> */}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handelClose()} variant="outlined" color="inherit">
                  Cancel
                </Button>
                <LoadingButton variant="contained" type="submit" loading={isLoading}>
                  {state?.item_id ? 'Save App' : 'Add App'}
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </div>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <Container maxWidth="xxl" sx={{ py: 5 }}>
            {data?.map((item, index) => (
              <>
                <Box
                  sx={{
                    border: `1px solid ${item.heading_starColor}`,
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
                    <IconButton onClick={() => handleEditApp(item._id)}>
                      <Icon icon="mdi:pencil" width={34} height={34} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteApp({id:item._id})} sx={{ ml: 1 }}>
                      <Icon icon="mdi:delete" width={34} height={34} color="red" />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: '50%',
                      left: { md: '15%', xs: '50%' },
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
                    <Typography variant="h4" color={item.heading_starColor}>
                      {item.heading}
                    </Typography>
                  </Box>
                </Box>
                <Grid container direction={index % 2 === 0 ? 'row' : 'row-reverse'} spacing={3}>
                  <Grid item lg={9}>
                    {' '}
                    <Typography
                      variant="body1"
                      textAlign="left"
                      color={item.contentColor}
                      sx={{ fontSize: '1.2rem' }}
                    >
                      {item?.content}
                    </Typography>
                    <Box sx={{ my: 4, textAlign: 'left' }}>
                      <Typography variant="h5" fontWeight={600} color={item.heading_starColor}>
                        {item.heading2}
                      </Typography>
                      <Typography
                        variant="body1"
                        maxWidth="md"
                        color={item.contentColor}
                        sx={{ fontSize: '1.2rem' }}
                      >
                        {item.content2}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    {' '}
                    <Box
                      component="span"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        height: '60%',
                        width: '60%',
                      }}
                    >
                      {' '}
                      <img style={{ height: '100%' }} src={item.image} alt="" />{' '}
                    </Box>{' '}
                  </Grid>
                </Grid>
                <Typography color={item.contentColor} sx={{ mb: 2 }}>
                  KEY FEATURES:
                </Typography>
                <Grid container spacing={3}>
                  {item?.keyFeatures?.map((e) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <Box
                        sx={{
                          border: `1px solid ${item.contentColor}`,
                          boxShadow: 6,
                          borderRadius: 2,
                          textAlign: 'left',
                          p: 1,
                          height: '100%',
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                            {Array.from({ length: e.stars }).map((_, index) => (
                              <Icon
                                key={index}
                                icon="mdi:star"
                                color={item.heading_starColor}
                                width={20}
                                height={20}
                              />
                            ))}
                          </Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color={item.heading_starColor}
                            sx={{ fontSize: '1rem' }}
                          >
                            {e.heading}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={item.contentColor}
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
                      <Typography variant="body1" maxWidth="md" color={item.contentColor}>
                        {item.summary}
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
        )}
      </DashboardContent>
    </>
  );
}
