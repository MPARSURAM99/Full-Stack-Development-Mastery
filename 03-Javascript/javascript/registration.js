import { getAllCountries } from "./main.js";
// Local storage setup for form fieldset.
let currentIndex = localStorage.getItem("fieldSetIndex");
if (!currentIndex) {
  currentIndex = 0;
  localStorage.setItem("fieldSetIndex", currentIndex);
} else {
  currentIndex = parseInt(currentIndex, 10);
}

// Creating step circle dinamically.
const parentOfStepCircle = document.querySelector(".div-outer-bar");
const fieldSets = document.querySelectorAll("fieldset");
function createStepCircle(i) {
  const stepCircle = document.createElement("div");
  stepCircle.classList.add("div-step-circle");
  stepCircle.textContent = i + 1;
  parentOfStepCircle.appendChild(stepCircle);
}

// Fieldset and it's controle button functionality.
fieldSets.forEach((fs, i) => {
  createStepCircle(i);
  i === currentIndex
    ? fs.classList.add("fieldset-active")
    : fs.classList.remove("fieldset-active");

  const divAction = document.createElement("div");
  divAction.classList.add("div-fieldset-action");

  const previousButton = document.createElement("button");
  previousButton.textContent = "←";
  previousButton.id = "button-previous";

  const resetButton = document.createElement("button");
  resetButton.textContent = "↻";
  resetButton.id = "button-reset";

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.id = "button-next";

  divAction.appendChild(previousButton);
  divAction.appendChild(resetButton);
  divAction.appendChild(nextButton);
  fs.appendChild(divAction);

  if (i === 0) {
    previousButton.style.display = "none";
  }

  if (i === fieldSets.length - 1) {
    nextButton.style.display = "none";
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.id = "button-submit";
    divAction.appendChild(submitButton);
  }

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      progressNode.forEach((node) =>
        node.classList.remove("step-circle-active"),
      );
      fieldSets[currentIndex].classList.remove("fieldset-active");
      currentIndex--;
      localStorage.setItem("fieldSetIndex", currentIndex);
      fieldSets[currentIndex].classList.add("fieldset-active");
      progressNode[currentIndex].classList.add("step-circle-active");
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < fieldSets.length - 1) {
      progressNode.forEach((node) =>
        node.classList.remove("step-circle-active"),
      );
      fieldSets[currentIndex].classList.remove("fieldset-active");
      currentIndex++;
      localStorage.setItem("fieldSetIndex", currentIndex);
      fieldSets[currentIndex].classList.add("fieldset-active");
      progressNode[currentIndex].classList.add("step-circle-active");
    }
  });
});

// Step circle functionality.
const progressNode = document.querySelectorAll(".div-step-circle");
progressNode[currentIndex].classList.add("step-circle-active");
progressNode.forEach((pn, i) => {
  pn.addEventListener("click", () => {
    progressNode.forEach((node) => node.classList.remove("step-circle-active"));
    fieldSets[currentIndex].classList.remove("fieldset-active");
    currentIndex = i;
    fieldSets[currentIndex].classList.add("fieldset-active");
    localStorage.setItem("fieldSetIndex", currentIndex);
    progressNode[currentIndex].classList.add("step-circle-active");
  });
});

const citizenShipSelector = document.getElementById("select-citizenship");
async function populateCountries() {
  const countries = await getAllCountries();
  countries.forEach((country) => {
    const citizenshipOption = document.createElement("option");
    citizenshipOption.value = country.iso2;
    citizenshipOption.textContent = country.name;
    citizenShipSelector.appendChild(citizenshipOption);
  });
}
populateCountries();

let user = localStorage.getItem("user");
if (!user) {
  user = [];
  localStorage.setItem("user", JSON.stringify(user));
} else {
  user = JSON.parse(user);
}

const inputImage = document.getElementById("input-dragable-area");
const imagePreview = document.getElementById("div-image-preview");
inputImage.addEventListener("change", () => {
  const imageObject = inputImage.files[0];
  let imageLink;
  if (imageObject) {
    imageLink = URL.createObjectURL(imageObject);
  }

  user.push({ imageUrl: imageLink });
  imagePreview.textContent = "";
  imagePreview.style.border = "none";
  imagePreview.style.backgroundImage = `url(${imageLink})`;
});
