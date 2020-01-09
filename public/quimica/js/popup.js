function PopupUserWithImage(title,text,imageUrl){
  Swal.fire({
    title,
    text,
    imageUrl,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'User Picture',
    position: 'bottom',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, desejo',
    cancelButtonText: 'No, cancel!',
    showClass: {
      popup: 'animated fadeInUp'
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