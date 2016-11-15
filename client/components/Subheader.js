import React from 'react';

const Subheader = ({sendCode}) => {

	return (
    <div className="subheader">
    	<div>Opponent</div>
    	<div>Time</div>
    	<button onClick={sendCode} className="btn btn-default run" type="submit">Run</button>
    	<button className="btn btn-default submit" type="submit">Submit</button>
    </div>
	)
}

export default Subheader