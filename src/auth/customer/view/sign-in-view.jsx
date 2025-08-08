import { paths } from 'src/routes/paths';
import { FormHead } from '../../components/form-head';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
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
import { useLoginMutation } from 'src/redux/slices/customer/auth';
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
    enrollId: '',
    enrollIdErr: false,
    enrollIdErrMsg: '',
    showPassword: false,
  });
  const { i18n, t } = useTranslation();
  const [handelSubmit, { isLoading, error, isError, isSuccess, data: loginData }] =
    useLoginMutation();

  // const navigation = useNavigate();
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
      /* api call */
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        if (errors?.length > 0) {
          // Use an if statement instead of '&&'
          errors.forEach((e) => {
            if (e.message !== '') {
              const field = `${e.path[0]}Err`; // Field name construction
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

    handelSubmit({
      mobile: state.enrollId,
      password: state.password,
    });

    /* api call */
  };
  // toast.promise({
  //   loading: 'Loading',
  //   success: 'Got the data',
  //   error: 'Error when fetching',
  // });
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && loginData) {
      if (loginData?.data?.token) {
        localStorage.setItem('customerToken', loginData?.data?.token);
        toast.success(loginData?.message);

        if (loginData?.data?.isTwoFactor) {
          router.push(paths.customerAuth.TwoFactorVerify);
        } else {
          // Dispatch the authentication state
          dispatch(
            setAuthUserState({
              isAuthenticated: 'authenticated',
              user: {
                id: loginData?.data?.id,
              },
              isInitialized: true,
            })
          );

          router.push(paths.customer.root); //
          // // Check the subscription_plan and redirect accordingly
          // if (loginData?.data?.subscription_plan === 0) {
          //   router.push(paths.customer.root); // Redirect to pricing if subscription_plan is 0
          // } else {
          //   router.push(); // Redirect to menu if subscription_plan is not 0
          // }
        }
      }
    }
  }, [isSuccess, loginData]);

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: 'auto' }} />;

  return (
    <>
      {renderLogo}

      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.customerAuth.signUp} variant="subtitle2">
              Sign Up
            </Link>
          </>
        }
      />
      <Box gap={3} display="flex" flexDirection="column">
        <form
          noValidate
          onSubmit={validate}
          autoComplete="off"
          //   {...props}
        >
          <Box gap={1.5} display="flex" flexDirection="column">
            <TextField
              helperText={t(state.enrollIdErrMsg)}
              error={state.enrollIdErr}
              autoFocus
              fullWidth
              margin="normal"
              name="enrollId"
              onChange={(e) => {
                handelChange(e);
              }}
              type="text"
              value={state.enrollId}
              size="small"
              inputProps={{
                autoComplete: 'off',
              }}
              label="Email Id/ Mobile No"
            />
          </Box>

          <TextField
            fullWidth
            inputProps={{
              autoComplete: 'off',
            }}
            helperText={t(state.passwordErrMsg)}
            error={state.passwordErr}
            label={t('Password')}
            margin="normal"
            name="password"
            onChange={handelChange}
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            size="small"
            autoComplete="off"
            InputProps={{
              // Adding InputProps for the input customization
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    <Iconify icon={state.password ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
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
                  href={paths.customerAuth.resetPassword}
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
    </>
  );
}
