const socket = io("https://airgames.tk");
var lastCode = "";
document.getElementById("con").addEventListener("click", function() {
  socket.emit("getScreen", true);
});
socket.on("screen-id", function(data) {
  console.log(data);
});
document.getElementById("send").addEventListener("click", function() {
  const el = document.getElementById("code");
  const code = el.value;
  socket.emit("new-controller", {
    code,
    player: {
      user: "<%= fb%>",
      photo: "<%= photo%>",
      name: "<%= name%>"
    }
  });
  lastCode = code;
  el.value = "";
});
socket.on("remove-connection", function() {
  alert("Tela Desconectada");
  const el = document.getElementById("code");
  el.value = lastCode;
});
function hello() {
  return socket;
}
