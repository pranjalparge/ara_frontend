import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getAllPlanList: builder.mutation({
      query: () => {
        const token = localStorage.getItem('adminToken'); // Retrieve the token
        return {
          url: `api/jobapplication/4pii/get`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        };
      },
    }),

    //4pii
    getContact: builder.mutation({
      query: () => {
        const token = localStorage.getItem('adminToken'); // Retrieve the token
        return {
          url: `api/contactUs/get`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
        };
      },
    }),
    getJobDetails: builder.mutation({
      query: (body) => ({
        url: `api/careerNewfrontendRoutes/fpii/get`,
        method: 'GET',
      }),
    }),
    deleteJobDetails: builder.mutation({
      query: (body) => ({
        url: `api/careerNewfrontendRoutes/fpii/deleteJobs`,
        method: 'DELETE',
        body: body,
      }),
    }),
    editJobDetails: builder.mutation({
      query: (body) => ({
        url: `api/careerNewfrontendRoutes/fpii/updateJobs`,
        method: 'PUT',
        body: body,
      }),
    }),

    //saas
    getJobDetailsSaas: builder.mutation({
      query: (body) => ({
        url: `api/new_career/saas/get`,
        method: 'GET',
      }),
    }),
    deleteJobDetailsSaas: builder.mutation({
      query: (body) => ({
        url: `api/new_career/saas/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),
    editJobDetailsSaas: builder.mutation({
      query: (body) => ({
        url: `api/new_career/saas/edit`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllPlanListMutation,
  useGetContactMutation,
  useGetJobDetailsMutation,
  useDeleteJobDetailsMutation,
  useEditJobDetailsMutation,
  useGetJobDetailsSaasMutation,
  useDeleteJobDetailsSaasMutation,
  useEditJobDetailsSaasMutation,
} = authApi;
