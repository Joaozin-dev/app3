const json = {user: {user_picture: '<%= photo%>',user_nome: '<%= name%>',user_cash: '<%= cash%>'}}
localStorage.setItem('user_info',JSON.stringify(json));
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
$(document).ready(function() {
  if (localStorage.getItem("session") === null) {
    $(".sidenav").html(
      $(".sidenav").html() +
        `
      <li><div class="divider"></div></li>
      <li>
        <a class="waves-effect connect" href="#!"
          ><i class="material-icons">devices</i>Conectar-se na tela</a
        >
      </li>
    `
    );
  }
  $(".sidenav").html(
      $(".sidenav").html() +
        `
      <li><div class="divider"></div></li>
      <li>
        <a class="waves-effect exit-account" href="#!"
          ><i class="material-icons">exit_to_app</i>Sair da Conta</a
        >
      </li>
    `
    );
  $(".connect").click(function() {
    PopupCode();
  });
  $('.exit-account').click(function(){
    axios.get("/user/cancel").then(function(result) {
      localStorage.clear();
      window.location = '/login';
    });
  })
  axios.get("/game/list").then(function(result) {
    const { data } = result;
    data.forEach(function(item) {
      $(".container").append(`
        <div class="row">
            <div class="col s12 m7">
              <div class="card hoverable medium">
                <div class="card-image">
                  <img
                    src="${item.game_picture}" style="width: 100%; height:100%"
                  />
                  <span class="card-title">${item.game_name}</span>
                </div>
                <div class="card-content">
                  <p>
                    ${item.game_description}
                  </p>
                </div>
                <div class="card-action">
                  <a class="blue-text text-darken-2" href="/game/info/${item.game_id}">Jogue agora por apenas R$${item.game_price},00</a>
                </div>
              </div>
            </div>
          </div>
      `);
    });
  });
});