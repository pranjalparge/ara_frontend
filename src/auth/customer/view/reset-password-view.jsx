import { z as zod } from 'zod';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { PasswordIcon } from 'src/assets/icons';
import { ZodError } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import { Box, TextField } from '@mui/material';
import { FormHead } from '../../components/form-head';
import { FormReturnLink } from '../../components/form-return-link';
import { resetPasswordVerfication } from 'src/validation/auth';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordOTPMutation } from 'src/redux/slices/customer/auth';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
export function SplitResetPasswordView() {
  const router = useRouter();
  const [state, setState] = useState({
    mobile: '',
    mobileErr: false,
    mobileErrMsg: '',
    // enrollId: '',
    // enrollIdErr: false,
    // enrollIdErrMsg: '',
  });
  const { i18n, t } = useTranslation();
  const [verifyEnrollId, { isLoading, error, isError, isSuccess, data }] =
    useForgotPasswordOTPMutation();

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: '',
    }));
  };

  const validate = (_e) => {
    _e.preventDefault();
    try {
      resetPasswordVerfication.parse(state);
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
      //enrollmentNo: Number(state.enrollId),
      mobile: state.mobile,
    });

    /* api call */
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.data?.token) {
        localStorage.setItem('customerForgotToken', data?.data?.token);
        toast.success(data?.message);
        router.push(paths.customerAuth.updatePassword);
      }
    }
  }, [isSuccess, data]);

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Forgot your password?"
        description={`Please enter the Mobile/ Email id reset your password.`}
      />

      <form
        noValidate
        onSubmit={validate}
        autoComplete="off"
        //   {...props}
      >
        {/* <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
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
            label="Email/ Mobile"
          />
        </Box> */}
        <TextField
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
          helperText={t(state.mobileErrMsg)}
          error={state.mobileErr}
          label={t('Mobile/ Email')}
          margin="normal"
          name="mobile"
          onChange={handelChange}
          type={'text'}
          value={state.mobile}
          size="small"
          autoComplete="off"
        />
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Verify
        </LoadingButton>
      </form>

      <FormReturnLink href={paths.customerAuth.signIn} />
    </>
  );
}
