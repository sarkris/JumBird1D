class Pipe {
	constructor(x, y, speed, gapBetweenTubes, width) {
		this.x = x;
		//y in this example mean the bottom part of the top tube so the top of the second tube is y + gapBetweenTubes
		this.y = y;
		this.speed = speed;
		this.gapBetweenTubes = gapBetweenTubes;
		this.width = width;
		this.usedForGeneratingAnother = false;
		this.scored = false;
	}

	move() {
		this.x -= this.speed * deltaTime;
	}

	draw() {
		ctx2d.fillStyle = "green";
		ctx2d.fillRect(this.x, 0, this.width, this.y);
		ctx2d.fillRect(
			this.x,
			this.y + this.gapBetweenTubes,
			this.width,
			canvas2dHeight - (this.y + this.gapBetweenTubes)
		);
	}
}
