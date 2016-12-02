// import packages
import React from 'react';
import {Link} from 'react-router';

export default class Team extends React.Component {
	constructor() {
		super()
		this.state = {
			gt: '',
			jm: '',
			rg: '',
			sc: ''
		}
	}

	render() {
		return (
			<div className="aboutus-ctn">
				<h2 className="aboutus-title">Meet the CodeOff Development Team!</h2>
			</div>
		)
	}
}
