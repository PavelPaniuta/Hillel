const photo = document.createElement("img");
photo.alt = "photo";
photo.className = "block__photo__img";
const blockPhoto = document.querySelector(".block__photo");

function createElements() {
  let rondoms = Math.floor(Math.random() * (10 - 1) + 1);
  photo.src = `./photo/${rondoms}.jpg`;
  blockPhoto.append(photo);
}

function rondom() {
  const interval = setInterval(() => createElements(), 1000);

  setTimeout(() => {
    clearInterval(interval);
  }, 30000);
}
rondom();
