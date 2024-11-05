"use strict";

const sliderPhoto = document.querySelector(".slider__photo");
const sliderPointButton = document.querySelector(".slider__navigatin-button");
const prevButton = document.querySelector(".slider__prev-button");
const nextButton = document.querySelector(".slider__next-button");
const divPointButton = document.querySelector(".slider__navigatin-button");

let activeIndexPhoto = 1;

const imagesAll = [
  { src: "./1.jpg", alt: "Photo1", title: "Текст слайдера 1" },
  { src: "./2.jpg", alt: "Photo2", title: "Текст слайдера 2" },
  { src: "./3.jpg", alt: "Photo3", title: "Текст слайдера 3" },
];

const addElement = (src, alt) => {
  const newImg = document.createElement("img");
  const newPoint = document.createElement("div");
  newPoint.className = `slider__navigatin-button--point`;
  sliderPointButton.appendChild(newPoint);
  newImg.src = src;
  newImg.alt = alt;
  newImg.className = "slider__img";
  sliderPhoto.appendChild(newImg);
};

const createElement = (imgAll) => {
  imgAll.forEach((element) => {
    addElement(element.src, element.alt);
  });
};

createElement(imagesAll);

const allPhoto = [...sliderPhoto.querySelectorAll(".slider__img")];
allPhoto[activeIndexPhoto].classList.add("active");
const allPointButton = [
  ...divPointButton.querySelectorAll(".slider__navigatin-button--point"),
];
allPointButton[activeIndexPhoto].classList.add("activePoint");

const noneButton = () => {
    prevButton.style.display = activeIndexPhoto <= 0 ? "none" : "block"; 
    nextButton.style.display = activeIndexPhoto >= allPhoto.length - 1 ? "none" : "block";
};

noneButton();

const changPhoto = (id, buttonPrevOrNextOrPoint) => {
  if (buttonPrevOrNextOrPoint === "prev" && id > 0) {
    allPhoto[id].classList.remove("active");
    allPointButton[activeIndexPhoto].classList.remove("activePoint");
    id = id - 1;
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
    allPointButton[id].classList.add("activePoint");
  }
  if (buttonPrevOrNextOrPoint === "next" && id < allPhoto.length - 1) {
    allPhoto[id].classList.remove("active");
    allPointButton[activeIndexPhoto].classList.remove("activePoint");
    id = id + 1;
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
    allPointButton[id].classList.add("activePoint");
  }
  if (buttonPrevOrNextOrPoint === "piont") {
    allPhoto[activeIndexPhoto].classList.remove("active");
    allPointButton[activeIndexPhoto].classList.remove("activePoint");
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
    allPointButton[id].classList.add("activePoint");
  }
};

prevButton.addEventListener("click", (event) => {
  changPhoto(activeIndexPhoto, "prev");
  noneButton();
});

nextButton.addEventListener("click", () => {
  changPhoto(activeIndexPhoto, "next");
  noneButton();
});

divPointButton.addEventListener("click", (event) => {
  let ids = allPointButton.indexOf(event.target);
  changPhoto(ids, "piont");
  noneButton();
});


//Анимация для текста слайдера 
// function animateText(textArea) {
//     let text = textArea.value;
//     let to = text.length,
//       from = 0;

//     animate({
//       duration: 5000,
//       timing: bounce,
//       draw: function(progress) {
//         let result = (to - from) * progress + from;
//         textArea.value = text.slice(0, Math.ceil(result))
//       }
//     });
//   }


//   function bounce(timeFraction) {
//     for (let a = 0, b = 1; 1; a += b, b /= 2) {
//       if (timeFraction >= (7 - 4 * a) / 11) {
//         return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
//       }
//     }
//   }