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
    html: `<input type="number" placeholder="Seu Codigo">`,
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
      Swal.fire({
        title: "<strong>Codigo Encontrado</strong>",
        icon: "success",
        position: "top",
        timer: 2000,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        html: 
          'Tela Conectada com sucesso<br/>'+
          'Para jogar escolha um jogo',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entrar!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancelar',
        showClass: {
          popup: "animated fadeInDown faster"
        },
        hideClass: {
          popup: "animated fadeOutUp faster"
        }
      });
    }
  });
}
