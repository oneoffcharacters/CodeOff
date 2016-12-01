// import packages
import React from 'react';

// import components
import Header from './Header'

export default class App extends React.Component {
  render() {
    return (
    	<div className="container-fluid no-pad">
    		<Header />
    		{this.props.children}
    	</div>
    )
  }
}
