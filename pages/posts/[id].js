import { appStore, wrapper } from '@/app/store';
import api, { getRunningQueriesThunk } from '@/featrues/api';

function Post({ post, isError, isSuccess, isLoading }) {
	return (
		<div>
			{isLoading && <p>Loading ...</p>}
			{!isLoading && isError && <p>{error}</p>}
			{!isLoading && isSuccess && (
				<div>
					<h1>{post.title}</h1>
				</div>
			)}
		</div>
	);
}

export async function getStaticPaths() {
	let {
		data: posts,
		isLoading,
		isError,
		isSuccess,
		error,
	} = await appStore.dispatch(api.endpoints.getPosts.initiate());

	const paths = posts?.map((post) => ({ params: { id: post.id.toString() } }));
	return {
		paths,
		fallback: true,
	};
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
	const {
		data: post,
		isError,
		isLoading,
		isSuccess,
		error,
	} = await appStore.dispatch(api.endpoints.getPost.initiate(params.id));
	await Promise.all(appStore.dispatch(getRunningQueriesThunk()));
	return {
		props: {
			post: post,
			isError,
			isLoading,
			isSuccess,
			error: error ? error : null,
		},
	};
});

export default Post;
