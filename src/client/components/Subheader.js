import React from 'react';
import GametypeOptions from './GametypeOptions'


const Subheader = ({ runCode, currentGameType, gameTimer, startFreshGame , terminateGame, didWin , submitCode}) => {
	
	const prettyTime = function(time) {
		var minutes = Math.floor(time / 60);
		var seconds = time - minutes * 60;

		function str_pad_left(string,pad,length) {
		    return (new Array(length+1).join(pad)+string).slice(-length);
		}

		var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
		return finalTime;
	}
	
	return (
		<div className="subheader row no-marg">
			<GametypeOptions startFreshGame={startFreshGame} terminateGame={terminateGame} />
			<span className="gametype">{currentGameType}</span>
			<span className="gametimer">{"Time: " + prettyTime(gameTimer)}</span>
			<button onClick={runCode} className="btn btn-default run runCodeBtn" type="submit">Run</button>
			<button onClick={submitCode} className="btn btn-default submitBtn" type="submit">Submit</button>
			{/*<button onClick={didWin} className="btn btn-default run" type="submit">I Won</button>*/}
		</div>

	)
}

export default Subheader