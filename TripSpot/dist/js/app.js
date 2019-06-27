window.addEventListener("resize", () => {
  setOverlay("landing-overlay");
  setOverlay("experience-overlay");
});

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

setOverlay("landing-overlay");
setOverlay("experience-overlay");
