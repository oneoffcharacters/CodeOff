import React from 'react';

const Subheader = ({sendCode, pairMe}) => {

	return (
    <div className="subheader">
    	<div>Opponent</div>
    	<div>Time</div>

    	<button onClick={pairMe} className="btn btn-default run" type="submit">Pair Me</button>
    	<button onClick={sendCode} className="btn btn-default run sendCodeBtn" type="submit">Run</button>
    	<button className="btn btn-default submit" type="submit">Submit</button>
    </div>
	)
}

export default Subheader