class SpaceInvadorShip {

	constructor(fps, scl, x, y, design, explodeDesign) {
		//Positionning
		this.fps = fps;
		this.scl = scl;
		this.x = x;
		this.y = y;
		this.pixelHeightRatio = 1.2;

		//Sprit Choice
		this.sprit = 0;

		//Sprit design
		this.design = design;
		this.height = this.design[this.sprit].length;
		this.width = this.design[this.sprit][0].length;
		this.pixelWidth = 2;
		this.widthInPixel = this.width * this.pixelWidth;
		this.heightInPixel = this.height * this.pixelWidth * this.pixelHeightRatio;

		//Sprit moves
		this.dir = 0;

		//Live and points
		this.alive = true;
		this.points = this.design.points || 1;
		this.nbLives = this.design.nbLives || 1;

		//Explosions
		this.explosionTimer = 60;
		this.explodeDesign = explodeDesign;
	}

	updateSprit() {
		if (this.sprit == 0) this.sprit = 1;
		else this.sprit = 0;
	}

	move() {}

	draw() {
		//Show information
		SpritesDrawing.drawSpriteMiddlePoint(this.x, this.y, this.widthInPixel, this.heightInPixel, false);
		let boundary = SpritesDrawing.drawBoundaryBox(this.x, this.y, this.width, this.height, this.pixelWidth, this.pixelHeightRatio);
		SpritesDrawing.drawSpriteInfo('(' + this.x + ',' + this.y + ')', boundary, true);
	}
}