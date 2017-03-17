# Universal-react-demo

This is the example application I wish I had when I started writing React.


I've found that many template/demo/starters give you too much. It's
hard to start when there's lots of moving pieces. I've tried to err on the 
side of giving you a minimal skeleton instead of a feature rich boilerplate.

 
You should be able to understand every piece of this demo, and doing so will give
you a strong foundation on which to start building larger apps. I believe this is
a better approach than starting with a monsterous boilerplate where you're left 
with either feature bloat or to take things out before you even know what they do.


Features:

- Latest [React](https://facebook.github.io/react/) (^15.1.0)
- [Webpack](https://webpack.js.org/) 2.0 (code splitting and tree-shaking)
- Written with [ES6](https://babeljs.io/learn-es2015/) (ECMAScript 2015)
- Styling with SCSS
- Routing with [react-router](https://github.com/ReactTraining/react-router) V4
- Based on the ["huge-apps" react-router example](https://github.com/ReactTraining/react-router/tree/b61db2aaaec46de453d3631abd67d6e42f8da9d1/examples/huge-apps) 
- Server side rendering (aka. universal(ish) or isomorphic React)

## Up and running

### Getting started

Clone the repo, then run `npm install` to install the dependencies listed in `package.json`.

### Development view 

To start the development server on `http://localhost:8000` to preview the application, 
execute `npm run dev`.

This runs `webpack-dev-server --hot` which will serve the bundle and update the bundle 
on file changes.

Note: `webpack-dev-server` does not watch the webpack config file for changes. 

[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### Build the client bundle

Run `npm run client-build` to bundle all assets into a `build/` 
dir. This step must be done before server side rendering is possible.

Since all our assets are in jsx, and es6, we have to transpile them to 
regular Javascript for today's browsers to understand. This is where 
webpack works it's wonders, including static analysis to determine 
unused pieces of code that don't need to be included. This is called
tree-shaking and can dramatically reduce the size of the resulting code
you need to send to a user.

### Server side rendering bundle

The file `server.js` implements server side rendering. It uses ES6+JSX syntax, so
again, we need to convert it to regular Javascript for Node to execute.


Run `npm run server-build` to do this. Webpack will bundle it into `./build/server.js`.


Now, you can run `node build/server.js` to view the server side rendered 
version of your application on `http://localhost:8000`.

A shortcut to build both the client and server, and then run the server: `npm run start`.

## Webpack

[Webpack is a bundler](http://webpack.github.io/docs/what-is-webpack.html). 
It does a lot, but at the core, it looks for import and require statements
and processes them into assets for the browser. We are using Webpack 2.0 which
supports tree-shaking, which eliminates code that is never used, resulting in 
smaller bundles.

### Loaders
You'll notice in the code, we have things like 

```javascript
import styles from './App.scss';
```

Why are we importing scss into a jsx file?! 

Because we want to apply the styles inside `App.scss` 
to the component in our current file. Webpack handles the 
internals of processing the scss file into css, and giving you
an object with keys that refer to string names of the styles you set.

In the Webpack configuration file `webpack.client.config.js`, we specify
```
{
    test: /\.scss$/,
    loader: 'style-loader!css-loader?modules&loacalIdentName=[name]--[local]--[hash:base64:5]!sass-loader'
}
```

This tells Webpack to process assets ending in .scss using first
1. [sass-loader](https://github.com/jtangelder/sass-loader) which converts scss to css, then pipe it through:
2. [css-loader](https://github.com/webpack/css-loader) which does some namespacing and other stuff(read their README :),
3. Finally through [style-loader](https://github.com/webpack/style-loader) 
> Adds CSS to the DOM by injecting a `<style>` tag

The other loader, testing for jsx, is responsible for transpiling ES6 and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
to ES5 (native browser Javascript). 

### Plugins

We're using a couple of plugins for convenience. 

#### HtmlWebpackPlugin

> The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

From [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

Using this plugin, we don't have to worry about our entry points and making sure the index.html page includes them.
The index.html page under `app/` serves as the template for this Single Page App. So, if you want to set the title,
add meta tags, or whatever else... that's the place to do it.

#### FaviconsWebpackPlugin

The variety of favicon sizes and filenames devices expect (see 
[favicons-best-practices](http://stackoverflow.com/questions/19029342/favicons-best-practices) SO question).
is bordering on ridiculous. Luckily we can automatically create all of these with the FaviconsWebpackPlugin.
This plugin automatically generates all of them from the file specified, `app/images/favicon.png` and, in 
conjunction with the HtmlWebpackPlugin, places them in the head of our template`index.html` file on build.

### Code splitting

One traditional problem with Single Page Applications is that all the code had to be loaded at once
on initial page load, even if it wasn't all needed. This often means seconds of blank screen and unnecessary
data transfer. Webpack is able to split your code into "chunks" that can be loaded on demand. Only the code 
for the visible page needs to be fetched from the server and successive page visits fetch new chunks as needed.

See [Webpack code splitting](https://webpack.github.io/docs/code-splitting.html) documentation.


In this demo, see any route specification like [app/routes/About/index.js](app/routes/About/index.js)
```
if (ONSERVER) {
    module.exports = require('./components/About.jsx');
} else {
    module.exports = () => (<Bundle load={ () => System.import('./components/About.jsx') }/>);
}
```

In this Demo, we use `System.import` for fetching react-router components. This results in
chunks for for our About page which are only fetched when the client visits `/about`. The 
Bundle component is a convenience wrapper which displays a loading component while the 
Promise returned by System.import is resoliving. Once resolved, Bundle changes it's state to
display the requested component. 

About the ONSERVER switch: This constant is defined in the webpack config file 
`webpack.server.config.js` as true and false in the client config. Although admittedly
not the sexy, it seems to be the most straightforward approach and is necessary at the
moment because the server side renderToString doesn't wait for Promises (ie. chunking) 
to resolve. Instead, we have to disable the chunking/asyc module fetch by switching to
a synchronous require(). We could just use require() everywhere (server side and client)
but then we'd loose chunking!

