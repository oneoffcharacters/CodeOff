import React from 'react';

export default class ChallengeCard extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.getElementById('toggleChallenge').addEventListener('click', function (e) {
		  e.preventDefault();
		  if (document.getElementById('challengeModal').classList.contains('expanded')) {
		    document.getElementById('challengeModal').classList.remove('expanded')
		    this.classList.remove('fa-chevron-down');
		    this.classList.add('fa-chevron-up');
		  } else {
		    document.getElementById('challengeModal').classList.add('expanded')
		    this.classList.add('fa-chevron-down');
		    this.classList.remove('fa-chevron-up');
		  }
		});
	}


	

	render() {
		const progress = this.props.progress
		const examples = this.props.challenge[progress].examples ? this.props.challenge[progress].examples : []

		return (
			<div id="challengeModal" className="challenge expanded">
				<div className="challenge-title"><h2>{this.props.challenge[progress].title || 'Start a game to get a challenge'}</h2></div>
				<div className="challenge-prompt">{this.props.challenge[progress].prompt}</div>
				<div className="challenge-examples">{examples.map((example, index) => {
					return <div key={index} className="challenge-example">{'Example ' + (parseInt(index) +1) + ': ' + example}</div>
				})}</div>
				<a href="#" id="toggleChallenge" className="closebtn fa fa-chevron-down"></a>
			</div>
		)
	}
};