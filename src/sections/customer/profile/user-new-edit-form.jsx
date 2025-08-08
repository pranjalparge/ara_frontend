import { z as zod } from 'zod';
import { ZodError } from 'zod';
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';
import { useSelector, useDispatch } from 'react-redux';
import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { useUpdateProfileMutation } from 'src/redux/slices/customer/auth';
import { Upload, UploadBox, UploadAvatar } from 'src/components/upload';
import { useCandidateProfileMutation } from 'src/redux/slices/customer/customerDetails';
import { updateReduxState } from 'src/redux/slices/features-slice/user';
// ----------------------------------------------------------------------

export const UserDetails = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  pincode: zod.string().min(1, { message: 'Pincode is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  mobile: zod.string().min(1, { message: 'Mobile is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
});

// ----------------------------------------------------------------------

export function UserNewEditForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { i18n, t } = useTranslation();
  const [getData, { data: customerData, isSuccess }] = useCandidateProfileMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    nameErr: false,
    nameErrMsg: '',
    pincode: '',
    pincodeErr: false,
    pincodeErrMsg: '',
    email: '',
    emailErr: false,
    emailErrMsg: '',
    mobile: '',
    mobileErr: false,
    mobileErrMsg: '',
    address: '',
    addressErr: false,
    addressErrMsg: '',
  });
  useEffect(() => {
    getData();
  }, []);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const handleDropAvatar = useCallback((acceptedFiles) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const allowedTypeImage = ['image/jpeg', 'image/png', 'image/jpeg'];
    const maxSize = 1 * 1024 * 1024; // 1 MB in bytes

    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log(file);

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setAvatarUrl(file);
      } else {
        toast.error(
          'Invalid file type. Only JPEG, PNG, and JPG are allowed or file size need lesss than 1 mb.'
        );
      }
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setState((prev) => ({
        ...prev,
        name: customerData?.data?.candidateInfo?.application_id?.full_name,
        pincode: customerData?.data?.candidateInfo?.application_id?.pincode?.toString(),
        email: customerData?.data?.emailId,
        mobile: customerData?.data?.mobileNo,
        address: customerData?.data?.candidateInfo?.application_id?.address,
      }));
      setAvatarUrl(customerData?.data?.profile_image);
    }
  }, [isSuccess]);

  // const methods = useForm({
  //   mode: 'onSubmit',
  //   //resolver: zodResolver(UserDetails),
  // });

  const onSubmit = (_e) => {
    try {
      _e.preventDefault();
      UserDetails.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        if (errors?.length > 0) {
          errors.forEach((e) => {
            if (e.message !== '') {
              const field = `${e.path[0]}Err`;
              setState((prevState) => ({
                ...prevState,
                [field]: true, // Set error flag
                [`${e.path[0]}ErrMsg`]: e.message, // Set error message
              }));
            }
          });
        }
      }
      return;
    }
    handelSubmit(state);
  };

  const handelSubmit = async (data) => {
    try {
      setLoading(true);
      // const filelist = [e];

      const bodyFormData = new FormData();
      //let flag = false;

      bodyFormData.append(`mobile`, data?.mobile);
      bodyFormData.append(`email`, data?.email);
      bodyFormData.append(`pincode`, data?.pincode);
      bodyFormData.append(`address`, data?.address);
      bodyFormData.append(`full_name`, data?.name);
      if (avatarUrl) {
        bodyFormData.append(`profile_image`, avatarUrl);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_API_URL}profile/updateProfile`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('customerToken')}`,
          },
        }
      );

      if (res.status == 200) {
        toast.success('Your Profile has been successfully updated.');
        getData();

        const updateUser = { ...user };
        updateUser.profileImage = customerData?.data?.profile_image;
        dispatch(
          updateReduxState({
            key: 'user',
            value: updateUser,
          })
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value, //
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/* {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )} */}

            <Box sx={{ mb: 5 }}>
              <UploadAvatar
                value={avatarUrl}
                onDrop={handleDropAvatar}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(1048576)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                  shrink: true,
                }}
                helperText={t(state.nameErrMsg)}
                error={state.nameErr}
                label={t('Name')}
                margin="normal"
                name="name"
                onChange={handelChange}
                type="text"
                value={state.name}
                size="small"
                autoComplete="off"
              />
              <TextField
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                  shrink: true,
                }}
                helperText={t(state.mobileErrMsg)}
                error={state.mobileErr}
                label={t('Mobile')}
                margin="normal"
                name="mobile"
                onChange={handelChange}
                type="tel"
                value={state.mobile}
                size="small"
                autoComplete="off"
              />
              <TextField
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                  shrink: true,
                }}
                helperText={t(state.pincodeErrMsg)}
                error={state.pincodeErr}
                label={t('Pincode')}
                margin="normal"
                name="pincode"
                onChange={handelChange}
                type="tel"
                value={state.pincode}
                size="small"
                autoComplete="off"
              />
              <TextField
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                  shrink: true,
                }}
                helperText={t(state.emailErrMsg)}
                error={state.emailErr}
                label={t('Email')}
                margin="normal"
                name="email"
                onChange={handelChange}
                type="email"
                value={state.email}
                size="small"
                autoComplete="off"
              />
              <TextField
                fullWidth
                inputProps={{
                  autoComplete: 'off',
                  shrink: true,
                }}
                rows={4}
                multiline
                helperText={t(state.addressErrMsg)}
                error={state.addressErr}
                label={t('Address')}
                margin="normal"
                name="address"
                onChange={handelChange}
                type="text"
                value={state.address}
                size="small"
                autoComplete="off"
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                {'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
