import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';

class Anchor extends React.Component {
	render() {
		return(
			<div>
				<h1 className='title'>HELLO WEBPACK</h1>
				<Test />
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));
