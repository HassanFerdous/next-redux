import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import counterSlice from '@/featrues/counterSlice';
import api from '@/featrues/api';

const makeStore = () =>
	configureStore({
		reducer: {
			[counterSlice.name]: counterSlice.reducer,
			[api.reducerPath]: api.reducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
		devTools: true,
	});

export const appStore = makeStore();
export const wrapper = createWrapper(makeStore);
