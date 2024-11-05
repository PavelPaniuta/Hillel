"use strict";

const sliderPhoto = document.querySelector(".slider__photo");
const sliderPointButton = document.querySelector(".slider__navigatin-button");
const prevButton = document.querySelector(".slider__prev-button");
const nextButton = document.querySelector(".slider__next-button");
const divPointButton = document.querySelector(".slider__navigatin-button");

let activeIndexPhoto = 0;

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

const hideButtons = () => {
    prevButton.style.display = activeIndexPhoto <= 0 ? "none" : "block"; 
    nextButton.style.display = activeIndexPhoto >= allPhoto.length - 1 ? "none" : "block";
};

hideButtons();

const changPhoto = (id, buttonPrevOrNextOrPoint) => {
    allPhoto[activeIndexPhoto].classList.remove("active");
    allPointButton[activeIndexPhoto].classList.remove("activePoint");
  if (buttonPrevOrNextOrPoint === "prev" && id > 0) {
    activeIndexPhoto -= 1;
    allPhoto[activeIndexPhoto].classList.add("active");
    allPointButton[activeIndexPhoto].classList.add("activePoint");
  }
  if (buttonPrevOrNextOrPoint === "next" && id < allPhoto.length - 1) {
    activeIndexPhoto += 1;
    allPhoto[activeIndexPhoto].classList.add("active");
    allPointButton[activeIndexPhoto].classList.add("activePoint");
  }
  if (buttonPrevOrNextOrPoint === "piont") {
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
    allPointButton[id].classList.add("activePoint");
  }
};

prevButton.addEventListener("click", () => {
  changPhoto(activeIndexPhoto, "prev");
  hideButtons();
});

nextButton.addEventListener("click", () => {
  changPhoto(activeIndexPhoto, "next");
  hideButtons();
});

divPointButton.addEventListener("click", (event) => {
  let ids = allPointButton.indexOf(event.target);
  changPhoto(ids, "piont");
  hideButtons();
});