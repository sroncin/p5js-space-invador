class Player extends SpaceInvadorShip {

	//Constant to save all enemies designs
	static get DESIGNS() {
		return {
			//0 == Player
			"points" : 0,
			"nbLives": 3,
			"0": [
				[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
			],
			"1": [
				[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
			]
		};
	}

	static get EXPLODE_DESIGNS() {
		return {
			"0": [
				[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1]
			],
			"1": [
				[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
				[0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
				[0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
				[0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0]
			]
		}
	}	

	constructor(fps, scl, x, startRow, speedFactor) {
		super(fps, scl, x, (startRow*scl) /* =y */, Player.DESIGNS, Player.EXPLODE_DESIGNS);

		//Positioning
		this.startRow = startRow;
		this.speedFactor = (speedFactor > 0) ? speedFactor : 2;
		this.dir = 0;
		this.screenWidth = width;
		this.startPosX = x;

		//Ground line
		this.groundY = ((startRow+1)*scl) + this.heightInPixel/2 + this.pixelWidth;

		//Scores
		this.score = 0;

		//Player bullets info
		this.shots = []; // stores all player bullets
		this.shotInterval = 20;
		this.lastShotFiredTimestamp = -this.shotInterval; //Cooling the laser
		this.color = green;

		//Lives
		this.lives = Player.DESIGNS.nbLives; 
		this.explosionTimer = 40;

		//Shields
		//console.log('player row = ' + (this.startRow));
		//console.log('shield row = ' + (this.startRow-playerShieldRow));
		this.shields = new SpaceInvadorShields(this.fps,this.scl,this.startRow-playerShieldRow);
	}

	// restore Player Shields when all enemies have been killed
	restoreShield() {
		this.shields = new SpaceInvadorShields(this.fps,this.scl,this.startRow-playerShieldRow);
	}

	//Direction of the ship : left or right or stationnary
	setDir(dir) {
		this.dir = dir;
	}

	//Move the ship on screen
	move(minPosX, maxPosX) {
		minPosX = (minPosX >= 0) ? minPosX : 0;
		maxPosX = (maxPosX <= this.screenWidth) ? maxPosX : this.screenWidth;

		//Calculate X position
		let newX = this.x + (this.dir * this.pixelWidth * this.speedFactor);
		let newXWithShipWidth = newX + (this.width * this.pixelWidth);

		//Check game boundaries
		if (newX >= minPosX && (newXWithShipWidth) <= (maxPosX + 1))
			this.x += this.dir * (this.pixelWidth * this.speedFactor);
		else if (newX <= minPosX) this.x = minPosX;
		else if ((newXWithShipWidth) >= (maxPosX + 1)) this.x = (maxPosX + 1) - (this.width * this.pixelWidth);
	}

	draw() {
		//Draw the design (pixel array) or the current sprit
		noStroke();

		let currDesign = this.design[this.sprit];
		SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);

		//Show information
		/*
		SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, true);
		let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, false);
		SpritesDrawing.drawSpriteInfo((this.index + '\n' + this.pixelWidth), boundary);
		//SpritesDrawing.drawSpriteInfo((this.y), boundary);
		*/

		//Display lives
		this.displayLives();
	}

	displayLives() {
		let liveYPos = this.groundY + this.pixelWidth*2;

		noStroke();
		fill(255);
		textAlign(LEFT);
		textSize(18);
		text( (this.lives), this.startPosX + 10, liveYPos);

		for (var i=1; i <= this.lives; i++) {
			let x = this.startPosX + ((this.design[this.sprit][0].length * this.pixelWidth) * (i));
			this.displayLivesSprit(x, liveYPos);
		}
	}

	displayLivesSprit(x, y) {
		noStroke();
		let currDesign = this.design[this.sprit];
		SpritesDrawing.drawSprite(x, y, currDesign, this.pixelWidth, this.pixelHeightRatio);
	}

	shoot(saucer) {
		//  only fires a shot if last shot was fired more than 10 frames ago
		//console.log('frameCount(' + frameCount + ') lastShotFiredTimestamp(' + this.lastShotFiredTimestamp + ') shotInterval(' + this.shotInterval + ')');
		if (frameCount - this.lastShotFiredTimestamp > this.shotInterval) {
			//console.log('SHOOOT');
			//console.log('x=' + this.x + ' y=' + this.y + ' height=' + this.height);
			this.shots.push(
				new PlayerShot(
					this.pixelWidth, (this.x + this.widthInPixel/2 +1), this.y)
			);

			// records time at which this shot was fired
			this.lastShotFiredTimestamp = frameCount; 

			//Update Saucer Mystery point pointer
			saucer.updatePointPointer();

			if (PLAY_SOUNDS === true) {
				if (SPACE_SOUNDS.shoot.isPlaying()) SPACE_SOUNDS.shoot.stop();
				SPACE_SOUNDS.shoot.play();
			}
		}
	}

	newLife(pauseTime, enemies) {
		var indexExplodeDesign = 0;
		if (frameCount - pauseTime >= (this.explosionTimer/2)) indexExplodeDesign = 1;
		var explodeDesign = this.explodeDesign[indexExplodeDesign];

		//makes the player explode for explosionTimer frames
		if (frameCount - pauseTime <= this.explosionTimer) {
			for (let i = 0; i < explodeDesign.length; i++) {
				for (let j = 0; j < explodeDesign[i].length; j++) {
					if (explodeDesign[i][j] == 1) {
						let posx = this.x + (j * this.pixelWidth);
						let posy = this.y + (i * this.pixelWidth * this.pixelHeightRatio );
						if (posy > GREEN_LIMIT) fill(0,255,0);
						else if (posy < RED_LIMIT) fill(255,0,0);
						else fill(255);
						rect(posx, posy, this.pixelWidth, this.pixelWidth * this.pixelHeightRatio );
					}
				}
			}
			return true; //pause is still on
		} 
		
		if (this.lives <= 0) {
			//draw nothing
			return true; //pause is still on
		} else {
			// after explosionTimer frames, resets player with new life
			if (frameCount - pauseTime > this.explosionTimer) {
				this.x = enemies.minPosXEnemies;
				this.lives -= 1;
				// clears all current shots too
				this.shots = [];

				// clears all current lasers
				// or else player could get hit with laser as soon as they respawn with their new life in the center, which is unfair
				enemies.clearAllLasers();

				return false; //pause is off
			}
		}
		
	}

	clearAllShots() {
		this.shots = [];
	}

	cleanShots() {
		//some shots are kept in the array, but we can remove them if they are not used any more
		//which free up some memory
		for(let i=this.shots.length-1; i >= 0; i--) {
			let shot = this.shots[i];
			if ( (shot.hitEnemy == true || shot.hitLaser == true || shot.hitShield == true || shot.hitTopScreen == true) && shot.explosionTimer <= 0) {
				this.shots.splice(i, 1);
			}
		}
	}

	moveAllShots() {
		for (let shot of this.shots) {
			shot.move();
		}
	}

	drawAllShots() {
		for (let shot of this.shots) {
			shot.draw();
		}
	}

	//Check if one player shots has it an enemy or not
	hitEnemies(enemiesArr) {
		for (let shot of this.shots) {
			for (let rowIndex = enemiesArr.nbLines-1; rowIndex >= 0; rowIndex--) {
				var currentEnemiesRow = enemiesArr.enemies[rowIndex];
				for (let anEnemy of currentEnemiesRow) {
					//console.log('shot.x: ' + shot.x + ' shot.y:' + shot.y);
					//console.log('anEnemy.x: ' + anEnemy.x + ' anEnemy.y:' + anEnemy.y + ' anEnemy.widthInPixel: ' + anEnemy.widthInPixel + ' anEnemy.heightInPixel: ' + anEnemy.heightInPixel);

					if (shot.x >= (anEnemy.x) &&
						shot.x <= (anEnemy.x + anEnemy.widthInPixel) &&
						(shot.y - shot.length) <= (anEnemy.y + anEnemy.heightInPixel) &&
						(shot.y - shot.length) >= anEnemy.y &&
						!shot.hitEnemy && !shot.hitLaser && !shot.hitShield && anEnemy.alive
					) {
						anEnemy.nbLives--;
						if (anEnemy.nbLives <= 0) {
							enemiesArr.nbEnemiesLeft--;
							anEnemy.alive = false;
							this.score += anEnemy.points; // increases score when an anEnemy is shot
							if (PLAY_SOUNDS === true) {
								if (SPACE_SOUNDS.invaderKilled.isPlaying()) SPACE_SOUNDS.invaderKilled.stop();
								SPACE_SOUNDS.invaderKilled.play();
							}
							//console.log('anEnemy Shooted : score = ' + this.score);
						} else {
							//console.log('anEnemy Shooted : not not killed');
						}
						shot.hitEnemy = true;
					}
				}
			}
		}
	}

	//Check if one player shots has it an enemy LASER or not
	hitEnemiesLasers(enemiesArr) {
		for (let shot of this.shots) {
			for (let laser of enemiesArr.lasers) {
				if (laser.used == false) {
					if (shot.x >= laser.x && shot.x <= (laser.x + laser.widthInPixel)) {
						if (shot.y >= laser.y && shot.y <= (laser.y + laser.heightInPixel)) {
							//Laser Colision
							shot.laserInCollision = laser;
							shot.hitLaser = true;
						}
					}
				}
			}
		}
	}

	//Check if one player shots has it a shield
	hitShields() {
		for (let shot of this.shots) {
			for (let shield of this.shields.shields) {
				if (!shot.hitEnemy && !shot.hitLaser && !shot.hitShield) {
						let collisionPoint = shield.detectShotCollision(shot);
						if (collisionPoint != null) {
							/*console.log('shot collide with shield (S' + shield.index + ') \n\
								shield.x(' + shield.x + ') shield.widthInPixel(' + shield.widthInPixel + ') \n\
								shield.y(' + shield.y + ') shield.heightInPixel(' + shield.heightInPixel + ') \n\
								shot.x(' + shot.x + ') shot.y(' + shot.y + ' shot.length(' + shot.length + ')) \n\
								damage_x(' + collisionPoint.damage_x + ') damage_y(' + collisionPoint.damage_y + ')');*/

							shield.damageShield(collisionPoint.damage_x, collisionPoint.damage_y, PlayerShot.EXPLODE_DESIGNS[0]);
							shot.shieldInCollision = shield;
							shot.hitShield = true;
							//console.log('shot collide with shield (' + shield.index + ')');
						}
					}
			}
		}
	}

	//Check if one player shots has it the saucer
	hitSaucer(saucer) {
		for (let shot of this.shots) {
			//console.log('shot.x: ' + shot.x + ' shot.y:' + shot.y);
			//console.log('saucer.x: ' + saucer.x + ' saucer.y:' + saucer.y + ' saucer.widthInPixel: ' + saucer.widthInPixel + ' saucer.heightInPixel: ' + saucer.heightInPixel);

			if (shot.x >= (saucer.x) &&
				shot.x <= (saucer.x + saucer.widthInPixel) &&
				(shot.y - shot.length) <= (saucer.y + saucer.heightInPixel) &&
				(shot.y - shot.length) >= saucer.y &&
				!shot.hitEnemy && !shot.hitLaser && !shot.hitShield && saucer.alive
			) {
				saucer.nbLives--;
				if (saucer.nbLives <= 0) {
					saucer.alive = false;
					this.score += saucer.getSaucerPoints(); // increases score when an saucer is shot
					if (PLAY_SOUNDS === true) {
						if (SPACE_SOUNDS.invaderKilled.isPlaying()) SPACE_SOUNDS.invaderKilled.stop();
						SPACE_SOUNDS.invaderKilled.play();
					}
				//console.log('saucer Shooted : score = ' + this.score);
				} else {
					//console.log('saucer Shooted : not not killed');
				}
				shot.hitEnemy = true;
			}
		}
	}

	//Check if one player shots has it a saucer LASER
	hitSaucerLasers(saucer) {
		for (let shot of this.shots) {
			for (let laser of saucer.lasers) {

				if (laser.used == false) {
					if (shot.x >= laser.x && shot.x <= (laser.x + laser.widthInPixel)) {
						if (shot.y >= laser.y && shot.y <= (laser.y + laser.heightInPixel)) {
							//Laser Colision
							shot.laserInCollision = laser;
							shot.hitLaser = true;
						}
					}
				}
			}
		}
	}	
}