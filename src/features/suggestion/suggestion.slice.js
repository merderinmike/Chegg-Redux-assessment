import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
	"suggestion/fetchSuggestion",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(
				"http://localhost:3004/api/suggestion"
			);
			const data = await response.json();
			return data.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	suggestion: "",
	loading: false,
	error: false,
};

const suggestionSlice = createSlice({
	name: "suggestion",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSuggestion.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(fetchSuggestion.fulfilled, (state, action) => {
				state.suggestion = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(fetchSuggestion.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
