class Player {
	constructor(x, y, radius, jumpForce) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocityY = -10;
		this.jumpForce = jumpForce;
	}

	jump() {
		this.velocityY = -this.jumpForce;
	}

	move() {
		this.y += this.velocityY * deltaTime;
	}

	draw() {
		ctx2d.fillStyle = "red";
		ctx2d.beginPath();
		ctx2d.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx2d.fill();
	}
}
