const imgContainer = document.getElementById("howToPlayImg");
const showImg = document.getElementById("howToPlayBtn");
const closeImg = document.getElementById("hideImg");

showImg.addEventListener("click", () => {
	imgContainer.style.scale = "1";
});

closeImg.addEventListener("click", () => {
	imgContainer.style.scale = "0";
});
