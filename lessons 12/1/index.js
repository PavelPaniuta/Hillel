const buttonAdd = document.querySelector('.button__add');
const buttonOpenUrl = document.querySelector('.button__open_url');
let promptUrl = '';

buttonAdd.addEventListener('click', ()=>{promptUrl = prompt('Enter Url please!')});
buttonOpenUrl.addEventListener('click', ()=>{window.open(`https://${promptUrl}`, "_blank")});

