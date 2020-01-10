function PopupUserWithImage(title, text, imageUrl) {
  Swal.fire({
    title,
    html:
      `<img src=${imageUrl} style="width:150px; height:150; border-radius:50%"><br/>` +
      text,
    position: "bottom",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, desejo",
    cancelButtonText: "Nao",
    showClass: {
      popup: "animated fadeInUp faster"
    },
    hideClass: {
      popup: "animated fadeOutDown faster"
    }
  }).then(result => {
    if (result.value) {
      window.location = "/mobile";
    } else {
      axios
        .get("/user/cancel/")
        .then(res => {})
        .catch(err => {
          alert(err);
        });
    }
  });
}

function PopupCode() {
  Swal.fire({
    title: "<strong>Digite o codigo</strong>",
    icon: "error",
    position: "bottom",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    html: `<input type="number" id="code" placeholder="Seu Codigo">`,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: true,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entrar!',
    cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
    showClass: {
      popup: "animated fadeInUp faster"
    },
    hideClass: {
      popup: "animated fadeOutDown faster"
    }
  }).then(function(result) {
    if (result.value) {
      connect($("#code").val());
    } else {
      Swal.fire({
        title: "<strong>Conexao cancelada</strong>",
        icon: "error",
        position: "bottom",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        html: 
          'Nao foi possivel continuar com a conexao<br/>'+
          'Motivos: <b>Voce cancelou a tentativa de conexao</b>',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entrar!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
        showClass: {
          popup: "animated fadeInUp faster"
        },
        hideClass: {
          popup: "animated fadeOutDown faster"
        }
      });
    }
  });
}
