import CONFIG from "../config.js";

const count = 100; // save dat $$$

const getPhoto = (query, key) => {
	return fetch(
			`https://api.unsplash.com/search/photos?query=${query}&count=${count}&client_id=${
				key
			}`
		)
			.then(res => res.json())
			.then(data => {
				data = data.results;
				// Grab the latest photo
				let newPhoto = data.pop();
	
				localStorage.setItem("photos", JSON.stringify(data));
				return newPhoto;
			});
}

const queryPhotos = (query) => {
	const keys = CONFIG.unsplash.apiKeys
	const key = keys[Math.floor(Math.random()*keys.length)];
	if (query && query !== "") {
		query = query.trim();
		console.log("QUERY PHOTOS WITH", query)
		return getPhoto(query, key)
	}

	console.log("Defaulting to nature..!")
	return getPhoto('nature', key)
	
}

const getNextPhoto = () => {
	// Check if we already got photos set
	let storedPhotos = JSON.parse(localStorage.getItem("photos"));

	if (storedPhotos && storedPhotos.length > 0) {
		// We already have images
		let newPhoto = storedPhotos.pop();
		// Save the updated photos
		localStorage.setItem("photos", JSON.stringify(storedPhotos));
		// Return the new photo
		return newPhoto;
	}
}

export const getNewPhoto = () => {
	var query = localStorage.getItem("unsplashQueryText");
	var nextPhoto = getNextPhoto();
	console.log("Got next photo", nextPhoto)
	if (!nextPhoto) {
		return queryPhotos(query)
	} else {
		return Promise.resolve(nextPhoto)
	}
};
