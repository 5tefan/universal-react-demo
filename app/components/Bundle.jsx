import React, { Component } from 'react';


// Credit to the react-router docs for the inspiration for this
// component [1]. It's been tailored slightly for use with 
// System.import [2] (see Bundle usage in ~/routes). 


// [1] https://reacttraining.com/react-router/web/guides/code-splitting
// [2] https://webpack.github.io/docs/code-splitting.html#es6-modules

class Bundle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: undefined
        }
    }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({ mod: undefined })
    props.load().then((loaded) => this.setState({ mod: loaded }))
  }

  render() {
    // pass along any props from the router. This is important if you need to do subroutes...
    // you'll need ({ match }) to define subroutes as match.url + "/subroute1", etc...
    // see ~/routes/Complex
    return ( this.state.mod ? <this.state.mod {...this.props.pass}/> : <p> loading... </p> );
  }
}

export default Bundle;

