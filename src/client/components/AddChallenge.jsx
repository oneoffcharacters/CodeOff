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
    this.onTestSubmit = this.onTestSubmit.bind(this);
    this.onTestPress = this.onTestPress.bind(this);
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
      console.log('submit post request successful');
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
    .catch((err) => {
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


  onTestSubmit(e) {
    console.log('test submitted');

    let testInputs = JSON.stringify({
      code: this.state.templateFunction,
      solutions: this.state.solutions,
      test: this.state.test
    });

    fetch('api/mocha/addchallenge', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: testInputs
    })
    .then(() => {
      console.log('test post request submitted');
      console.log('testInputs', testInputs);
      console.log('this.state', this.state);

    })
    .catch((err) => {
      console.error(err);
    })
  }

  onTestPress() {
    this.onTestSubmit();
  }


  render() {
    return (
      <div>
        <div>
          <h3 className="AddChallengeHeader">Create a new challenge!</h3>
          <div className="AddChallengeForm">
            <form action="submit" onSubmit={this.onFormSubmit}>
              <div className="AddChallengeInputDiv">
                <p><b>Title</b><br /> ex: Max Number</p>
                <textarea className="AddChallengeInput" type="text" value={this.state.title}  onChange={this.onTitleChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">
                <p><b>Function Name</b><br /> ex: maxNumber</p>
                <textarea className="AddChallengeInput" type="text" value={this.state.functionName} onChange={this.onFunctionNameChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">  
                <p><b>Difficulty:</b><br />ex: Easy, Medium, or Hard</p>
                <textarea className="AddChallengeInput" type="text" value={this.state.difficulty} onChange={this.onDifficultyChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">  
                <p><b>Solutions</b></p>
                <textarea className="AddChallengeInput" type="text" value={this.state.solutions} onChange={this.onSolutionsChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">  
                <p><b>Prompt</b> <br /> ex: Create a function maxNumber that will return the max of two numbers</p>
                <textarea className="AddChallengeInput" type="text" value={this.state.prompt} onChange={this.onPromptChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">  
                <p><b>Template Function</b></p>
                <textarea className="AddChallengeInput" type="text" value={this.state.templateFunction} onChange={this.onTemplateFunctionChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv">
                <p><b>Examples:</b> must be within in an array separated by commas.<br />ex: [maxNumber(3,4) = 4, maxNumber(-1,-3) = -1]</p>  
                <textarea className="AddChallengeInput" type="text" value={this.state.examples} onChange={this.onExamplesChangeHandle}></textarea>
              </div>
              <div className="AddChallengeInputDiv"> 
                <p><b>Chai Assertion Test</b></p> 
                <textarea className="AddChallengeInput" type="text" value={this.state.test} onChange={this.onTestChangeHandle}>const expect = require("chai").expect;</textarea>
              </div>
              <div className="AddChallengeInputDiv">
                <button className="AddChallengeSubmitButton" onClick={this.onButtonPress}>Submit</button>
              </div>
            </form>
            <div className="AddChallengeInputDiv">
              <button className="AddChallengeTestButton" onClick={this.onTestPress}>Test</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

};