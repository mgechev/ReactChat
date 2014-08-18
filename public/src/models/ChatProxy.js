function ChatProxy() {
  EventEmitter.call(this);
}

ChatProxy.prototype = Object.create(EventEmitter.prototype);

ChatProxy.prototype.onMessage = function (cb) {
  this.addListener(ChatProxy.ON_MESSAGE, cb);
};

ChatProxy.prototype.send = function (message) {
};

ChatProxy.prototype.connect = function (name) {
};

