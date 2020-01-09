function PopupUserWithImage(title,html,imageUrl){
  Swal.fire({
    title,
    html,
    imageUrl,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'User Picture',
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