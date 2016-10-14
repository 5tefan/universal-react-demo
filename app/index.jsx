import { render } from 'react-dom';
import React from 'react';
import { Router, Link, useRouterHistory } from 'react-router/es6';
import { createHistory } from 'history';
import routes from './das_routes.js';

const browserHistory = useRouterHistory(createHistory)({ basename: '/' });

render(
	<Router history={ browserHistory } routes={ routes }/>,
	 document.getElementById('root')
);

