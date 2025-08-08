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
import { VerifyEmailOTP, VerifyMobileOTP, VerifyWpOTP } from 'src/validation/auth';
import { toast } from 'src/components/snackbar';
import {
  useCheckEmailEnteredMutation,
  useVerifyOtpForRegistrationMutation,
} from 'src/redux/slices/customer/auth';
import { useRouter, usePathname } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';
export function SplitVerifyView() {
  const navigate = useNavigate();
  const router = useRouter();
  const [state, setState] = useState({
    mobileotp: '',
    mobileotpErr: false,
    mobileotpErrMsg: '',
    emailotp: '',
    emailotpErr: false,
    emailotpErrMsg: '',
    wpotp: '',
    wpotpErr: false,
    wpotpErrMsg: '',
  });
  const [checkEmail, { data: mailData }] = useCheckEmailEnteredMutation();
  const [otpRegister, { isLoading, error, isError, isSuccess, data }] =
    useVerifyOtpForRegistrationMutation();
  useEffect(() => {
    checkEmail();
  }, []);

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
      // VerifyMobileOTP.parse(state);
      if (mailData?.email) {
        VerifyEmailOTP.parse(state);
      }
      if (mailData?.isWhatsApp) {
        VerifyWpOTP.parse(state);
      }
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

    otpRegister({
      //mobile_otp: state.mobileotp,
      email_otp: state.emailotp == '' ? 0 : state.emailotp,
      //whatsapp_otp: state.wpotp == '' ? 0 : state.wpotp,
    });
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.error || error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data) {
        toast.success(data?.message);
        localStorage.clear();
        router.push(paths.customerAuth.signIn);
      }
    }
  }, [isSuccess, data]);
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      {/* <MuiOtpInput
        autoFocus
        gap={1.5}
        length={6}
        TextFieldsProps={{ error: !!state.mobileotpErr, placeholder: '-' }}
        value={state.mobileotp}
        name="mobileotp"
        type="number"
        onChange={(e) => {
          handelChange(e, 'mobileotp');
        }}
      />
      {state.mobileotpErr && (
        <FormHelperText sx={{ px: 2 }} error>
          {state.mobileotpErrMsg}
        </FormHelperText>
      )} */}
      {mailData?.email && (
        <>
          <FormHead
            icon={null}
            title="Please check your email!"
            description={`We've emailed a 6-digit confirmation code. \nPlease enter the code in the box below to verify your email.`}
          />
          <MuiOtpInput
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{ error: !!state.emailotpErr, placeholder: '-' }}
            value={state.emailotp}
            name="emailotp"
            type="number"
            onChange={(e) => {
              handelChange(e, 'emailotp');
            }}
          />
          {state.emailotpErr && (
            <FormHelperText sx={{ px: 2 }} error>
              {state.emailotpErrMsg}
            </FormHelperText>
          )}{' '}
        </>
      )}

      {mailData?.isWhatsApp && (
        <>
          <FormHead
            icon={null}
            title="Please check your whatsapp!"
            description={`We've send a 6-digit confirmation code. \nPlease enter the code in the box below to verify your whatsapp.`}
          />
          <MuiOtpInput
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{ error: !!state.wpotpErr, placeholder: '-' }}
            value={state.wpotp}
            name="wpotp"
            type="number"
            onChange={(e) => {
              handelChange(e, 'wpotp');
            }}
          />
          {state.wpotpErr && (
            <FormHelperText sx={{ px: 2 }} error>
              {state.wpotpErrMsg}
            </FormHelperText>
          )}{' '}
        </>
      )}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        Create Account
      </LoadingButton>
    </Box>
  );

  return (
    <Box>
      {/* <FormHead
        icon={null}
        title="Please check your mobile!"
        description={`We've sent a 6-digit OTP. \nPlease enter the OTP in the box below to verify your Mobile No.`}
      /> */}

      <Form onSubmit={validate}>{renderForm}</Form>

      {/* <FormResendCode onResendCode={() => {}} value={0} disabled={false} /> */}

      {/* <FormReturnLink href={paths.candidateAuthDemo.centered.signIn} /> */}
    </Box>
  );
}
