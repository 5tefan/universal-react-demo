module.exports = {
	path: 'about',
	getComponent(nextState, cb) {
		System.import('./components/About.jsx')
			.then((About) => cb(null, About));
	}
}
