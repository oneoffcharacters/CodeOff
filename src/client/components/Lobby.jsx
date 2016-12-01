// import packages
import React from 'react';
import { Router, Link } from 'react-router';

// import components
import Footer from './Footer';

export default class Lobby extends React.Component {
	constructor() {
		super()
		this.state = {
			activeGamesList: []
		}
		this.RefreshLobbies = this.RefreshLobbies.bind(this);
	}

	RefreshLobbies() {
		fetch('http://localhost:3000/api/lobbies')
			.then(resp => {
				return resp.json()
			})
			.then(lobbies => {
				this.setState({
					activeGamesList: lobbies
				})
			})
			.catch(err => {
				console.error(err);
			})
	}

	componentDidMount() {
		this.RefreshLobbies();
	}

	render() {
		return (
			<div className="LobbyCtn">
				<div className='LobbyHeader'>
					<h3 className='LobbyTitle'>Games in Progress</h3>
					<button className='LobbyBtn' onClick={this.RefreshLobbies}>Refresh</button>
					<Link to="/landing"><button className='GoBackBtn'>Go Back</button></Link>
				</div>
				<hr />
				<ul className='LobbyUlCtn'>
					{this.state.activeGamesList.map((item, i) => (
						<li className='LobbyListItem' key={i}>Room: {item}<Link to={`/viewer/${item}`}>View</Link></li>
					))}
				</ul>
				<Footer />
			</div>
		)
	}
};
