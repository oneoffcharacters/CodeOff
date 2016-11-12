import React from 'react';

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

class Repl extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	  	};
    }

  componentDidMount() {
  	console.log('this.createREPL', this.createREPL)
  	this.createREPL();
  }

  createREPL() {
  	var editor = ace.edit("editor");
  	editor.setTheme("ace/theme/monokai");
  	editor.getSession().setMode("ace/mode/javascript");
  }

  render() {
    return (
      <div id="editor">
      	REPL
      </div>
    )
  }
}

export default Repl