const links = document.querySelectorAll('.listLink')

for(let i =0;i<links.length;i++){
links[i].addEventListener('click', e=>{
 fetch(`/switch?name=${links[i].name}`).then(response => {
    if (response.ok) {
      window.location.href = '/'
      return
    }
    throw new Error('Request failed.')
  }) 

})

}