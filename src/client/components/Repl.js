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
        opponentID:'',
        currentGameType:'Solo',
        gameTimer: 0,
        gameTimerInterval:'',
        battleSocket: ''
	  	};
    }

    componentDidMount() {
      this.editor = this.editorSetup();
      this.socket = this.setupSocket();
      this.startConsole();

    }

    //Increment the time to be displayed
    tickTime () {
      console.log(this)
      let time = this.state.gameTimer
      this.setState({gameTimer: (time + 1)})
    }

    //Transmit a message to the server that will add this user to the queue 
    pairMe() {
      publicSocket.emit('message', {
        clientID: this.state.clientID
      });
    }

    //TODO: Complete getQuestion function
    getQuestion() {

    }

    //TODO: Complete didWin function
    didWin() {
      this.state.battleSocket.emit('i won', 
        {client: this.state.clientID}
      )
    }

    //Todo: Update these two functions to be called from the Subheader and actually do the desired actions
    startGame(type) {
      this.setState({currentGameType: type})
      if (type === 'Battle') {
        this.pairMe();
      }
    }

    continuePlaying(type) {
      //TODO: Get a new question
      //TODO: Start timer again
      if (type === 'Battle') {
        console.log('Battle will be continued')
        const boundTick = this.tickTime.bind(this)
        this.setState({
          gameTimerInterval: setInterval(boundTick, 1000)
        })
      } else {
        console.log('Solo will be continued')
      }

    }

    endGame(keepPlaying) {
      //Reset the current games' state & timer
      clearInterval(this.state.gameTimerInterval)
      this.setState({
        gameTimer: 0,
        gameTimerInterval:''
      })

      if (keepPlaying) {
        this.continuePlaying(this.state.currentGameType)
      } else {
        console.log('Dont keep playing')
        this.state.battleSocket.emit('i resigned', 
          {client: this.state.clientID}
        )
        //In the case the user is quitting playing and does not want to continue
        this.setState({
          currentGameType: 'No game',
          pairID: '',
          opponentID: '',
          battleSocket: ''
        })
      }
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
      console.log('publicSocket', publicSocket)

      //Creates a unique client ID that this client will listen for socket events on
      const clientID = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
      this.setState({clientID: clientID});

      publicSocket.on('connect', (data) => {
        console.log('The client has connected to the server socket');
      });

      //Listen for events on destined for this client
      publicSocket.on(clientID, (data) => {
        //On init, update the pairID and opponentID
        if (data.type === 'initBattle') {
          console.log('About to start boundtick in publicSocket listen')
          const boundTick = this.tickTime.bind(this)
          //TODO: Fix this possibly causing full re render every time
          this.setState({
            gameTimerInterval: setInterval(boundTick, 1000)
          })

          console.log('data.pairID is empty?', data.pairID)
          this.setState({
            pairID: data.pairID,
            opponentID: data.opponentID,
            battleSocket: io('/' + data.pairID)
          })

          this.state.battleSocket.on('game won', (data) => {
            console.log(data , this.state.clientID)
            if (data.client === this.state.clientID) {
              console.log('You won')
            } else {
              console.log('The other guy won', data)
            }
            this.endGame(true)
            this.startGame(this.state.currentGameType)
          })
          this.state.battleSocket.on('i resigned', (data) => {
            console.log(data.client , this.state.clientID)
            if (data.client === this.state.clientID) {
              console.log('You resigned')
              this.endGame(false)
            } else {
              this.endGame(true)
              this.startGame(this.state.currentGameType)
              console.log('You win by default, the other guy resigned', data)
            }
          })
          console.log('The pair ID was set to', this.state.pairID)
        }
        console.log('The client was notified of a succesful pair!', data)
      })


    }



    //Update the value of the text editor into the state on every keypress
    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({
        text: text
      });
    }

    //Submit the value of the code in the editor to the server for evaluation
    // then write response to console
    sendCode() {
      const context = this;

      fetch('api/codeOutput',  {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: this.state.text
          })
        })
      .then((output) => {
        return output.json();
      })
      .then((codeResponse) => {
        context.state.console.Write(codeResponse.text);
      })
      .catch((err) => {
        throw new Error('The response from the REPL server is invalid');
      })
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

    //TODO: Remove didWin from being passed into Subheader as it is just for testing
  render() {
    return (
      <div className="container-fluid no-pad">
        <Subheader startGame={this.startGame.bind(this)} 
                  gameTimer={this.state.gameTimer} 
                  currentGameType={this.state.currentGameType} 
                  pairMe={this.pairMe.bind(this)} 
                  sendCode={this.sendCode.bind(this)} 
                  endGame={this.endGame.bind(this)}
                  didWin={this.didWin.bind(this)} />

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
