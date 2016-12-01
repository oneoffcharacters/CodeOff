// import packages
import React from 'react';

// import components
import GametypeOptions from './GametypeOptions';
import Powerups from './Powerups';

const Subheader = ({nextRoundTimer, powerups, usePowerup, runCode, currentGameType, gameTimer, startFreshGame , terminateGame, didWin , submitCode}) => {
	
	const prettyTime = function(time) {
		let minutes = Math.floor(time / 60);
		let seconds = time - minutes * 60;

		function str_pad_left(string,pad,length) {
		    return (new Array(length+1).join(pad)+string).slice(-length);
		}

		let finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
		return finalTime;
	}

	const isDisabled = nextRoundTimer > 0 ? true : false;

	return (
		<div className="subheader row no-marg">
			<GametypeOptions startFreshGame={startFreshGame} terminateGame={terminateGame} />
			<Powerups  powerups={powerups} usePowerup={usePowerup}/>
			<span className="gametype">{currentGameType}</span>
			<span className="gametimer">{"Time: " + prettyTime(gameTimer)}</span>
			<button onClick={runCode} className="btn btn-default action" type="submit">Run</button>
			<button onClick={submitCode} disabled={isDisabled} className="btn btn-default action" type="submit">Submit</button>
		</div>
	)
}

export default Subheader
