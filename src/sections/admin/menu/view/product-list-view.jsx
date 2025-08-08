import { useState, useEffect, useCallback } from 'react';
import { ZodError } from 'zod';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';

import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Button, Typography, Box, Input, FormLabel, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Label } from 'src/components/label';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import IconButton from '@mui/material/IconButton';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { useGetProducts } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/admin/dashboard';
import moment from 'moment';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// import {
//   RenderCellStock,
//   RenderCellPrice,
//   RenderCellPublish,
//   RenderCellProduct,
//   RenderCellCreatedAt,
// } from '../product-table-row';
import {
  useGetAllCategoriesMutation,
  useCreateTodaysMenuMutation,
  useGetTodaysMenuMutation,
  useGetAllMenuMutation,
  useGetFoodTypesMutation,
  useGetSingelMenuMutation,
  
  useGetBlogDetailsfpiiMutation,
} from 'src/redux/slices/admin/menu';
import { useTranslation } from 'react-i18next';
import { menuValidate } from 'src/validation/admin/menu';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { Grid, CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export function ProductListView() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('authorName', state.authorName);
    formData.append('title', state.title);
    formData.append('description', state.description);
    formData.append('description2', state.description2);
    formData.append('content', state.content);

    // Append images
    if (fileInputs.bgImage) {
      formData.append('bgImage', fileInputs.bgImage);
    } else {
      toast.error('Please upload a background image');
      setIsLoading(false);
      return;
    }

    if (fileInputs.authImage) {
      formData.append('authImage', fileInputs.authImage);
    } else {
      toast.error('Please upload an author image');
      setIsLoading(false);
      return;
    }

    formData.append('readingTime', state.readingTime);
    formData.append('createdAt', state.createdAt);

    const apiBaseUrl = import.meta.env.VITE_ADMIN_API_URL;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${apiBaseUrl}api/blog/4pii/create`, {
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
      toast.success(data.message || 'Blog Created Successfully');
      handelClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [setTableData] = useState([]);
  const [state, setState] = useState({
    item_id: undefined,
    isVeg: '',
    isVegErr: false,
    isVegErrMsg: '',
    category: '',
    categoryErr: false,
    categoryErrMsg: '',
    date: moment().format('YYYY-MM-DD'),
    dateErr: false,
    dateErrMsg: '',
  });
  const [menuDate, setmenuDate] = useState(dayjs(new Date()));
  const [selectedCategory, setSelectedCategory] = useState([
    { foodTypes: '', foodTypesErr: false, foodTypesErrMsg: '', item: '', default_item: '' },
  ]);
  const [categoryList, setCategoryList] = useState([]);
  const [getAllMenu, { data: menuData, isSuccess: menuDataIsSuccess, loading: allmenuLoading }] =
    useGetAllMenuMutation();
  const [getMenuList, { data, isSuccess }] = useGetTodaysMenuMutation();
  const [getCategories, { data: categoriesData }] = useGetAllCategoriesMutation();
  const [getFoodTypes, { data: foodTypesData }] = useGetFoodTypesMutation();
  const [getSingelData, { data: singelMenu, isSuccess: singelisSuccess }] =
    useGetSingelMenuMutation();

  const [
    addMenu,
    { data: addMenuData, isLoading: addMenuLoading, isSuccess: addMenuIsSuccess, error, isError },
  ] = useCreateTodaysMenuMutation();
  const [
    handleGetDataCareer,
    {
      data: getBlogData,
      isLoading: getIsLoadingData,
      error: getErrorData,
      isSuccess: getIsSuccessData,
    },
  ] = useGetBlogDetailsfpiiMutation();
  const [homeData, setHomedata] = useState([]);
  // console.log(homeData, 'blogData');

  useEffect(() => {
    handleGetDataCareer();
  }, []);

  useEffect(() => {
    if (getIsSuccessData && getBlogData) {
      setHomedata(getBlogData);
    }
  }, [getIsSuccessData, getBlogData]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handelClose = () => {
    getMenuList({ date: moment(menuDate).format('YYYY-MM-DD') });
    setSelectedCategory([
      {
        foodTypes: '',
        foodTypesErr: false,
        foodTypesErrMsg: '',
        item: '',
        default_item: '',
        menuErrMsg: '',
        menuErr: false,
        defaultErr: false,
        defaultErrMsg: '',
      },
    ]);
    setState({
      item_id: undefined,
      isVeg: '',
      isVegErr: false,
      isVegErrMsg: '',
      category: '',
      categoryErr: false,
      categoryErrMsg: '',
      date: new Date(),
      dateErr: false,
      dateErrMsg: '',
    });

    setopen(false);
  };

  useEffect(() => {
    getMenuList({ date: moment(menuDate).format('YYYY-MM-DD') });
    getCategories();
    getFoodTypes({ type: 1 });
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      setTableData(data?.data);
    }
  }, [data, isSuccess]);



  useEffect(() => {
    if (menuData && menuDataIsSuccess && menuData?.todays_menu) {
      setCategoryList(menuData?.data);

      // setSelectedCategory([{ foodTypes: '', item: '', default_item: '' }]); //TODO: need to check
    }
  }, [menuDataIsSuccess, menuData]);

  useEffect(() => {
    if (addMenuData && addMenuIsSuccess) {
      toast.success(addMenuData?.message);
      setopen(false);
      getMenuList({ date: moment(menuDate).format('YYYY-MM-DD') });
      setState({
        date: '',
        isVeg: '',
        category: '',
      });
      handelClose();
    }
  }, [addMenuData, addMenuIsSuccess]);

  const validate = (_e) => {
    _e.preventDefault();
    const error = selectedCategory.some((cat) => {
      if (!cat.item || cat.item.length === 0) {
        cat.menuErr = true;
        cat.menuErrMsg = t('Please Select Menu Items');
        toast.error('Please Select Menu Items');
        return true;
      }
      if (!cat.default_item) {
        cat.defaultErr = true;
        cat.defaultErrMsg = t('Please Select Default Item');
        toast.error('Please Select Default Item');
        return true;
      }
      return false;
    });

    if (error) {
      return;
    }
    const filterData = selectedCategory.map((e) => {
      return { item: e.item, default_item: e.default_item };
    });

    addMenu({
      date: moment(state.date).format('YYYY-MM-DD'),
      all_items: filterData,
      item_id: state.item_id,
    });
  };

  const [fileInputs, setFileInputs] = useState({
    bgImage: null, // Stores the selected file for background image
    authImage: null, // Stores the selected file for author image
    bgPreview: '', // Stores preview for background image
    authPreview: '',
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      // Update state with selected file
      setFileInputs((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileInputs((prev) => ({
          ...prev,
          [`${name}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange2 = (event, index, field) => {
    console.log(selectedCategory, 'selectedCategory');
    const newSelectedCategory = [...selectedCategory];

    if (field == 'item') {
      const selectedItemIds = event.map((item) => item._id);

      // Update the `item` field with the array of `id`s
      newSelectedCategory[index] = {
        ...newSelectedCategory[index],
        item: selectedItemIds,
        default_item: '',
      };
    } else if (field == 'foodTypes') {
      newSelectedCategory[index] = {
        ...newSelectedCategory[index],
        [field]: event.target.value,
        item: '',
        default_item: '',
      };
    } else if (field == 'default_item') {
      newSelectedCategory[index] = {
        ...newSelectedCategory[index],
        [field]: event.target.value,
      };
    }

    setSelectedCategory(newSelectedCategory);
  };

  const handelAdd = (index) => {
    setSelectedCategory((prev) => {
      const newSelectedCategory = [...prev];

      newSelectedCategory.splice(index + 1, 0, { foodTypes: '', item: '', default_item: '' });

      return newSelectedCategory;
    });
  };
  const handelDelete = (index) => {
    const updatedArray = [...selectedCategory];
    updatedArray.splice(index, 1);

    setSelectedCategory(updatedArray);
  };

  useEffect(() => {
    if (singelisSuccess && singelMenu?.data) {
      setState({
        item_id: singelMenu?.data?.item_id,
        isVeg: singelMenu?.data?.veg,
        isVegErr: false,
        isVegErrMsg: '',
        category: singelMenu?.data?.category_id,
        categoryErr: false,
        categoryErrMsg: '',
        date: singelMenu?.data?.date,
        dateErr: false,
        dateErrMsg: '',
      });
      getAllMenu({ veg: singelMenu?.data?.veg, category_id: singelMenu?.data?.category_id });
      setSelectedCategory([singelMenu?.data?.all_items]);
      setopen(true);
    }
  }, [singelisSuccess]);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Blog List"
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
              New Blog
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
            <DialogTitle>{state?.item_id ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              autoComplete="off"
            >
              <DialogContent>
                <Typography sx={{ mb: 3 }}>
                  Add a new blog post with the following fields:
                </Typography>
                <Box display="flex" gap={2} flexDirection="column">
                  <TextField
                    label="Author Name"
                    name="authorName"
                    fullWidth
                    value={state.authorName}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, authorName: e.target.value }))
                    }
                    required
                  />
                  {/* <TextField
                    label="Author Picture URL"
                    name="authorPicture"
                    fullWidth
                    value={state.authorPicture}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, authorPicture: e.target.value }))
                    }
                    required
                  /> */}
                  <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    value={state.title}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, title: e.target.value }))
                    }
                    required
                  />
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    value={state.description}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, description: e.target.value }))
                    }
                    required
                  />
                  <TextField
                    label="Additional Description"
                    name="description2"
                    fullWidth
                    value={state.description2}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, description2: e.target.value }))
                    }
                  />
                  <TextField
                    label="Content"
                    name="content"
                    fullWidth
                    multiline
                    rows={5}
                    value={state.content}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, content: e.target.value }))
                    }
                    required
                  />
                  <FormLabel sx={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                    Select Blog Image
                  </FormLabel>
                  <Input
                    type="file"
                    name="bgImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                  />
                  {fileInputs.bgImage && (
                    <TextField
                      label="Background Image Name"
                      fullWidth
                      value={fileInputs.bgImage.name}
                      InputProps={{ readOnly: true }}
                      margin="normal"
                    />
                  )}
                  {fileInputs.bgPreview && (
                    <img
                      src={fileInputs.bgPreview}
                      alt="Background Preview"
                      width="100"
                      style={{ marginTop: '10px' }}
                    />
                  )}

                  {/* Author Image Input */}
                  <FormLabel sx={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                    Select Author Image
                  </FormLabel>
                  <Input
                    type="file"
                    name="authImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    fullWidth
                    sx={{ marginBottom: '16px' }}
                  />
                  {fileInputs.authImage && (
                    <TextField
                      label="Author Image Name"
                      fullWidth
                      value={fileInputs.authImage.name}
                      InputProps={{ readOnly: true }}
                      margin="normal"
                    />
                  )}
                  {fileInputs.authPreview && (
                    <img
                      src={fileInputs.authPreview}
                      alt="Author Preview"
                      width="100"
                      style={{ marginTop: '10px' }}
                    />
                  )}

                  <TextField
                    label="Reading Time (e.g., '6 min read')"
                    name="readingTime"
                    fullWidth
                    value={state.readingTime}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, readingTime: e.target.value }))
                    }
                    required
                  />
                  <TextField
                    type="datetime-local"
                    // label="Created At"
                    fullWidth
                    value={state.createdAt}
                    onChange={(e) =>
                      setState((prevState) => ({ ...prevState, createdAt: e.target.value }))
                    }
                    required
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handelClose()} variant="outlined" color="inherit">
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isLoading}
                  disabled={!state.authorName || !state.title || !state.content}
                >
                  {state?.item_id ? 'Save Blog' : 'Add Blog'}
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
          <Grid container spacing={3}>
            {homeData?.map((post, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                    bgcolor: 'rgb(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    height: '22rem',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div>
                      <Typography gutterBottom variant="h5" component="div" color="textPrimary">
                        <Link
                          sx={{ cursor: 'pointer' }}
                          onClick={() => navigate(`${paths.admin.MenuDetails}?id=${post?._id}`)}
                          style={{ textDecoration: 'none', color: 'primary.main' }}
                        >
                          {post?.title.length > 20 ? `${post?.title.slice(0, 40)}...` : post?.title}
                        </Link>
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', color: 'rgb(0,0,0,0.7)' }}>
                        {post?.description.length > 50
                          ? `${post?.description.slice(0, 100)}...`
                          : post?.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{ fontSize: '0.9rem', marginTop: '12px' }}
                      >
                        {formatDate(post?.createdAt)}
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ alignSelf: 'flex-start' }}
                      onClick={() => navigate(`${paths.admin.MenuDetails}?id=${post?._id}`)}
                    >
                      Show More
                    </Button>
                  </CardContent>
                  <CardMedia
                    component="img"
                    width={'100%'}
                    image={post?.image}
                    alt="Post Image"
                    sx={{
                      padding: '0.625rem',
                      borderRadius: '1.25rem',
                      width: { xs: '100%', lg: '15rem' },
                      height: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DashboardContent>
    </>
  );
}


