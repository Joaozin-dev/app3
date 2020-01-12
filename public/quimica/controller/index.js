const socket = io("https://airgames.tk/");

function Connect(code){
  const users = JSON.parse(localStorage.getItem('user_info'));
  socket.emit("new-controller", {
    code,
    player: {
      photo: users.user.user_picture,
      name: users.user.user_nome
    }
  });
}
socket.on("screen-id", function(data) {
  console.log(data);
});
socket.on("remove-connection", function() {
  Toast("Tela Desconectada","error");
});
socket.on("code-connect",function(data){
  console.log(data);
});
function hello() {
  return socket;
}