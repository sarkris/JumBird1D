function lose(how) {
	if (!running) return;
	running = false;

	player.draw();
	determineHighScore();
	showLoseScreen(`You lost by hitting ${how}`);
}

let highScore;

function determineHighScore() {
	highScore = localStorage.getItem("highScore");

	if (highScore === null || highScore < score) {
		//High score updated
		highScore = score;
		localStorage.setItem("highScore", highScore);
	}
}

//Showing lose screen when player lost

const loseScreen = document.getElementById("loseScreen");

function showLoseScreen(comment) {
	loseScreen.style.display = "block";

	const scoreOnLoseScreen = document.getElementById(
		"scoreContainerOnLoseScreen"
	);
	const highScoreOnLoseScreen = document.getElementById(
		"highScoreContainerOnLoseScreen"
	);

	const commentContainer = document.getElementById("comment");
	commentContainer.textContent = comment;

	scoreOnLoseScreen.textContent = score;
	highScoreOnLoseScreen.textContent = highScore;
}
