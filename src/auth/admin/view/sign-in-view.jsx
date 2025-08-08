import { paths } from 'src/routes/paths';
import { FormHead } from '../../components/form-head';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper,Container } from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { ZodError } from 'zod';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { SignUpSchema } from 'src/validation/auth';
import { useLoginMutation } from 'src/redux/slices/admin/auth';
import { toast } from 'src/components/snackbar';
import Tooltip from '@mui/material/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'src/routes/hooks';
import { setAuthUserState } from '../../../redux/slices/features-slice/user';

export function SplitSignInView() {
  const [state, setState] = useState({
    password: '',
    passwordErr: false,
    passwordErrMsg: '',
    username: '',
    usernameErr: false,
    usernameErrMsg: '',
    showPassword: false,
  });

  const { i18n, t } = useTranslation();
  const [handelSubmit, { isLoading, error, isError, isSuccess, data: loginData }] =
    useLoginMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  const togglePasswordVisibility = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const validate = (_e) => {
    _e.preventDefault();
    try {
      SignUpSchema.parse(state);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Validation Errors:', error.issues);
        error.issues.forEach((e) => {
          if (e.message !== '') {
            const field = `${e.path[0]}Err`;
            setState((prevState) => ({
              ...prevState,
              [field]: true,
              [`${e.path[0]}ErrMsg`]: e.message,
            }));
          } else {
            console.error('API Error:', error);
            toast.error(error?.data?.message || 'Something Went Wrong');
          }
        });
      }
      return;
    }

    handelSubmit({
      username: state.username,
      password: state.password,
        course_name: "march",

    });
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message|| "Login Failed. Please try again");
    }
  }, [isError, error]);

useEffect(() => {
  if (isSuccess && loginData) {
    console.log('Login Response:', loginData);
    const token = loginData?.data?.token;

    if (token) {
      localStorage.setItem('adminToken', token);
      console.log('Token saved in localStorage:', token);

      dispatch(
        setAuthUserState({
          isAuthenticated: 'authenticated',
          user: { id: loginData?.user?.id },
          token,
          isInitialized: true,
        })
      );

      toast.success(loginData?.message || 'Login Successful');
      router.push(paths.admin.root); // ✅ push after dispatch
    } else {
      toast.error('Token not found. Login failed.');
    }
  }
}, [isSuccess, loginData, dispatch, router]);





  const renderLogo = <AnimateLogo2 sx={{ mb: 1, mx: 'auto' }} />;

  return (
   
     <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
mt:12,
        background: 'linear-gradient(to right, #f3f3f3, #fdfdfd)',
      }}
    >
      {/* <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: 'center' }}> */}
      {renderLogo}
      <FormHead
        title="Sign in to your Admin account"
        // description={
        //   <>
        //     {`Don't have an account? `}
        //     <Link component={RouterLink} href={paths.adminAuth.signUp} variant="subtitle2">
        //       Sign Up
        //     </Link>
        //   </>
        // }
      />

      <Box gap={3} display="flex" flexDirection="column">
        <form noValidate onSubmit={validate} autoComplete="off">
          <TextField
            helperText={t(state.usernameErrMsg)}
            error={state.usernameErr}
            autoFocus
            fullWidth
            margin="normal"
            name="username"
            onChange={(e) => {
              if (e.target.value?.length <= 30) {
                handelChange(e);
              }
            }}
            type="text"
            value={state.username}
            size="small"
            inputProps={{ autoComplete: 'off' }}
            label="username Id"
          />

          <TextField
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            helperText={t(state.passwordErrMsg)}
            error={state.passwordErr}
            label={t('Password')}
            margin="normal"
            name="password"
            onChange={handelChange}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    <Iconify
                      icon={state.showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  <FormHead
            title=""
            description={
              <>
                {`Are you forgot your password? `}
                <Link
                  component={RouterLink}
                  href={paths.adminAuth.resetPassword}
                  variant="subtitle2"
                >
                  Forgot password?
                </Link>
              </>
            }
          />
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Log In
          </LoadingButton>
        </form>
      </Box>
    {/* </Paper> */}
    </Box>
  );
}
