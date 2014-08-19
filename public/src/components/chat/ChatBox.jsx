/** @jsx React.DOM */

'use strict';

var ChatBox = React.createClass({
  componentDidMount: function () {
    this.chatProxy = new ChatProxy();
    this.chatProxy.connect(this.props.username);
    this.chatProxy.onMessage(this.addMessage.bind(this));
  },

  messageHandler: function (message) {
    message = this.refs.messageInput.getDOMNode().value;
    this.addMessage({
      content: message,
      author : this.chatProxy.getUsername()
    });
    this.chatProxy.send(message);
  },

  addMessage: function (message) {
    if (message) {
      this.refs.messagesList.addMessage(message);
    }
  },

  addSystemMessage: function (message) {
    if (message) {
      message.isSystem = true;
      this.refs.messagesList.addMessage(message);
    }
  },

  render: function () {
    return (
      <div className="chat-box" ref="root">
        <div className="chat-header ui-widget-header">React p2p Chat</div>
        <MessagesList ref="messagesList"></MessagesList>
        <MessageInput
          ref="messageInput"
          messageHandler={this.messageHandler}>
        </MessageInput>
      </div>
    );
  }
});

