import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    getAllMenu: builder.mutation({
      query: (body) => ({
        url: `/masterController/getAllMenu?veg=${body.veg}&category_id=${body.category_id}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    getAllCategories: builder.mutation({
      query: (body) => ({
        url: 'api/blog/4pii/get',
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    addMenuItem: builder.mutation({
      query: (body) => ({
        url: '/admin/manageMenu/addMenuItem',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    createTodaysMenu: builder.mutation({
      query: (body) => ({
        url: '/admin/manageMenu/createTodaysMenu',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    getTodaysMenu: builder.mutation({
      query: (body) => ({
        url: `/admin/managemenu/getTodaysMenu?date=${body.date}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    getFoodTypes: builder.mutation({
      query: (body) => ({
        url: `/admin/food-types/getFoodTypes?type=${body?.type ?? ''}`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),

    updateFoodTypes: builder.mutation({
      query: (body) => ({
        url: '/admin/food-types/saveFoodTypes',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    getSubscriptionList: builder.mutation({
      query: (body) => {
        const token = localStorage.getItem('adminToken');
        return {
          url: `api/contactUs/get`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // body: body,
        };
      },
    }),

    updateSubscription: builder.mutation({
      query: (body) => ({
        url: '/admin/subscription/statusChange',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    getInstituteDashboard: builder.mutation({
      query: (body) => ({
        url: `araController/getinstitutedashboard?course_name=${body.id}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),

    getCandidateList: builder.mutation({
      query: (body) => ({
        url: `araController/getcandidateList?course_name=${body.course_name}&choicecode=${body.choicecode}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
      getProcessingPayment: builder.mutation({
      query: (body) => ({
        url: `araController/getpaymentstatus?course_name=${body.course_name}&status=${body.status}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
        getDocumentList: builder.mutation({
      query: (body) => ({
        url: `/araController/getDocList?course_name=${body.course_name}&user_id=${body.user_id}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),
    deleteAdminList: builder.mutation({
      query: (body) => ({
        url: `api/userDetails/deleteuser`,
        method: 'DELETE',
        body: body,
      }),
    }),

    getCustomerList: builder.mutation({
      query: (body) => ({
        url: '/admin/users/customerList',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),

    getPaymentList: builder.mutation({
      query: (body) => ({
        url: '/admin/payment/list',
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),

    getOrderList: builder.mutation({
      query: (body) => ({
        url: `/admin/manageMenu/getTodayOrders?type=${body.type}`,
        method: 'GET',
      }),
    }),
    getDeliveryStatus: builder.mutation({
      query: (body) => ({
        url: '/masterController/getDeliveryStatus',
        method: 'GET',
      }),
    }),

    updateDeliveryStatus: builder.mutation({
      query: (body) => ({
        url: '/admin/manageMenu/statusDeliveryChange',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    getSingelMenu: builder.mutation({
      query: (body) => ({
        url: `/admin/managemenu/getTodaysMenuForId?item_id=${body.id}`,
        method: 'GET',
      }),
    }),
    getSingelDelete: builder.mutation({
      query: (body) => ({
        url: `/admin/managemenu/deleteTodaysMenuForId`,
        method: 'POST',
        body: body,
      }),
    }),

    getBlogDetailsfpii: builder.mutation({
      query: (body) => ({
        url: `api/blog/4pii/get`,
        method: 'GET',
      }),
    }),
    postBlogDetailsfpii: builder.mutation({
      query: (body) => ({
        url: `api/blog/4pii/create`,
        method: 'POST',
        body: body,
      }),
    }),
    editBlogDetailsfpii: builder.mutation({
      query: (body) => ({
        url: `api/blog/4pii/edit`,
        method: 'PUT',
        body: body,
      }),
    }),

    deleteBlogDetailsfpii: builder.mutation({
      query: (body) => ({
        url: `api/blog/4pii/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),

    //llc
    getBlogDetailsllc: builder.mutation({
      query: (body) => ({
        url: `api/blog/LLc/get`,
        method: 'GET',
      }),
    }),

    deleteBlogDetailsllc: builder.mutation({
      query: (body) => ({
        url: `/api/blog/LLc/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),

    editBlogDetailsllc: builder.mutation({
      query: (body) => ({
        url: `/api/blog/LLc/edit`,
        method: 'PUT',
        body: body,
      }),
    }),

    //saas

    getBlogDetailssaas: builder.mutation({
      query: (body) => ({
        url: `api/blog/saas/get`,
        method: 'GET',
      }),
    }),
    getApp: builder.mutation({
      query: (body) => ({
        url: `api/fpii/homepageRoutes/app/get`,
        method: 'GET',
      }),
    }),
    editApp: builder.mutation({
      query: (body) => ({
        url: `api/fpii/homepageRoutes/app/edit`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteApp: builder.mutation({
      query: (body) => ({
        url: `api/fpii/homepageRoutes/app/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),

    getBrand: builder.mutation({
      query: (body) => ({
        url: `api/brandCreation/get`,
        method: 'GET',
      }),
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        url: 'api/brandCreation/post',
        method: 'POST',
        body: body,
      }),
    }),
    editBrand: builder.mutation({
      query: (body) => ({
        url: `api/brandCreation/update`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteBrand: builder.mutation({
      query: (body) => ({
        url: `api/brandCreation/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),
    getSeoStatus: builder.mutation({
      query: (url) => ({
        url: `api/statusBar/get`,
        method: 'GET',
        params: { url },
      }),
    }),
  }),
});

export const {
  useGetAllMenuMutation,
  useGetBlogDetailsllcMutation,
  useGetAllCategoriesMutation,
  useAddMenuItemMutation,
  useCreateTodaysMenuMutation,
  useGetTodaysMenuMutation,
  useGetFoodTypesMutation,
  useUpdateFoodTypesMutation,
  useGetSubscriptionListMutation,
  useUpdateSubscriptionMutation,
  useGetInstituteDashboardMutation,
  useGetCandidateListMutation,
  useDeleteAdminListMutation,
  useGetCustomerListMutation,
  useGetPaymentListMutation,
  useGetOrderListMutation,
  useGetDeliveryStatusMutation,
  useUpdateDeliveryStatusMutation,
  useGetSingelMenuMutation,
  useGetSingelDeleteMutation,
  useGetBlogDetailsfpiiMutation,
  usePostBlogDetailsfpiiMutation,
  useEditBlogDetailsfpiiMutation,
  useDeleteBlogDetailsfpiiMutation,
  useDeleteBlogDetailsllcMutation,

  useGetDocumentListMutation,
  useGetBlogDetailssaasMutation,
  useEditBlogDetailsllcMutation,

  useGetAppMutation,
  useEditAppMutation,
  useDeleteAppMutation,

  useGetBrandMutation,
  useCreateBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,

  useGetSeoStatusMutation,
} = authApi;
