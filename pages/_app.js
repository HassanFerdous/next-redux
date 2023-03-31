import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { appStore, wrapper } from '@/app/store';

function App({ Component, pageProps }) {
	const { store } = wrapper.useWrappedStore(appStore.getState());
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default App;
