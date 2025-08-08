import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetBlogDetailsfpiiMutation,
  useEditBlogDetailsfpiiMutation,
} from 'src/redux/slices/admin/menu';
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
  const [getBlogDetails, { data, isLoading, error }] = useGetBlogDetailsfpiiMutation();
  const [editBlog, { isLoading: isUpdating, error: updateError }] =
    useEditBlogDetailsfpiiMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    authorName: '',
    createdAt: '',
    description2: '',
    readingTime: '',
    bgImage: '',
    autImage: '',
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
    console.log('Fetched blog data:', data); // Log to confirm the structure of data
    if (data && Array.isArray(data)) {
      const selectedBlog = data.find((blog) => blog._id === id);
      if (selectedBlog) {
        setFormData({
          title: selectedBlog.title || '',
          description: selectedBlog.description || '',
          content: selectedBlog.content || '',
          authorName: selectedBlog.authorName || '',
          createdAt: selectedBlog.createdAt || '',
          description2: selectedBlog.description2 || '',
          bgImage: selectedBlog.image || '',
          readingTime: selectedBlog.readingTime || '',
          hide: selectedBlog.hide || 0,
        });
      } else {
        console.log('Blog with the given ID not found.');
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
      formDataToSend.append('id', id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('authorName', formData.authorName);
      formDataToSend.append('createdAt', formData.createdAt);
      formDataToSend.append('description2', formData.description2);
      formDataToSend.append('readingTime', formData.readingTime);
      formDataToSend.append('hide', formData.hide); // Ensure the 'hide' value is being appended correctly

      if (fileInputs.bgImage) {
        formDataToSend.append('bgImage', fileInputs.bgImage);
      }

      if (fileInputs.autImage) {
        formDataToSend.append('autImage', fileInputs.autImage);
      }

      // Log the FormData content before sending to check all fields
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      await editBlog(formDataToSend).unwrap();
      toast.success(data.message || 'Blog Updated Successfully');
      navigate(`/admin/admin/list-blog`);
    } catch (error) {
      console.error('Failed to update blog:', error);
      toast.error(error?.data?.message );
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
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
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
            label="Author Name"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Created At"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Description 2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
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
          />
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
            <Button
              onClick={() => navigate(`/admin/admin/blogdetails?id=${id}`)}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default EditBlog;
