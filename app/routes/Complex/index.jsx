module.exports = {
	path: 'complex',
	
	getChildRoutes(partialNextState, cb) {
        if (ONSERVER) {
			cb(null, [
				require('./routes/Page1'),
				require('./routes/Page2')
			])
        } else {
            require.ensure([], (require) => {
                cb(null, [
                    require('./routes/Page1'),
                    require('./routes/Page2')
                ])
            })
        }
	},
	getIndexRoute(partialNextState, cb) {
        if (ONSERVER) {
			const { path, getComponent } = require('./routes/Page1');
			cb(null, { getComponent });
        } else {
            require.ensure([], (require) => {
                // separate out the path part, otherwise warning raised
                const { path, getComponent } = require('./routes/Page1');
                cb(null, { getComponent });
            })
        }
	},
	getComponent(nextState, cb) {
        if (ONSERVER) {
            cb(null, require('./components/Complex.jsx'));
        } else {
            require.ensure([], (require) => {
                cb(null, require('./components/Complex.jsx'))
            })
        }
	}
}
