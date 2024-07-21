/**
 * Sprite Drawing Class using P5 functionnality
 */
class SpritesDrawing {
	//global variables in P5 sketch
	// - GREEN_LIMIT
	// - RED_LIMIT

	//**** SPRITE Drawing functions **** */
	static drawSprite(x, y, currDesign, pixelWidth, pixelHeightRatio, color) {
		noStroke();
		for (let i = 0; i < currDesign.length; i++) {
			for (let j = 0; j < currDesign[i].length; j++) {
				if (currDesign[i][j] == 1) {
					let posx = x + (j * pixelWidth);
					let posy = y + (i * pixelWidth * pixelHeightRatio);

					if (posy > GREEN_LIMIT) { fill(0,255,0); }
					else if (posy < RED_LIMIT) { fill(255,0,0); }
					else { fill(255); }

					if (typeof color !== 'undefined') {
						fill(color);
					}

					rect(posx, posy, pixelWidth, (pixelWidth*pixelHeightRatio));
				}
			}
		}	
	}

	static drawSpriteCentered(x, y, currDesign, pixelWidth, pixelHeightRatio, color) {
		noStroke();
		let designWidth = currDesign[0].length;
		let designHeight = currDesign.length;
		for (let i = 0; i < currDesign.length; i++) {
			for (let j = 0; j < currDesign[i].length; j++) {
				if (currDesign[i][j] == 1) {
					let posx = x + (j * pixelWidth) - (designWidth/2 * pixelWidth);
					let posy = y + (designHeight/2 * pixelWidth) + (i * pixelWidth*pixelHeightRatio);
					if (posy > GREEN_LIMIT) { fill(0,255,0); }
					else if (posy < RED_LIMIT) { fill(255,0,0); }
					else { fill(255); }

					if (typeof color !== 'undefined') {
						fill(color);
					}

					rect(posx, posy, pixelWidth, (pixelWidth * pixelHeightRatio));
				}
			}
		}
	}

	static drawBoundaryBox(x, y, width, height, pixelWidth, pixelHeightRatio, bShowCorner) {
		noFill();
		strokeWeight(1);
		stroke(255);
		let boundary = {};
		boundary.x = x;
		boundary.y = y;
		boundary.width = width * pixelWidth;
		boundary.height = height * pixelWidth * pixelHeightRatio;
		rect(boundary.x , boundary.y, boundary.width, boundary.height);

		//and top corner
		if (bShowCorner) {
			stroke(255, 0, 0);
			ellipse(x, y, 4);

			strokeWeight(0);
			stroke(255);
			fill(255);
			textAlign(RIGHT);
			textSize(8);
			text( "(" + x + "," + y + ")", x + 20, y - 15);
		}
		return boundary;
	}

	static drawSpriteInfo(msg, boundary) {
		noStroke();
		fill(255);
		textAlign(LEFT);
		textSize(8);
		text(msg, boundary.x + boundary.width + 2, boundary.y);
	}

	static drawSpriteMiddlePoint(x, y, widthInPixel, heightInPixel, bBottom) {
		stroke('red'); // Change the color
		strokeWeight(6); // Make the points 10 pixels in size
		if (!bBottom) point(x + widthInPixel/2, y);
		else point(x + widthInPixel/2, y + heightInPixel);
	}
}