import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    
      changePassword: builder.mutation({
        query: (body) => ({
          url: '/api/user/changeAdminPassword',
          method: 'POST',
          body: body,
          // credentials: 'include',
        }),
      }),
      allMessages: builder.mutation({
        query: (body) => ({
          url: '/candidate/allMessages',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      allActivities: builder.mutation({
        query: (body) => ({
          url: '/candidate/allActivities',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      markAsReadMessages: builder.mutation({
        query: (body) => ({
          url: '/candidate/markAsReadMessages',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),
  }),
});

export const {
 useCandidateProfileMutation,useChangePasswordMutation,useAllMessagesMutation,useAllActivitiesMutation,useMarkAsReadMessagesMutation
} = authApi;
