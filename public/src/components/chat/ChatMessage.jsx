/** @jsx React.DOM */

var ChatMessage = React.createClass({

  render: function () {
    return (
      <div className="chat-message">
        <div className="message-author">{this.props.message.author} said: </div>
        <div className="message-content">{this.props.message.content}</div>
      </div>
    );
  }
});

