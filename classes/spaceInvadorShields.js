class SpaceInvadorShields {
		//Constant to save all enemies designs
		static get DESIGNS() {
			return [{
				"0": [
					[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
					[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
					[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
					[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
				]
			}];
		}

		constructor(fps, scl, startFromRow) {

			//Positionning
			this.fps = fps;
			this.scl = scl;
			this.screenWidth = width;
			this.startFromRow = startFromRow;
			this.spritSpacingW = 80;
			this.spritSpacingH = scl;

			//Shields informations
			this.shields = [];
			this.shieldsPerRow = 4; //4 shields
			this.shieldWidth = SpaceInvadorShields.DESIGNS[0][0][0].length; //22 pixels
			this.shieldHeight = SpaceInvadorShields.DESIGNS[0][0].length; //16 lines
			this.pixelWidth = 2; //ceil(this.scl/ (this.shieldWidth+1) );
			
			this._calculateStartPositions();
			this.initializationShields();
		}

		_calculateStartPositions() {
			let shieldArrWidth = (this.shieldsPerRow * this.shieldWidth * this.pixelWidth);
			this.shieldSpacing = (this.screenWidth - shieldArrWidth) / (this.shieldsPerRow + 1);
			this.startPosX = this.shieldSpacing;
			this.minPosXShields = this.startPosX;
			this.maxPosXShields = this.startPosX + 
				( (this.shieldWidth * this.pixelWidth) *this.shieldsPerRow) +
				( this.shieldSpacing * (this.shieldsPerRow -1));
		}

		initializationShields() {
			let start_posy = (this.startFromRow * this.scl) + (this.shieldHeight + this.spritSpacingH);
			this.shields = new Array(this.shieldsPerRow);

			for (let i = this.shieldsPerRow - 1; i >= 0; i--) {
				let start_posx = this.startPosX + (i * (this.shieldWidth* this.pixelWidth + this.shieldSpacing));

				this.shields[i] = new SpaceInvadorShield('S'+i,this.fps, this.scl, start_posx, start_posy, SpaceInvadorShields.DESIGNS[0]);
			}
		}

		drawAllShields() {
			for (let shield of this.shields) {
				shield.draw();
			}

			/*
			//Display shield boudaries
			strokeWeight(1);
			let lineYMin = 0;
			let lineYMax = height;
			stroke(100, 100, 0);
			line(this.minPosXShields, lineYMin, this.minPosXShields, lineYMax);
			line(this.maxPosXShields, lineYMin, this.maxPosXShields, lineYMax);
			*/

		}
}