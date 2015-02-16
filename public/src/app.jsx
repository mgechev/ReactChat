/* global EventEmitter, Topics, io, Peer */
/** @jsx React.DOM */

$(function () {
  'use strict';
  $('#connect-btn').click(function () {
    initChat($('#container')[0],
      $('#username-input').val());
  });

  function initChat(container, username) {
    var proxy = new ChatProxy();
    React.renderComponent(<ChatBox chatProxy={proxy}
      username={username}></ChatBox>, container);
  }

  window.onbeforeunload = function () {
    return 'Are you sure you want to leave this page?';
  };

});
