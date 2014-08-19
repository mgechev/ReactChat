/** @jsx React.DOM */

$(function () {
  $('#connect-btn').click(function () {
    initChat($('#container')[0],
      $('#username-input').val());
  });

  function initChat(container, username) {
    React.renderComponent(<ChatBox username={username}></ChatBox>, container);
  }

//  initChat($('#container')[0], 'a');

//  window.onbeforeunload = function () {
//    return 'Wat?!';
//  };

});
