import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetJobDetailsMutation, useEditJobDetailsMutation } from 'src/redux/slices/admin/plan';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Input } from '@mui/material'; // For file upload input
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'; // For radio buttons
import { Typography } from '@mui/material';
import { toast } from 'src/components/snackbar';


const EditBlog = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [getBlogDetails, { data, isLoading, error }] = useGetJobDetailsMutation();
  const [editBlog, { isLoading: isUpdating, error: updateError }] = useEditJobDetailsMutation();
  const [formData, setFormData] = useState({
    jobTitle: '',
    candidatesNo: '',
    experience: '',
    time: '',
    salery: '',
    position: '',
    location: '',
    hide: 0, // 0 is for visible, 1 is for hidden
  });

  const [fileInputs, setFileInputs] = useState({
    bgImage: null,
    autImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogDetails({ id });
    }
  }, [id]);

useEffect(() => {
  if (!data) {
    console.log('Data is not available yet.');
    return;
  }

  console.log('Fetched Job data:', data); // Debugging: Check the structure of data
  if (Array.isArray(data)) {
    const jobList = data[0]?.secondObject; // Access the secondObject array
    if (Array.isArray(jobList)) {
      const selectedJob = jobList.find((job) => job._id === id); // Find the job by ID
      if (selectedJob) {
        setFormData({
          jobTitle: selectedJob.heading || '',
          candidatesNo: selectedJob.candidates?.no || '',
          experience: selectedJob.qualities?.experience || '',
          time: selectedJob.qualities?.time || '',
          salery: selectedJob.qualities?.salery || '',
          position: selectedJob.qualities?.position || '',
          location: selectedJob.qualities?.location || '',
          hide: selectedJob.hide || 0,
        });
      } else {
        console.log('Job with the given ID not found.');
      }
    } else {
      console.log('secondObject is not an array.');
    }
  } else {
    console.log('Data is not an array.');
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
     formDataToSend.append('id', id);
     formDataToSend.append('heading', formData.jobTitle);
     formDataToSend.append('candidates[no]', formData.candidatesNo);
     formDataToSend.append('qualities[experience]', formData.experience);
     formDataToSend.append('qualities[time]', formData.time);
     formDataToSend.append('qualities[salery]', formData.salery);
     formDataToSend.append('qualities[position]', formData.position);
     formDataToSend.append('qualities[location]', formData.location);
     formDataToSend.append('hide', formData.hide);

     // Log the FormData content before sending
     for (let [key, value] of formDataToSend.entries()) {
       console.log(key, value);
     }

     const response = await editBlog(formDataToSend).unwrap();
     toast.success(response.message || 'Job Updated Successfully');
     navigate(`/admin/admin/list-jobs`);
   } catch (error) {
     console.error('Failed to update Job:', error);
     toast.error(error?.data?.message || 'Failed to update the Job.');
   }
 };

  return (
    <Container maxWidth="md">
      <h2>Edit Blog</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && data && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            label="candidatesNo"
            name="candidatesNo"
            value={formData.candidatesNo}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="salery"
            name="salery"
            value={formData.salery}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          {/* <TextField
            label="Background Image URL"
            name="bgImage"
            value={formData.bgImage}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Reading Time"
            name="readingTime"
            value={formData.readingTime}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />

          <Input
            type="file"
            name="bgImage"
            onChange={handleFileChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <Input
            type="file"
            name="autImage"
            onChange={handleFileChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          /> */}
          <Typography>Blog Status on Website</Typography>
          {/* Radio Buttons for hide */}
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
              {isUpdating ? 'Updating...' : 'Update Blog'}
            </Button>
            <Button onClick={() => navigate(`/admin/admin/list-jobs`)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default EditBlog;
