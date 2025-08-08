import { apiSliceCustomer } from '../customerApiSlice';

export const authApi = apiSliceCustomer.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    candidateProfile: builder.mutation({
        query: (body) => ({
          url: '/customer/customerProfile',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),
      changePassword: builder.mutation({
        query: (body) => ({
          url: '/customer/changePassword',
          method: 'POST',
          body: body,
          // credentials: 'include',
        }),
      }),
      allMessages: builder.mutation({
        query: (body) => ({
          url: '/profile/allMessages',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      allActivities: builder.mutation({
        query: (body) => ({
          url: '/profile/allActivities',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      markAsReadMessages: builder.mutation({
        query: (body) => ({
          url: '/profile/markAsReadMessages',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      getDashboardData: builder.mutation({
        query: (body) => ({
          url: '/profile/getDashboardData',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      getConsumedCalories: builder.mutation({
        query: (body) => ({
          url: '/profile/getConsumedCalories',
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),
  }),
});

export const {
 useCandidateProfileMutation,useChangePasswordMutation,useAllMessagesMutation,useAllActivitiesMutation,useMarkAsReadMessagesMutation,useGetDashboardDataMutation,useGetConsumedCaloriesMutation
} = authApi;
