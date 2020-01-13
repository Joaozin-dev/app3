const socket = io('https://airgames.herokuapp.com');
const frame = document.getElementById("gameviewer");
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
  alert(`PLAYER ${data.socket} DESCONECTADO`);
  document.querySelector(`#${data.socket}`).innerHTML = "";
});
socket.on("new-player", function(data) {
  Toast(`${data.player.name} se conectou`,'success');
});
function hello() {
  return socket;
}
socket.on("controllers-ids", function(data) {
  console.log(data);
});