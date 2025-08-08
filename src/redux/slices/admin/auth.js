import { apiSliceAdmin } from '../adminApiSlice';

export const authApi = apiSliceAdmin.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/araController/login',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    adminme: builder.mutation({
      query: (body) => ({
        url: '/araController/getAdmindetails',
        method: 'GET',
        // body: body,
      }),
    }),

    getQR: builder.mutation({
      query: (body) => ({
        url: '/admin/generateQrCodeForTwoFactor',
        method: 'GET',
        // body: body,
      }),
    }),

    verifyTwoFactorOtp: builder.mutation({
      query: (body) => ({
        url: 'api/user/verifyEmail',
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
    }),

    forgotPasswordOTP: builder.mutation({
      query: (body) => ({
        url: 'api/user/forgotPassword',
        method: 'POST',
        body: body,
      }),
    }),

    changePasswordForForgot: builder.mutation({
      query: (body) => ({
        url: 'api/user/verifyOtpToForgotPassword',
        method: 'POST',
        body: body,
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: '/api/user/changePassword',
        method: 'POST',
        body: body,
      }),
    }),

    registerCandidate: builder.mutation({
      query: (body) => ({
        url: 'api/userDetails/userRegisterByAdmin',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),
  }),
});

export const {
useRegisterCandidateMutation,
  useLoginMutation,
  useGetQRMutation,
  useForgotPasswordOTPMutation,
  useChangePasswordForForgotMutation,
  useChangePasswordMutation,
  useAdminmeMutation,
  useVerifyTwoFactorOtpMutation
} = authApi;