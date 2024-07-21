class Saucer extends SpaceInvadorShip {

	//Constant to save all Saucer designs
	static get DESIGNS() {
		return {
			//0 == Saucer
			//saucer score advances every time the player-shot is removed.
			//Thus the one and only 300 comes up every 15 shots (after an initial 8)
			"points" : [100,50,50,100,150,100,100,50,300,100,100,50,150,10,50],
			"nbLives": 1,
			"0": [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
			],
			"1": [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
			]
		};
	}

	static get EXPLODE_DESIGNS() {
		return {
			"0": [
				[0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
				[0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
			],
			"1": [
				[0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
				[0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
			]
		}
	}

	constructor(fps, scl, saucerRow, enemies) {
		super(fps, scl*2, 999, (saucerRow*scl), Saucer.DESIGNS, Saucer.EXPLODE_DESIGNS);
		//console.log('Saucer Points Table: ' + JSON.stringify(this.points))
		/*console.log(
			'Red Saucer Info: \n\
				x,y: ' + this.x + ',' + this.y + '\n\
				width,height: ' + this.width + ',' + this.height + '\n\
				pixelWidth: ' + this.pixelWidth + '\n\
				widthInPixel,heightInPixel: ' + this.widthInPixel + ',' + this.heightInPixel
		);*/

		this.initShowTimer();

		this.enemies = enemies;
		this.isOutOfScreen = true;
		this.alive = false;

		//Scoring
		this.pointPointer = 0;

		//Lasers Settings
		this.chanceOfFiringLaser = 15; // % of change an alien a random alien shoots a laser every time the aliens moved. Increases slowly to increase difficulty
		this.laserSpeed = 4;  // speed at which saucer laser shots move
		this.lasers = [];
		this.groundHitLine = [];

		//Explosion
		this.explosionTimer = 12;
	}

	decreaseTimer() {
		if (this.enemies.nbEnemiesLeft >= 8 && (this.alive == false || this.isOutOfScreen == true) 
			&& this.lasers.length <= 0)
			this.showCounter--;
	}

	initShowTimer() {
		this.showCounter = 600; //600 frames
	}

	initialize() {
		//console.log('Saucer Initialize > nbEnemies(' + this.enemies.nbEnemiesLeft + ') isAlive(' + this.alive + ') isOutOfScreen(' + this.isOutOfScreen + ') lasersNb(' + this.lasers.length + ')');
		if (this.enemies.nbEnemiesLeft >= 8 && (this.alive == false || this.isOutOfScreen == true) 
			&& this.lasers.length <= 0 && this.showCounter <= 0) {

			this.initShowTimer();

			let tmpDir = random(-1, 1);

			//we dont add a saucer if the number of enemies on screen is less than 8
			if (tmpDir < 0) {
				this.dir = 2;
				this.x = this.enemies.minPosXEnemies-this.widthInPixel-this.scl;
			}
			else {
				this.dir = -2;
				this.x = this.enemies.maxPosXEnemies;
			}
			/*
			//Test Collisions
			this.dir = 0;
			this.x = 0;*/

			this.alive = true;
			if (this.nbLives <= 0) this.nbLives = Saucer.DESIGNS.nbLives;
			this.isOutOfScreen = false;
			this.lasers = [];

			//Explosion
			this.explosionTimer = 12;

			if (PLAY_SOUNDS === true) {
				SPACE_SOUNDS.saucer_high.play();
			}

			//console.log('Saucer Initialized: this.x(' + this.x + ') this.dir(' + this.dir + ') nbLives(' + this.nbLives + ')');
		}
	}

	updatePointPointer() {
		if (this.alive === true)
			this.pointPointer++;
		//console.log('Saucer Point Pointer = ' + (this.pointPointer % this.points.length) );
	}

	getSaucerPoints() {
		//console.log('Saucer Point Pointer = ' + (this.pointPointer % this.points.length) );
		//console.log('Saucer Points = ' + this.points[(this.pointPointer % this.points.length)] );
		return this.points[(this.pointPointer % this.points.length)];
	}

	move() {
		if (this.alive == true && this.isOutOfScreen == false) {
			if (PLAY_SOUNDS === true) {
				if (!SPACE_SOUNDS.saucer_low.isPlaying()) {
					SPACE_SOUNDS.saucer_low.play();
				}
			}
			this.updateSprit();
			this.x += (this.dir*this.pixelWidth);
			//console.log('red Saucer X: ' + this.x);
			if (this.x > this.enemies.maxPosXEnemies) {
				this.isOutOfScreen = true;
				//console.log('Saucer isOutOfScreen > this.x(' + this.x  + ') this.enemies.maxPosXEnemies(' + this.enemies.maxPosXEnemies + ')')
			}
			else if ( (this.x+this.widthInPixel+this.scl*2) < this.enemies.minPosXEnemies) {
				this.isOutOfScreen = true;
				//console.log('Saucer isOutOfScreen > this.x(' + this.x  + ') this.widthInPixel(' + this.widthInPixel + ') this.scl(' + this.scl + ') :: (' + (this.x+this.widthInPixel+this.scl*2) + ') :: this.enemies.minPosXEnemies(' + this.enemies.minPosXEnemies + ')')
			}
		} else {
			if (PLAY_SOUNDS === true) {
				if (SPACE_SOUNDS.saucer_low.isPlaying()) {
					SPACE_SOUNDS.saucer_low.stop();
				}
			}
		}
	}

	draw() {
		noStroke();
		fill(255,0,0);
		if (this.alive == true && this.isOutOfScreen == false) {
			let currDesign = this.design[this.sprit];

			for (let i = 0; i < currDesign.length; i++) {
				for (let j = 0; j < currDesign[i].length; j++) {
					if (currDesign[i][j] == 1) {
						let posx = this.x + (j * this.pixelWidth);
						let posy = this.y + (i * this.pixelWidth*this.pixelHeightRatio);
						
						if (posy > GREEN_LIMIT) fill(0,255,0);
						else if (posy < RED_LIMIT) fill(255,0,0);
						else fill(255);

						//cannot use drawSprite because of the condition which make the saucer quiting the screen smoothly
						if (posx >= this.enemies.minPosXEnemies && posx <= this.enemies.maxPosXEnemies)
							rect(posx, posy, this.pixelWidth, this.pixelWidth*this.pixelHeightRatio);
					}
				}
			}
			
			//Show information
			/*
			SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, true);
			let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, true);
			SpritesDrawing.drawSpriteInfo((this.pixelWidth), boundary);
			*/
		} else {
			if (this.explosionTimer >= 0 && this.isOutOfScreen == false) {
				let currDesign = this.explodeDesign[0];
				if (this.explosionTimer > 6) {
					SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);
				} else {
					//Display the Score that the saucer gave
					noStroke();
					fill(255, 0, 0);
					textFont(spaceInvaderFont1);
					textSize(14);
					textAlign(CENTER, CENTER);
					text(this.getSaucerPoints(), (this.x+this.widthInPixel/2), (this.y+this.heightInPixel/2));
				}
				this.explosionTimer -= 1;
			}
		}
	}


	//Lasers management
	clearAllLasers() {
		this.lasers = [];
	}
	cleanLasers() {
		for(let i=this.lasers.length-1; i >= 0; i--) {
			let laser = this.lasers[i];
			if ( (laser.hitPlayerShot == true || laser.hitShield == true || laser.hitBottomScreen == true || laser.used == true) && laser.explosionTimer <= 0) {
				this.lasers.splice(i, 1);
			}
		}
	}
	fireLaser() {
		// only fires laser if random number from 0 to 100 is less than the current 'chance of firing laser) global varialbe
		if (this.alive === true && this.isOutOfScreen == false) {
			let randLaser = random(100);
			if (randLaser < this.chanceOfFiringLaser) {
				//the saucer laser is alway the Squigly = 0 one
				let saucerLaser = new Laser(this.pixelWidth, (this.x + (this.widthInPixel/2)), this.y + (this.heightInPixel / 2), this.laserSpeed, 0);
				this.lasers.push(saucerLaser);
			}
		}
	}
	moveLasers(currentPlayer) {
		for (let i=this.lasers.length-1; i >= 0; i--) {
			let laser = this.lasers[i];
			laser.move();
			if ((laser.y + laser.heightInPixel) > currentPlayer.groundY) {
				//laser is out of the screen remove laser for list
				laser.used = true;
				laser.hitBottomScreen = true;
				laser.die(true);
				if (laser.explosionTimer <= 0)
					this.groundHitLine.push(laser.x-(2*this.pixelWidth))
					this.groundHitLine.push(laser.x)
					this.groundHitLine.push(laser.x+(2*this.pixelWidth))
			}
		}
	}
	drawLasers() {
		for (let laser of this.lasers) {
			laser.draw();
		}
	}
	drawLaserHitGroundLine(backgroundColor, y) {
		noStroke();
		fill(backgroundColor);
		rectMode(CENTER);
		for (let i=0; i < this.groundHitLine.length; i++) {
			rect(this.groundHitLine[i], y, this.pixelWidth, this.pixelWidth);
		}
		rectMode(CORNER);
	}

	//return true if player has been hit
	lasersHitPlayer(currentPlayer) {
		for (let i=0; i < this.lasers.length; i++) {
			let laser = this.lasers[i];
			let leftEdgeOfLaser = laser.x;
			let rightEdgeOfLaser = laser.x + laser.widthInPixel;
			let frontOfLaser = laser.y + laser.heightInPixel;
			let backOfLaser = laser.y;
			let leftEdgeOfShip = currentPlayer.x;
			let rightEdgeOfShip = currentPlayer.x + currentPlayer.widthInPixel;
			let frontOfShip = currentPlayer.y;
			let backOfShip = currentPlayer.y + currentPlayer.heightInPixel;
	
			// if the player has been shot...
			if (rightEdgeOfLaser > leftEdgeOfShip &&
				leftEdgeOfLaser < rightEdgeOfShip &&
				frontOfLaser > frontOfShip &&
				backOfLaser < backOfShip &&
				!laser.used) {
				
				//console.log('player hit!!!');
				laser.used = true; // that laser is now used and can't hit player again, or be drawn
				laser.explosionTimer = 0;
				return true;
			}
		}
		return false;
	}
	lasersHitShields(currentPlayer) {
		for (let i=0; i < this.lasers.length; i++) {
			let laser = this.lasers[i];
			for (let shield of currentPlayer.shields.shields) {
				if (!laser.hitPlayerShot && !laser.used && !laser.hitShield) {
					let collisionPoint = shield.detectLaserCollision(laser);
					if (collisionPoint != null) {
						/*console.log('laser collide with shield (S' + shield.index + ') \n\
						shield.x(' + shield.x + ') shield.widthInPixel(' + shield.widthInPixel + ') \n\
						shield.y(' + shield.y + ') shield.heightInPixel(' + shield.heightInPixel + ') \n\
						laser.x(' + laser.x + ') laser.y(' + laser.y + ') \n\
						damage_x(' + collisionPoint.damage_x + ') damage_y(' + collisionPoint.damage_y + ')');*/
						shield.damageShield(collisionPoint.damage_x, collisionPoint.damage_y, Laser.EXPLODE_DESIGNS[0], true);
						laser.used = true;
						laser.explosionTimer = 0;
						this.hitShield = true;
					}
				}
			}
		}
	}
}