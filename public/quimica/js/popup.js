function PopupUserWithImage(title,text,imageUrl){
  Swal.fire({
    title,
    text,
    imageUrl,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'User Picture',
    position: 'bottom'
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