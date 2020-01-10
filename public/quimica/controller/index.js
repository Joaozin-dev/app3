const socket = io("https://airgames.tk");

function connect(code){
  socket.emit("new-controller", {
    code,
    player: {
      user: "<%= fb%>",
      photo: "<%= photo%>",
      name: "<%= name%>"
    }
  });
}

document.getElementById("con").addEventListener("click", function() {
  socket.emit("getScreen", true);
});
socket.on("screen-id", function(data) {
  console.log(data);
});
socket.on("remove-connection", function() {
  alert("Tela Desconectada");
  Toast('Tela Desco');
});
socket.on("code-connect",function(data){
  if(data.code === 6){
    
  }
});
function hello() {
  return socket;
}
