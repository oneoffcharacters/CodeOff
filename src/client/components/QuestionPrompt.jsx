import React from 'react';

export default class QuestionPrompt extends React.Component {
	constructor() {
		super()
		this.state = {
			prompt: 'before mount',
			ex1: '',
			ex2: ''
		}
	}

	componentWillMount() {
		console.log('dummy fetch database request!');
		this.setState({
			prompt: 'reset the prompts initial state',
      ex1: 'grab from db',
      ex2: 'grab from db'
		});
	}

	render() {
		return (
			<div className='QPContainer'>
				<h3 className='QPMessage'>{this.state.prompt}</h3>
				<h5 className='QPSample'>Sample Test Cases</h5>
				<p className='QPex1'>{this.state.ex1}</p>
				<p className='QPex2'>{this.state.ex2}</p>
			</div>	
		)
	}
};