import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import Home from './HomePage';
import { Route, Router, hashHistory } from 'react-router'
import Repl from './Repl'
import Dashboard from './Dashboard'

export default class Anchor extends React.Component {
	render() {
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Home}>
					<Route path="/repl" component={Repl}/>
					<Route path="/dashboard" component={Dashboard}/>
				</Route>
			</Router>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));
