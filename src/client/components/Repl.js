import React from 'react';
import Subheader from './Subheader'
import ReactDOM from 'react-dom';
import jqconsole from 'jq-console';
let publicSocket;

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

      //Listen for events on destined for this client
      publicSocket.on(clientID, (data) => {
        //On init, update the pairID and opponentID
        if (data.type === 'init') {
          this.setState({
            pairID: data.pairID,
            opponentID: data.opponentID
          })
        }
        console.log('The client was notified of a succesful pair!')
      })
    }

    //Transmit a message to the server that will add this user to the queue 
      // (and return a user pair if there are enough people)
    pairMe() {
      publicSocket.emit('message', {
        clientID: this.state.clientID
      });
    }

    //Update the value of the text editor into the state on every keypress
    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
    }

    //Submit the value of the code in the editor to the server for evaluation
    sendCode() {
      const context = this;
      $.ajax({
        method: 'POST',
        url: 'api/codeOutput',
        data: {code: this.state.text},
        success: (data) => {
          //With the result, write the data to the console
          context.state.console.Write(JSON.parse(data).consoleText);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          console.log(jqXHR, textStatus, errorThrown);
        }
      });
    }

    //Create the console element to be displayed on the div #console-terminal-editor
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
