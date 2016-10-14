import React, { Component } from 'react';

import SubviewNav from './SubviewNav.jsx';

import styles from './Complex.scss';


class Complex extends Component {
	render() {
		return (
			<div className={ styles.main }>
                                <h2> This page has nested routes! </h2>
                                <SubviewNav/>
				{ this.props.children }
			</div>
		)
	}
}

module.exports = Complex;
