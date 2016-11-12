import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import Home from './homepage';

export default class Anchor extends React.Component {
	render() {
		return(
			<div>
				<h1 className='title'>HELLO WEBPACK</h1>
				<Test />
        <Home />
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));
