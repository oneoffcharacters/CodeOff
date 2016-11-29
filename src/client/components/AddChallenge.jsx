import React from 'React';
import Footer from './Footer';

export default class AddChallenge extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      functionName: '',
      difficulty: '',
      solutions: '',
      prompt: '',
      templateFunction: '',
      examples: '',
      test: ''
    };
    this.onTitleChangeHandle = this.onTitleChangeHandle.bind(this);
    this.onFunctionNameChangeHandle = this.onFunctionNameChangeHandle.bind(this);
    this.onDifficultyChangeHandle = this.onDifficultyChangeHandle.bind(this);
    this.onSolutionsChangeHandle = this.onSolutionsChangeHandle.bind(this);
    this.onPromptChangeHandle = this.onPromptChangeHandle.bind(this);
    this.onTemplateFunctionChangeHandle = this.onTemplateFunctionChangeHandle.bind(this);
    this.onExamplesChangeHandle = this.onExamplesChangeHandle.bind(this);
    this.onTestChangeHandle = this.onTestChangeHandle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onTitleChangeHandle(e) {
    this.setState({title: e.target.value});
  }

  onFunctionNameChangeHandle(e) {
    this.setState({functionName: e.target.value});
  }

  onDifficultyChangeHandle(e) {
    this.setState({difficulty: e.target.value});
  }

  onSolutionsChangeHandle(e) {
    this.setState({solutions: e.target.value});
  }

  onPromptChangeHandle(e) {
    this.setState({prompt: e.target.value});
  }

  onTemplateFunctionChangeHandle(e) {
    this.setState({templateFunction: e.target.value});
  }

  onExamplesChangeHandle(e) {
    this.setState({examples: e.target.value});
  }

  onTestChangeHandle(e) {
    this.setState({test: e.target.value});
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('form submitted');

    let challengeInputs = JSON.stringify({
      title: this.state.title,
      functionName: this.state.functionName,
      difficulty: this.state.difficulty,
      solutions: this.state.solutions,
      prompt: this.state.prompt,
      templateFunction: this.state.templateFunction,
      examples: this.state.examples,
      test: this.state.test
    });

    fetch('http://localhost:3000/api/challenge', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: challengeInputs 
    })
    .then(() => {
      console.log('post request successful');
      this.setState({
        title: '',
        functionName: '',
        difficulty: '',
        solutions: '',
        prompt: '',
        templateFunction: '',
        examples: '',
        test: ''
      });
      console.log('state after request to /api/challenge =', this.state); 
    })
    .catch(err => {
      console.error(err);
      this.setState({
        title: '',
        functionName: '',
        difficulty: '',
        solutions: '',
        prompt: '',
        templateFunction: '',
        examples: '',
        test: ''
      });
    });
  }

  onButtonPress() {
    this.onFormSubmit();
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="AddChallengeHeader">Create a new challenge!</h3>
          <div className="AddChallengeForm">
            <form action="submit" onSubmit={this.onFormSubmit}>
              <div>
                <input className="AddChallengeInput" type="text" value={this.state.title} name="" onChange={this.onTitleChangeHandle} placeholder="title" />
              </div>
              <div>
                <input className="AddChallengeInput" type="text" value={this.state.functionName} name="" onChange={this.onFunctionNameChangeHandle} placeholder="function name" />
              </div>
              <div>  
                <input className="AddChallengeInput" type="text" value={this.state.difficulty} name="" onChange={this.onDifficultyChangeHandle} placeholder="difficulty" />
              </div>
              <div>  
                <input className="AddChallengeInput" type="text" value={this.state.solutions} name="" onChange={this.onSolutionsChangeHandle} placeholder="solutions" />
              </div>
              <div>  
                <input className="AddChallengeInput" type="text" value={this.state.prompt} name="" onChange={this.onPromptChangeHandle} placeholder="prompt" />
              </div>
              <div>  
                <input className="AddChallengeInput" type="text" value={this.state.templateFunction} name="" onChange={this.onTemplateFunctionChangeHandle} placeholder="template function" />
              </div>
              <div>
                <p>Examples must be within in an array separated by commas.</p>  
                <input className="AddChallengeInput" type="text" value={this.state.examples} name="" onChange={this.onExamplesChangeHandle} placeholder="examples" />
              </div>
              <div>  
                <input className="AddChallengeInput" type="text" value={this.state.test} name="" onChange={this.onTestChangeHandle} placeholder="test" />
              </div>
              <div>
                <button className="AddChallengeButton" onClick={this.onButtonPress}>Add Challenge</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}