import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSliceCustomer } from '../slices/customerApiSlice';
import { apiSliceAdmin } from '../slices/adminApiSlice';
let devtool = false;
let middleware = [];
devtool = true;
middleware = [apiSliceCustomer.middleware, apiSliceAdmin.middleware];

/* @ts-ignore */
if (import.meta.env.DEV === true) {
  // middleware = [logger, apiSliceCustomer.middleware];
  middleware = [apiSliceCustomer.middleware,apiSliceAdmin.middleware];
  devtool = true;
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: devtool,
  middleware: (getDefaultMiddleware) =>
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    getDefaultMiddleware().concat(...middleware),
});

export const useDispatch = () => useReduxDispatch();
// setupListeners(store.dispatch);
