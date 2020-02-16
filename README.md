# Cadence

![cadence](cadence.png)

Minimal Chrome new tab markdown editor. Images from Unsplash. Inspired by [Moment](https://github.com/siebevd/Moment), by Siebe Van Dijck

## Development

Firstly, sign up for an Unsplash API key and put it in `src/config.js` as following: 

```
module.exports = {
	unsplash: {
		apiKey: 'API KEY HERE'
	}
}
```

Start by using `yarn`. You can set up dev mode by using `yarn start`. Production builds are made using `yarn prod`. You can then load the extension into Chrome by loading unpacked extension in the `build` directory.