// import packages
import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div className="Header row no-marg">
      	<div className="col-xs-12">
	      <h1 className="HeaderName">Code<span className="HeaderAltBrand">Off</span></h1>
	      <Link to="/Register"><h1 className="HeaderNav pull-right">Register</h1></Link>
	      <Link to="/Signin"><h1 className="HeaderNav pull-right">Sign In</h1></Link>
      	</div>
      </div>
    )
  }
}
