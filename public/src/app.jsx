/** @jsx React.DOM */

$(function () {
  $('#connect-btn').click(function () {
    initChat($('#container')[0], $('#room-name-input').val());
  });

  function initChat(container, roomName) {
    React.renderComponent(<ChatBox room={roomName}></ChatBox>, container);
  }

});
