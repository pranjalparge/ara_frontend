import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Add } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { useGetJobDetailsMutation, useDeleteJobDetailsMutation } from 'src/redux/slices/admin/plan';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import { Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';

// ----------------------------------------------------------------------

export function JobListView({ job, onView, onEdit, onDelete }) {
  const initialFormValues = {
    jobTitle: '',
    candidatesNo: '',
    experience: '',
    time: '',
    salery: '',
    position: '',
    location: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormValues((prevValues) => ({
        ...prevValues,
        resume: file,
      }));
    } else {
      toast.error('Please upload a valid resume file.');
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append basic fields
    formData.append('heading', formValues.jobTitle); // Use jobTitle as heading
    formData.append('date', new Date().toLocaleDateString()); // Add current date
    formData.append('candidates[no]', formValues.candidatesNo); // Add candidates.no

    // Append qualities as a nested object
    formData.append('qualities[experience]', formValues.experience);
    formData.append('qualities[time]', formValues.time || 'nothing'); // Default to 'nothing'
    formData.append('qualities[salery]', formValues.salery || 'free'); // Default to 'free'
    formData.append('qualities[position]', formValues.position || 'nothing'); // Default to 'nothing'
    formData.append('qualities[location]', formValues.location || 'nothing'); // Default to 'nothing'
    // Append resume file
    // if (formValues.resume) {
    //   formData.append('resume', formValues.resume);
    // } else {
    //   toast.error('Resume file is required.');
    //   return;
    // }

    const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;
    const token = localStorage.getItem('adminToken');
    console.log('Token:', token);
    try {
      const response = await fetch(`${apiBaseUrl}api/careerNewfrontendRoutes/fpii/createJobs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Job Post Created successfully!');
        setFormValues(initialFormValues);
      } else {
        const errorData = await response.json();
        toast.error('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred. Please try again.');
    }

    handleDialogClose();
  };
  const [handleGetDataCareer, { data, isLoading, error, isSuccess }] = useGetJobDetailsMutation();
  const [deleteJob] = useDeleteJobDetailsMutation();
  const [homeData, setHomedata] = useState([]);

  useEffect(() => {
    handleGetDataCareer();
  }, []);

 useEffect(() => {
   if (isSuccess && data) {
     console.log('Re-fetched Data:', data); // Debugging: Check the updated data
     setHomedata(data);
   }
 }, [isSuccess, data]);

  const [popover, setPopover] = useState({ open: false, anchorEl: null });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopover({ open: false, anchorEl: null });
  };

 

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleEdit = (id) => {
    navigate(`/admin/admin/edit-jobs?id=${id}`);
    console.log('Navigating to edit page with ID:', id);
  };

 const handleDelete = async (id) => {
   const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;
   const token = localStorage.getItem('adminToken');
   try {
     const response = await fetch(`${apiBaseUrl}api/careerNewfrontendRoutes/fpii/deleteJobs`, {
       method: 'DELETE',
       headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ id }),
     });

     if (response.ok) {
       const data = await response.json();
       toast.success(data.message || 'Job deleted successfully!');

       // Update the state to remove the deleted job
       setHomedata((prevData) => {
         // Create a deep copy of the previous data
         const updatedData = prevData.map((item) => ({
           ...item,
           secondObject: item.secondObject?.filter((job) => job._id !== id),
         }));
         return updatedData;
       });
     } else {
       const errorText = await response.text();
       console.error('Error Response:', errorText);
       toast.error('Failed to delete the job. Please try again.');
     }
   } catch (err) {
     console.error('Error Deleting Job:', err);
     toast.error('An error occurred. Please try again.');
   }
 };

  return (
    <>
      <Container maxWidth="xxl" sx={{ py: 10, position: 'relative' }}>
        {/* Add New Brand Button */}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <Button variant="contained" startIcon={<Add />} onClick={() => setIsDialogOpen(true)}>
            Add New Job Post
          </Button>
        </Box>
        <Grid container spacing={2}>
          {homeData?.map((item) => (
            <>
              {item.secondObject?.map((e, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%', // Make all cards same height
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: 2,
                      boxShadow: 3,
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
                      <IconButton onClick={() => handleEdit(e._id)}>
                        <Icon icon="mdi:pencil" width={34} height={34} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(e._id)} sx={{ ml: 1 }}>
                        <Icon icon="mdi:delete" width={34} height={34} color="red" />
                      </IconButton>
                    </Box>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                      }}
                    >
                      <Avatar
                        alt={e.heading}
                        // src={job.company.logo}
                        variant="rounded"
                        sx={{ width: 48, height: 48, mb: 2 }}
                      />

                      <ListItemText
                        sx={{ mb: 1, pl: { xs: 0, md: 2 } }}
                        primary={
                          <Link
                            component={RouterLink}
                            // href={paths.dashboard.job.details()}
                            color="inherit"
                          >
                            {e.heading}
                          </Link>
                        }
                        secondary={`Posted date: ${fDate(e.date)}`}
                        primaryTypographyProps={{ typography: 'subtitle1' }}
                        secondaryTypographyProps={{
                          mt: 1,
                          component: 'span',
                          typography: 'caption',
                          color: '#000',
                        }}
                      />
                    </Stack>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Box
                      rowGap={1.5}
                      display="grid"
                      gridTemplateColumns="repeat(2, 1fr)"
                      sx={{ p: { xs: 0, md: 3 } }}
                    >
                      {[
                        {
                          label: e.qualities.experience,
                          icon: (
                            <Iconify
                              width={16}
                              icon="carbon:skill-level-basic"
                              sx={{ flexShrink: 0 }}
                            />
                          ),
                        },
                        {
                          label: e.qualities.time,
                          icon: (
                            <Iconify
                              width={16}
                              icon="solar:clock-circle-bold"
                              sx={{ flexShrink: 0 }}
                            />
                          ),
                        },
                        {
                          label: e.qualities.salery,
                          icon: (
                            <Iconify
                              width={16}
                              icon="solar:wad-of-money-bold"
                              sx={{ flexShrink: 0 }}
                            />
                          ),
                        },
                        {
                          label: e.qualities.position,
                          icon: (
                            <Iconify
                              width={16}
                              icon="solar:user-rounded-bold"
                              sx={{ flexShrink: 0 }}
                            />
                          ),
                        },
                        {
                          label: e.qualities.location,
                          icon: (
                            <Iconify
                              width={16}
                              icon="carbon:location-filled"
                              sx={{ flexShrink: 0 }}
                            />
                          ),
                        },
                      ].map((item) => {
                        return (
                          <Stack
                            key={item.label}
                            spacing={0.5}
                            flexShrink={0}
                            direction="row"
                            alignItems="center"
                            sx={{ color: '#000', minWidth: 0 }}
                          >
                            {item.icon}
                            <Typography
                              variant="caption"
                              noWrap
                              sx={{ color: 'text.primary', fontWeight: 'bold' }}
                            >
                              {item.label}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Box>
                    <MenuList
                      sx={{
                        display: 'flex', // Set flexbox layout
                        alignItems: 'center', // Center vertically
                      }}
                    >
                      {/* <MenuItem
                      onClick={() => handleApplyNowClick(e.heading)} // Pass the job title
                      sx={{
                        backgroundColor: '#1976d2', // Blue background color
                        color: '#fff', // White text
                        padding: '5px 15px', // Add padding for better aesthetics
                        textTransform: 'none', // Keep the text as written (no uppercase)
                        borderRadius: '8px', // Rounded corners
                        cursor: 'pointer',
                        textAlign: 'center', // Align text in the middle of the button
                        '&:hover': {
                          backgroundColor: '#1565c0', // Darker blue on hover
                        },
                        '&:focus': {
                          outline: '2px solid #90caf9', // Add focus outline for accessibility
                        },
                      }}
                    >
                      Apply Now
                    </MenuItem> */}
                    </MenuList>
                  </Card>
                </Grid>
              ))}
            </>
          ))}
        </Grid>

        <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>Add New Job</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Heading (Job Title)"
                required
                name="jobTitle"
                value={formValues.jobTitle}
                onChange={handleChange}
              />
              <TextField
                label="Number of Candidates"
                required
                type="number"
                name="candidatesNo"
                value={formValues.candidatesNo || ''}
                onChange={handleChange}
              />
              <TextField
                label="Experience"
                required
                name="experience"
                value={formValues.experience}
                onChange={handleChange}
              />
              <TextField
                label="Time"
                name="time"
                value={formValues.time || ''}
                onChange={handleChange}
                placeholder="Default: nothing"
              />
              <TextField
                label="Salery"
                name="salery"
                value={formValues.salery || ''}
                onChange={handleChange}
                placeholder="Default: free"
              />
              <TextField
                label="Position"
                name="position"
                value={formValues.position || ''}
                onChange={handleChange}
                placeholder="Default: nothing"
              />
              <TextField
                label="location"
                name="location"
                value={formValues.location || ''}
                onChange={handleChange}
                placeholder="Default: nothing"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
