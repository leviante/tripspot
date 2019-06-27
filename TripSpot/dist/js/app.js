//Getting DOM elements
const header = document.querySelector("#main-nav");
const cardToggle = document.querySelectorAll(".card-link");
const card = document.querySelector(".card");

//Resizing overlay added to elements when resizing the window
window.addEventListener("resize", () => {
  setOverlay("landing-overlay");
  setOverlay("experience-overlay");
});

//Black background in header upon scrolling
window.addEventListener("scroll", setHeaderBackground);

//Card slide upon clicking one of cardToggle
//Define count for card switch links
let count = 0;
cardToggle.forEach(cardLink => cardLink.addEventListener("click", toggleCard));

setOverlay("landing-overlay");
setOverlay("experience-overlay");
// FUNCTIONS

function setOverlay(str) {
  const classPrefix = str.split("-")[0];
  // console.log(classPrefix) outputs landing

  const element = document.querySelector(`#${classPrefix}`);
  // console.log(element) gets landing element as a whole

  //get height of selected element
  let eleHeight = element.clientHeight.toString();

  //get overlay class and change its height dynamically
  const overlay = document.querySelector(`.${str}`);
  overlay.style.height = `${eleHeight}px`;
}

function setHeaderBackground() {
  //add header background if window is scrolled
  if (window.scrollY != 0) {
    header.classList.add("blk-background");
  } else {
    header.classList.remove("blk-background");
  }
}

function toggleCard(e) {
  e.preventDefault();
  const cardShowcase = e.target;

  //gets the left offset number
  let offsetStr = window.getComputedStyle(card).left;
  let offsetValue = parseInt(offsetStr.split("px")[0]);
  console.log(cardToggle[0]);

  switch (offsetValue) {
    case 0:
      if (e.target == cardToggle[0]) {
        card.style.left = "349px";
        cardToggle[1].classList.remove("active");
        cardToggle[0].classList.add("active");
      } else if (e.target == cardToggle[2]) {
        card.style.left = "-349px";
        cardToggle[1].classList.remove("active");
        cardToggle[2].classList.add("active");
      }
      break;
    case -349:
      if (e.target == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[2].classList.remove("active");
      } else if (e.target == cardToggle[0]) {
        card.style.left = "349px";
        cardToggle[2].classList.remove("active");
        cardToggle[0].classList.add("active");
      }
      break;
    case 349:
      if (e.target == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[0].classList.remove("active");
      } else if (e.target == cardToggle[2]) {
        card.style.left = "-349px";
        cardToggle[0].classList.remove("active");
        cardToggle[2].classList.add("active");
      }
      break;
    default:
      break;
  }
}

console.log(cardToggle);
