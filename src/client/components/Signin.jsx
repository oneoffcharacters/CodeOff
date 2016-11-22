import React from 'React';
import Header from './Header';
import Footer from './Footer';

export default class Signin extends React.Component {
	constructor() {
		super()
		this.state = {
			user: '',
			pw: ''
		};
		this.onUserChangeHandle = this.onUserChangeHandle.bind(this);
		this.onPwChangeHandle = this.onPwChangeHandle.bind(this);		
		this.onButtonPress = this.onButtonPress.bind(this);
	}

	onUserChangeHandle(e) {
		this.setState({user: e.target.value});
	}	

	onPwChangeHandle(e) {
		this.setState({pw: e.target.value});
	}

	onButtonPress(e) {
		e.preventDefault();
		console.log(`this is the user ${this.state.user}, and this is the password ${this.state.pw}`);
	}	

	render () {

		return (
			<div>
				<div>
					<h3>Welcome Back!</h3>
					<h3>{this.state.user}</h3>
					<h3>{this.state.pw}</h3>
					<form action="submit">
						<input type="text" onChange={this.onUserChangeHandle} placeholder="user" />
						<input type="text" onChange={this.onPwChangeHandle} placeholder="password"/>
						<button onClick={this.onButtonPress}>Sign In!</button>
					</form>

				</div>
				<Footer />
			</div>
		)
	}
}