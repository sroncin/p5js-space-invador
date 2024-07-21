class SpaceInvadorShield extends SpaceInvadorShip {

	constructor(index, fps, scl, x, y, design) {
		super(fps, scl, x, y, design, null);

		//this.pixelWidth = 3;
		this.index = index;

		//Sprit moves
		this.dir = 0;
		this.frameCount = 1;

		//Collision points
		this.colPoints = [];

		//console.log(index + ': x(' + this.x + ') y(' + this.y + ')')
	}

	damageShield(damage_x, damage_y, explodingSprit, bLaser) {
		//Keep track of the collision points for display and test
		this.colPoints.push({"x": damage_x, "y": damage_y})

		for (let i=0; i < this.pixelWidth; i++) {
			//Clear the collision pixel on the shield
			if ( (damage_y+i) < this.design[this.sprit].length)
				this.design[this.sprit][damage_y+i][damage_x] = 0;
		}
	
		//console.log('explodingSprit.height(' + explodingSprit.length + ') explodingSprit.width(' + explodingSprit[0].length + ')')
		let startFromMiddleH = explodingSprit.length;
		let startFromMiddleW = ceil(explodingSprit[0].length/2);
		for (let i = 0; i < startFromMiddleH; i++) {
			for (let j = 0; j < explodingSprit[i].length; j++) {
				let newSpriteY = 	(bLaser == true) ? (damage_y+i+1) : (damage_y-startFromMiddleH+i+1);
				let newSpriteX = (damage_x-startFromMiddleW+j);
				//console.log('i(' + i + ') j(' + j + ') explodeVal(' + explodingSprit[i][j] + ') newSpriteY(' + newSpriteY + ') newSpriteX(' + newSpriteX + ') this.height(' + this.height + ') this.width(' + this.width + ')')
				if (explodingSprit[i][j] == 1 && 
						newSpriteY > 0 && newSpriteX > 0 && 
						newSpriteY < this.height && newSpriteX < this.width) {
					//Mask the explosion on the shield
					this.design[this.sprit][newSpriteY][newSpriteX] = 0;
				}
			}
		}
	}

	detectShotCollision(shot) {
		let collide = null;
		if (shot.x >= this.x &&
			shot.x <= (this.x + this.widthInPixel) &&
			(shot.y) <= (this.y + this.heightInPixel) &&
			(shot.y) >= this.y
		) {

			let damage_x = (this.width - Math.ceil( ((this.x + this.widthInPixel) - shot.x) / this.pixelWidth));
			let damage_y = (this.height - Math.ceil( ((this.y + this.heightInPixel) - (shot.y)) / this.pixelWidth));
			
			// console.log('may collide> ***********');
			// console.log(' > shot.x(' + shot.x + ') shot.y(' + shot.y + ') shot.length(' + shot.length + ')');
			// console.log(' > damage_x(' + damage_x + ') damage_y_full(' + damage_y_full + ')');
			// console.log(' > this.width (' + this.width  + ') this.x(' + this.x + ')');
			// console.log(' > this.widthInPixel (' + this.widthInPixel  + ') this.pixelWidth(' + this.pixelWidth + ')');
			// console.log(' > this.height (' + this.height  + ') this.y(' + this.y + ')');
			// console.log(' > this.heightInPixel (' + this.heightInPixel  + ') this.pixelWidth(' + this.pixelWidth + ')');

			if (damage_x < 0) damage_x = 0;
			if (damage_y < 0) damage_y = 0;
			if (damage_x >= this.width) damage_x = this.width-1;
			if (damage_y >= this.height) damage_y = this.height-1;
			for (let i=0; i < this.pixelWidth; i++) {
				if ( (damage_y+i) < this.design[this.sprit].length)
					if (this.design[this.sprit][damage_y+i][damage_x] == 1) {
						return {"damage_x": damage_x, "damage_y": damage_y};
					}
			}
			
		}
		return collide;
	}

	detectLaserCollision(laser) {
		let collide = null;

		let leftEdgeOfLaser = laser.x;
		let rightEdgeOfLaser = laser.x + laser.widthInPixel;
		let frontOfLaser = laser.y + laser.heightInPixel;
		let backOfLaser = laser.y;

		if (rightEdgeOfLaser >= this.x &&
			leftEdgeOfLaser <= (this.x + this.widthInPixel) &&
			frontOfLaser > this.y &&
			backOfLaser < (this.y + this.heightInPixel) &&
			!laser.used) {

			let damage_x = (this.width - Math.ceil( ((this.x + this.widthInPixel) - laser.x) / this.pixelWidth));
			let damage_y = (this.height - Math.ceil( ((this.y + this.heightInPixel) - (laser.y)) / this.pixelWidth));
			
			// console.log('may collide> ***********');
			// console.log(' > laser.x(' + laser.x + ') laser.y(' + laser.y + ') ');
			// console.log(' > damage_x(' + damage_x + ') damage_y(' + damage_y + ')');
			// console.log(' > this.width (' + this.width  + ') this.x(' + this.x + ')');
			// console.log(' > this.widthInPixel (' + this.widthInPixel  + ') this.pixelWidth(' + this.pixelWidth + ')');
			// console.log(' > this.height (' + this.height  + ') this.y(' + this.y + ')');
			// console.log(' > this.heightInPixel (' + this.heightInPixel  + ') this.pixelWidth(' + this.pixelWidth + ')');
		
			if (damage_x < 0) damage_x = 0;
			if (damage_y < 0) damage_y = 0;
			if (damage_x >= this.width) damage_x = this.width-1;
			if (damage_y >= this.height) damage_y = this.height-1;
			for (let i=0; i < this.pixelWidth; i++) {
				if ( (damage_y+i) < this.design[this.sprit].length)
					if (this.design[this.sprit][damage_y+i][damage_x] == 1) {
						return {"damage_x": damage_x, "damage_y": damage_y};
					}
			}
			
		}
		return collide;
	}

	draw() {

		noStroke();
		let currDesign = this.design[this.sprit];
		SpritesDrawing.drawSprite(this.x, this.y, currDesign, this.pixelWidth, this.pixelHeightRatio);

		//Show information
		/*
		let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio, true);
		SpritesDrawing.drawSpriteInfo((this.index + '\n' + this.pixelWidth), boundary);
		*/
		
		//Draw Shield corner 
		/*
		stroke(255, 0, 0);
		ellipse(this.x, this.y, 4);
		textAlign(LEFT);
		textSize(10);
		text( "(" + this.x + "," + this.y + ") or (0,0)", this.x, this.y - 20);
		*/

		//Draw Information on collision points to Shield
		/*
		for (let colPoint of this.colPoints) {
			stroke(255, 0, 0);
			//console.log('colPoint.x: ' + colPoint.x + ', colPoint.y: ' + colPoint.y)
			ellipseMode(CENTER);
			let colPointxPixel = this.x + colPoint.x*this.pixelWidth;
			let colPointyPixel = this.y + (colPoint.y*this.pixelWidth);
			ellipse(colPointxPixel, colPointyPixel, 4);
			textAlign(RIGHT);
			textSize(10);
			text( "(" + colPoint.x + "," + colPoint.y + ")", colPointxPixel, colPointyPixel - 20);
		}*/

	}
}