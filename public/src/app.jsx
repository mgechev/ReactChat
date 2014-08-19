/** @jsx React.DOM */

$(function () {
  $('#connect-btn').click(function () {
    initChat($('#container')[0],
      $('#room-name-input').val(),
      $('#username-input').val());
  });

  function initChat(container, roomName, username) {
    React.renderComponent(<ChatBox username={username} roomName={roomName}></ChatBox>, container);
  }

//  window.onbeforeunload = function () {
//    return 'Wat?!';
//  };

});
