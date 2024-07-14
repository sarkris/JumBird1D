window.addEventListener("load", responsive);
window.addEventListener("resize", responsive);

function responsive() {
	if (window.innerWidth < 750) {
		canvas2d.style.display = "none";
	} else if (window.innerWidth >= 750 && view2d && running) {
		canvas2d.style.display = "block";
	}

	if (
		window.getComputedStyle(loseScreen).display === "none" &&
		window.innerWidth >= 750 &&
		!running
	) {
		view2dcheckboxContainer.style.display = "block";
	} else if (
		window.getComputedStyle(loseScreen).display === "none" &&
		window.innerWidth < 750
	) {
		view2dcheckboxContainer.style.display = "none";
	}

	if (window.getComputedStyle(canvas2d).display == "block") {
		document.getElementById("canvases").style.width = "135%";
	} else {
		document.getElementById("canvases").style.width = "100%";
	}
}
