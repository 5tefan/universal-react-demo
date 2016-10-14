module.exports = {
	path: 'home',
	getComponent(nextState, cb) {
		System.import('./components/Home.jsx')
			.then((Home) => cb(null, Home));
	}
}
