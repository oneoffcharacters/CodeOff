import React from 'react';
import Subheader from './Subheader'
import ChallengeCard from './ChallengeCard'
import ChallengeResults from './ChallengeResults'
import Gameheader from './Gameheader'
import jqconsole from 'jq-console';
import powerupDef from '../powerupDef'

const mockChallenge = require('./mockquestion')
let publicSocket;

class Repl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //Client Objects
        text:"console.log('hello world');",
        console:'', 
        powerups: { //Stores the functionality on how to handle a particular powerup
          codeFreeze: powerupDef.codeFreeze,
          deleteLine: powerupDef.deleteLine,
          blackout: powerupDef.blackout,
          typeDelete: powerupDef.typeDelete,
          peek: powerupDef.peek
        },

        //Challenge Details
        nextRoundTimer:0,
        challenge: [{}],
        currentGameStats: { me: 0, opponent: 0, score: 0, total: 0},
        
        //Series Details
        clientID:'',
        pairID:'',  
        opponentID:'',
        currentGameType:'No Game',
        gameTimer: 0,
        gameTimerInterval:'',
        battleSocket: '',
        challengeProgress: 0,
        challengeResults:'',
        gameProgress: [],
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
      const resourceQuantity = this.state.powerups[powerup].quantity
      if (resourceQuantity > 0) {
        //Decriment the quantity of the used powerup that are available
        const newQuantity = resourceQuantity - 1;
        const newPowerups = this.state.powerups
        newPowerups[powerup].quantity = newQuantity;
        this.setState({powerups: newPowerups})

        //Notify the server that the powerup has been used
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
      if (this.state.challenge[0].title) {
        console.log('Tried to destroy game')
        this.terminateGame(false);
      }
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
          this.setState({
            challengeProgress: challengeProgress,
            text: challenges[challengeProgress].templateFunction,
          },() => {
          this.editor.setValue(challenges[challengeProgress].templateFunction, -1)})
      }
    }

    resetAndStopTime () {
      const freshGameStats = { me: 0, opponent: 0, score: 0, total: 0}
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
      this.setState({nextRoundTimer: 5})
      
      
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
    }
   
    randomPowerup(powerups) {
      let randomIndex = Math.floor(Math.random() * powerups.length);
      let randomPowerup = powerups[randomIndex];
      let tempPowerups = this.state.powerups;
      tempPowerups[randomPowerup].quantity += 1;
      return tempPowerups;
    }

    newPrevGameStats(winner, winningData) {
      let temp = this.state.gameProgress;
      temp.push({
          winner: winner,
          score: winningData.score
      })
      return temp;
    }

    processWinOrLoss (outcome, winningData) {
      if (outcome === 'win') {
        const newPowerups = this.randomPowerup(['codeFreeze', 'blackout']);
        const newPrevGameStats = this.newPrevGameStats('me', winningData)
        
        this.setState({
          challengeResults: 'You Won',
          gameProgress: newPrevGameStats,
          powerups: newPowerups
        })
      } else if (outcome === 'loss'){
        
        const newPowerups = this.randomPowerup(['codeFreeze', 'blackout']);
        const newPrevGameStats = this.newPrevGameStats('opponent', winningData)
        
        this.setState({
          challengeResults: 'You Lost',
          gameProgress: newPrevGameStats,
          powerups: newPowerups
        })

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

      const freshGameStats = { me: 0, opponent: 0, score: 0, total: 0}
      this.resetAndStopTime();
      this.setState({
        currentGameType: 'No Game',
        challenge: [{}],
        gameProgress: [],
        challengeProgress: 0,
        currentGameStats: freshGameStats
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

          if (this.state.currentGameType === 'Battle') {
            this.setState({
              opponentID: data.opponentID
            })
          }

          this.editor.setValue(data.challenge[0].templateFunction, -1)

          this.state.battleSocket.on('game won', (data) => {
            if (data.client === this.state.clientID) {
              this.processWinOrLoss('win', data);
            } else {
              this.processWinOrLoss('loss', data);
            }
          })

          this.state.battleSocket.on('requestInfo', (data) => {
            //Iterate over all the keys in data
            let responseObj = {};
            for (var key in data) {
              //Get the value from the state for all of the keys
              responseObj[key] = this.state[key];
            }
            //Emit an event called responseInfo which will contain an object of all of those values
            this.state.battleSocket.emit('responseInfo', responseObj);
          })

          this.state.battleSocket.on('updateScore', (data) => {
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
              } else {
                this.processWinOrLoss('opponent resigned');
              }
          })

          this.state.battleSocket.on('powerupUsed', (data) => {
            var dataFromSelf = data.clientID === this.state.clientID;
            var powerupIsHelpful = this.state.powerups[data.powerup].helpful;
            var usePowerup = this.state.powerups[data.powerup].action;
            if (dataFromSelf) {
              if (powerupIsHelpful) {
                this.state.console.Write('You used the powerup ' + data.powerup + '\n\n')
                usePowerup(this);
              } else {
                this.state.console.Write('You destroyed your opponents with ' + data.powerup + '\n\n')
              }
            } else {
              if (!powerupIsHelpful) {
                this.state.console.Write('BAM! Your opponent used the powerup ' + data.powerup + '\n')
                usePowerup(this);
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
        //At this stage, process win or loss 
        //If it was a winning game then
          //Update the current score
          console.log('codeResponse', codeResponse)
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
                    playerNames={this.state.playerNames}
                    currentGameType={this.state.currentGameType} />
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
                    nextRoundTimer={this.state.nextRoundTimer}
                    currentGameType={this.state.currentGameType} />
          {(!!this.state.nextRoundTimer) && <ChallengeResults 
                    nextRoundTimer={this.state.nextRoundTimer} 
                    terminateGame={this.terminateGame.bind(this, false)} 
                    challengeResults={this.state.challengeResults} />}
          <div className="row repl-wrapper">
            <div className="repl-panel col-sm-12 col-md-6" id="editor-container">
              <div id="editor" onKeyUp={this.handleKeyPress.bind(this)}></div>
            </div>
            <div className="repl-panel col-sm-12 col-md-6 no-pad">
              <div id="console-terminal-editor" className="home-console"></div>
              <ChallengeCard challenge={this.state.challenge} progress={this.state.challengeProgress} currentGameType={this.state.currentGameType} />
            </div>
          </div> 
        </div>
    )
  }
}

export default Repl
