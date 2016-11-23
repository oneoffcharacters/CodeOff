import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import App from './App';
import { Route, Router, hashHistory, IndexRedirect, browserHistory } from 'react-router';
import Repl from './Repl';
import Viewer from './Viewer';
import Dashboard from './Dashboard';
import Landing from	'./Landing';
import Signin from './Signin';
import Lobby from './Lobby';
import Register from './Register';

export default class Anchor extends React.Component {
	render() {
		return(
			<div className='routerHide'>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRedirect to="/landing" />
					<Route path="/landing" component={Landing}/>
					<Route path="/repl" component={Repl}/>
					<Route path="/viewer/:namespace" component={Viewer} />
					<Route path="/dashboard" component={Dashboard}/>
					<Route path="/signin" component={Signin}/>
					<Route path="/lobby" component={Lobby}/>
					<Route path="/register" component={Register}/>
				</Route>
			</Router>
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));