import React from 'react';
import Gamestatus from './Gamestatus'


const Gameheader = (props) => {
	return (
		<div className="gameheader">
			<div className="player">
				<div className="profile"></div>
				<div className="username"></div>
			</div>
			<div className="center-dashboard">
				<div className="game_logo">CODEEEEEOFFFFFFF</div>
				<div className="game-dashboard">
					{props.challenge.map((game, i) => (
						<Gamestatus
							key = {i} 
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