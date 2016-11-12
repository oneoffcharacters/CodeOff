import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import Home from './HomePage';
import { Route, Router, hashHistory } from './react-router'
import Repl from './Repl'
import Dashboard from './Dashboard'

export default class Anchor extends React.Component {
	render() {
		return(
			<Router history={hashHistory}>
				<h1 className='title'>HELLO WEBPACK</h1>
				<Route path="/" component={Home}/>
				<Route path="/repl" component={Repl}/>
				<Route path="/dashboard" component={About}/>
			</Router>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));
