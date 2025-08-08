import { apiSliceCustomer } from '../customerApiSlice';

export const authApi = apiSliceCustomer.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getAllPlanList: builder.mutation({
        query: (body) => ({
          url: `/admin/managemenu/getAllPlanList?veg=${body.veg}`,
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),
      getAllPlannedMenu: builder.mutation({
        query: (body) => ({
          url: `/order/getAllPlannedMenu`,
          method: 'GET',
          //body: body,
          // credentials: 'include',
        }),
      }),

      saveDailyFood: builder.mutation({
        query: (body) => ({
          url: `/order/saveDailyFood`,
          method: 'POST',
          body: body,
          // credentials: 'include',
        }),
      }),

  }),
});

export const {
 useGetAllPlanListMutation,useGetAllPlannedMenuMutation,useSaveDailyFoodMutation
} = authApi;
