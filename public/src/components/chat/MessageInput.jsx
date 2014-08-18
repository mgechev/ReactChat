/** @jsx React.DOM */

'use strict';

var MessageInput = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  keyHandler: function (event) {
    var msg = this.state.message.trim();
    if (event.keyCode === 13 && msg.length) {
      this.props.messageHandler(msg);
      this.setState({ message: '' });
    }
  },

  getInitialState: function () {
    return { message: '' };
  },

  render: function () {
    return (
      <input type="text"
        className = 'form-control'
        placeholder='Enter a message...'
        valueLink={this.linkState('message')}
        onKeyUp={this.keyHandler}/>
    );
  }
});

