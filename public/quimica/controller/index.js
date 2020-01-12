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
  Toast("Tela Desconectada","error",4000);
});
socket.on("code-connect",function(data){
  if(data.code === 6){
    Toast('Conectado com successo','success',4500);
  } else {
    Toast('Esse codigo nao existe','error',4500);
  }
});
function hello() {
  return socket;
}