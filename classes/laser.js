class Laser {

	//Constant to save all enemies designs
	// array of sprites shots
	//0 == Squigly Shot Sprites
	//1 == Plunger Shot Sprites
	//2 == Rolling Shot Sprites
	static get DESIGNS() {
		return [{
			//0 == Squigly Shot Sprites
			"0": [
				[0, 1, 0],
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 0]
			],
			"1": [
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
				[0, 0, 0]
			],
			"2": [
				[0, 1, 0],
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
				[0, 1, 0],
				[0, 0, 0]
			],
			"3": [
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
				[0, 1, 0],
				[1, 0, 0],
				[0, 0, 0]
			]
		},{
			//1 == Plunger Shot Sprites
			"0": [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0],
				[0, 0, 0]
			],
			"1": [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 1],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			"2": [
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 1],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0],
				[0, 0, 0]
			],
			"3": [
				[1, 1, 1],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
		},{
			//2 == Rolling Shot Sprites
			"0": [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0]
			],
			"1": [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0],
				[0, 1, 1],
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0]
			],
			"2": [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0]
			],
			"3": [
				[0, 1, 1],
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 1],
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
				[0, 0, 0]
			]
		}
		];
	}

	static get EXPLODE_DESIGNS() {
		return {
			"0": [
				[0, 0, 1, 0, 0, 0],
				[1, 0, 0, 0, 1, 0],
				[0, 0, 1, 1, 0, 1],
				[0, 1, 1, 1, 1, 0],
				[1, 0, 1, 1, 1, 0],
				[0, 1, 1, 1, 1, 1],
				[1, 0, 1, 1, 1, 0],
				[0, 1, 0, 1, 0, 1]
			]
		}
	}

	constructor(pixelWidth, x, y, speed, laserIndexDesign) {
		this.pixelWidth = pixelWidth;
		this.x = x;
		this.y = y;
		this.pixelHeightRatio = 1.2;

		this.used = false;
		this.speed = speed;

		//Sprit Choice
		this.sprit = 0;
		
		//Sprit design
		this.designIndex = (typeof laserIndexDesign !== 'undefined') ? laserIndexDesign : floor(random(3));
		this.design = Laser.DESIGNS[this.designIndex];
		this.height = this.design[this.sprit].length;
		this.width = this.design[this.sprit][0].length;
		this.widthInPixel = this.width * this.pixelWidth;
		this.heightInPixel = this.height * this.pixelWidth * this.pixelHeightRatio;

		this.explosionTimer = 5;
		this.hitPlayerShot = false;
		this.hitShield = false;
		this.hitBottomScreen = false;
	}

	updateSprit() {
		switch (this.sprit) {
			case 0: this.sprit = 1; break;
			case 1: this.sprit = 2; break;
			case 2: this.sprit = 3; break;
			case 3: this.sprit = 0; break;
		}
	}

	draw() {
		if (!this.used) {
			noStroke();
			let currDesign = this.design[this.sprit];

			SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);

			//Show information
			/*
			SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, true);
			let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, true);
			SpritesDrawing.drawSpriteInfo(this.designIndex, boundary)
			*/
		} else {
			if(this.explosionTimer >= 0) {
				if (this.hitPlayerShot || this.hitShield) {
					this.die(false);
				}
			}
		}
	}

	move() {
		if (!this.used) {
			if (frameCount % 10 == 0) this.updateSprit();
			this.y += (this.speed );
		}
	}

	die(screenBottom) {
		stroke(255);
		strokeWeight(1);
		let currDesign = Laser.EXPLODE_DESIGNS[0];

		SpritesDrawing.drawSpriteCentered(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio)

		this.explosionTimer -= 1;
	}	
}