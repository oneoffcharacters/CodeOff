import React from 'react';
import ReactDOM from 'react-dom';
import ChallengeCard from './ChallengeCard'
let publicSocket;

class Viewer extends React.Component {
    constructor(props) {
      //TODO: I will need to be passed a prop of the namespace that I am going to listen on
      super(props);
      this.state = {
        text:{
          player1:"console.log('Player 1 text');",
          player2:"console.log('Player 2 text');"
        },
        clientID:'',
        pairID: this.props.params.namespace,
        opponentID: {
          player1:'',
          player2:''
        },
        gameTimer: 0,
        nextRoundTimer:0, //While this is > 0, show the ChallengeResults component
        gameTimerInterval:'',
        battleSocket: '',
        challenge: [{}],
        challengeResults:''
      };
    }

    componentDidMount() {
      this.editor1 = this.editorSetup('1');
      this.editor2 = this.editorSetup('2');
      // {
      // //xsy: this.editor1,
      // //abs: this.editor.2
      this.socket = this.setupSocket();
      // }
    }

    closeBattleSocket (newType) {
      //In the case the user is quitting playing and does not want to continue
        this.setState({
          pairID: '',
          opponentID: {
            player1:'',
            player2:''
          },
          battleSocket: ''
        })
      }

    editorSetup (number) {
      var editor = ace.edit("editor" + number);
      editor.setTheme("ace/theme/dreamweaver");
      editor.getSession().setMode("ace/mode/javascript");
      editor.getSession().setUseSoftTabs(true);
      editor.setHighlightActiveLine(false);
      document.getElementById('editor' + number).style.fontSize='13px';
      editor.getSession().setUseWrapMode(true);
      editor.setShowPrintMargin(false);
      editor.resize();
      editor.setAutoScrollEditorIntoView(true);
      editor.setValue('console.log(\'hello world user ' + number + '\');', 1)

      return editor;
    }

    setupSocket() {
      // e.preventDefault()
      publicSocket = io();

      //Creates a unique client ID that this client will listen for socket events on
      const clientID = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
      this.setState({clientID: clientID});

      publicSocket.on('connect', (data) => {
        console.log('The client has connected to the server socket for viewing');
      });

      //KEEP THIS TODO: the time will need to be sent from clients on initialization
      // const boundTick = this.tickTime.bind(this)
      // this.setState({
      //   gameTimerInterval: setInterval(boundTick, 1000)
      // })


      // TODO: Uncomment this, it is just to get the page rendered
      this.setState({
        battleSocket: io('/' + this.state.pairID)
      }, () => {
        this.state.battleSocket.on('connect', (data) => {
          //TODO: Get the challenge from the server
          //TODO: Get the player ID's from the server
          console.log('Connected to the battleSocket and the data is',  data)
        })

        this.state.battleSocket.on('userinput', (data) => {
          console.log('User input for the battleSocket is',  data)
          //On recieving userinput data, set the value of the editor to the data
          if (data.user === this.state.opponentID.player1) {
            this.editor1.setValue(data.challenge.templateFunction, -1)
          } else if (data.user === this.state.opponentID.player2)
            this.editor2.setValue(data.challenge.templateFunction, -1)
        })

        this.state.battleSocket.on('pairInfo', (data) => {
          console.log('data coming back from pairID', data)
          const opponents = Object.keys(data);
          this.setState({
            opponentID:{
              player1: opponents[0],
              player2: opponents[1]
            }
          })
          //Set a mapping of 
        })

        this.state.battleSocket.on('updateText', (data) => {
          console.log('This is the data received by update text',  data)
          if (data.client === this.state.opponentID.player1) {
            this.editor1.setValue(data.text, -1);
          } else {
            this.editor2.setValue(data.text, -1);
          }
        })
      })
    }

    handleKeyPress (e) {
      const context = this;

      context.setState({
        pairID: e.target.value
      });
    }

  render() {
    console.log('this.props.params.namespace', this.props.params.namespace)
    return (
        <div className="viewer">
          <form onSubmit={this.setupSocket.bind(this)}>
            <input type="text" name="name" onKeyUp={this.handleKeyPress.bind(this)}/>
            <input type="submit" value="Submit" />
          </form>
          <div className="row repl-wrapper">
            <div className="repl-panel col-sm-12 col-md-6" id="editor-container-1">
              <div id="editor1"></div>
            </div>
            <div className="no-pad repl-panel col-sm-12 col-md-6" id="editor-container-2">
              <div id="editor2"></div>
              <ChallengeCard challenge={this.state.challenge} />
            </div>
          </div> 
        </div>
    )
  }
}


export default Viewer