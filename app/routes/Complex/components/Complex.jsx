import React, { Component } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';

import SubviewNav from './SubviewNav.jsx';
import Page1 from '../routes/Page1';
import Page2 from '../routes/Page2';

import styles from './Complex.scss';

const Complex = ({ match }) => (
    <div className={ styles.main }>
        <h2> This page has nested routes! </h2>
        <SubviewNav match={ match }/>
        <Route path={ match.url + "/page1" } component={ Page1 }/>
        <Route path={ match.url + "/page2"} component={ Page2 }/>
    </div>
)

module.exports = Complex;
