import React from 'react';

import Bundle from '~/components/Bundle.jsx';

// Bundle is just a custom component that loads things, inspired by:
// https://reacttraining.com/react-router/web/guides/code-splitting
// Modified to accept load as a function which returns a promise for 
// the module. 
// Note: The System.import is relative to "./" so MUST be here, it's
// like a require(), but unfortunately, it doesn't seem possible to 
// just send the path to Bundle and let the Bundle component do all.
// More details, seems Webpack needs to be able to create the context
// for the import, https://webpack.github.io/docs/context.html
const Home = () => (<Bundle load={ () => System.import('./components/Home.jsx') }/>);

export default Home;
