import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Make sure to import useSelector
import { DashboardContent } from 'src/layouts/admin/dashboard';

export function ProductListView() {
  const [mode, setMode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { user } = useSelector((state) => state.auth);

  // Set initial mode based on user?.dbMode
  useEffect(() => {
    if (user?.dbMode === 0) {
      setMode(0); // Set mode to '0' if user.dbMode is '0'
    } else if (user?.dbMode === 1) {
      setMode(1); // Set mode to '1' if user.dbMode is '1'
    }
  }, [user]);

  const handleChange = (event) => {
    setMode(event.target.value);

  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading to true

    const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;

    try {
      const adminToken = localStorage.getItem('adminToken'); // Make sure this key matches how you stored it

      const response = await axios.post(
        `${apiBaseUrl}api/user/changeDb`,
        { mode: mode },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      console.log('Response:', response.data);
      setSuccessMessage('Database mode changed successfully!'); // Set success message
      setOpenSnackbar(true); // Open Snackbar
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} mt={8}>
            <Container>
              <Typography variant="h4" component="h1" gutterBottom>
                Change Database Mode
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                As a Superadmin, only you have access to change the database mode. Please go for it!!
              </Typography>

              <FormControl component="fieldset">
                <Box display="flex" alignItems="center">
                  <Typography sx={{ marginRight: 2, fontWeight: "bold" }}>Select Database Mode</Typography>
                  <RadioGroup row value={mode} onChange={handleChange}>
                    <FormControlLabel value="0" control={<Radio />} label="readwrite mode" />
                    <FormControlLabel value="1" control={<Radio />} label="readonly mode" />
                  </RadioGroup>
                </Box>
              </FormControl>

              <Box mt={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit} 
                  disabled={!mode || isLoading} // Disable if no mode selected or loading
                >
                  {isLoading ? 'Loading...' : 'Submit'} {/* Show loading text */}
                </Button>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <img 
              src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1744724405~exp=1744728005~hmac=2cd380c51c393c05c042237a36e565388dd5dd6cb9610bee740873c2ec7c9450&w=826" // Replace with your image URL
              alt="Example"
              style={{ width: '100%', height: 'auto' }} // Responsive image
            />
          </Grid>
        </Grid>

        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage}
        />
  </DashboardContent>
    </>
  );
}