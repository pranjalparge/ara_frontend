import { apiSliceCustomer } from '../customerApiSlice';

export const authApi = apiSliceCustomer.injectEndpoints({
  // overrideExisting: true,
  endpoints: (builder) => ({
    enrollmentAuthentication: builder.mutation({
      query: (body) => ({
        url: '/registration/enrollmentAuthentication',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    checkEmail: builder.mutation({
      query: (body) => ({
        url: `/registration/checktEmailIdExists`,
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    checkPhoneNumber: builder.mutation({
      query: (body) => ({
        url: `/registration/checkMobileNoExists`,
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    registerCandidate: builder.mutation({
      query: (body) => ({
        url: '/registration/registerCandidate',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    checkEmailEntered: builder.mutation({
      query: (body) => ({
        url: `/registration/checkEmailEntered`,
        method: 'GET',
        //body: body,
        // credentials: 'include',
      }),
    }),
    verifyOtpForRegistration: builder.mutation({
      query: (body) => ({
        url: `api/user/verifyEmail`,
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/customer/login',
        method: 'POST',
        body: body,
        // credentials: 'include',
      }),
    }),

    customerme: builder.mutation({
      query: (body) => ({
           url: '/araController/getAdmindetails',
        method: 'GET',
        // body: body,
      }),
    }),

    getQR: builder.mutation({
      query: (body) => ({
        url: '/customer/generateQrCodeForTwoFactor',
        method: 'GET',
        // body: body,
      }),
    }),

    // verifyTwoFactorOtp: builder.mutation({
    //   query: (body) => ({
    //     url: '/registration/verifyRegistrationOtp',
    //     method: 'POST',
    //     body: body,
    //     credentials: 'include',
    //   }),
    // }),

    forgotPasswordOTP: builder.mutation({
      query: (body) => ({
        url: '/customer/forgotPasswordOTP',
        method: 'POST',
        body: body,
      }),
    }),

    changePasswordForForgot: builder.mutation({
      query: (body) => ({
        url: '/customer/changePasswordForForgot',
        method: 'POST',
        body: body,
      }),
    }),

    getHealthIssues: builder.mutation({
      query: (body) => ({
        url: '/masterController/getHealthIssues',
        method: 'GET',
      }),
    }),

    getDistrict: builder.mutation({
      query: (body) => ({
        url: '/masterController/getDistrict',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/profile/updateProfile',
        method: 'POST',
        body: body,
        // credentials: 'include',   // this is used to get cors error
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: '/customer/changePassword',
        method: 'POST',
        body: body,
      }),
    }),
    getFaq: builder.mutation({
      query: (body) => ({
        url: '/masterController/getFaq',
        method: 'GET',
        // body:body ,
      }),
    }),
    getStatic: builder.mutation({
      query: (body) => ({
        url: '/masterController/getStatic',
        method: 'GET',
        // body:body ,
      }),
    }),
  }),
});

export const {
  useEnrollmentAuthenticationMutation,
  useCheckEmailMutation,
  useCheckPhoneNumberMutation,
  useRegisterCandidateMutation,
  useCheckEmailEnteredMutation,
  useLoginMutation,
  useVerifyOtpForRegistrationMutation,
  useCustomermeMutation,
  useGetQRMutation,
  useVerifyTwoFactorOtpMutation,
  useForgotPasswordOTPMutation,
  useChangePasswordForForgotMutation,
  useGetDistrictMutation,
  useGetHealthIssuesMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetFaqMutation,
  useGetStaticMutation,
} = authApi;
