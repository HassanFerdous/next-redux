import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com',
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	tagTypes: ['Posts'],
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => '/posts',
			providesTags: ['Posts'],
		}),
		getPost: builder.query({
			query: (id) => `/posts/${id}`,
		}),
	}),
});

export default api;

export const {
	useGetPostsQuery,
	useGetPostQuery,
	util: { getRunningQueriesThunk },
} = api;
