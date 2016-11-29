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
import NotFound from './NotFound';
import testRepl from './testRepl';
import AddChallenge from './AddChallenge';

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
					<Route path="/test" component={testRepl}/>
					<Route path="/*" component={NotFound}/>
					<Route path="/addchallenge" component={AddChallenge}/>
				</Route>
			</Router>
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));