import React from 'React';
import Header from './Header';
import Footer from './Footer';
const authUrl = 'http://localhost:3000/api/auth/login';


export default class Signin extends React.Component {
	constructor() {
		super()
		this.state = {
			user: '',
			pw: ''
		};
		this.onUserChangeHandle = this.onUserChangeHandle.bind(this);
		this.onPwChangeHandle = this.onPwChangeHandle.bind(this);		
		this.onFormSubmit = this.onFormSubmit.bind(this)''
		this.onButtonPress = this.onButtonPress.bind(this);
	}

	onUserChangeHandle(e) {
		this.setState({user: e.target.value});
	}	

	onPwChangeHandle(e) {
		this.setState({pw: e.target.value});
	}

	onFormSubmit(e) {
		e.preventDefault();
		console.log(`this is the user ${this.state.user}, and this is the password ${this.state.pw}`);
		
		fetch('')

		this.setState({
			user: '',
			pw: ''
		})
	}

	onButtonPress() {
		this.onFormSubmit();
	}	

	render () {

		return (
			<div>
				<div>
					<h3>Welcome Back!</h3>
					<h3>{this.state.user}</h3>
					<h3>{this.state.pw}</h3>
					<form action="submit" onSubmit={this.onFormSubmit}>
						<input type="text" name="userinp" onChange={this.onUserChangeHandle} placeholder="user" />
						<input type="text" name="pwinp" onChange={this.onPwChangeHandle} placeholder="password"/>
						<button onClick={this.onButtonPress}>Sign In!</button>
					</form>

				</div>
				<Footer />
			</div>
		)
	}
}