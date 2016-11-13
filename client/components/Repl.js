import React from 'react';
import $ from 'jquery'; 
import jqconsole from 'jq-console';

class Repl extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	    	text:'None',
	    	console:''
	  	};
    }

    componentDidMount() {
      this.editor = this.editorSetup();

      // this.startConsole = this.startConsole.bind(this);
      // this.startConsole();

    }

    editorSetup () {
      var editor = ace.edit("editor");

      editor.setTheme("ace/theme/dreamweaver");
      editor.getSession().setMode("ace/mode/javascript"); // going to execute js
      editor.getSession().setUseSoftTabs(true); // use soft-tabs
      editor.setHighlightActiveLine(false); // sets line highlighting
      document.getElementById('editor').style.fontSize='13px'; // sets the font-size
      editor.getSession().setUseWrapMode(true);
      editor.setShowPrintMargin(false);
      editor.resize();

      return editor;
    }

    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
      console.log('text, e', text, e)
      // this.socket.emit('text change', text);
    }

    //Need to import Jquery for this
    // sendCode() {
    //   $.ajax({
    //     method: 'POST',
    //     url: '/api/replservice/runcode',
    //     data: {code: this.state.text},
    //     success: (data) => {
    //       this.socket.emit('append result', data);
    //       // $('.response').append(data);
    //       // console.log('after socket');
    //     },
    //     error: (jqXHR, textStatus, errorThrown) => {
    //       console.log(textStatus, errorThrown, jqXHR);
    //     }
    //   });
    // }

    startConsole () {
      // move jqconsole out
      var jqconsole = $('#console-terminal-editor').jqconsole('Hi\n', '>>>');

      this.setState({
        console: jqconsole
      });

      // jqconsole setup


      $(function () {
          var startPrompt = function () {
          // Start the prompt with history enabled.
          jqconsole.Prompt(true, function (input) {
          // Output input with the class jqconsole-output.
          jqconsole.Write(input + '\n', 'jqconsole-output');
          // Restart the prompt.ed
          });
        };
      startPrompt();
      });
    }

  render() {
    return (
    	<div className="expanded row">
	    	  <div className="small-12 medium-6 column" id="editor" onKeyUp={this.handleKeyPress.bind(this)}> </div>
	    	  {/*<div id="console-terminal-editor"></div>*/}
    	</div>
    )
  }
}

export default Repl