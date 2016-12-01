// import packages
import React from 'react';

const Gamestatus = (props) => {
	if (props.currentGameType === 'No Game') {
		return (
			<div className="gamestatus inactive">
				<span className="gamestatus-score">No Game</span>
			</div>
			)
	} else if (props.gameNumber === props.challengeProgress) {
		if (props.currentGameType === 'Solo') {
			return (
				<div className="gamestatus won">
					<span className="gamestatus-score">
						{props.currentGameStats.score}
					</span>
				</div>
				)
		} else {
			return (
				<div className="gamestatus current-game">
					{props.currentGameStats.opponent} {props.currentGameStats.opponent > 1 ? 'Tests' : 'Test'} Passing
					<br />
					{props.currentGameStats.me} {props.currentGameStats.me > 1 ? 'Tests' : 'Test'} Passing
				</div>
				)
		}
	} else if (props.gameNumber > props.challengeProgress) {
		return (
			<div className="gamestatus inactive">
				<span className="gamestatus-score">Pending</span>
			</div>
			)
	} else {
		if (props.gameProgress[props.gameNumber].winner === 'me') {
			return (
				<div className="gamestatus won">
					<span className="gamestatus-score">{props.gameProgress[props.gameNumber].score}</span>
				</div>
				)
		} else {
			return (
				<div className="gamestatus lost">
					<span className="gamestatus-score">{props.gameProgress[props.gameNumber].score}</span>
				</div>
				)
		}
	}
}

export default Gamestatus
