import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getAllPaymentRequests: builder.mutation({
      query: (body) => ({
        url: `/admin/subscription/getAllPaymentRequests?flag=${body.flag}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    updatePaymentStatus: builder.mutation({
        query: (body) => ({
          url: `/admin/subscription/updatePaymentStatus`,
          method: 'POST',
          body: body,
          // credentials: 'include',
        }),
      }),

   
  }),
});

export const { useGetAllPaymentRequestsMutation,useUpdatePaymentStatusMutation } = authApi;
