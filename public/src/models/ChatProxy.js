function ChatProxy() {
  EventEmitter.call(this);
  this._peers = {};
}

ChatProxy.prototype = Object.create(EventEmitter.prototype);

ChatProxy.prototype.onMessage = function (cb) {
  this.addListener(ChatProxy.ON_MESSAGE, cb);
};

ChatProxy.prototype.getUsername = function () {
  return this._username;
};

ChatProxy.prototype.setUsername = function (username) {
  this._username = username;
};

ChatProxy.prototype.onUserConnected = function (cb) {
  this.addListener(Topics.USER_CONNECTED, cb);
};

ChatProxy.prototype.onUserDisconnected = function (cb) {
  this.addListener(Topics.USER_DISCONNECTED, cb);
};

ChatProxy.prototype.send = function (message) {
  for (var peer in this._peers) {
    this._peers[peer].send(message);
  }
};

ChatProxy.prototype._connectTo = function (username) {
  var conn = this.peer.connect(username);
  conn.on('open', function () {
    this._registerPeer(username, conn);
  }.bind(this));
};

ChatProxy.prototype._registerPeer = function (username, conn) {
  console.log('Registering', username);
  this._peers[username] = conn;
  conn.on('data', function (e) {
    console.log('Data received', e);
  });
};

ChatProxy.prototype._disconnectFrom = function (username) {
  delete this._peers[username];
};

ChatProxy.prototype.connect = function (username) {
  var self = this;
  this.setUsername(username);
  this.socket = io();
  this.socket.on('connect', function () {
    self.socket.on(Topics.USER_CONNECTED, function (userId) {
      if (userId === self.getUsername()) {
        return;
      }
      self._connectTo(userId);
      self.emit(Topics.USER_CONNECTED, userId);
      console.log('User connected', userId);
    });
    self.socket.on(Topics.USER_DISCONNECTED, function (userId) {
      if (userId === self.getUsername()) {
        return;
      }
      self._disconnectFrom(userId);
      self.emit(Topics.USER_DISCONNECTED, userId);
      console.log('User disconnected', userId);
    });
  });
  console.log('Connecting with username', username);
  this.peer = new Peer(username, {
    host: 'localhost', port: 9000, path: '/chat'
  });
  this.peer.on('open', function (userId) {
    self.setUsername(userId);
  });
  this.peer.on('connection', function (conn) {
    self._registerPeer(username, conn);
  });
};

