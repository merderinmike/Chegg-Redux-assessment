import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";

const initialState = {
	photos,
};

const options = {
	name: "photos",
	initialState,
	reducers: {
		// Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos.
		addPhoto: (state, action) => {
			// Assuming `action.payload` is the new photo object
			state.photos.unshift(action.payload);
		},

		// Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
		removePhoto: (state, action) => {
			// Assuming `action.payload` is the ID of the photo to remove
			state.photos = state.photos.filter(
				(photo) => photo.id !== action.payload
			);
		},
	},
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;

export const selectFilteredPhotos = (state) => {
	// Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
	const searchTerm = selectSearchTerm(state).toLowerCase();
	return state.photos.photos.filter((photo) =>
		photo.caption.toLowerCase().includes(searchTerm)
	);
};
