const socket = io('https://airgames.tk');
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
  console.log(data);
  $('#nav-mobile').html($('#nav-mobile').html()+`<img id="${data.player.user}" src="${data.player.photo}" style = "width:25px; height:25; border-radius:50%;"`);
});
socket.on("controllers-ids", function(data) {
  console.log(data);
});
function hello() {
  return socket;
}
socket.on("controllers-ids", function(data) {
  console.log(data);
});