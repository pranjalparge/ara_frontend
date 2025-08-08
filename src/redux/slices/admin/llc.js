import { apiSliceAdmin } from '../adminApiSliceLlc';

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
      query: (body) => ({
        url: `/admin/subscription/list?type=${body.type}`,
        method: 'GET',
        // body: body,
        // credentials: 'include',
      }),
    }),

    updateSubscription: builder.mutation({
      query: (body) => ({
        url: '/admin/subscription/statusChange',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    getAdminList: builder.mutation({
      query: (body) => ({
        url: '/admin/users/getAdminLists',
        method: 'GET',
        // body: body,
        // credentials: 'include',
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
        url: `api/blog/LLc/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),

    editBlogDetailsllc: builder.mutation({
      query: (body) => ({
        url: `api/blog/LLc/edit`,
        method: 'PUT',
        body: body,
      }),
    }),

    getJobDetailsllc: builder.mutation({
      query: (body) => ({
        url: `api/jobapplication/llc/get`,
        method: 'GET',
      }),
    }),
    getContactllc: builder.mutation({
      query: (body) => ({
        url: `api/contactUs/llc/get`,
        method: 'GET',
      }),
    }),

    //saas
    getJobDetailssaas: builder.mutation({
      query: (body) => ({
        url: `api/jobapplication/saas/get`,
        method: 'GET',
      }),
    }),
    getBlogDetailssaas: builder.mutation({
      query: (body) => ({
        url: `api/blog/saas/get`,
        method: 'GET',
      }),
    }),

    deleteBlogDetailssaas: builder.mutation({
      query: (body) => ({
        url: `api/blog/saas/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),
    editBlogDetailssaas: builder.mutation({
      query: (body) => ({
        url: `/api/blog/saas/edit`,
        method: 'PUT',
        body: body,
      }),
    }),
    getContactsaas: builder.mutation({
      query: (body) => ({
        url: `api/contactUs/saas/get`,
        method: 'GET',
      }),
    }),

    //llp
    getBlogDetailsllp: builder.mutation({
      query: (body) => ({
        url: `api/blog/LLP/get`,
        method: 'GET',
      }),
    }),
    deleteBlogDetailsllp: builder.mutation({
      query: (body) => ({
        url: `api/blog/LLp/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),
    editBlogDetailsllp: builder.mutation({
      query: (body) => ({
        url: `api/blog/LLp/edit`,
        method: 'PUT',
        body: body,
      }),
    }),
    getContactllp: builder.mutation({
      query: (body) => ({
        url: `api/contactUs/llp/get`,
        method: 'GET',
      }),
    }),

    //krislin
    getBlogDetailskrislin: builder.mutation({
      query: (body) => ({
        url: `api/blog/krislin/get`,
        method: 'GET',
      }),
    }),
    deleteBlogDetailskrislin: builder.mutation({
      query: (body) => ({
        url: `api/blog/krislin/delete`,
        method: 'DELETE',
        body: body,
      }),
    }),
    editBlogDetailskrislin: builder.mutation({
      query: (body) => ({
        url: `api/blog/krislin/edit`,
        method: 'PUT',
        body: body,
      }),
    }),
    getPropertyDetailsKrislin: builder.mutation({
      query: (body) => ({
        url: `api/krislinProperty/get`,
        method: 'GET',
      }),
    }),
    editPropertyDetailskrislin: builder.mutation({
      query: (body) => ({
        url: `api/krislinProperty/update`,
        method: 'PUT',
        body: body,
      }),
    }),
    deletePropertyDetailskrislin: builder.mutation({
      query: (body) => ({
        url: `api/krislinProperty/delete`,
        method: 'PUT',
        body: body,
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
  useGetAdminListMutation,
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
  useGetJobDetailsllcMutation,
  useGetJobDetailssaasMutation,

  useEditBlogDetailssaasMutation,
  useDeleteBlogDetailssaasMutation,
  useGetBlogDetailssaasMutation,
  useEditBlogDetailsllcMutation,

  useGetBlogDetailsllpMutation,
  useDeleteBlogDetailsllpMutation,
  useEditBlogDetailsllpMutation,

  useGetBlogDetailskrislinMutation,
  useDeleteBlogDetailskrislinMutation,
  useEditBlogDetailskrislinMutation,
  useGetPropertyDetailsKrislinMutation,
  useEditPropertyDetailskrislinMutation,
  useDeletePropertyDetailskrislinMutation,

  useGetContactllcMutation,
  useGetContactsaasMutation,
  useGetContactllpMutation,

} = authApi;
