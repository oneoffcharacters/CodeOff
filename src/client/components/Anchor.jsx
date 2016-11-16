import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import App from './App';
import { Route, Router, browserHistory, IndexRedirect } from 'react-router'
import Repl from './Repl'
import Dashboard from './Dashboard'
import Landing from	'./Landing'

export default class Anchor extends React.Component {
	render() {
		return(
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRedirect to="/landing" />
					<Route path="/landing" component={Landing}/>
					<Route path="/repl" component={Repl}/>
					<Route path="/dashboard" component={Dashboard}/>
				</Route>
			</Router>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));