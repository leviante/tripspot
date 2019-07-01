//Getting DOM elements
const header = document.querySelector("#main-nav");
const navLinks = document.querySelectorAll(".link-item");
const cardToggle = document.querySelectorAll(".card-link");
const card = document.querySelector(".card");
const scrollUp = document.querySelector(".scroll-up");
const galleryCards = document.querySelectorAll(".gallery-card img");
const galleryPopupExit = document.querySelector(".popup i");
const hamburger = document.querySelector(".fas.fa-bars");
const menu = document.querySelector(".menu");
const navbarLink = document.querySelector(".navbar-links");

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
galleryCards.forEach(galleryCard =>
  galleryCard.addEventListener("click", showPopup)
);

//Exit popup when clicked exit btn
galleryPopupExit.addEventListener("click", exitPopup);

//get scroll amount for footer scroll up element
scrollUp.addEventListener("click", scrollTop);

//Listen click event on hamburger and expand menu when happens
hamburger.addEventListener("click", function() {
  expandMenu();
});

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

  //get the width of card
  const cardSlide = document.querySelector(".card-slide");
  const slideWidth = cardSlide.offsetWidth;

  //gets the left offset number
  let offsetStr = window.getComputedStyle(card).left;
  let offsetValue = parseInt(offsetStr.split("px")[0]);

  switch (offsetValue) {
    case 0:
      if (cardShowcase == cardToggle[0]) {
        console.log(`${slideWidth}px`);
        card.style.left = "100%";
        cardToggle[1].classList.remove("active");
        cardToggle[0].classList.add("active");
      } else if (cardShowcase == cardToggle[2]) {
        card.style.left = `-100%`;
        cardToggle[1].classList.remove("active");
        cardToggle[2].classList.add("active");
      }
      break;
    case -slideWidth:
      if (cardShowcase == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[2].classList.remove("active");
      } else if (cardShowcase == cardToggle[0]) {
        card.style.left = `100%`;
        cardToggle[2].classList.remove("active");
        cardToggle[0].classList.add("active");
      }
      break;
    case slideWidth:
      if (cardShowcase == cardToggle[1]) {
        card.style.left = "0px";
        cardToggle[1].classList.add("active");
        cardToggle[0].classList.remove("active");
      } else if (cardShowcase == cardToggle[2]) {
        card.style.left = `-100%`;
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

function showPopup(e) {
  //get img of the clicked gallery card
  const img = e.target.getAttribute("src");

  //change img inside popup
  document.querySelector(".popup img").setAttribute("src", img);

  //add class to popup to toggle visibility
  document.querySelector(".gallery-popup").classList.add("show");

  //get target element to scroll
  const gallery = document.querySelector("#gallery");

  //get target element height from top
  const galleryRect = gallery.getBoundingClientRect();
  const galleryHeight = galleryRect.top;

  //animate scroll
  window.scrollBy({
    top: galleryHeight + 170, //20 added to handle margin differences
    left: 0,
    behavior: "smooth"
  });
}

// -------------------------------------------------------------------- //

function exitPopup() {
  //remove class from popup to make it invisible again
  document.querySelector(".gallery-popup").classList.remove("show");
}

// ------------------------------------------------------------------ //
function expandMenu() {
  if (menu.getAttribute("class").includes("expand")) {
    menu.classList.remove("expand");
    menu.style.height = 0;
  } else {
    menu.classList.add("expand");
    calculateMenuHeight();
  }
}

// ------------------------------------------------------------------ //
function calculateMenuHeight() {
  var offsetHeight = navbarLink.offsetHeight;
  console.log(offsetHeight);
  document.querySelector(".expand").style.height = `${offsetHeight + 30}px`;
}
