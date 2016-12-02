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
						<div className="profile-blurb">When not pimping up his Linkedin profile, Guy takes to the skies with his locked, stocked and four smokin rotors Phantom 4. <br /><br/></div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Jesse Mavi</div>
						<img className="about-pic" src={this.state.jm}></img>
						<div className="profile-blurb">Originally from Chicago, when not developing or learning programming Jesse enjoys taking fitness classes, reading and playing golf.</div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Robbie Gifford</div>
						<img className="about-pic" src={this.state.rg}></img>
						<div className="profile-blurb">I code. I have interests outside of coding. <br /><br /><br /></div>
					</div>
					<div className="about-profile">
						<div className="profile-name">Sherman Chen</div>
						<img className="about-pic" src={this.state.sc}></img>
						<div className="profile-blurb">A native San Franciscan, when not developing Sherman is most likely playing tennis, watching netflix, or pestering his co-workers with his fascination of cat based iOS games</div>
					</div>
				</div>
			</div>
		)
	}
}
