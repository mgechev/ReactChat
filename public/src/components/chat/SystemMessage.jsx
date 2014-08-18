/** @jsx React.DOM */

var SystemChatMessage = React.createClass({

  render: function () {
    return (
      <div className="chat-system-message">
        <div className="chat-system-message-content">{this.props.message.content}</div>
      </div>
    );
  }
});

