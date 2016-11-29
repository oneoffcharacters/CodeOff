import React from 'react';


const Gameheader = (props) => {
	let players = props.playerDetails;
	let current = props.gameStats.current;
	let previous = props.gameStats.previous;
	console.log(props);

	return (
		<div className="gameheader">
			<div className="player">
				<div className="profile">{players.me}</div>
				<div className="username"></div>
			</div>
			<div className="center-dashboard">
				<div className="logo"></div>
				<div className="game-dashboard">
					<div className="game-status"></div>
					<div className="game-status current">{players.me}<br />{players.opponent}</div>
					<div className="game-status unplayed"></div>
				</div>
			</div>
			<div className="powerup">
			</div>
			<div className="player">
				<div className="profile"></div>
				<div className="username"></div>
			</div>
		</div>

	)
}

export default Gameheader