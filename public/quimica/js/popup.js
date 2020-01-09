function PopupUserWithImage(title,text,imageUrl){
  Swal.fire({
    title,
    html:
      `<img src=${imageUrl} style="width:150px; height:150; border-radius:50%"><br/>`+
      text,
    position: 'bottom',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, desejo',
    cancelButtonText: 'Nao',
    showClass: {
      popup: 'animated fadeInUp faster'
    },
    hideClass: {
      popup: 'animated fadeOutDown faster'
    }
  }).then((result)=>{
      if(result.value){
        window.location = '/mobile';
      } else {
        axios
        .get("/user/cancel/")
        .then(res => {}).catch(err => {alert(err);});
      }
  })
}

function Popup(title){
  Swal.fire({
    title,
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    }
  })
}