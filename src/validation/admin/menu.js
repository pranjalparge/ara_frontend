import { z } from 'zod';

export const menuValidate = z.object({
  menuName: z.string().nonempty({ message: 'Please enter Item Name' }),
  description: z.string().nonempty({ message: 'Please enter Item Description' }),
  category: z.string().nonempty({ message: 'Please enter Item Category'}),
  price: z.string().nonempty({ message: 'Please enter Item Price' }),
  isActive: z.union([z.literal(0), z.literal(1)], {
    errorMap: () => ({ message: 'Please select a valid Item Status' }),
  }),
  isVeg: z.union([z.literal(2), z.literal(1)], {
    errorMap: () => ({ message: 'Please select a valid Item Type' }),
  }),
  foodTypes: z.string().nonempty({ message: 'Please enter Item Category'}),
});
