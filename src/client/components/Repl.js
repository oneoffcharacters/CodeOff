import React from 'react';
import Subheader from './Subheader'
import ReactDOM from 'react-dom';
import chance from 'chance'
// jq-console is throwing 'ReferenceError: jQuery is not defined' in testing
// is it necessary / being imported properly?
// import jqconsole from 'jq-console';

// const clientId = chance.string({length: 5, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'});
let socket;

class Repl extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	    	text:"console.log('hello world');",
	    	console:''
	  	};  
    }


    componentDidMount() {
      this.editor = this.editorSetup();
      console.log('this',  this)
      this.socket = this.setupSocket();
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
      editor.setValue('console.log(\'hello world\');', 1)

      return editor;
    }

    setupSocket() {
      // var socket = io.connect('http://localhost');
      console.log(socket);
      socket = io();
      console.log(socket);

      // const connectionSocket = io(window.location.pathname); // FIX ME
      // clientSocket = io();
      console.log('window.location', window.location)
      window.location.href += '/' + 'xyz'
      console.log('window.location', window.location)
    }

    resizeAce() {
      return $('#editor').height($(window).height());
    };

    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
      console.log('text', e)
      // this.socket.emit('text change', text);
    }

    sendCode() {
      const context = this;
      $.ajax({
        method: 'POST',
        url: 'api/repl',
        data: {code: this.state.text},
        success: (data) => {
          context.state.console.Write(JSON.parse(data).consoleText);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.log(textStatus, errorThrown, jqXHR);
        }
      });

      //=====LEAVE THIS IN FOR SHERMAN TO INSPECT=========
      // fetch('api/repl', {
      //   method: 'POST', 
      //   mode: 'cors', 
      //   redirect: 'follow',
      //   headers: new Headers({
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }),
      //   body: JSON.stringify({
      //       code: this.state.text
      //   })
      // })
      // .then(function(response) {
      //   console.log('this', context);
      //   return response.json()
      //   });
      // })
      // .then(function(parsedResponse) {
      //   console.log('parsedResponse', parsedResponse)
      //   
      // })
      // .catch(function(err) {
      //   console.log('Send code errored out',  err)
      // })

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
