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
  newImg.src = `${src}`;
  newImg.alt = `${alt}`;
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

const noneButton = () => {
  if (activeIndexPhoto <= 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }
  if (activeIndexPhoto >= allPhoto.length - 1) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }
};

noneButton();

const changPhoto = (id, buttonPrevOrNext) => {
  if (buttonPrevOrNext === "prev" && id > 0) {
    allPhoto[id].classList.remove("active");
    id = id - 1;
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
  }
  if (buttonPrevOrNext === "next" && id < allPhoto.length - 1) {
    allPhoto[id].classList.remove("active");
    id = id + 1;
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
  }
  if (buttonPrevOrNext === "piont") {
    allPhoto[activeIndexPhoto].classList.remove("active");
    activeIndexPhoto = id;
    allPhoto[id].classList.add("active");
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
  let ids = 0;
  allPointButton.forEach((element, id) => {
    if (event.target === element) {
      ids = id;
    }
  });

  changPhoto(ids, "piont");
  noneButton();
});
