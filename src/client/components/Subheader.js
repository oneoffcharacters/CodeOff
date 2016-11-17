import React from 'react';
import GametypeOptions from './GametypeOptions'


const Subheader = ({ sendCode, pairMe, currentGameType, gameTimer, startGame , endGame, didWin }) => {
	return (
		<div className="subheader">
			<button onClick={didWin} className="btn btn-default run" type="submit">I Won</button>
			<div>{currentGameType}</div>
			<div>{gameTimer}</div>
			<GametypeOptions startGame={startGame} endGame={endGame} />
			<button onClick={pairMe} className="btn btn-default run" type="submit">Pair Me</button>
			<button onClick={sendCode} className="btn btn-default run sendCodeBtn" type="submit">Run</button>
			<button className="btn btn-default submit" type="submit">Submit</button>
		</div>

	)
}

export default Subheader