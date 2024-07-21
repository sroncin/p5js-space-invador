class SpaceInvadorEnemy extends SpaceInvadorShip {

	constructor(index, fps, scl, x, y, design, explodeDesign) {
		super(fps, scl, x, y, design, explodeDesign);

		this.index = index; //used for display purpose

		//Sprit moves
		this.dir = 1;
		this.frameCount = 1;

		this.explosionTimer = 5;
	}

	isTouchingBoundaries(minPosXEnemies, maxPosXEnemies) {
		return ( !( (this.x) >= minPosXEnemies && (this.x + this.widthInPixel) <= maxPosXEnemies ) && this.alive == true );
	}

	shiftDown(enemySpacingH) {
		this.dir *= -1;
		this.y += this.height + enemySpacingH;
	}

	move(speedFactor) {
		if (this.alive) {
			speedFactor = (speedFactor && speedFactor > 0) ? speedFactor : 1;
			this.updateSprit();
			this.x += (this.dir * speedFactor);
		}
	}

	draw() {
		noStroke();
		if (this.alive == true) {
			let currDesign = this.design[this.sprit];

			SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);

			//Show information
			/*
			SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, true);
			let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, false);
			SpritesDrawing.drawSpriteInfo((this.index + '\n' + this.pixelWidth), boundary);
			//SpritesDrawing.drawSpriteInfo((this.x + '\n' + (this.x + this.widthInPixel) ), boundary);
			//SpritesDrawing.drawSpriteInfo((this.y), boundary);
			*/
			
		} else {
			if(this.explosionTimer >= 0) {
				let currDesign = this.explodeDesign[0];
				SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);
				this.explosionTimer -= 1;
			}
		}

	}
}