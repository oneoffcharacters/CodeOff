import React from 'react';
import Gamestatus from './Gamestatus'


const Gameheader = (props) => {
	console.log(props);

	// challengeProgress={this.state.challengeProgress}
	// challenge={this.state.challenge} 
	// gameProgress={this.state.gameProgress} 
	// currentGameStats={this.state.currentGameStats} 
	// playerNames={this.state.playerNames} />



	return (
		<div className="gameheader">
			<div className="player">
				<div className="profile"></div>
				<div className="username"></div>
			</div>
			<div className="center-dashboard">
				<div className="logo"></div>
				<div className="game-dashboard">
					{props.challenge.map((game, i) => (
						<Gamestatus 
							challengeProgress={props.challengeProgress}
							challenge={props.challenge} 
							gameProgress={props.gameProgress} 
							currentGameStats={props.currentGameStats} 
							playerNames={props.playerNames} />
					))}
					<div className="game-status"></div>
					<div className="game-status current"></div>
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