const elWraper = document.querySelector('.button__wraper');

function clicks (e){
   alert(`You press - ${e.target.innerHTML}`);
  }

elWraper.addEventListener('click', clicks);
