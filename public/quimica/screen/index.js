const socket = io('https://airgames.herokuapp.com');
const frame = document.getElementById("gameviewer");
var players = parseInt(localStorage.getItem('players'));
socket.emit("join", { type: "screen", connect: true });
socket.on("screen-code", function(data) {
  document.getElementById(
    "code"
  ).innerHTML = `<b>YOU CODE: ${data.Code}</b>`;
});
socket.on("disconnect", function() {
  window.location = "/";
});
socket.on("player-disconnected", function(data) {
  localStorage.setItem('players',players-1);
  Toast(`${data.player.name} se desconectou`,'error');
});
socket.on("new-player", function(data) {
  localStorage.setItem('players',players+1);
  maxWindow();
  Toast(`${data.player.name} se conectou`,'success');
});
function hello() {
  return socket;
}
socket.on("controllers-ids", function(data) {
  console.log(data);
});