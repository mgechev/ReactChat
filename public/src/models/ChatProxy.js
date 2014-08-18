function ChatProxy() {
  EventEmitter.call(this);
  this.peers = [];
}

ChatProxy.prototype = Object.create(EventEmitter.prototype);

ChatProxy.prototype.onMessage = function (cb) {
  this.addListener(ChatProxy.ON_MESSAGE, cb);
};

ChatProxy.prototype.onUserConnected = function (cb) {
  this.addListener(Topics.USER_CONNECTED, cb);
};

ChatProxy.prototype.onUserDisconnected = function (cb) {
  this.addListener(Topics.USER_DISCONNECTED, cb);
};

ChatProxy.prototype.send = function (message) {
  for (var peer in this.peers) {
    this.peers[peer].send(message);
  }
};

ChatProxy.prototype._connectTo = function (username) {
  var peer = this.peer.connect(username);
  peer.on('open', function () {
    this.peers[username] = peer;
  }.bind(this));
};

ChatProxy.prototype._disconnectFrom = function (username) {
  delete this.peers[username];
};

ChatProxy.prototype.connect = function (username) {
  var self = this;
  this.socket = io();
  this.socket.on(Topics.USER_CONNECTED, function (userId) {
    self._connectTo(userId);
    self.emit(Topics.USER_CONNECTED, userId);
  });
  this.socket.on(Topics.USER_DISCONNECTED, function (userId) {
    self._disconnectFrom(userId);
    self.emit(Topics.USER_DISCONNECTED, userId);
  });
  console.log('Connecting with username', username);
  this.peer = new Peer(username, {
    host: 'localhost', port: 9000, path: '/chat'
  });
  this.peer.on('open', function (e) {
    console.log(e, arguments);
  });
  this.peer.on('connection', function (e) {
    console.log(e);
  });
};

