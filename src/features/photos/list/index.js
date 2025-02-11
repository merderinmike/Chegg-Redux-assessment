import { useSelector, useDispatch } from "react-redux";
import { removePhoto, selectFilteredPhotos } from "../photos.slice";
import "./list.css";

export default function PhotosList() {
	const dispatch = useDispatch();

	const photos = useSelector(selectFilteredPhotos);

	function handleDeleteButtonClick(id) {
		dispatch(removePhoto(id));
	}

	// Render photos with unique keys
	const photosListItems = photos.map(({ id, caption, imageUrl }, index) => {
		const key = id || `photo-${index}`;

		return (
			<li key={key}>
				<img alt={caption} src={imageUrl} />
				<div>
					<p>{caption}</p>
					<button
						data-testid={`${caption}-button`}
						onClick={() => handleDeleteButtonClick(id)}
					>
						Delete
					</button>
				</div>
			</li>
		);
	});

	// Show list or fallback message
	return photosListItems.length > 0 ? (
		<ul>{photosListItems}</ul>
	) : (
		<h3>No doggies to display...</h3>
	);
}
