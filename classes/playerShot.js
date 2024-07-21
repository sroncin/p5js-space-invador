class PlayerShot {

	static get DESIGNS() {
		return [{
			//0 == Player Shot Sprite
			"0": [
				[1],
				[1],
				[1],
				[1]
			]
		}];
	}

	static get EXPLODE_DESIGNS() {
		return {
			"0": [
				[1,0,0,0,1,0,0,1],
				[0,0,1,0,0,0,1,0],
				[0,1,1,1,1,1,1,0],
				[1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1],
				[0,1,1,1,1,1,1,0],
				[0,0,1,0,0,1,0,0],
				[1,0,0,1,0,0,0,1]
			]
		}
	}

	constructor(pixelWidth, x, y, dir) {
		//Positionning
		this.pixelWidth = pixelWidth;
		this.pixelHeightRatio = 1.2;
		this.x = x;
		this.y = y;

		this.direction = (dir ? dir : 1); // positive for up, negative for down

		//Hit management
		this.explosionTimer = 10;
		this.hitEnemy = false;
		this.hitLaser = false;
		this.hitShield = false;
		this.hitTopScreen = false;
		this.laserInCollision = null;
		this.shieldInCollision = null;

		//Sprit Choice
		this.sprit = 0;

		//Sprit design
		this.design = PlayerShot.DESIGNS[this.sprit];
		this.height = this.design[this.sprit].length;
		this.length = this.height;
		this.width = this.design[this.sprit][0].length;
		this.widthInPixel = this.width * this.pixelWidth;
		this.heightInPixel = this.height * this.pixelWidth * this.pixelHeightRatio;
	}

	//Move the shot if it does not hit anything
	move() {
		if (!this.hitEnemy && !this.hitLaser && !this.hitShield) {
			this.y -= 6;
		}
	}

	draw() {
		if (!this.hitEnemy && !this.hitLaser && !this.hitShield && !this.hitTopScreen) {
			if (this.y < 0) {
				this.die(); //Animate the exit of the screen
				this.hitTopScreen = true;
			} else {
				//draw this shot
				noStroke();
				let currDesign = this.design[0];
				SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);
			}

			//Show information
			/*
			SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, false);
			let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, true);
			SpritesDrawing.drawSpriteInfo(this.y, boundary)
			*/
		} else {
			//Animation of an enemy that has been Hit
			if(this.explosionTimer >= 0) {
				if (this.hitLaser == true) {
					if (this.explosionTimer == 10) {
						//if timer is full kill the laser
						this.laserInCollision.used = true;
						this.laserInCollision.hitPlayerShot = true;
						this.laserInCollision.die(); //Animate the exit of the screen
					}
				}
				this.explosionTimer -= 1;
			}
		}
	}

	die() {
		stroke(255);
		strokeWeight(1);
		let currDesign = PlayerShot.EXPLODE_DESIGNS[0];
		SpritesDrawing.drawSpriteCentered(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);
		this.explosionTimer -= 1;
	}

}