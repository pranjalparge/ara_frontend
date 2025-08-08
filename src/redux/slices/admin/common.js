import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    sendDeliveryMessage: builder.mutation({
      query: (body) => ({
        url: '/common/message/sendMessage',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const { useSendDeliveryMessageMutation } = authApi;
