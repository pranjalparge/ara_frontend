import { z } from 'zod';
export const ABCID = z.object({
    phone: z
    .string()
    .nonempty({ message: 'Please enter the phone number' })
    .min(10, 'Please enter the valid phone number')
    .max(10, 'Please enter the valid phone number'),

    addhar: z
      .string()
      .nonempty({ message: 'Please enter the addhar number' })
      .min(12, 'Please enter the valid addhar number')
      .max(12, 'Please enter the valid aadhar number'),

      name: z.string().superRefine((val, ctx) => {
        if (val.trim() === '') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,

                message: 'Please enter  Fullname',
                fatal: true,
            });
            return z.NEVER;
        }
        const regex = /^[A-Za-z' ]{2,}$/;

        if (!regex.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please enter valid name as per addhar',
            });
        }
    }),
    dob: z.string().nonempty({ message: 'Please enter the BirthDate as per Addhar' }),
	gender: z.string().nonempty({ message: 'Fill the Gender' }),
        //name: z.string().nonempty({ message: 'Please enter the Fullname' }),

  }); 
