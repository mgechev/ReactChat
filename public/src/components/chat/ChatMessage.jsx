/** @jsx React.DOM */

var ChatMessage = React.createClass({

  render: function () {
    var msg = this.props.message,
        hours = msg.date.getHours(),
        minutes = msg.date.getMinutes();
    hours = (hours < 9) ? '0' + hours : hours;
    minutes = (minutes < 9) ? '0' + minutes : minutes;
    return (
      <div className="chat-message">
        <div className="message-time">[{ hours + ':' + minutes }]</div>
        <div className="message-author">&lt;{msg.author}&gt;</div>
        <div className="message-content">{msg.content}</div>
      </div>
    );
  }
});

