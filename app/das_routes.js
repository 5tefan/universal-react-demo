module.exports = {
	path: '/',
	component: require('./components/App.jsx'),
	indexRoute: {
		onEnter: (nextState, replace) => replace('/home')
	},
	childRoutes: [ {
		childRoutes: [
			require('./routes/Home'),
                        require('./routes/Complex'),
			require('./routes/About')
		],
	} ]
};
