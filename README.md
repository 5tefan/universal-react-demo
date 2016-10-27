# Universal-react-demo

This is the example application I wish I had when I started writing React.


I've found that other React template/demo/starters give you too much. It's
hard to start when there's lots of moving pieces. I've tried to err on the 
side of giving you a minimal skeleton instead of a feature rich boilerplate.

 
You should be able to understand every piece of this demo, and build on it.
I believe this is a better approach than starting with a monsterous boilerplate
and taking things out before you even know what they do.


Features:

- Latest React (^15.1.0)
- Bundling with Webpack 2.0 for code splitting and tree-shaking
- Uses ES6 (ECMAScript 2015)
- Styling with SCSS
- routing with [react-router](https://github.com/ReactTraining/react-router)
- Organized according to the ["huge-apps" react-router example](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps) 
- server side rendering (aka. universal or isomorphic React)

## Up and running

### Getting started

Run `npm install` to install the dependencies listed in `package.json`.

### Development view 

To start a server on `http://localhost:8000` serving the bundled application, 
run `npm run dev`.

This runs `webpack-dev-server --hot` which will serve the bundle
and update the bundle on file changes.

Note: `webpack-dev-server` does not watch the config file. 

[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### Build the client bundle

Run `npm run client-build` to bundle all assets into a `build/` 
dir. This step must be done before server side rendering is possible.

### Server side rendering bundle

The file `server.js` implements server side rendering. It uses ES6+JSX syntax, so
run `npm run server-build` to make Webpack bundle it into `./build/server.js`.
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
    loader: 'style!css?modules&loacalIdentName=[name]--[local]--[hash:base64:5]!sass'
}
```

This tells Webpack to process assets ending in .scss using first
1. [sass-loader](https://github.com/jtangelder/sass-loader) which converts scss to css, 
2. [css-loader](https://github.com/webpack/css-loader) which does some namespacing and other stuff(read their README :),
3. Finally [style-loader](https://github.com/webpack/style-loader) 
> Adds CSS to the DOM by injecting a `<style>` tag

The other loader, testing for jsx, is responsible for transpiling ES6 and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
to ES5 (native browser Javascript). 

### Plugins

We're using a couple of plugins for convenience. 

#### HtmlWebpackPlugin

> The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.

From [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

#### FaviconsWebpackPlugin

There are a lot of favicon sizes and names devices are looking for (see [favicons-best-practices](http://stackoverflow.com/questions/19029342/favicons-best-practices) SO question).
This plugin automatically generates all of them from the file specified, `app/images/favicon.png` and, in conjunction with `HtmlWebpackPlugin`, places them in the head
of `index.html` file generated on build.

### Code splitting

One traditional problem with Single Page Applications is that all the code had to be loaded at once
on initial page load, even if it wasn't all needed.
Webpack is able to split your code into "chunks" that can be loaded on demand after the initial page load,
so that only the code for the current view is loaded. When the user navigates to another view, a new chunk is loaded.

See [Webpack code splitting](https://webpack.github.io/docs/code-splitting.html) documentation.


In this demo, see any route specification like [app/routes/About/index.js](app/routes/About/index.js)
```
module.exports = { 
        path: 'about',
        getComponent(nextState, cb) {
                System.import('./components/About.jsx')
                        .then((About) => cb(null, About));
        }   
}
```

In this Demo, we use `System.import` for fetching react-router components. This results in
chunks for for our About page which are only fetched when the client visits `/about`.

