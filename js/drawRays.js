let sx, sy, sw, sh, intersectionX, intersectionY, distance;
function drawRay(deg, index) {
	let radians = degToRad(deg);
	let sin = Math.sin(radians) * 300;
	let cos = Math.cos(radians) * 300;

	let x1 = player.x + cos;
	let y1 = player.y + sin;
	let x2 = player.x;
	let y2 = player.y;

	ctx2d.strokeStyle = "black";

	//The rays hit passage and the color will be green
	sx = pipes[0].x;
	sy = pipes[0].y;
	sw = pipes[0].width;
	sh = pipes[0].gapBetweenTubes;

	let hit = lineRect(x1, y1, x2, y2, sx, sy, sw, sh);
	if (hit)
		ctx2d.strokeStyle = `rgb(0, ${255 * changeValue(distance / 400)}, 0)`;

	//The rays hit top pipe and the color will be red
	sx = pipes[0].x;
	sy = 0;
	sw = pipes[0].width;
	sh = pipes[0].y;
	hit = lineRect(x1, y1, x2, y2, sx, sy, sw, sh);
	if (hit)
		ctx2d.strokeStyle = `rgb(${255 * changeValue(distance / 400)}, 0, 0)`;

	//The rays hit bottom pipe and the color will be red
	sx = pipes[0].x;
	sy = pipes[0].y + pipes[0].gapBetweenTubes;
	sw = pipes[0].width;
	sh = canvas2dHeight;
	hit = lineRect(x1, y1, x2, y2, sx, sy, sw, sh);

	if (hit)
		ctx2d.strokeStyle = `rgb(${255 * changeValue(distance / 400)}, 0, 0)`;
	hit = false;

	if (view2d) {
		//Drawing rays
		ctx2d.beginPath();
		ctx2d.moveTo(player.x, player.y);
		ctx2d.lineTo(player.x + cos, player.y + sin);
		ctx2d.stroke();
	}

	drawOn1DBar(index, ctx2d.strokeStyle);
	distanceToCeilingAndFloor();
	distance = 0;
}
