class SpaceInvadorEnemies {

	//Constant to save all enemies designs
	static get DESIGNS() {
		return [{
			//0 == Squid
			"points": 30,
			"nbLives": 1,
			"0": [
				[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
				[0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
				[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
				[0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
				[0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0]
			],
			"1": [
				[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
				[0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
				[0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
				[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]
			]
		}, {
			//1 == Crab
			"points": 20,
			"nbLives": 1,
			"0": [
				[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
				[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
				[0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
				[0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
				[0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
			],
			"1": [
				[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
				[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
				[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]
			]
		}, {
			//2 == Octopus
			"points": 10,
			"nbLives": 1,
			"0": [
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
				[0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
				[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
			],
			"1": [
				[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
				[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
				[0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
				[0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]
			]
		}];
	}

	static get EXPLODE_DESIGNS() {
		return {
			"0": [
				[0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
				[0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
				[0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0],
				[0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0],
				[0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0],
			]
		}
	}

	constructor(fps, scl, nbPerRow, startFromRow) {
		//Number of enemies lines
		this.nbLines = 5;

		//Positionning
		this.fps = fps;
		this.scl = scl;
		this.pixelWidth = 2;
		this.screenWidth = width;
		this.startFromRow = startFromRow;
		this.spritSpacingW = scl+6;
		this.spritSpacingH = scl;

		//Enemies informations
		this.enemiesPerRow = nbPerRow;
		this.enemiesWidth = SpaceInvadorEnemies.DESIGNS[0][0][0].length; //12
		this.enemiesHeight = SpaceInvadorEnemies.DESIGNS[0][0].length; //8
		this.enemies = [];
		this.allEnemiesShot = false;
		this.nbEnemiesLeft = this.nbLines * this.enemiesPerRow;

		this._calculateStartPositions(startFromRow);
		this.initializationEnemies();

		//Lasers Settings
		this.chanceOfFiringLaser = 45; // % of change an alien a random alien shoots a laser every time the aliens moved. Increases slowly to increase difficulty
		this.laserSpeed = 4;  // speed at which alien laser shots move
		this.lasers = [];
		this.groundHitLine = [];

		//Sounds
		this.tone = 0;
	}

	initializationEnemies() {
		
		this.enemies = new Array(this.nbLines);

		for (let rowIndex = 0; rowIndex < this.nbLines; rowIndex++) {
			let start_posy = (this.startFromRow * this.scl) + (rowIndex * (this.enemiesHeight + this.spritSpacingH));
			this.enemies[rowIndex] = new Array(this.enemiesPerRow);

			for (let i = this.enemiesPerRow - 1; i >= 0; i--) {
				let start_posx = this.startPosX + (i * (this.enemiesWidth + this.spritSpacingW));
				let enemySprit;
				switch (rowIndex) {
					case 0:
						enemySprit = 0;
						break; //Squid on first line
					case 1: case 2:
						enemySprit = 1;
						break; //Crab on line2 and 3
					case 3: case 4:
						enemySprit = 2;
						break; //Octopus on line 4 and 5
					default:
						enemySprit = 2;
						break;
				}
				this.enemies[rowIndex][i] = new SpaceInvadorEnemy(rowIndex + ' ' + i,this.fps, this.scl, start_posx, start_posy, SpaceInvadorEnemies.DESIGNS[enemySprit], SpaceInvadorEnemies.EXPLODE_DESIGNS);
			}
		}
		this.lasers = [];
		this.pixelWidth = this.enemies[0][0].pixelWidth;
	}

	_calculateStartPositions(startFromRow) {
		let nbEnemies = (this.enemiesPerRow <= 11) ? 11 : this.enemiesPerRow;
		let enemieArrWidth = (nbEnemies * (this.enemiesWidth + this.spritSpacingW));
		this.startPosX = (this.screenWidth - enemieArrWidth + (this.scl / 2) - this.enemiesWidth / 2) / 2;
		this.minPosXEnemies = this.startPosX - scl - 1;
		this.maxPosXEnemies = this.startPosX + enemieArrWidth + this.scl - this.enemiesWidth / 2;
	}

	moveAll(speedFactor) {
		//speedFactor = number of pixel to move the enemy
		for (let rowIndex = 0; rowIndex < this.nbLines; rowIndex++) {
			var currentEnemyRow = this.enemies[rowIndex];
			for (let anEnemy of currentEnemyRow) {
				if (anEnemy.alive === true)
					anEnemy.move(speedFactor);
			}
		}

		//Check if we need to change directions
		var changeDir = false;
		for (let rowIndex = 0; rowIndex < this.nbLines; rowIndex++) {
			var currentEnemyRow = this.enemies[rowIndex];
			for (let anEnemy of currentEnemyRow) {
				changeDir = anEnemy.isTouchingBoundaries(this.minPosXEnemies, this.maxPosXEnemies);
				if (changeDir == true) break;
			}
			if (changeDir == true) break;
		}
		//console.log('changeDir: ' + changeDir);
		if (changeDir == true) {
			for (let rowIndex = 0; rowIndex < this.nbLines; rowIndex++) {
				var currentEnemyRow = this.enemies[rowIndex];
				for (let anEnemy of currentEnemyRow) {
					anEnemy.shiftDown(this.spritSpacingH);
				}
			}
		}
	}

	hitPlayerOrGround(currentPlayer) {
		for (let rowIndex = (this.nbLines-1); rowIndex >= 0; rowIndex--) {
			var currentEnemyRow = this.enemies[rowIndex];
			for (let anEnemy of currentEnemyRow) {
				if (anEnemy.alive === true) {
					let enemyY = anEnemy.y + anEnemy.heightInPixel;
					if (enemyY >= currentPlayer.groundY) {
						return true;
					}
					if (enemyY >= currentPlayer.y && 
						(anEnemy.x >= currentPlayer.x || 
						anEnemy.x <= (currentPlayer.x + currentPlayer.widthInPixel)) ) {
							return true;
						}
				}
			}
		}
	}

	drawAll() {
		//Draw each enemy
		noStroke();
		fill(255);
		this.allEnemiesShot = true;
		for (let rowIndex = (this.nbLines -1); rowIndex >= 0; rowIndex--) {
			var currentEnemyRow = this.enemies[rowIndex];

			//Enemy separation line
			/*
			stroke(255);
			line(enemies.minPosXEnemies, currentEnemyRow[0].y, enemies.maxPosXEnemies, currentEnemyRow[0].y);
			*/

			for (let anEnemy of currentEnemyRow) {
				if (anEnemy.alive === true) {
					this.allEnemiesShot = false;
				}
				anEnemy.draw();
			}
		}

		//Display boudaries
		/*
		strokeWeight(1);
		let lineYMin = 0;
		let lineYMax = height;
		stroke(255, 0, 0);
		line(this.minPosXEnemies, lineYMin, this.minPosXEnemies, lineYMax);
		line(this.maxPosXEnemies, lineYMin, this.maxPosXEnemies, lineYMax);

		//Display Start Position
		stroke(0, 255, 0);
		//line(this.startPosX, lineYMin, this.startPosX, lineYMax);
		

		//Display nbEnemyLeft
		noStroke();
		fill(255);
		textAlign(RIGHT);
		textSize(18);
		text( (this.nbEnemiesLeft), this.maxPosXEnemies, height - 26);
		*/

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
		if (random(100) < this.chanceOfFiringLaser) {
			let rowIndex = floor(random(this.nbLines));
			let colIndex = floor(random(this.enemies[rowIndex].length));
			let selectedEnemy = this.enemies[rowIndex][colIndex];

			if (selectedEnemy.alive === true) {
				let enemyLaser = new Laser(selectedEnemy.pixelWidth, (selectedEnemy.x) + (selectedEnemy.widthInPixel/2), selectedEnemy.y + (selectedEnemy.heightInPixel / 2), this.laserSpeed);
				this.lasers.push(enemyLaser);
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
						laser.hitShield = true;
						laser.explosionTimer = 0;
					}
				}
			}
		}
	}
}