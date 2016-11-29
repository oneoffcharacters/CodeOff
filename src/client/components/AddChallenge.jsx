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

  }

  onButtonPress() {
    this.onFormSubmit();
  }

  render() {
    return (
      <div>
        <div>
          <h3>Create a new challenge!</h3>
          <form>
            <input type="text" value={'hello'} name="" onChange={this.onTitleChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onFunctionNameChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onDifficultyChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onSolutionsChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onPromptChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onTemplateFunctionChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onExamplesChangeHandle} placeholder="" />
            <input type="text" value={'hello'} name="" onChange={this.onTestChangeHandle} placeholder="" />
            <button onClick={this.onButtonPress}>Add Challenge</button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

}