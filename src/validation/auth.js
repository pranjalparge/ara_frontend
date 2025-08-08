import { z } from 'zod';

export const SignUpSchema = z.object({
  username: z.string().nonempty({ message: 'Please enter Username' }),
  // .min(11, 'Please enter the valid Enroll Id')
  // .max(11, 'Please enter the valid Enroll Id '),
 password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password is too long (max 20 characters)')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
    ),
});

export const registerValidate = z
  .object({
    fullname: z.string().nonempty({ message: 'Please enter the Full Name' }),

   
    email: z.string().email({ message: 'Invalid email address' }).or(z.literal('')),
    phone: z
      .string()
      .nonempty({ message: 'Please enter the phone number' })
      .min(10, 'Please enter the valid phone number')
      .max(10, 'Please enter the valid phone number'),
      password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password is too long (max 16 characters)')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
      ),
      confirmpassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password is too long (max 16 characters)')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
      ),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Confirm password does't match",
    path: ['confirmpassword'],
  });

export const VerifyMobileOTP = z.object({
  mobileotp: z
    .string()
    .min(1, { message: 'OTP is required!' })
    .min(6, { message: 'OTP must be at least 6 digit!' }),
});

export const VerifyEmailOTP = z.object({
  emailotp: z
    .string()
    .min(1, { message: 'OTP is required!' })
    .min(6, { message: 'OTP must be at least 6 digit!' }),
});

export const VerifyWpOTP = z.object({
  wpotp: z
    .string()
    .min(1, { message: 'OTP is required!' })
    .min(6, { message: 'OTP must be at least 6 digit!' }),
});

export const mobileValidate = z.object({
  phone: z
    .string()
    .nonempty({ message: 'Please enter the phone number' })
    .min(10, 'Please enter the valid phone number')
    .max(10, 'Please enter the valid phone number'),
});
export const emailValidate = z.object({
  email: z.string().email().nonempty({ message: 'Please enter the email address' }),
});

export const OTP = z.object({
  otp: z
    .string()
    .min(1, { message: 'OTP is required!' })
    .min(6, { message: 'OTP must be at least 6 characters!' }),
});

export const resetPasswordVerfication = z.object({
  email:  z.string().email({ message: 'Invalid email address' }).or(z.literal('')),
   
});
