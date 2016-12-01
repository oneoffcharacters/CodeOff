// import packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';

// import components
import App from './App';
import Repl from './Repl';
import Viewer from './Viewer';
import Dashboard from './Dashboard';
import Landing from	'./Landing';
import Signin from './Signin';
import Lobby from './Lobby';
import Register from './Register';
import NotFound from './NotFound';
import AddChallenge from './AddChallenge';

class Anchor extends React.Component {
	render() {
		return(
			<div className='routerHide'>
			<Router history={browserHistory}>
				<Route path="/gameroom" component={Repl}/>
				<Route path="/" component={App}>
					<IndexRedirect to="/landing" />
					<Route path="/landing" component={Landing}/>
					<Route path="/viewer/:namespace" component={Viewer} />
					<Route path="/dashboard" component={Dashboard}/>
					<Route path="/signin" component={Signin}/>
					<Route path="/lobby" component={Lobby}/>
					<Route path="/register" component={Register}/>
					<Route path="/addchallenge" component={AddChallenge}/>
					<Route path="/*" component={NotFound}/>
				</Route>
			</Router>
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));
