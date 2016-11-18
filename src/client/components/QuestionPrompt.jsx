import React from 'react';

export default class QuestionPrompt extends React.Component {
	constructor() {
		super()
		this.state = {
			prompt: '',
			ex1: 'this is an example ex1',
			ex2: 'this is an example ex2'
		}
	}

	ComponentWillMount() {
		console.log('dummy fetch database request!');
		this.setState({
			prompt: 'reset the prompts initial state'
		});
	}

	render() {
		return (
			<div className='QPContainer'>
				<h4 className='QPMessage'>{this.state.prompt}</h4>
				<h4 className='QPSample'>Sample Test Cases</h4>
				<p className='QPex1'>{this.state.ex1}</p>
				<p className='QPex2'>{this.state.ex2}</p>
			</div>	
		)
	}
};