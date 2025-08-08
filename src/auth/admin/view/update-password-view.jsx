import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { SentIcon } from 'src/assets/icons';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from '../../components/form-head';
import { FormResendCode } from '../../components/form-resend-code';
import { FormReturnLink } from '../../components/form-return-link';
import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';
import { useChangePasswordForForgotMutation } from 'src/redux/slices/admin/auth';
import { toast } from 'src/components/snackbar';
export const UpdatePasswordSchema = zod
  .object({
    otp : zod
      .string()
      .min(1, { message: 'Code is required!' })
      .min(6, { message: 'Code must be at least 6 characters!' }),

    password: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

export function SplitUpdatePasswordView() {
  const router = useRouter();
  const password = useBoolean();
  const confirmPassword = useBoolean();
  const defaultValues = {
    otp : '',
    password: '',
    confirmPassword: '',
  };
  const [changePassword, { isLoading, error, isError, isSuccess, data }] =
    useChangePasswordForForgotMutation();
  useEffect(() => {
    if (!localStorage.getItem('adminForgotToken')) {
      router.push(paths.adminAuth.resetPassword);
    }
  }, []);
  const methods = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      changePassword({ otp: data?.otp , password: data?.password });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      localStorage.clear();
      router.push(paths.adminAuth.signIn);
    }
  }, [isSuccess, data]);
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Code name="otp" />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={
          <Stack component="span" direction="row" alignItems="center">
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> The password must be
            between 7 to 15 characters which contain at least one uppercase letter, one lowercase
            letter, and one number.
          </Stack>
        }
      />

      <Field.Text
        name="confirmPassword"
        label="Confirm new password"
        type={confirmPassword.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmPassword.onToggle} edge="end">
                <Iconify
                  icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Update password..."
      >
        Update password
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<SentIcon />}
        title="Request sent successfully!"
        description={`We've sent a 6-digit OTP to your Mail id. \nPlease enter the OTP in below box to update Password.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

      <FormReturnLink href={paths.adminAuth.signIn} />
    </>
  );
}
