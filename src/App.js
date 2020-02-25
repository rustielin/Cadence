import React from 'react';
import CONFIG from "./config.js";
import { getNewPhoto } from "./utils/api.js";
import './App.css';
import Background from "./components/Background/Background.jsx";
import MarkdownEditor from './components/MarkdownEditor/MarkdownEditor.jsx';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      fullBackground: !!localStorage.getItem("fullBackground"),
	  lockedImage: JSON.parse(localStorage.getItem("lockedImage")) || null
    }
  }


	/**
	 * Event Handlers
	 */

	updateImage = () => {
		getNewPhoto().then(data => {
			// TODO: should this be moved to the api part?
			// tell unsplash that the image is "downloaded",
			// which is needed to comply with the unsplash api
			const keys = CONFIG.unsplash.apiKeys
			const key = keys[Math.floor(Math.random()*keys.length)];
			fetch(
				`${data.links.download_location}?client_id=${key}`
			)
				.then(res => res.json())
				.catch(e => console.log("ERR", e));

			// Save the image
			this.setState(oldState => {
				let newState = {
					image: {
						url: data.urls.regular,
						contributor: data.user,
						type: "unsplash" // store type for future reference (when we start adding in multiple types)
					}
				};

				if (oldState.lockedImage) {
					// if we already have a locked image
					newState.lockedImage = newState.image;
					// Don't forget to update local storage
					localStorage.setItem("lockedImage", JSON.stringify(newState.image));
				}
				return newState;
			});

			// localStorage.setItem('photos', JSON.stringify(data));
		});
	};

  toggleFull = () => {
		this.setState(oldState => {
			if (oldState.fullBackground) {
				// remove the key as we won't be fullscreen anymore
				localStorage.removeItem("fullBackground");
			} else {
				// set the full background
				localStorage.setItem("fullBackground", true);
			}
			return {
				fullBackground: !oldState.fullBackground
			};
		});
  };

  lockImage = () => {
		this.setState(oldState => {
			let lockedImage = null;
			let image = oldState.image;
			if (!oldState.lockedImage) {
				// if we don't have a locked image set
				// store it in the state and on localstorage
				localStorage.setItem("lockedImage", JSON.stringify(this.state.image));
				lockedImage = oldState.image;
			} else {
				image = JSON.parse(localStorage.getItem("lockedImage"));
				localStorage.removeItem("lockedImage");
			}
			// update state
			return {
				lockedImage,
				image
			};
		});
	};
  
  render() {
    return (
      <div className="container">
        <MarkdownEditor></MarkdownEditor>
				<Background
					fullscreen={this.state.fullBackground}
					toggleFull={this.toggleFull}
					image={this.state.image}
					updateImage={this.updateImage}
					lockImage={this.lockImage}
					lockedImage={this.state.lockedImage}
				/>
      </div>
    );
  }
}

export default App;
