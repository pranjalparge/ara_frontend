import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { useChangePasswordMutation } from 'src/redux/slices/admin/adminDetails';
import { logout } from 'src/redux/slices/features-slice/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useSelector, useDispatch } from 'react-redux';
export const ChangePassWordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    newPassword: zod.string().min(1, { message: 'New password is required!' }),
    confirmNewPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'New password must be different than old password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match!',
    path: ['confirmNewPassword'],
  });

export function AccountChangePassword() {
  const oldPassword = useBoolean();
  const newPassword = useBoolean();
  const confirmNewPassword = useBoolean();
  const defaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues,
  });
  const [chnagePassword, { isLoading, isSuccess, data, error, isError }] =
    useChangePasswordMutation();

  const router = useRouter();

  const dispatch = useDispatch();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      chnagePassword({
        password: data?.newPassword,
        old_pass: data?.oldPassword,
      });
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      dispatch(logout());
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        <Field.Text
          name="oldPassword"
          type={oldPassword.value ? 'text' : 'password'}
          label="Old password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={oldPassword.onToggle} edge="end">
                  <Iconify icon={oldPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="newPassword"
          label="New password"
          type={newPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={newPassword.onToggle} edge="end">
                  <Iconify icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
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
          name="confirmNewPassword"
          type={confirmNewPassword.value ? 'text' : 'password'}
          label="Confirm new password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmNewPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmNewPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isLoading} sx={{ ml: 'auto' }}>
          Save changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
