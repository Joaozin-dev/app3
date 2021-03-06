const socket = io("https://airgames.herokuapp.com");

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
  localStorage.setItem('user_session',null);
  setTimeout(function(){
    $('.connect').hide();
  },5900);
  Toast("Tela Desconectada","error");
});
socket.on("code-connect",function(data){
  if(data.code === 6){
    Toast('Conectado com successo','success')
    localStorage.setItem('user_session',1);
    maxWindow();
    $('.connect').hide();
  } else if(data.code === 7){
    Toast('Codigo nao encontrado','error')
  }
});
function hello() {
  return socket;
}