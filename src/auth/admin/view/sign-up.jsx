import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { toast } from 'src/components/snackbar';
import { ZodError } from 'zod';
import { FormHead } from '../../components/form-head';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import { useRouter} from 'src/routes/hooks';
import { Box, TextField, Typography, InputAdornment, IconButton, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { LoadingButton } from '@mui/lab';
import { registerValidate } from 'src/validation/auth'; // Schema validation
import { useRegisterCandidateMutation } from 'src/redux/slices/admin/auth';

export function RegistrationForm({ navigate }) {
  const [state, setState] = useState({
    fullname: '',
    password: '',
    confirmpassword: '',
    phone: '',
    email: '',
    showConfirmPassword: false,
  });

  const [errorState, setErrorState] = useState({
    fullname: '',
    password: '',
    confirmpassword: '',
    phone: '',
    email: '',
  });

  const { i18n, t } = useTranslation();
  const [register, { isLoading, error, isError, isSuccess, data }] = useRegisterCandidateMutation();
 const router = useRouter();
  const handelChange = (_event) => {
    setState((prevState) => ({
      ...prevState,
      [_event.target.name]: _event.target.value,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setState({
      ...state,
      showConfirmPassword: !state.showConfirmPassword,
    });
  };

  const validate = async (_e) => {
    _e.preventDefault();
    // Reset errors
    setErrorState({
      fullname: '',
      password: '',
      confirmpassword: '',
      phone: '',
      email: '',
    });

    try {
      registerValidate.parse(state); // This will handle password confirmation match automatically
      // Proceed with API call after validation
      const response = await register({
        phone: state.phone,
        password: state.password,
        email: state.email,
        fullname: state.fullname,
      }).unwrap(); // Unwrap to get the actual response

      // Show success message and redirect to sign-in page if registration is successful

    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation Errors:', error.issues);
        error.issues.forEach((e) => {
          setErrorState((prevState) => ({
            ...prevState,
            [e.path[0]]: e.message,
          }));
        });
      } else {
        console.error('API Error:', error);
        toast.error(error?.data?.message || 'Registration failed');
      }
    }
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message || 'Something went wrong. Please try again.');
      localStorage.removeItem('customerRegistrationToken');
    }
  }, [isError, error]);


  useEffect(() => {
    console.log("Effect running, isSuccess:", isSuccess, "data:", data);
  
    if (isSuccess && data) {
      const regitoken = data?.token;
  
      if (regitoken) {
        console.log("Token Found:", regitoken);
  
        try {
          localStorage.setItem("AdminRegistrationToken", regitoken);
          console.log("Token stored in localStorage:", localStorage.getItem("AdminRegistrationToken"));
        } catch (error) {
          console.error("Error storing token in localStorage:", error);
        }
  
        toast.success(data?.message);
  
        // Delay navigation to ensure storage
        setTimeout(() => {
          router.push(paths.adminAuth.TwoFactorVerify);
        }, 500);
      } else {
        console.warn("Token not found in API response");
      }
    }
  }, [isSuccess, data]);
  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  return (
    <>
    
      <FormHead
        title="Sign up to your Admin account"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.adminAuth.signIn} variant="subtitle2">
              Sign In
            </Link>
          </>
        }
      />

      <Box  display="flex" flexDirection="column">
        <form noValidate onSubmit={validate} autoComplete="off">
          {/* Full Name Field */}
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true, required: true }}
            inputProps={{ autoComplete: 'off' }}
            helperText={t(errorState.fullname)}
            error={Boolean(errorState.fullname)}
            label={t('Full Name')}
            margin="normal"
            name="fullname"
            onChange={handelChange}
            type="text"
            value={state.fullname}
            size="small"
            autoComplete="off"
          />

          {/* Email Field */}
          <TextField
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            helperText={errorState.email}
            error={Boolean(errorState.email)}
            label={'Email Id'}
            margin="normal"
            name="email"
            onChange={handelChange}
            type="email"
            value={state.email}
            size="small"
            autoComplete="off"
            onFocus={() => setErrorState((prevState) => ({ ...prevState, email: '' }))}
          />

          {/* Phone Field */}
          <TextField
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(errorState.phone)}
            error={Boolean(errorState.phone)}
            label={'Phone No'}
            margin="normal"
            name="phone"
            onChange={(e) => {
              if (e.target.value?.length <= 10) {
                handelChange(e);
              }
            }}
            type="number"
            value={state.phone}
            size="small"
            onFocus={() => setErrorState((prevState) => ({ ...prevState, phone: '' }))}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(errorState.password)}
            error={Boolean(errorState.password)}
            label={t('Password')}
            margin="normal"
            name="password"
            onChange={handelChange}
            type="password"
            value={state.password}
            size="small"
            autoComplete="off"
          />

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> The password must be
            between 7 to 15 characters, containing at least one uppercase letter, one lowercase
            letter, and one number.
          </Typography>

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={t(errorState.confirmpassword)}
            error={Boolean(errorState.confirmpassword)}
            label={t('Confirm Password')}
            margin="normal"
            name="confirmpassword"
            onChange={handelChange}
            type={state.showConfirmPassword ? 'text' : 'password'}
            value={state.confirmpassword}
            size="small"
            autoComplete="off"
            InputProps={{
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

          {/* Submit Button */}
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Register
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}