import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SubviewNav.scss';

const SubviewNav = ({ match }) => (
    <div className={ styles.otherwise }>
        <NavLink to={ match.url + "/page1" } activeClassName={ styles.active }>
            Page1
        </NavLink>
        <NavLink to={ match.url + "/page2" } activeClassName={ styles.active }>
            Page2
        </NavLink>
    </div>
)

module.exports = SubviewNav;
				

