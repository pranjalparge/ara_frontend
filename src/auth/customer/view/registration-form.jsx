import { ZodError } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'src/components/snackbar';
import {
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Switch,
  FormControlLabel,
  Stack,
} from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useTranslation } from 'react-i18next';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import FormControl from '@mui/material/FormControl';
import { registerValidate, mobileValidate, emailValidate } from 'src/validation/auth';
import {
  useRegisterCandidateMutation,
  useCheckPhoneNumberMutation,
  useCheckEmailMutation,
  useGetHealthIssuesMutation,
  useGetDistrictMutation,
} from 'src/redux/slices/customer/auth';

export function RegistrationForm({ navigate }) {
  const [state, setState] = useState({
    fullName: '',
    fullNameErr: false,
    fullNameErrMsg: '',
    districtCode: 0,
    districtCodeErr: false,
    districtCodeErrMsg: '',
    healthIssueCode: 0,
    healthIssueCodeErr: false,
    healthIssueCodeErrMsg: '',
    isWhatsApp: 0,
    isWhatsAppErr: false,
    isWhatsAppErrMsg: '',
    newpassword: '',
    newpasswordErr: false,
    newpasswordErrMsg: '',
    confirmpassword: '',
    confirmpasswordErr: false,
    confirmpasswordErrMsg: '',
    phone: '',
    phoneErr: false,
    phoneErrMsg: '',
    email: '',
    emailErr: false,
    emailErrMsg: '',
    showConfirmPassword: false,
    pincode: '',
    pincodeErr: false,
    pincodeErrMsg: '',
    address: '',
    addressErr: false,
    addressErrMsg: '',
  });

  const { i18n, t } = useTranslation();
  const [register, { isLoading, error, isError, isSuccess, data }] = useRegisterCandidateMutation();
  const [
    handleGetDistrict,
    {
      isLoading: distisloading,
      data: distData,
      isError: distIsError,
      isSuccess: distIsSuccess,
      error: distError,
    },
  ] = useGetDistrictMutation();
  const [
    handleGetHealthIssue,
    { isLoading: healthLoading, data: healthData, isError: healthIsError },
  ] = useGetHealthIssuesMutation();
  const [checkMobileNumber] = useCheckPhoneNumberMutation();

  const [checkEmail] = useCheckEmailMutation();

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setState({
      ...state,
      showConfirmPassword: !state.showConfirmPassword,
    });
  };

  const validate = (_e) => {
    _e.preventDefault();
    try {
      // if (captcha?.trim() == '') {
      //   toast.error('Please fill the captcha');
      //   return;
      // }
      if (state?.email?.trim() == '') {
        toast.error('Please enter email address');
        return;
      }
      registerValidate.parse(state);
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

    register({
      mobile: state.phone,
      password: state.confirmpassword,
      email: state.email,
      fullname: state.fullName,
      districtCode: state.districtCode,
      healthIssueCode: state.healthIssueCode,
      isWhatsApp: state.isWhatsApp,
      address: state.address,
      pincode: state.pincode,
    });
    /* api call */
  };

  const checkPhoneNumber = async () => {
    try {
      mobileValidate.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== '') {
              const field = error.path[0] + 'Err';

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: t(error.message),
              }));
            }
          });
      }
      return;
    }

    try {
      const data = await checkMobileNumber({ mobile: state.phone });

      if (data?.data?.isAvailable == 1) {
        setState((_prevState) => ({
          ..._prevState,

          phoneErr: false,
          phoneErrMsg: data.data?.message,
        }));
        toast.success(data?.data?.message);
      } else {
        setState((_prevState) => ({
          ..._prevState,

          phoneErr: true,
          phoneErrMsg: data?.error?.data?.message,
        }));
        toast.error(data?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailAddress = async () => {
    try {
      emailValidate.parse(state);
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== '') {
              const field = error.path[0] + 'Err';

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: t(error.message),
              }));
            }
          });
      }
      return;
    }

    try {
      const data = await checkEmail({ email: state.email });
      if (data?.data?.isAvailable == 1) {
        setState((_prevState) => ({
          ..._prevState,

          emailErr: false,
          emailErrMsg: data.data?.message,
        }));
        toast.success(data?.data?.message);
      } else {
        setState((_prevState) => ({
          ..._prevState,

          emailErr: true,
          emailErrMsg: data?.error?.data?.message,
        }));
        toast.error(data?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForHealth = (event) => {
    setState({ healthIssueCode: event.target.value });
  };

  useEffect(() => {
    localStorage.removeItem('customerRegistrationToken');
    handleGetHealthIssue();
    handleGetDistrict();
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
      localStorage.removeItem('customerRegistrationToken');
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.data?.token) {
        localStorage.setItem('customerRegistrationToken', data?.data?.token);
        toast.success(data?.message);
        navigate();
      }
    }
  }, [isSuccess, data]);

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  return (
    <>
      <Box gap={1} display="flex" flexDirection="column">
        <form
          noValidate
          onSubmit={validate}
          autoComplete="off"
          //   {...props}
        >
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true, required: true }}
            inputProps={{
              autoComplete: 'off',
            }}
            helperText={t(state.fullNameErrMsg)}
            error={state.fullNameErr}
            label={t('Full Name')}
            margin="normal"
            name="fullName"
            onChange={handelChange}
            type="text"
            value={state.fullName}
            size="small"
            autoComplete="off"
          />
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              fullWidth
              inputProps={{
                autoComplete: 'off',
              }}
              helperText={state.emailErrMsg}
              error={state.emailErr}
              label={'Email Id'}
              margin="normal"
              name="email"
              onChange={handelChange}
              onBlur={checkEmailAddress}
              type="email"
              value={state.email}
              size="small"
              autoComplete="off"
              onFocus={() => {
                setState((_prevState) => ({
                  ..._prevState,

                  emailErr: false,
                  emailErrMsg: '',
                }));
              }}
            />
          </Box>
          <Box display="flex" gap={{ xs: 3, sm: 1 }} flexDirection={{ xs: 'column', sm: 'row' }}>
            <FormControl sx={{ minWidth: 120 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">District Code</InputLabel>
              <Select
                required
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state.districtCode}
                error={state.districtCodeErr}
                name="districtCode"
                label="District Code"
                onChange={handelChange}
              >
                {distData &&
                  distData?.data?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText error>{state.districtCodeErrMsg}</FormHelperText>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Health Issue</InputLabel>
              <Select
                InputLabelProps={{ shrink: true, required: true }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state.healthIssueCode}
                error={state.healthIssueCodeErr}
                name="healthIssueCode"
                label="Health Issue"
                onChange={handelChange}
              >
                {healthData &&
                  healthData?.data?.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText error>{state.healthIssueCodeErrMsg}</FormHelperText>
            </FormControl>
          </Box>
          {/* <Box
            Box
            display="flex"
            gap={{ xs: 3, sm: 1 }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <FormControlLabel
                control={
                  <Switch
                    name="isactive"
                    checked={state.isWhatsApp}
                    error={state.isWhatsAppErr}
                    onChange={() =>
                      setState((old) => ({ ...old, isWhatsApp: old.isWhatsApp == 1 ? 0 : 1 }))
                    }
                  />
                }
              />
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Do you want to get Updates on WhatsApp
            </Typography>
          </Box> */}

          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(state.phoneErrMsg)}
            error={state.phoneErr}
            label={'Mobile No'}
            margin="normal"
            name="phone"
            onChange={(e) => {
              if (e.target.value?.length <= 10) {
                handelChange(e);
              }
            }}
            onBlur={checkPhoneNumber}
            type="number"
            value={state.phone}
            size="small"
            onFocus={() => {
              setState((_prevState) => ({
                ..._prevState,

                phoneErr: false,
                phoneErrMsg: '',
              }));
            }}
          />
          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            InputLabelProps={{ shrink: true, required: true }}
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
          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(state.pincodeErrMsg)}
            error={state.pincodeErr}
            label={t('Pincode')}
            margin="normal"
            name="pincode"
            onChange={handelChange}
            type="number"
            value={state.pincode}
            size="small"
            autoComplete="off"
          />
          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(state.newpasswordErrMsg)}
            error={state.newpasswordErr}
            label={t('New Password')}
            margin="normal"
            name="newpassword"
            onChange={handelChange}
            type="password"
            value={state.newpassword}
            size="small"
            autoComplete="off"
          />

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> The password must be
            between 7 to 15 characters which contain at least one uppercase letter, one lowercase
            letter, and one number.
          </Typography>

          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(state.confirmpasswordErrMsg)}
            error={state.confirmpasswordErr}
            label={t('Confirm Password')}
            margin="normal"
            name="confirmpassword"
            onChange={handelChange}
            type={state.showConfirmPassword ? 'text' : 'password'}
            value={state.confirmpassword}
            size="small"
            autoComplete="off"
            InputProps={{
              // Adding InputProps for the input customization
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    <Iconify
                      icon={state.showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Send OTP
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}
