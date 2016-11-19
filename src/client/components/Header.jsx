import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="Header row no-marg">
      	<div className="col-xs-12">
	      <h1 className="HeaderName">CodeOff</h1>
	      <h1 className="HeaderNav pull-right">Register</h1>
	      <h1 className="HeaderNav pull-right">Sign In</h1>
      	</div>
      </div>
    )
  }
}  