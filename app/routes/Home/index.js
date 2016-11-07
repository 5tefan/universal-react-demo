module.exports = {
	path: 'home',
	getComponent(nextState, cb) {
        if (ONSERVER) {
            cb(null, require('./components/Home.jsx'));
        } else {
            System.import('./components/Home.jsx')
                .then((Home) => cb(null, Home));
        }
	}
}
