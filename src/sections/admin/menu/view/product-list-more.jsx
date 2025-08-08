import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Image } from 'src/components/image';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { Icon } from '@iconify/react';
import { toast } from 'src/components/snackbar';
import {
  useGetBlogDetailsfpiiMutation,
  useDeleteBlogDetailsfpiiMutation,
} from 'src/redux/slices/admin/menu';


const StyledContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  margin: 'auto',
  padding: '20px',
}));


const formatDate = (isoDate) => {
  if (!isoDate) return 'Sep 1, 2023'; 
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export function ProductListMore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); 
  const [handleGetData, { data, isLoading, error }] = useGetBlogDetailsfpiiMutation();
  const [deleteBlog, { isLoading: isDeleting, error: deleteError }] =
    useDeleteBlogDetailsfpiiMutation();
  const navigate = useNavigate(); 

  
  useEffect(() => {
    handleGetData();
  }, [id]); 

  
  const selectedBlog = data?.find((blog) => blog._id === id);

  if (!selectedBlog) return <div style={{textAlign:"center"}}>getting your blog here</div>; 

  
  const handleDelete = async () => {
    try {
      await deleteBlog({ id: selectedBlog._id }).unwrap();
      toast.success(data.message || 'Successfully Deleted');
      navigate('/admin/admin/list-blog'); 
    } catch (error) {
      console.error('Delete Failed:', error);
      toast.error(error.message || 'Failed to delete the blog');
    }
  };

  
  return (
    <StyledContainer>
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: {
            xs: '1.0rem',
            md: '1.5rem',
          },
          marginTop: '20px',
          paddingLeft: '5%',
          fontFamily: 'IBM Plex Sans',
        }}
      >
        {selectedBlog.title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: '#757575',
          marginTop: '10px',
          paddingLeft: '5%',
        }}
      >
        {selectedBlog.subtitle || ' '}
      </Typography>

      {/* Author Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
          paddingLeft: '5%',
        }}
      >
        {' '}
        <Avatar
          alt="Author"
          src={selectedBlog.authorPicture || 'default-avatar.png'}
          sx={{
            width: '50px',
            height: '50px',
            marginRight: '10px',
            borderRadius: '50%',
          }}
        />
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'IBM Plex Sans',
            }}
          >
            {' '}
            {selectedBlog.authorName || 'Unknown Author'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#757575',
            }}
          >
            {' '}
            {selectedBlog.readingTime || '6 min read'} • {formatDate(selectedBlog.createdAt)}
          </Typography>
        </Box>
      </Box>

      {/* Edit and Delete Icons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {/* Edit Icon */}
        <IconButton onClick={() => navigate(`/admin/admin/editblog?id=${id}`)}>
          <Icon icon="mdi:pencil" width={34} height={34} />
        </IconButton>

        {/* Delete Icon */}
        <IconButton onClick={handleDelete} disabled={isDeleting}>
          <Icon icon="mdi:delete" width={34} height={34} style={{ color: 'red' }} />
        </IconButton>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginY: '20px' }} />

      {/* Main Image */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Image
          src={selectedBlog.image || 'Error loading image'}
          alt="Main Visual"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Blog Content */}
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'justify' }}>
        <Typography variant="body1" sx={{ color: '#333', margin: '20px auto' }}>
          {selectedBlog.description2 || 'Content not available.'}
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', margin: '20px auto' }}>
          {selectedBlog.description || 'Content not available.'}
        </Typography>
      </Container>
    </StyledContainer>
  );
}