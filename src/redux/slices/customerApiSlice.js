import {
  //BaseQueryApi,
  //BaseQueryFn,
  createApi,
  // FetchArgs,
  fetchBaseQuery,
  // FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logout } from './features-slice/user';
import { ToastContainer, toast } from 'react-toastify';

const baseQuery = fetchBaseQuery({
  // TODO: move to dev and prod env localhost for dev and prod url for prod

  baseUrl: `${import.meta.env.VITE_CUSTOMER_API_URL}`,
  /* @ts-ignore */
  // import.meta.env.MODE === 'production'
  // 	? /* @ts-ignore */
  // 	  `${import.meta.env.VITE_API_URL_PROD}`
  // 	: /* @ts-ignore */
  // 	  `${import.meta.env.VITE_API_URL_DEV}`,
  // credentials: 'include',
  // credentials: "include",
  // baseUrl: "https://jsonplaceholder.typicode.com/",
  prepareHeaders: (headers) => {
    const customerToken = localStorage.getItem('customerToken');
    const customerRegistrationToken = localStorage.getItem('customerRegistrationToken');
    const customerForgotToken = localStorage.getItem('customerForgotToken');
   
    if (customerRegistrationToken) {
      headers.set('authorization', `Bearer ${customerRegistrationToken}`);
    }
    if (customerToken) {
      headers.set('authorization', `Bearer ${customerToken}`);
    }
    if (customerForgotToken) {
      headers.set('authorization', `Bearer ${customerForgotToken}`);
    }

   // headers.set('ngrok-skip-browser-warning', '1234');
    // headers.set("Access-Control-Allow-Origin", "*");
    // headers.set("mode", "cors");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.originalStatus === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      toast.error('Timeout , Please login again');
      logout();
      window.location.reload();
    }
  }
  return result;
};

// export const apiSliceCustomer = createApi({
//   baseQuery: baseQueryWithReauth,

//   endpoints: () => ({}),
// });

export const apiSliceCustomer = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["DriverList"],
  endpoints: () => ({}),
});

baseQueryWithReauth;
