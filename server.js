// express.js
import path from 'path'
import http from 'http'
import express from 'express'
import fs from 'fs'

// react-router
import React from 'react';
import routes from '~/das_routes.js';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

// Create HTTP server
const app = new express()
const server = new http.Server(app)

const index = fs.readFileSync('build/index.html', 'utf8')

const PORT = process.env.PORT || 8000

// Serve static files
app.use(express.static('build'))

// Proxy API calls to API server
//const proxy = http_proxy.createProxyServer({ target: 'http://localhost:xxxx' })
//app.use('/api', (req, res) => proxy.web(req, res))

// React application rendering
app.use((req, res) => {
	// Match current URL to the corresponding React page
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			res.status(200)
			var react_stuff = renderToString(<RouterContext {...renderProps} />);
			var c =  index.replace(
				/<div id="root"><\/div>/,
				'<div id="root">' + react_stuff + '</div>'
			);
			console.log(c);
			res.send(c);
		} else {
			res.status(404).send('not found');
		}
	})
})

// Start the HTTP server
server.listen(PORT)
console.log("\nApplication available at http://localhost:" + PORT + "\n")

