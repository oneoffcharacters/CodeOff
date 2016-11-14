import React from 'react';
import Subheader from './Subheader'
import ReactDOM from 'react-dom';
import jQuery from 'jquery'; 
const $ = jQuery;
// jq-console is throwing 'ReferenceError: jQuery is not defined' in testing
// is it necessary / being imported properly?
// import jqconsole from 'jq-console';

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

      // //listen for changes
      // $(window).resize(resizeAce);
      // //set initially
      // resizeAce();

      this.startConsole = this.startConsole.bind(this);
      this.startConsole();

    }

    editorSetup () {
      var editor = ace.edit("editor");

      editor.setTheme("ace/theme/dreamweaver");
      editor.getSession().setMode("ace/mode/javascript");
      editor.getSession().setUseSoftTabs(true);
      editor.setHighlightActiveLine(false);
      document.getElementById('editor').style.fontSize='13px';
      editor.getSession().setUseWrapMode(true);
      editor.setShowPrintMargin(false);
      editor.resize();
      editor.setAutoScrollEditorIntoView(true);

      return editor;
    }

    resizeAce() {
      return $('#editor').height($(window).height());
    };

    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
      console.log('text, e', text, e)
      // this.socket.emit('text change', text);
    }

    sendCode() {
      console.log('this.state.text', this.state.text)
      // $.ajax({
      //   method: 'POST',
      //   url: '/api/replservice/runcode',
      //   data: {code: this.state.text},
      //   success: (data) => {
      //     this.socket.emit('append result', data);
      //     // $('.response').append(data);
      //     // console.log('after socket');
      //   },
      //   error: (jqXHR, textStatus, errorThrown) => {
      //     console.log(textStatus, errorThrown, jqXHR);
      //   }
      // });
    }

    startConsole () {
      // move jqconsole out
      var jqconsole = $('#console-terminal-editor').jqconsole('>>>');

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
      <div className="container-fluid no-pad">
        <Subheader sendCode={this.sendCode.bind(this)} />
        <div id="wrapper">
          <div className="container  no-pad" id="editor-container">
            <div className="col-sm-12 col-md-6 no-pad">
              <div className="panel">
                <div className="panel-heading">
                Panel
                </div>
                <div className="panel-body no-pad">
                  <div id="editor" onKeyUp={this.handleKeyPress.bind(this)}> </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 no-pad">
              <div className="panel">
                <div className="panel-heading">
                  <h3 className="panel-title">Console</h3>
                </div>

                <div className="panel-body no-pad">
                  <div className="home-editor">
                    <div id="console-terminal-editor" className="home-console"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Repl
