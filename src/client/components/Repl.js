import React from 'react';
import Subheader from './Subheader'
import ChallengeCard from './ChallengeCard'
import ChallengeResults from './ChallengeResults'
import Gameheader from './Gameheader'
import jqconsole from 'jq-console';

const mockChallenge = require('./mockquestion')
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
        nextRoundTimer:0, //Counts down from 10 when game is over
                          //While this is > 0, show the ChallengeResults component
        gameTimerInterval:'',
        battleSocket: '',
        challenge: mockChallenge,
        challengeProgress: 0, //
        challengeResults:'',
        //Dummy data for building the gameheader component
        playerNames: {
          me: 'Guy',
          opponent: 'Sherman'
        },
        gameProgress: [], //Shows the outcomes of previous games
        currentGameStats: { //Shows the current progression of both clients through this game
          me: 0,
          opponent: 0,
          score: 0,
          total: 0
        },
        powerups: { //Stores the functionality on how to handle a particular powerup
          codeFreeze: {
            action: () => { //Opponenet cannot type for 5 seconds
              this.editor.setReadOnly(true);
              const boundRevert = this.editor.setReadOnly.bind(this.editor, false);
              setTimeout(boundRevert, 5000)
            },
            helpful: false,
            quantity: 1
          },
          deleteLine: { //Opponent will have a random line deleted
            action: () => { 
              const lineLength = this.editor.session.getLength();
              const randomLine = Math.ceil(Math.random() * lineLength)
              this.editor.gotoLine(randomLine);
              this.editor.removeLines()
            },
            helpful: false,
            quantity: 1
          },
          blackout: { //Entire editor will be black for 5 seconds
            action: () => { 
              this.editor.setTheme("ace/theme/powerup-blinded");
              setTimeout(() => {
                this.editor.setTheme("ace/theme/dreamweaver")
              }, 5000)
            },
            helpful: false,
            quantity: 1
          },
          typeDelete: {
            action: () => { //Every keystroke will delete a word, not type a character
              const context = this;
              this.editor.on('change', (e) => {
                console.log('There was a change', e)
                context.editor.removeWordLeft()
              })
              setTimeout(() => {
                context.editor.session.removeAllListeners('change')}, 5000)
            },
            helpful: false,
            quantity: 1
          },
          peek: {
            action: () => { //See the opponents text in the console for 5 seconds
              this.state.battleSocket.emit('requestInfo', {clientID: true, text: true})
              var datafn = (data) => {
                if(this.state.opponentID === data.clientID) {
                  this.state.console.Write(data.text);
                }
              };
              var datafn2 = (data) => {
                if(this.state.opponentID === data.client) {
                  this.state.console.Reset();
                  this.state.console.Write(data.text);
                }
              };
              this.state.battleSocket.on('responseInfo', datafn);
              this.state.battleSocket.on('updateText', datafn2);
              setTimeout(() => {
                this.state.console.Reset();
                this.state.battleSocket.removeListener('updateText', datafn2);
              }, 5000)
            },
            helpful: true,
            quantity: 1
          },
        }
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
        //This will be run every second because the time component re rendeders the page every second
      }
    }

    usePowerup(powerup) {
      console.log('this', this)
      const resourceQuantity = this.state.powerups[powerup].quantity
      console.log('Old qty', resourceQuantity)
      if (resourceQuantity > 0) {
        const newQuantity = resourceQuantity - 1;
        console.log('newQuantity', newQuantity)
        const newPowerups = this.state.powerups
        newPowerups[powerup].quantity = newQuantity;
        console.log('newPowerups', newPowerups)
        this.setState({powerups: newPowerups})
      this.state.battleSocket.emit('powerup', {
        powerup: powerup,
        clientID: this.state.clientID
      })
      }
    }

    //Increment the clock to be displayed
    tickTime () {
      let time = this.state.gameTimer
      this.setState({gameTimer: (time + 1)})
    }

    startFreshGame(type) {
      //Called when:
        // a user is not even in an existing game
        // a user has had their opponent leave
        this.editor.setValue('', -1);
        this.state.console.Reset();
        this.setState({
          currentGameType: type,
          challengeProgress: 0
        }, () => {
          if (type === 'Battle') {
            this.pairMe();
          } else if (type === 'Solo') {
            this.pairMe();
          }
        })
        console.log(this.state.currentGameType)
    }

    startNextGame() {
      //Update the state to increment the current game
      //Update the editor and the text state to have the value of the template function
      const challengeProgress = this.state.challengeProgress + 1
      const challenges = this.state.challenge
      this.state.console.Reset()

      if (challengeProgress > 2) {
        this.terminateGame(true)
      } else {
          // this.state.battleSocket.emit('newgame', {clientID: clientID}) //Emit newgame event for viewer to listen to
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
    }

    //Start the countdown until the new game and perform action at 0
    newGameCountdown () {
      const context = this;
      
      this.resetAndStopTime()
      this.setState({nextRoundTimer: 10})
      
      
      //Create the countdown intervals to 0
      let delay = 0;
      while (delay < this.state.nextRoundTimer) {
        delay++;
        const changeTime = (newTime) => {
          this.setState({nextRoundTimer: newTime})
        }
        const boundTime = changeTime.bind(context, context.state.nextRoundTimer - delay)
        setTimeout(boundTime, 1000 * delay);
      }

      //After the countdown has completed, start the new game timer
      const boundReset = context.newChallengeAndTime.bind(context, context.state.currentGameType)
      setTimeout(boundReset, context.state.nextRoundTimer * 1000)
    }

    //Request the server to add this user to the queue
    pairMe() {
      //Called only when startFreshGame is called
      publicSocket.emit('message', {
        clientID: this.state.clientID,
        currentGameType: this.state.currentGameType
      });
    }



    newChallengeAndTime(type) {
      //Called when:
        //A user has lost or won and needs a new challenge / the time reset
      const freshGameStats = { me: 0, opponent: 0, score: 0, total: 0}
      const boundTick = this.tickTime.bind(this)
      this.resetAndStopTime()
      this.startNextGame()
      this.setState({
        gameTimerInterval: setInterval(boundTick, 1000),
        currentGameStats: freshGameStats
      })
      if (type === 'Battle') {
        console.log('Battle will be continued')
      } else {
        console.log('Solo will be continued')
      }

    }
   
    //Set outcome in the state to be rendered
    //Initiate the new game countdown
    processWinOrLoss (outcome, winningData) {
      console.log('winningData', winningData)
      if (outcome === 'win') {
        //have a list of weak powerups
        //Determine which powerup to supply
        //make copy of powerups object, make new copy with incremented resource, set new to prev
        let winAvailable = ['codeFreeze', 'blackout'];
        let randomIndex = Math.floor(Math.random() * winAvailable.length);
        let randomPowerup = winAvailable[randomIndex];
        let tempPow = this.state.powerups;
        tempPow[randomPowerup].quantity += 1;


        let temp = this.state.gameProgress;
        temp.push({
            winner: 'me',
            score: winningData.score
        })
        this.setState({
          challengeResults: 'You Won',
          gameProgress: temp,
          powerups: tempPow
        })
        console.log('You are victorious')
      } else if (outcome === 'loss'){
        
        let winAvailable = ['deleteLine', 'typeDelete']; 
        let randomIndex = Math.floor(Math.random() * winAvailable.length);
        let randomPowerup = winAvailable[randomIndex];
        let tempPow = this.state.powerups;
        tempPow[randomPowerup].quantity += 1; //Always give a peak in addition to this


          let temp = this.state.gameProgress;
            temp.push({
                winner: 'opponent',
                score: winningData.score
            })
        this.setState({
          challengeResults: 'You Lost',
          gameProgress: temp,
          powerups: tempPow
        })
        console.log('You lost')
      } else if (outcome === 'opponent resigned') {
        this.setState({challengeResults: 'Opponent Resigned'})
      }
      this.newGameCountdown()
    }

    closeBattleSocket (newType) {
      //Called in the case the user is quitting playing and does not want to continue
        this.setState({
          currentGameType: newType,
          pairID: '',
          opponentID: '',
          battleSocket: ''
        })
      }

    terminateGame (keepPlaying) {
      //This is called when:
        //User clicks end game
        //User has won by default (an opponent has disconnected or resigned)
      this.resetAndStopTime();
      this.setState({
        currentGameType: 'No Game',
        challenge: [{}]
      })
      
      if (keepPlaying) {
        //The case that the opponent has resigned
        this.startFreshGame(this.state.currentGameType)
      } else {
        //It was you who resigned
        this.state.battleSocket.emit('i resigned', 
          {client: this.state.clientID,
            opponent: this.state.opponentID}
        )
      }
    }

    editorSetup () {
      //Set up the editor with standard preferences
      ace.require("ace/ext/language_tools");
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
          this.setState({
            gameTimerInterval: setInterval(boundTick, 1000),
            pairID: data.pairID,
            battleSocket: io('/' + data.pairID),
            challenge: data.challenge,
            text: data.challenge[0].templateFunction
          })
          console.log('the challenge is', data.challenge)

          if (this.state.currentGameType === 'Battle') {
            this.setState({
              opponentID: data.opponentID
            })
          }

          this.editor.setValue(data.challenge[0].templateFunction, -1)

          this.state.battleSocket.on('game won', (data) => {
            if (data.client === this.state.clientID) {
              console.log('The data in processWinOrLoss is ',  data)
              this.processWinOrLoss('win', data);
            } else {
              this.processWinOrLoss('loss', data);
            }
          })

          this.state.battleSocket.on('requestInfo', (data) => {
            console.log('The request for information has been recieved by the main client', data)
            //Iterate over all the keys in data
            let responseObj = {};
            console.log('The state in request info is', this.state)
            for (var key in data) {
              console.log('The key is',  key)
              //Get the value from the state for all of the keys
              responseObj[key] = this.state[key];
            }
            console.log('responseObj', responseObj)
            //Emit an event called responseInfo which will contain an object of all of those values
            this.state.battleSocket.emit('responseInfo', responseObj);
          })

          this.state.battleSocket.on('updateScore', (data) => {
            console.log('The data in updateScore is ', data)
            if (data.clientID != this.state.clientID) {
              //Opponent has updated their score
              const currentGameStats = this.state.currentGameStats;
              currentGameStats.opponent = data.tests
              this.setState({currentGameStats: currentGameStats})
            }
          })

          this.state.battleSocket.on('opponent resigned', (data) => {
              this.closeBattleSocket(this.state.currentGameType)
              if (data.client === this.state.clientID) {
                console.log('You resigned')
              } else {
                this.processWinOrLoss('opponent resigned');
              }
          })

          this.state.battleSocket.on('powerupUsed', (data) => {
            var dataFromSelf = data.clientID === this.state.clientID;
            var powerupIsHelpful = this.state.powerups[data.powerup].helpful;
            var usePowerup = this.state.powerups[data.powerup].action;
            console.log('data.powerup', data.powerup)
            console.log('this.state.powerup', this.state.powerups)
            console.log('this.state.powerups[data.powerup]', this.state.powerups[data.powerup])
            if (dataFromSelf) {
              if (powerupIsHelpful) {
                this.state.console.Write('You used the powerup ' + data.powerup + '\n\n')
                usePowerup();
              } else {
                this.state.console.Write('You destroyed your opponents with ' + data.powerup + '\n\n')
              }
            } else {
              if (!powerupIsHelpful) {
                this.state.console.Write('BAM! Your opponent used the powerup ' + data.powerup + '\n')
                usePowerup();
              } else {
                this.state.console.Write('Your opponent used the superpower ' + data.powerup + '\n')
              }
            }
          })
        }
      })
    }

    //Update the value of the text editor into the state on every keypress
    //Transmit an event so it can be recieved by any viewer
    handleKeyPress (e) {
      var text = this.editor.getValue();
      this.setState({text: text}, () => {
        this.state.battleSocket.emit('textChange', {
          client: this.state.clientID,
          text: text
        })
      })
    }

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
        context.state.console.Reset();
        context.state.console.Write(codeResponse.data)
      })
      .catch((err) => {
        throw new Error('The response from the REPL server is invalid');
      })
    }

    //Process the testing SUMMARY STATS from the service to be in a nice format for the console
    summariseTestResults (results, score) {
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

          const summaryString = (' ' + summaryArray.join(' | ') + '\n')

          let scoreString = '';
          if (score > this.state.currentGameStats.score) {
            scoreString = 'You beat your last attempt of ' + this.state.currentGameStats.score + ' with a score of ' + score
          } else {
            scoreString = 'This attempt of ' + score + ' was worse than your highest of ' + this.state.currentGameStats.score
          }

          return (summaryString +  scoreString + '\n\n')
    }

    //Process the FULL STATS from the testing service to be in a nice format for the console
    prettyTestBody (results) {
      let resultsBody = [];
      results.passes.forEach((test) => {
        resultsBody.push('(passed) - ' + 'it ' + test.title)
      })
      results.pending.forEach((test) => {
        resultsBody.push('(pending) - ' + 'it ' + test.title)
      })
      results.failures.forEach((test) => {
          let tempBody = '';
          tempBody += ( '(failed) - ' + test.err.message );
          tempBody += ( '\n  ' + 'it ' + test.title );
          tempBody += ( '\n  ' + test.err.stack);
          resultsBody.push(tempBody)
      })
      return (resultsBody.join('\n') + '\n\n')
    }

    
    //Submit the value of the code in the editor to the server for evaluation
    // then write response to console
    submitCode() {
      const context = this;
      const challengeProgress = this.state.challengeProgress
      const codeSubmission = (this.state.text + 'module.exports = ' + this.state.challenge[challengeProgress].functionName + ';')

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
        //Handle writing the results to the console
        const data = JSON.parse(codeResponse.data)
        const testStats = this.summariseTestResults(data, codeResponse.score)
        const testBody = this.prettyTestBody(data);

        context.state.console.Write(testStats)
        context.state.console.Write(testBody)
        return codeResponse
      })
      .then((codeResponse) => {
        //if the current score is greater, than update the score in the state
        console.log('codeResponse', codeResponse)
        //At this stage, process win or loss 
        //If it was a winning game then
          //Update the current score

        if (codeResponse.score > this.state.currentGameStats.score) {
          const currentGameStats = this.state.currentGameStats;
          currentGameStats.score = codeResponse.score;
          const testResults = JSON.parse(codeResponse.data)
          currentGameStats.me = testResults.stats.passes
          
          this.setState({currentGameStats: currentGameStats},
            //Also emit event with new passing test cases
            this.state.battleSocket.emit('newScore', {
              tests: this.state.currentGameStats.me,
              score: this.state.currentGameStats.score,
              clientID: this.state.clientID
            }));
        }
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

  render() {
    return (
        <div className="repl">
          <Gameheader
                    challengeProgress={this.state.challengeProgress}
                    challenge={this.state.challenge} 
                    gameProgress={this.state.gameProgress} 
                    currentGameStats={this.state.currentGameStats} 
                    playerNames={this.state.playerNames} />
          <Subheader
                    startFreshGame={this.startFreshGame.bind(this)} 
                    gameTimer={this.state.gameTimer} 
                    currentGameType={this.state.currentGameType} 
                    pairMe={this.pairMe.bind(this)} 
                    runCode={this.runCode.bind(this)} 
                    terminateGame={this.terminateGame.bind(this)}
                    // didWin={this.didWin.bind(this)}
                    submitCode={this.submitCode.bind(this)}
                    usePowerup={this.usePowerup.bind(this)} 
                    powerups={this.state.powerups}
                    nextRoundTimer={this.state.nextRoundTimer} />
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
