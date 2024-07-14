const canvas2d = document.getElementById("game2D");
const ctx2d = canvas2d.getContext("2d");
const canvas2dWidth = canvas2d.width;
const canvas2dHeight = canvas2d.height;

const canvas1d = document.getElementById("game1D");
const ctx1d = canvas1d.getContext("2d");
const canvas1dWidth = canvas1d.width;
const canvas1dHeight = canvas1d.height;

let player = undefined;
let pipes = [];
let borderforGeneratingAnotherPipe = 70;
let rays = 32;

let score = 0;

let running = false;

let lastUpdate;
let now;
let deltaTime;
let perfectFrameRate = 1000 / 60;

let view2d = false;

//Whats percent of space one line take
let linePercent = canvas1dHeight / rays;

//Turning on/off 2D view
const view2dcheckboxContainer = document.querySelector("#question");
const checkbox2d = document.querySelector("#view2d");
window.addEventListener("load", changeVisibiltyOf2dView);
checkbox2d.addEventListener("change", changeVisibiltyOf2dView);

function changeVisibiltyOf2dView() {
	checkbox2d.checked ? (view2d = true) : (view2d = false);
	if (running && window.innerWidth >= 750) {
		if (view2d) {
			canvas2d.style.display = "block";
			document.getElementById("canvases").style.width = "135%";
		} else {
			canvas2d.style.display = "none";
			document.getElementById("canvases").style.width = "100%";
		}
	}
}

//Initializing game
const startBtn = document.getElementById("startGameBtn");
const howToPlayBtn = document.getElementById("howToPlayBtn");
const header = document.getElementById("header");
const scoreContainer = document.getElementById("score");

startBtn.addEventListener("click", () => {
	running = true;

	//UI
	canvas1d.style.display = "block";
	scoreContainer.style.display = "block";
	startBtn.style.display = "none";
	howToPlayBtn.style.display = "none";
	view2dcheckboxContainer.style.display = "none";
	header.classList.add("headerSlidedOut");
	changeVisibiltyOf2dView();

	//Game
	clearBackground();
	player = new Player(150, canvas2dHeight / 2, 20, 12);
	player.draw();
	generatePipe();
	lastUpdate = new Date();
	update();
});

//Restarting game
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
	responsive();

	loseScreen.style.display = "none";
	scoreContainer.textContent = "Score: 0";

	score = 0;
	pipes = [];
	clearBackground();
	player = new Player(150, canvas2dHeight / 2, 20, 12);
	player.draw();
	generatePipe();
	lastUpdate = new Date();
	running = true;
	update();
});

//Back to home screen
const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", () => {
	if (window.innerWidth >= 750) {
		view2dcheckboxContainer.style.display = "block";
	}
	loseScreen.style.display = "none";
	canvas1d.style.display = "none";
	canvas2d.style.display = "none";
	scoreContainer.style.display = "none";
	startBtn.style.display = "block";
	howToPlayBtn.style.display = "block";
	header.classList.remove("headerSlidedOut");

	score = 0;
	scoreContainer.textContent = "Score: 0";
	pipes = [];
});

function clearBackground() {
	ctx2d.fillStyle = "#888";
	ctx2d.fillRect(0, 0, canvas2dWidth, canvas2dHeight);
}

//Generating random y coordinate for generating pipes

function randomY() {
	return Math.floor(Math.random() * (canvas2dHeight - 250) + 50);
}

//this function check if there is a need to create another pipe

function needForAnotherPipe() {
	if (
		pipes[0].x <= borderforGeneratingAnotherPipe &&
		!pipes[0].usedForGeneratingAnother
	) {
		generatePipe();
		pipes[0].usedForGeneratingAnother = true;
	}
}

function generatePipe() {
	pipes.push(new Pipe(canvas2dWidth, randomY(), 2, 175, 50));
}

//Gravity
const gravityForce = 0.5;

function gravity() {
	player.velocityY += gravityForce * deltaTime;
}

//Reacting to jump button
window.addEventListener("keydown", e => {
	if (e.keyCode == 32 && running) {
		player.jump();
	}
});
window.addEventListener("touchstart", () => {
	if (running) {
		player.jump();
	}
});

//Checking collisions
function checkCollision() {
	let pipe = pipes[0];
	//Collision with pipes
	if (
		pipe.x <= player.x + player.radius &&
		pipe.x + pipe.width >= player.x - player.radius
	) {
		if (
			pipe.y > player.y + player.radius ||
			pipe.y + pipe.gapBetweenTubes < player.y - player.radius
		) {
			lose("pipe!");
		}
	}

	//Collision with ceiling and floor
	if (player.y - player.radius <= 0) lose("ceiling!");
	if (canvas2dHeight <= player.y + player.radius) lose("floor!");
}

//This function draw view in 1D canvas
function drawOn1DBar(whichLine, color) {
	ctx1d.fillStyle = color;
	ctx1d.fillRect(0, whichLine * linePercent, canvas1dWidth, linePercent);
}

//Sensor for floor an ceiling
function distanceToCeilingAndFloor() {
	//Values normalized to be between 0 and 1
	let distCeiling = changeValue(
		((player.y - player.radius) / 706).toFixed(3)
	);
	let distFloor = changeValue(
		((canvas1dHeight - player.y + player.radius) / 750).toFixed(3)
	);

	//Ceiling
	ctx1d.fillStyle = `rgb(${255 * distCeiling}, ${255 * distCeiling}, 0)`;
	ctx1d.fillRect(0, 0, canvas1dWidth, linePercent);

	//Floor
	ctx1d.fillStyle = `rgb(${255 * distFloor}, ${255 * distFloor}, 0)`;
	ctx1d.fillRect(0, canvas1dHeight - linePercent, canvas1dWidth, linePercent);
}

function checkIfPlayerGetPoint() {
	if (pipes[0].x <= 150 - pipes[0].width / 2 && !pipes[0].scored) {
		//Player get point
		score++;
		scoreContainer.textContent = `Score: ${score}`;
		pipes[0].scored = true;
	}
}

function calculateDeltaTime() {
	now = new Date();
	deltaTime = (now - lastUpdate) / perfectFrameRate;
	lastUpdate = now;
}

//Game
function update() {
	if (running) {
		window.requestAnimationFrame(update);
	}

	calculateDeltaTime();

	clearBackground();

	player.move();
	player.draw();

	needForAnotherPipe();
	pipes.forEach((v, i) => {
		v.move();
		v.draw();
	});

	gravity();
	checkCollision();

	checkIfPlayerGetPoint();

	//If pipe isn't visible delete it
	if (pipes[0].x < 0 - pipes[0].width) pipes.shift();

	//Drawing rays
	let whichLine = 31;

	for (let i = 75; i >= -75; i -= 5) {
		drawRay(i, whichLine);
		whichLine--;
	}
}
