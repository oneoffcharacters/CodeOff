import React from 'react';


const Gamestatus = (props) => {

	console.log('Props in gamestatus', props)

	//Decide if it is the current game
		//If it is, assign this variable to the split config
		//Else, create it as the singular mode
			//Decide on the styling based on who one it

	return (
		<div className="gamestatus">
			<span className="gamestatus_score">{props.gameProgress[0].score}</span>
		</div>

	)
}

export default Gamestatus