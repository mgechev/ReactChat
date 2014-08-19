function ChatProxy() {
  EventEmitter.call(this);
  this._peers = [];
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
  var peer = this.peer.connect(username);
  peer.on('open', function () {
    this._peers[username] = peer;
  }.bind(this));
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
      self._connectTo(userId);
      self.emit(Topics.USER_CONNECTED, userId);
    });
    self.socket.on(Topics.USER_DISCONNECTED, function (userId) {
      self._disconnectFrom(userId);
      self.emit(Topics.USER_DISCONNECTED, userId);
    });
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

