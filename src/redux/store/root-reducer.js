import { combineReducers } from '@reduxjs/toolkit';
// import { reducer as calendarReducer } from '../slices/calendar';
import authReducer from '../slices/features-slice/user';
import { apiSliceCustomer } from '../slices/customerApiSlice';
import { apiSliceAdmin } from '../slices/adminApiSlice';

export const rootReducer = combineReducers({
	// auth: authReducer,
	[apiSliceCustomer.reducerPath]: apiSliceCustomer.reducer,
	[apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,
    
	auth: authReducer,
	// chat: chatReducer,
	// kanban: kanbanReducer,
	// mail: mailReducer
});
