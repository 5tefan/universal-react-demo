import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Home from '~/routes/Home';
import Complex from '~/routes/Complex';
import About from '~/routes/About';

import styles from './App.scss';

const App = () => (
    <div className={ styles.app }>
        <header>
            <h1> A demo site. </h1>
        </header>
        <nav>
            <NavLink exact to="/" activeClassName={ styles.active }> home </NavLink>
            <NavLink to="/complex" activeClassName={ styles.active }> complex page </NavLink>
            <NavLink to="/about" activeClassName={ styles.active }> learn more </NavLink>
        </nav>
        <main>
            <Route exact path="/" component={ Home }/>
            <Route path="/complex" component={ Complex }/>
            <Route path="/about" component={ About }/>
        </main>
    </div>
)

module.exports = App;

