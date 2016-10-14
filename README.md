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

## Getting started

Run `npm install` to install the dependencies listed in `package.json`.

## Development view 

To start a server on localhost:8000 serving the bundled application, 
run `npm run dev`.

Webpack will watch for changes to files and rebuild the bundle.

## Build the Javascript Bundle

Run `npm run client-build` to bundle all assets into a `./build` 
folder. This step must be done before running the server side rendering.

## Server side rendering

The file `server.js` implements server side rendering. It is in ES6, so
run `npm run server-build` to make Webpack bundle it into `./build/server.js`.
Now, you can run `node build/server.js` to view the server side rendered 
version of your application.

You can build both the client and server, and run it using `npm run start`.

