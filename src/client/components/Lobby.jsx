import React from 'react';
import Footer from './Footer';

export default class Lobby extends React.Component {
	constructor() {
		super()
		this.state = {
			activeGamesList: []
		}
		this.RefreshHandler = this.RefreshHandler.bind(this);
		this.GoBackHandler = this.GoBackHandler.bind(this);
		this.ViewGameHandler = this.ViewGameHandler.bind(this);
	}

	RefreshHandler() {
		console.log('wired!');
	}

	GoBackHandler() {
		console.log('goback wired!');
	}

	ViewGameHandler() {
		console.log('Viewing game now!');
	}

	componentWillMount() {
		console.log('mounted!');
		this.setState({
			activeGamesList: ['dm1', 'dz3', 'du2', 'sb2', 'rb6', 'jwt', 'g1z']
		});
	}

	render() {
		return (
			<div className="LobbyCtn">
				<div className='LobbyHeader'>
					<h3 className='LobbyTitle'>Games in Progress</h3>
					<button className='LobbyGoBackBtn' onClick={this.GoBackHandler}>Go Back</button>
					<button className='LobbyRefreshBtn' onClick={this.RefreshHandler}>Refresh</button>
				</div>
				<hr />
				<ul className='LobbyUlCtn'>
					{this.state.activeGamesList.map((item, i) => (
						<li className='LobbyListItem' key={i}>
							<div>Room: {item} Mode: placeholder Players: P1, P2<button className='LobbyViewBtn' onClick={this.ViewGameHandler}>View</button></div>
						</li>
					))}
				</ul>
				<Footer />
			</div>
		)
	}
};