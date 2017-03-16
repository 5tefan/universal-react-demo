import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '~/components/App.jsx';

const Index = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)


render(<Index/>, document.getElementById('root'));

