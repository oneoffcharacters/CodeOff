import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
import App from './App';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
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
				<Route path="/gameroom" component={Repl}/>
				<Route path="/" component={App}>
					<IndexRedirect to="/landing" />
					<Route path="/landing" component={Landing}/>
					<Route path="/viewer/:namespace" component={Viewer} />
					<Route path="/dashboard" component={Dashboard}/>
					<Route path="/signin" component={Signin}/>
					<Route path="/lobby" component={Lobby}/>
					<Route path="/register" component={Register}/>
<<<<<<< 4d3ca7bf0a9d76c36bbe95d7d7f91095903b15cf
					<Route path="/test" component={testRepl}/>
||||||| merged common ancestors
					<Route path="/*" component={NotFound}/>
=======
>>>>>>> Moves /* route below /addchallenge, removes h3 for testing this.state for form input
					<Route path="/addchallenge" component={AddChallenge}/>
					<Route path="/*" component={NotFound}/>
				</Route>
			</Router>
			</div>
		)
	}
}

ReactDOM.render(<Anchor />, document.getElementById('app'));