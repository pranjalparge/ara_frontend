import { ZodError } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useState, useEffect } from 'react';
import { Box, FormHelperText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { EmailInboxIcon } from 'src/assets/icons';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from '../../components/form-head';
import { FormResendCode } from '../../components/form-resend-code';
import { FormReturnLink } from '../../components/form-return-link';
import { OTP } from 'src/validation/auth';
import { toast } from 'src/components/snackbar';
import { useVerifyTwoFactorOtpMutation } from 'src/redux/slices/customer/auth';
import { useRouter, usePathname } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUserState } from '../../../redux/slices/features-slice/user';

export function TwoFactorVerify() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    otp: '',
    otpErr: false,
    otpErrMsg: '',
  });

  const [otpVerify, { isLoading, error, isError, isSuccess, data }] =
    useVerifyTwoFactorOtpMutation();

  const handelChange = (_event, name) => {
    setState((_prevState) => ({
      ..._prevState,
      [name]: _event,
      [`${name}Err`]: false,
      [`${name}ErrMsg`]: '',
    }));
  };
  const validate = (_e) => {
    _e.preventDefault();
    try {
      OTP.parse(state);

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

    otpVerify({
      otp: state.otp,
    });
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.data?.token) {
        toast.success(data?.message);
        localStorage.setItem('customerToken', data?.data?.token);
        dispatch(
          setAuthUserState({
            isAuthenticated: 'authenticated',
            user: {
              id: data?.data?.id,
            },
            isInitialized: true,
          })
        );
        router.push(paths.customer.root);
      }
    }
  }, [isSuccess, data]);
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <MuiOtpInput
        autoFocus
        gap={1.5}
        length={6}
        TextFieldsProps={{ error: !!state.otpErr, placeholder: '-' }}
        value={state.otp}
        name="otp"
        type="number"
        onChange={(e) => {
          handelChange(e, 'otp');
        }}
      />
      {state.otpErr && (
        <FormHelperText sx={{ px: 2 }} error>
          {state.otpErrMsg}
        </FormHelperText>
      )}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Submit
      </LoadingButton>
    </Box>
  );

  return (
    <Box>
      <FormHead
        icon={null}
        title="Please check your two factor authentication app!"
        description={`Diplaying MSBTE 6-digit OTP. \nPlease enter the OTP in the box below to login your Account.`}
      />

      <Form onSubmit={validate}>{renderForm}</Form>
    </Box>
  );
}
