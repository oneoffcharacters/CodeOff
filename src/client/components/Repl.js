import React from 'react';
import Subheader from './Subheader'
import ChallengeCard from './ChallengeCard'
import ChallengeResults from './ChallengeResults'
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
        nextRoundTimer:0, //While this is > 0, show the ChallengeResults component
        gameTimerInterval:'',
        battleSocket: '',
        challenge: {},
        challengeResults:''
        //Mock challenge
        // challenge: {
        //   _id: '582fc4ae8c065742db50115b',
        //   difficulty:'Hard',
        //   prompt: 'Create a function maxNumber that will return the max of two numbers',
        //   examples: ['Given mock produce mocky x2', 'so mock!'],
        //   functionName: 'maxPrimeNumber',
        //   solutions: 'function maxNumber(first, second) { return Math.max(first, second)}',
        //   templateFunction: 'function(first, second) { \n\n }',
        //   title: 'Max Prime Number'
        // }
	  	};
      this.mockTest = {
        "src/test/unit/photo_model_test.js": [
            {
                "title": "should return photos",
                "suite": "getFlickrPhotos(tags, tagmode, callback)",
                "file": "src/test/unit/photo_model_test.js",
                "duration": 1,
                "state": "passed"
            },
            {
              "title": "should return true for valid single search term",
              "suite": "isValidCommaDelimitedList(value)",
              "stack": "TypeError: Cannot read property 'new' of undefined\n    at Context.<anonymous> (/home/user/project/src/test/unit/form_validator_test.js:25:23)\n    at callFn (/home/user/project/node_modules/mocha/lib/runnable.js:251:21)\n    at Test.Runnable.run (/home/user/project/node_modules/mocha/lib/runnable.js:244:7)\n    at Runner.runTest (/home/user/project/node_modules/mocha/lib/runner.js:374:10)\n    at /home/user/project/node_modules/mocha/lib/runner.js:452:12\n    at next (/home/user/project/node_modules/mocha/lib/runner.js:299:14)\n    at /home/user/project/node_modules/mocha/lib/runner.js:309:7\n    at next (/home/user/project/node_modules/mocha/lib/runner.js:248:23)\n    at Immediate._onImmediate (/home/user/project/node_modules/mocha/lib/runner.js:276:5)\n    at processImmediate [as _immediateCallback] (timers.js:367:17)",
              "message": "Cannot read property 'new' of undefined",
              "file": "src/test/unit/form_validator_test.js",
              "duration": 0,
              "state": "failed"
            },
            {
              "title": "should return false for search term containing numbers",
              "suite": "isValidCommaDelimitedList(value)",
              "file": "src/test/unit/form_validator_test.js",
              "state": "skipped"
            },
        ]
      }
    }

    componentDidMount() {
      this.editor = this.editorSetup();
      this.socket = this.setupSocket();
      this.startConsole();
      console.log(this.mockTest)

    }

    //Increment the time to be displayed
    tickTime () {
      let time = this.state.gameTimer
      this.setState({gameTimer: (time + 1)})
    }

    //TODO: Complete didWin function
    didWin() {
      this.state.battleSocket.emit('i won', 
        {client: this.state.clientID}
      )
    }

    //Todo: Update these two functions to be called from the Subheader and actually do the desired actions
    startFreshGame(type) {
      //Called when:
        // a user is not even in an existing game
        // a user has had their opponent leave
        this.setState({currentGameType: type})
        if (type === 'Battle') {
          this.pairMe();
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
      const boundReset = context.newChallengeAndTime.bind(context, context.state.currentGameType)
      console.log('boundReset', boundReset)
      console.log('context.state.nextRoundTimer', context.state.nextRoundTimer)
      setTimeout(boundReset, context.state.nextRoundTimer * 1000)
    }

    //Request the server to add this user to the queue
    pairMe() {
      //Called only when startFreshGame is called
      publicSocket.emit('message', {
        clientID: this.state.clientID
      });
    }



    newChallengeAndTime(type) {
      //Called when:
        //A user has lost or won and needs a new challenge / the time reset
      //TODO: Get a new challenge
      //TODO: Start timer again
      this.resetAndStopTime()
      const boundTick = this.tickTime.bind(this)
      this.setState({
        gameTimerInterval: setInterval(boundTick, 1000)
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
      //User has won a game - clear timer, interval, newChallengeAndTime
      //User loses a game - clear timer, interval, newChallengeAndTime
      if (outcome === 'win') {
        this.setState({challengeResults: 'Won'})
        console.log('You are victorious')
      } else {
        this.setState({challengeResults: 'Lost'})
        console.log('You lost')
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
        //On init, update the pairID and opponentID
        if (data.type === 'initBattle') {
          const boundTick = this.tickTime.bind(this)
          //TODO: Fix this possibly causing full re render every time
          this.setState({
            gameTimerInterval: setInterval(boundTick, 1000)
          })

          this.setState({
            pairID: data.pairID,
            opponentID: data.opponentID,
            battleSocket: io('/' + data.pairID),
            challenge: data.challenge
          })

          this.editor.setValue(data.challenge.templateFunction, -1)

          this.state.battleSocket.on('game won', (data) => {
            if (data.client === this.state.clientID) {
              // this.newChallengeAndTime(this.state.currentGameType)
              this.processWinOrLoss('win');
            } else {
              // this.newChallengeAndTime(this.state.currentGameType)
              this.processWinOrLoss('loss');
            }
          })
          this.state.battleSocket.on('opponent resigned', (data) => {
            //Always want to close the connection
            this.closeBattleSocket(this.state.currentGameType)
            if (data.client === this.state.clientID) {
              console.log('You resigned')
            } else {
              console.log('You win by default, the other guy resigned', data)
              this.terminateGame(true)
            }
          })
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
        context.state.console.Write(codeResponse.text)
      })
      .catch((err) => {
        throw new Error('The response from the REPL server is invalid');
      })
    }

    summariseTestResults (results) {
      //Get the pass/skipped/failed results into an object
      const testResults = results[Object.keys(results)[0]]
      const summaryStats = testResults.reduce((acc, curr, ind, arr) => {
        const result = curr.state
        acc[result] ? acc[result]++ : acc[result] = 1;
        return acc
      }, {})

      //Conver this object into something that is nice to read
      let summaryArray = [];
      for (var key in summaryStats) {
        const qty = summaryStats[key];
        summaryArray.push(qty + (qty===1 ? ' test ' : ' tests ') + key)
      }
      return (' ' + summaryArray.join(' | ') + '\n\n')
    }

    prettyTestBody (results) {
      const testResults = results[Object.keys(results)[0]];

      let resultsBody = testResults.map((value, index) => {
        if (value.state != 'failed') {
          return ('(' + value.state + ') - ' + 'it ' + value.title);
        } else {
          let tempBody = '';
          tempBody += ( '(' + value.state + ') - ' + 'it ' + value.title );
          tempBody += ( '\n  ' + value.message );
          tempBody += ( '\n  ' + '  ' + value.stack);
          return tempBody;
        }
      })
      return (resultsBody.join('\n') + '\n\n')
    }

    
    //Submit the value of the code in the editor to the server for evaluation
    // then write response to console
    submitCode() {
      const context = this;
      console.log('Submit called')
      //Add these back in after testing to complete the actual post req
      fetch('api/mocha',  {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // solution: this.state.challenge.solutions,
            // test: this.state.challenge.test,
            // clientID:this.state.clientID,
            // pairID:this.state.pairID,
            // currentGameType:this.state.currentGameType,
            code: this.state.text,
            challengeID: this.state.challenge._id
          })
        })
      .catch((err) => {
        console.log('The post was not succesful', err)
      })
      .then((output) => {
        return output.json();
      })
      .then((codeResponse) => {
        //replace this.mockTest with codeResponse when real response is coming back
        
        //=====Mock data to test writing=======
        // const testStats = context.summariseTestResults(context.mockTest);
        // const testBody = context.prettyTestBody(context.mockTest);
        // context.state.console.Write(testStats)
        // context.state.console.Write(testBody)
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
                    didWin={this.didWin.bind(this)}
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
              <ChallengeCard challenge={this.state.challenge}/>
            </div>
          </div> 
        </div>
    )
  }
}

export default Repl
