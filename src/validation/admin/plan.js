import { z } from 'zod';

export const planValidate = z.object({
    planName: z.string().nonempty({ message: 'Please enter Plan Name' }),
    description:  z.string().nonempty({ message: 'Please enter Plan Description' }),
    days: z.string().nonempty({message:'Please enter Plan Days'}),
    price: z.string().nonempty({ message: 'Please enter Item Price' }),
    isActive: z.union([z.literal(0), z.literal(1)], {
        errorMap: () => ({ message: "Please select a valid Item Status" }),
      }),
    isVeg: z.union([z.literal(0), z.literal(1)], {
        errorMap: () => ({ message: "Please select a valid Item Type" }),
      }),
});


