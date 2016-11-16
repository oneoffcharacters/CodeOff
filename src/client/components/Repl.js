import React from 'react';
import Subheader from './Subheader'
import ReactDOM from 'react-dom';
import jqconsole from 'jq-console';
let publicSocket

class Repl extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	    	text:"console.log('hello world');",
	    	console:'',
        clientID:'',
        pairID:'',
        opponentID:''
	  	};  
    }


    componentDidMount() {
      this.editor = this.editorSetup();
      this.socket = this.setupSocket();
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
      publicSocket = io();

      //Creates a unique client ID that this client will listen for socket events on
      const clientID = chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
      this.setState({clientID: clientID});

      publicSocket.on('connect', (data) => {
        console.log('The client has connected to the server socket');
      });

      publicSocket.on(clientID, (data) => {
        if (data.type === 'init') {
          this.setState({
            pairID: data.pairID,
            opponentID: data.opponentID
          })
        }
        console.log(this.state)
        console.log('The client was notified of a succesful pair!')
      })
    }

    pairMe() {
      publicSocket.emit('message', {
        clientID: this.state.clientID
      });
    }

    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
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

    }

    startConsole () {
      var jqconsole = $('#console-terminal-editor').jqconsole('>>>');
      this.setState({
        console: jqconsole
      });

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
        <Subheader pairMe={this.pairMe.bind(this)} sendCode={this.sendCode.bind(this)} />
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
