let currentIndex = localStorage.getItem("fieldSetIndex");
if (!currentIndex) {
  currentIndex = 0;
  localStorage.setItem("fieldSetIndex", currentIndex);
} else {
  currentIndex = parseInt(currentIndex, 10);
}

let user = localStorage.getItem("user");
if (!user) {
  user = [];
  localStorage.setItem("user", JSON.stringify(user));
} else {
  user = JSON.parse(user);
}

const fieldSets = document.querySelectorAll("fieldset");
fieldSets.forEach((fs, i) => {
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
      fieldSets[currentIndex].classList.remove("fieldset-active");
      currentIndex--;
      localStorage.setItem("fieldSetIndex", currentIndex);
      fieldSets[currentIndex].classList.add("fieldset-active");
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < fieldSets.length - 1) {
      fieldSets[currentIndex].classList.remove("fieldset-active");
      currentIndex++;
      localStorage.setItem("fieldSetIndex", currentIndex);
      fieldSets[currentIndex].classList.add("fieldset-active");
    }
  });
});


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
