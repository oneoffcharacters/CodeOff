import React from 'react';
import Subheader from './Subheader'
import ChallengeCard from './ChallengeCard'
import ChallengeResults from './ChallengeResults'
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
        currentGameType:'No Game',
        gameTimer: 0,
        nextRoundTimer:0, //While this is > 0, show the ChallengeResults component
        gameTimerInterval:'',
        battleSocket: '',
        challenge: [{}],
        challengeProgress: 0,
        challengeResults:''
      };
    }

    componentDidMount() {
      this.editor = this.editorSetup();
      this.socket = this.setupSocket();
      this.startConsole();
    }

    componentDidUpdate() {
      if (this.state.challengeProgress > 2) {
        console.log('The game is over now')
      } else {
        console.log('This counted as a component updating',  this.state.challengeProgress)
      }
    }

    //Increment the time to be displayed
    tickTime () {
      let time = this.state.gameTimer
      this.setState({gameTimer: (time + 1)})
    }

    //TODO: Complete didWin function
    // didWin() {
    //   this.state.battleSocket.emit('i won', 
    //     {client: this.state.clientID}
    //   )
    // }

    //Todo: Update these two functions to be called from the Subheader and actually do the desired actions
    startFreshGame(type) {
      console.log('Type that is input',  type)
      //Called when:
        // a user is not even in an existing game
        // a user has had their opponent leave
        this.editor.setValue('', -1); //TODO:Changed this
        this.state.console.Reset();  //TODO:Changed this
        this.setState({
          currentGameType: type,
          challengeProgress: 0}, () => {
          console.log('this.state.currentGameType in callback', this.state.currentGameType)
          if (type === 'Battle') {
            this.pairMe();
          } else if (type === 'Solo') {
            this.pairMe();
            console.log('Solo game started')
          }
        })
        console.log(this.state.currentGameType)
    }

    startNextGame() {
      //Update the state to increment the current game
      //Update the editor and the text state to have the value of the template function
      const challengeProgress = this.state.challengeProgress + 1
      const challenges = this.state.challenge
      this.state.console.Reset() //TODO:Changed this

      if (challengeProgress > 2) {
        this.terminateGame(true)
      } else {
          this.setState({
            challengeProgress: challengeProgress,
            text: challenges[challengeProgress].templateFunction,
          },() => {
          this.editor.setValue(challenges[challengeProgress].templateFunction, -1)})
      }
    }

    resetAndStopTime () {
      clearInterval(this.state.gameTimerInterval)
      this.setState({
        gameTimer: 0,
        gameTimerInterval:''
      })
      console.log('The time has been reset and stopped')
    }

    newGameCountdown () {
      //Start the delay
      this.resetAndStopTime()
      this.setState({nextRoundTimer: 10})
      
      let delay = 0;
      const context = this;
      //Count down until the next round
      while (delay < this.state.nextRoundTimer) {
        delay++;
        const changeTime = (newTime) => {
          this.setState({nextRoundTimer: newTime})
        }
        const boundTime = changeTime.bind(context, context.state.nextRoundTimer - delay)
        setTimeout(boundTime, 1000 * delay);
        console.log('After timeout created', this.state.nextRoundTimer)
      }
      console.log('this.state.currentGameType', this.state.currentGameType)
      //After the countdown has completed, start the new timer
      const boundReset = context.newChallengeAndTime.bind(context, context.state.currentGameType)
      setTimeout(boundReset, context.state.nextRoundTimer * 1000)
    }

    //Request the server to add this user to the queue
    pairMe() {
      console.log('The pairing request has been run')
      //Called only when startFreshGame is called
      publicSocket.emit('message', {
        clientID: this.state.clientID,
        currentGameType: this.state.currentGameType
      });
    }



    newChallengeAndTime(type) {
      //Called when:
        //A user has lost or won and needs a new challenge / the time reset
      //TODO: Get a new challenge
      //TODO: Start timer again
      this.resetAndStopTime()
      this.startNextGame()
      const boundTick = this.tickTime.bind(this)
      this.setState({
        gameTimerInterval: setInterval(boundTick, 1000),
      })
      if (type === 'Battle') {
        console.log('Battle will be continued')
      } else {
        console.log('Solo will be continued')
      }

    }
    //newChallengeAndTime //A user has lost or won and needs a new challenge / the time reset
    //startFreshGame //Not in game at all, or opponent has left
    processWinOrLoss (outcome) {
      console.log('outcome', outcome)
      //User has won a game - clear timer, interval, newChallengeAndTime
      //User loses a game - clear timer, interval, newChallengeAndTime
      if (outcome === 'win') {
        this.setState({challengeResults: 'You Won'})
        console.log('You are victorious')
      } else if (outcome === 'loss'){
        this.setState({challengeResults: 'You Lost'})
        console.log('You lost')
      } else if (outcome === 'opponent resigned') {
        this.setState({challengeResults: 'Opponent Resigned'})
      }
      this.newGameCountdown()
    }

    closeBattleSocket (newType) {
      //In the case the user is quitting playing and does not want to continue
        this.setState({
          currentGameType: newType,
          pairID: '',
          opponentID: '',
          battleSocket: ''
        })
      }

    terminateGame (keepPlaying) {
      //User clicks end game - clear timer, interval, notify opponent
      //User has won by default - clear timer, interval, startFreshGame
      this.resetAndStopTime();
      this.setState({
        currentGameType: 'No Game',
        challenge: [{}]
      })
      //This is the case that the opponent has resigned
      if (keepPlaying) {
        this.startFreshGame(this.state.currentGameType)
      } else {
        this.state.battleSocket.emit('i resigned', 
          {client: this.state.clientID,
            opponent: this.state.opponentID}
        )
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

      //Creates a unique client ID that this client will listen for socket events on
      const clientID = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
      this.setState({clientID: clientID});

      publicSocket.on('connect', (data) => {
        console.log('The client has connected to the server socket');
      });

      //Listen for events on destined for this client
      publicSocket.on(clientID, (data) => {
        console.log('The data recieved on pairing',  data)
        //On init, update the pairID and opponentID
        if (data.type === 'initBattle') {
          const boundTick = this.tickTime.bind(this)
          //TODO: Fix this possibly causing full re render every time
          this.setState({
            gameTimerInterval: setInterval(boundTick, 1000)
          })

          if (this.state.currentGameType === 'Battle') {
            this.setState({
              pairID: data.pairID,
              opponentID: data.opponentID,
              battleSocket: io('/' + data.pairID),
              challenge: data.challenge,
              text: data.challenge[0].templateFunction
            }, console.log('The new state challenge is', this.state.challenge))
          } else if ( this.state.currentGameType === 'Solo') {
            this.setState({
              pairID: data.pairID,
              battleSocket: io('/' + data.pairID),
              challenge: data.challenge,
              text: data.challenge.templateFunction
            })
          }

          this.editor.setValue(data.challenge[0].templateFunction, -1)

          this.state.battleSocket.on('game won', (data) => {
            // const challengeProgress = this.state.challengeProgress
            // if (challengeProgress < 2) {
            //   this.setState({challengeProgress: challengeProgress + 1})
            // } else {
            //   //TODO: Handle what happens in the case that the game limit is reached
            // }
            if (data.client === this.state.clientID) {
              // this.newChallengeAndTime(this.state.currentGameType)
              this.processWinOrLoss('win');
            } else {
              // this.newChallengeAndTime(this.state.currentGameType)
              this.processWinOrLoss('loss');
            }
          })
          this.state.battleSocket.on('opponent resigned', (data) => {
            //If the resignation came from a participant (and not just a viewer disconnection message)
            // if (this.state.opponentID != data.client && this.state.clientID != data.client) {
              this.closeBattleSocket(this.state.currentGameType)
              if (data.client === this.state.clientID) {
                console.log('You resigned')
              } else {
                this.processWinOrLoss('opponent resigned');
                console.log('You win by default, the other guy resigned', data)
                //Refactor this to have similar logic to 'game won'
                // this.terminateGame(true)
              }
            // }
          })
        }
        console.log('The client was notified of a succesful pair!', data)
      })
    }

    //Update the value of the text editor into the state on every keypress
    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({text: text}, () => {
        this.state.battleSocket.emit('textChange', {
          client: this.state.clientID,
          text: text
        })
      })
    }

    // prependConsole (jqconsole, newText) {
    //   let currText = jqconsole.Dump();
    //   console.log('currText', currText)
    //   const result = newText + currText
    //   jqconsole.Reset()
    //   jqconsole.Write(result)
    // }

    //Submit the value of the code in the editor to the server for evaluation
    // then write response to console
    runCode() {
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
        console.log('The code response is', codeResponse)
        context.state.console.Write(codeResponse.text)
      })
      .catch((err) => {
        throw new Error('The response from the REPL server is invalid');
      })
    }

    summariseTestResults (results) {
          const summaryStats = {
            run: results.stats.tests,
            passed: results.stats.passes,
            pending: results.stats.pending,
            failed: results.stats.failures
          }

          //Conver this object into something that is nice to read
          let summaryArray = [];
          for (var key in summaryStats) {
            const qty = summaryStats[key];
            summaryArray.push(qty + (qty===1 ? ' test ' : ' tests ') + key)
          }
          return (' ' + summaryArray.join(' | ') + '\n\n')
    }

    prettyTestBody (results) {
      let resultsBody = [];
      results.passes.forEach((test) => {
        resultsBody.push('(passed) - ' + 'it ' + test.title)
      })
      results.pending.forEach((test) => {
        resultsBody.push('(pending) - ' + 'it ' + test.title)
      })
      results.failures.forEach((test) => {
        console.log('Each failure', test)
          let tempBody = '';
          tempBody += ( '(failed) - ' + test.err.message );
          tempBody += ( '\n  ' + 'it ' + test.title );
          tempBody += ( '\n  ' + test.err.stack);
          console.log(tempBody)
          resultsBody.push(tempBody)
      })
      return (resultsBody.join('\n') + '\n\n')
    }

    
    //Submit the value of the code in the editor to the server for evaluation
    // then write response to console
    submitCode() {
      const context = this;
      const challengeProgress = this.state.challengeProgress
      console.log('Submit called')
      //Add these back in after testing to complete the actual post req
      const codeSubmission = (this.state.text + 'module.exports = ' + this.state.challenge[challengeProgress].functionName + ';')
      console.log('codeSubmission', codeSubmission)
      fetch('api/mocha',  {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientID:this.state.clientID,
            pairID:this.state.pairID,
            currentGameType:this.state.currentGameType,
            code: codeSubmission,
            challengeID: this.state.challenge[challengeProgress]._id
          })
        })
      .catch((err) => {
        console.log('The post was not succesful', err)
      })
      .then((output) => {
        return output.json();
      })
      .then((codeResponse) => {
        console.log('codeResponse', codeResponse.data)
        const data = JSON.parse(codeResponse.data)
        console.log('data', data)
        const testStats = this.summariseTestResults(data)
        const testBody = this.prettyTestBody(data);
        console.log('data', data)
        //=====Mock data to test writing=======
        // const testStats = context.summariseTestResults(context.mockTest);
        // const testBody = context.prettyTestBody(context.mockTest);
        context.state.console.Write(testStats)
        context.state.console.Write(testBody)
        console.log(codeResponse)
      //Add these back in after testing to complete the actual post req
      })
      .catch((err) => {
        throw new Error('The response from the Testing server is invalid', err);
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
        <div className="repl">
          <Subheader
                    startFreshGame={this.startFreshGame.bind(this)} 
                    gameTimer={this.state.gameTimer} 
                    currentGameType={this.state.currentGameType} 
                    pairMe={this.pairMe.bind(this)} 
                    runCode={this.runCode.bind(this)} 
                    terminateGame={this.terminateGame.bind(this)}
                    // didWin={this.didWin.bind(this)}
                    submitCode={this.submitCode.bind(this)} />
          {(!!this.state.nextRoundTimer) && <ChallengeResults 
                    nextRoundTimer={this.state.nextRoundTimer} 
                    terminateGame={this.terminateGame.bind(this)} 
                    challengeResults={this.state.challengeResults} />}
          <div className="row repl-wrapper">
            <div className="repl-panel col-sm-12 col-md-6" id="editor-container">
              <div id="editor" onKeyUp={this.handleKeyPress.bind(this)}></div>
            </div>
            <div className="repl-panel col-sm-12 col-md-6 no-pad">
              <div id="console-terminal-editor" className="home-console"></div>
              <ChallengeCard challenge={this.state.challenge} progress={this.state.challengeProgress} />
            </div>
          </div> 
        </div>
    )
  }
}

export default Repl
