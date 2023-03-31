const { createSlice, current } = require('@reduxjs/toolkit');

const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
	},
	reducers: {
		increment: (state, action) => {
			state.count += 1;
		},
		decrement: (state, action) => {
			state.count -= 1;
		},
	},
});

export default counterSlice;
export const { increment, decrement } = counterSlice.actions;
