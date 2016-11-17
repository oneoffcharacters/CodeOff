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


    tickTime () {
      this.setState({gameTimer: 1 + this.state.gameTimer})
    }

    //Transmit a message to the server that will add this user to the queue 
      // (and return a user pair if there are enough people)
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
      console.log('Did win button clicked')
      console.log('this.state.battleSocket', this.state.battleSocket)

      this.state.battleSocket.emit('i won', 
        {winner: this.state.clientID}
      )
    }

    //Todo: Update these two functions to be called from the Subheader and actually do the desired actions
    startGame(type) {
      console.log('Game started: ', type)
      //TODO: Fix this possibly causing full re render every time
      // this.setState{
      //   gameTimerInterval: setInterval(this.tickTime, 1000)
      // }

      this.setState({currentGameType: type})
      console.log('startGame type=', type)
      if (type === 'solo') {
        this.setState({currentGameType: 'Solo'})
      } else {
        this.setState({
          currentGameType: 'Battle'
        })
        this.pairMe();
        console.log(type, ' game started.')
      }
    }

    endGame() {
      console.log('Game ended')
      clearInterval(this.state.gameTimerInterval)
      this.setState({
        gameTimer: 0,
        currentGameType: 'No game',
        pairID: '',
        opponentID: ''
      })

      //Notify the other client that the game has been ended if it's a two player game
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
          console.log('data.pairID is empty?', data.pairID)
          this.setState({
            pairID: data.pairID,
            opponentID: data.opponentID,
            battleSocket: io('/' + data.pairID)
          })
          console.log('this.state.battleSocket', this.state.battleSocket)
          this.state.battleSocket.on('game won', (data) => {
            console.log(data.winner , this.state.clientID)
            if (data.winner != this.state.clientID) {
              console.log('The other guy won', data)
            } else {
              console.log('You must have won')
            }
          })
          console.log('The pair ID was set to', this.state.pairID)
          // publicSocket.on(data.pairID, (data) => {
          //   if (data.type === 'opponent won') {
          //     console.log('Your opponent won', data.winner)
          //     this.endGame();
          //   }
          //   console.log('A pair only communication was made', data)
          // })
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
