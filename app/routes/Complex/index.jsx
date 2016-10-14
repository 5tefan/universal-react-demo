module.exports = {
	path: 'complex',
	
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./routes/Page1'),
				require('./routes/Page2')
			])
		})
	},
	getIndexRoute(partialNextState, cb) {
		require.ensure([], (require) => {
			// separate out the path part, otherwise warning raised
			const { path, getComponent } = require('./routes/Page1');
			cb(null, { getComponent });
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/Complex.jsx'))
		})
	}
}
