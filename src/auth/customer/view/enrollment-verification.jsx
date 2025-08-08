import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';
import { ZodError } from 'zod';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo2 } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { SignUpSchema } from 'src/validation/auth';
import { useEnrollmentAuthenticationMutation } from 'src/redux/slices/customer/auth';
import { toast } from 'src/components/snackbar';
export function EnrollForm({ navigate }) {
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
  const [verifyEnrollId, { isLoading, error, isError, isSuccess, data }] =
    useEnrollmentAuthenticationMutation();

  const navigation = useNavigate();

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

    verifyEnrollId({
      enrollmentNo: state.enrollId,
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
    localStorage.clear();
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
      localStorage.removeItem('verifyToken');
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.data?.token) {
        localStorage.setItem('verifyToken', data?.data?.token);
        toast.success(data?.message);
        navigate();
      }
    }
  }, [isSuccess, data]);

  return (
    <>
      <Box gap={3} display="flex" flexDirection="column">
        <form
          noValidate
          onSubmit={validate}
          autoComplete="off"
          //   {...props}
        >
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              helperText={t(state.enrollIdErrMsg)}
              error={state.enrollIdErr}
              autoFocus
              fullWidth
              margin="normal"
              name="enrollId"
              onChange={(e) => {
                if (e.target.value?.length <= 11) {
                  handelChange(e);
                }
              }}
              type="number"
              value={state.enrollId}
              size="small"
              inputProps={{
                autoComplete: 'off',
              }}
              label="Enroll Id"
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
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Verify Enroll Id
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}
