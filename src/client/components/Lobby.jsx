import React from 'react';
import Footer from './Footer';

import { Router, Link } from 'react-router';

export default class Lobby extends React.Component {
	constructor() {
		super()
		this.state = {
			activeGamesList: []
		}
		this.GoBackHandler = this.GoBackHandler.bind(this);
		// this.ViewGameHandler = this.ViewGameHandler.bind(this);
		this.RefreshLobbies = this.RefreshLobbies.bind(this);
	}

	GoBackHandler() {
		console.log('need to enable browserHistory for this?');
	}

	// ViewGameHandler(namespace) {
	// 	console.log('namespace passed in is ', namespace)
	// }

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

	componentWillMount() {
		this.RefreshLobbies();
	}

	render() {
		return (
			<div className="LobbyCtn">
				<div className='LobbyHeader'>
					<h3 className='LobbyTitle'>Games in Progress</h3>
					<button className='LobbyGoBackBtn' onClick={this.GoBackHandler}>Go Back</button>
					<button className='LobbyRefreshBtn' onClick={this.RefreshLobbies}>Refresh</button>
				</div>
				<hr />
				<ul className='LobbyUlCtn'>
					{this.state.activeGamesList.map((item, i) => (
						<li className='LobbyListItem' key={i}>Room: {item} Mode: placeholder Players: P1, P2 <Link to={`/viewer/${item}`}>View</Link></li>
					))}
				</ul>
				<Footer />
			</div>
		)
	}
};