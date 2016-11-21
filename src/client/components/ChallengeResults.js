import React from 'react';

const ChallengeResults = ({ terminateGame, nextRoundTimer , challengeResults }) => {
	return (
		<div className="result-card">
			<div className="result-title">{challengeResults}!</div>
			<div className="result-timeleft">The next game will begin in {nextRoundTimer} seconds</div>
			<div className="result-ordivider">---or---</div>
			<div onClick={terminateGame} className="btn btn-default">Stop Playing</div>
		</div>
	)
}

export default ChallengeResults;