// import packages
import React from 'react';

// import components
import GametypeOptions from './GametypeOptions';
import Powerups from './Powerups';

const Subheader = ({powerups, usePowerup, runCode, currentGameType, gameTimer, startFreshGame , terminateGame, didWin , submitCode}) => {
	const prettyTime = function(time) {
		let minutes = Math.floor(time / 60);
		let seconds = time - minutes * 60;

		function str_pad_left(string,pad,length) {
		    return (new Array(length+1).join(pad)+string).slice(-length);
		}

		let finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
		return finalTime;
	}

	return (
		<div className="subheader row no-marg">
			<GametypeOptions startFreshGame={startFreshGame} terminateGame={terminateGame} />
			<Powerups  powerups={powerups} usePowerup={usePowerup}/>
			<span className="gametype">{currentGameType}</span>
			<span className="gametimer">{"Time: " + prettyTime(gameTimer)}</span>
			<button onClick={runCode} className="btn btn-default run runCodeBtn" type="submit">Run</button>
			<button onClick={submitCode} className="btn btn-default submitBtn" type="submit">Submit</button>
		</div>
	)
}

export default Subheader
