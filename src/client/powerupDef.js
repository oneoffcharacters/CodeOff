module.exports = {
  codeFreeze: {
    action: (context) => { //Opponenet cannot type for 5 seconds
      console.log('context', context)
      context.editor.setReadOnly(true);
      const boundRevert = context.editor.setReadOnly.bind(context.editor, false);
      setTimeout(boundRevert, 5000)
    },
    helpful: false,
    quantity: 1
  },
  deleteLine: { //Opponent will have a random line deleted
    action: (context) => { 
      const lineLength = context.editor.session.getLength();
      const randomLine = Math.ceil(Math.random() * lineLength)
      context.editor.gotoLine(randomLine);
      context.editor.removeLines()
    },
    helpful: false,
    quantity: 1
  },
  blackout: { //Entire editor will be black for 5 seconds
    action: (context) => { 
      context.editor.setTheme("ace/theme/powerup-blinded");
      setTimeout(() => {
        context.editor.setTheme("ace/theme/dreamweaver")
      }, 5000)
    },
    helpful: false,
    quantity: 1
  },
  typeDelete: {
    action: (context) => { //Every keystroke will delete a word, not type a character
      context.editor.on('change', (e) => {
        context.editor.removeWordLeft()
      })
      setTimeout(() => {
        context.editor.session.removeAllListeners('change')}, 5000)
    },
    helpful: false,
    quantity: 1
  },
  peek: {
    action: (context) => { //See the opponents text in the console for 5 seconds
      context.state.battleSocket.emit('requestInfo', {clientID: true, text: true})
      var datafn = (data) => {
        if(context.state.opponentID === data.clientID) {
          context.state.console.Write(data.text);
        }
      };
      var datafn2 = (data) => {
        if(context.state.opponentID === data.client) {
          context.state.console.Reset();
          context.state.console.Write(data.text);
        }
      };
      context.state.battleSocket.on('responseInfo', datafn);
      context.state.battleSocket.on('updateText', datafn2);
      setTimeout(() => {
        context.state.console.Reset();
        context.state.battleSocket.removeListener('updateText', datafn2);
      }, 5000)
    },
    helpful: true,
    quantity: 1
  },
}