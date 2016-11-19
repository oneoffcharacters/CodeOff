import React from 'react';

export default class QuestionPrompt extends React.Component {
	constructor(props) {
		super(props);
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
		const examples = this.props.question.examples ? this.props.question.examples : []

		return (
			<div id="questionModal" className="question expanded">
				<div className="question-title"><h2>{this.props.question.title || 'Start a game to get a question'}</h2></div>
				<div className="question-prompt">{this.props.question.prompt}</div>
				<div className="question-examples">{examples.map((example, index) => {
					return <div key={index} className="question-example">{'Example ' + (parseInt(index) +1) + ': ' + example}</div>
				})}</div>
				<a href="#" id="toggleQuestion" className="closebtn fa fa-chevron-down"></a>
			</div>
		)
	}
};