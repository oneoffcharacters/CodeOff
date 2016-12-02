// import packages
import React from 'react';
import {Link} from 'react-router';

export default class Team extends React.Component {
	constructor() {
		super()
		this.state = {
			gt: '../assets/images/Guy_Thomas.jpg',
			jm: '../assets/images/Jesse_Mavi.jpg',
			rg: '../assets/images/Robbie_Gifford.jpg',
			sc: '../assets/images/Sherman_Chen.jpg'
		}
	}

	render() {
		return (
			<div className="aboutus-ctn">
				<div className="aboutus-title">Meet the CodeOff Development Team!</div>
				<div className="profile-ctn">
					<div className="about-profile">
						<div className="profile-name">Guy Thomas</div>
						<img className="about-pic" src={this.state.gt}></img>
						<div className="profile-blurb">ipsum lorem stuff yea jkhasdjkasdjkasd basdbasdasbd bhasdhbsadbad bhasdbasdbasd bhasdbasdb</div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Jesse Mavi</div>
						<img className="about-pic" src={this.state.jm}></img>
						<div className="profile-blurb">ipsum lorem stuff yea jkhasdjkasdjkasd basdbasdasbd bhasdhbsadbad bhasdbasdbasd bhasdbasdb</div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Robbie Gifford</div>
						<img className="about-pic" src={this.state.rg}></img>
						<div className="profile-blurb">ipsum lorem stuff yea jkhasdjkasdjkasd basdbasdasbd bhasdhbsadbad bhasdbasdbasd bhasdbasdb</div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Sherman Chen</div>
						<img className="about-pic" src={this.state.sc}></img>
						<div className="profile-blurb">When not developing Sherman can be found distracting others with his fascination for cat based iOS games</div>
					</div>
				</div>
			</div>
		)
	}
}
