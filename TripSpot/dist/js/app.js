//Getting DOM elements
const header = document.querySelector("#main-nav");
const navLinks = document.querySelectorAll(".link-item");
const cardToggle = document.querySelectorAll(".card-link");
const card = document.querySelector(".card");
const scrollUp = document.querySelector(".scroll-up");
const galleryCards = document.querySelectorAll(".gallery-card img");
const navElementHeights = [];

//Resizing overlay added to elements when resizing the window
window.addEventListener("resize", () => {
  setOverlay("landing-overlay");
  setOverlay("experience-overlay");
});

//Black background in header upon scrolling
window.addEventListener("scroll", () => {
  setHeaderBackground();
  setNavActiveClass();
  //console.log(window.scrollY); gets the scroll pos
});

//Smooth scrolling to section when clicked navbar links
navLinks.forEach(navLink => navLink.addEventListener("click", scrollToSection));

//Card slide upon clicking one of cardToggle
cardToggle.forEach(cardLink => cardLink.addEventListener("click", toggleCard));

//Add shadow to gallery card couples when hovered
galleryCards.forEach(galleryCard => {});

//get scroll amount for footer scroll up element
scrollUp.addEventListener("click", scrollTop);

//--------------------- THESE WILL RUN WHEN PAGE LOADS ---------------------
calculateHeight();
setOverlay("landing-overlay");
setOverlay("experience-overlay");
// ----------------------------------------------------------- FUNCTIONS

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
// ------------------------------------------------------------------ //
function setHeaderBackground() {
  //add header background if window is scrolled
  if (window.scrollY != 0) {
    header.classList.add("blk-background");
  } else {
    header.classList.remove("blk-background");
  }
}
// ------------------------------------------------------------------ //
function toggleCard(e) {
  e.preventDefault();
  const cardShowcase = e.target;

  //gets the left offset number
  let offsetStr = window.getComputedStyle(card).left;
  let offsetValue = parseInt(offsetStr.split("px")[0]);

  switch (offsetValue) {
    case 0:
      if (cardShowcase == cardToggle[0]) {
        card.style.left = "349px";
        cardToggle[1].classList.remove("active");
        cardToggle[0].classList.add("active");
      } else if (cardShowcase == cardToggle[2]) {
        card.style.left = "-349px";
        cardToggle[1].classList.remove("active");
        cardToggle[2].classList.add("active");
      }
      break;
    case -349:
      if (cardShowcase == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[2].classList.remove("active");
      } else if (cardShowcase == cardToggle[0]) {
        card.style.left = "349px";
        cardToggle[2].classList.remove("active");
        cardToggle[0].classList.add("active");
      }
      break;
    case 349:
      if (cardShowcase == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[0].classList.remove("active");
      } else if (cardShowcase == cardToggle[2]) {
        card.style.left = "-349px";
        cardToggle[0].classList.remove("active");
        cardToggle[2].classList.add("active");
      }
      break;
    default:
      break;
  }
}
// ------------------------------------------------------------------ //
function scrollTop(e) {
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}
// ------------------------------------------------------------------ //
function scrollToSection(e) {
  e.preventDefault();

  const targetElementId = e.currentTarget.getAttribute("href");
  const targetElement = document.querySelector(`${targetElementId}`);

  //get target element height from top
  const elementRect = targetElement.getBoundingClientRect();
  const elementHeight = elementRect.top;

  //animate scroll
  window.scrollBy({
    top: elementHeight + 20, //20 added to handle margin differences
    left: 0,
    behavior: "smooth"
  });
}
// ------------------------------------------------------------------ //
function calculateHeight() {
  window.scrollTo(0, 0);

  navLinks.forEach(navLink => {
    const targetElementId = navLink.getAttribute("href");
    const targetElement = document.querySelector(`${targetElementId}`);

    //get target element height (from viewport)
    const elementRect = targetElement.getBoundingClientRect();
    const eleViewportHeight = elementRect.top;

    //get target element height (it's total height)
    const elementHeight = targetElement.offsetHeight;

    const element = {
      grab: navLink,
      viewportHeight: eleViewportHeight,
      eleHeight: elementHeight
    };

    navElementHeights.push(element);
  });
}
// ------------------------------------------------------------------ //
function setNavActiveClass() {
  const winHeight = window.scrollY;

  navElementHeights.forEach(navElement => {
    const scrollHeight = navElement.viewportHeight;
    const totalHeight = scrollHeight + navElement.eleHeight;

    if (winHeight >= scrollHeight && winHeight <= totalHeight) {
      navElement.grab.classList.add("active");
    } else if (winHeight > totalHeight) {
      navElement.grab.classList.remove("active");
    } else if (winHeight < scrollHeight) {
      navElement.grab.classList.remove("active");
    }
  });
}
// ------------------------------------------------------------------ //
