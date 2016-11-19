import React from 'react';

export default class QuestionPrompt extends React.Component {
	constructor(props) {
		super(props)
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
		this.question = this.props.question;
	}

	componentDidMount() {
		document.getElementById('toggleQuestion').addEventListener('click', function (e) {
		  e.preventDefault();
		  if (document.getElementById('questionModal').classList.contains('expanded')) {
		    document.getElementById('questionModal').classList.remove('expanded')
		    this.classList.remove('fa-chevron-down');
		    this.classList.add('fa-chevron-up');
		  } else {
		    document.getElementById('questionModal').classList.add('expanded')
		    this.classList.add('fa-chevron-down');
		    this.classList.remove('fa-chevron-up');
		  }
		});
	}


	

	render() {
		return (
			<div id="questionModal" className="question expanded">
			<div>{this.question.title}</div>
			<div>{this.question.prompt}</div>
			{this.question.examples.map((question) => {
				<div>{question}</div>
			})}
			<div>{this.question.}</div>
			<div>{this.question.}</div>
			  <a href="#" id="toggleQuestion" className="closebtn fa fa-chevron-down"></a>
				}
			</div>
		)
	}
};