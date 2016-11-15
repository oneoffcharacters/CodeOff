const waiting_queue = [];
const active_cache = {};

module.exports = {
  addToCached: (urlPath) => {
    cached[urlPath] = urlPath;
  },
  create_namespace: (path, io) => {
    console.log('created namespace');
    var nsp = io.of(path);
    nsp.on('connection', (socket) => {
     console.log('a user has connected', path);

     socket.on('text change', (msg) => {
      console.log('msg', msg);
      nsp.emit('alter text', msg);
    });

     socket.on('disconnect', () => {
       console.log('a user has disconnected');
     });
   });
  },
  setPairingListeners: function(io) {
    var context = this;
    io.on('connection', function(socket){
      socket.on('message', function(obj){
        if (!active_cache[obj.client_id]){
          waiting_queue.push(obj.client_id);
          active_cache[obj.client_id] = true;
          console.log(waiting_queue.length);
        }
        if (waiting_queue.length > 1){
          var ukey = '/' + chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
          addToCached(ukey);
          context.create_namespace(ukey, io, 'pair');
          io.emit(waiting_queue.shift(), {namespace:ukey});
          io.emit(waiting_queue.shift(), {namespace:ukey});
        }
      });
    });
  }
}