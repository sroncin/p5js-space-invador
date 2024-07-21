/**
 * This class is used to draw information on Game Canvas using P5
 */
class GameDrawing {
	//global variables in P5 sketch
	// - BG_COLOR
	// - GREEN_LIMIT
	// - RED_LIMIT
	// - DISPLAY_MENU
	// - SWITCH_PLAYER_DISPLAY
	// - DISPLAY_ENEMIES_SCORING

	//**** GRID Drawing **** */
	static drawGrid(_scl, _cols, _rows) {
		strokeWeight(1)
		stroke(255);
		noFill();
		for (var i=0; i < cols; i++) {
			for (var j=0; j < rows; j++) {
				rect(i*_scl, j*_scl, _scl, _scl);
			}
		}
	}

	/**** MESSAGE BLINKING **** */
	static BLINK_TIME = 30; //blink text every 1/2 seconds
	static drawBlinkText(msg, x, y) {
		if (frameCount % 60 < GameDrawing.BLINK_TIME)
			text(msg, x, y);
	}

	/**** MENUS Drawings **** */
	static drawMenu(_scl, _cols, _rows, _font) {
		noStroke();
		fill(255);
		textFont(_font);
		textSize(15);

		let msgPress = 'PRESS    KEYBOARD';
		let msgOption = ' 1  OR  2PLAYERS   KEY';
		textAlign(CENTER, TOP);
		GameDrawing.drawBlinkText(msgPress, ((_cols/2)*_scl), ((_rows/2-3)*_scl))
		text(msgOption, ((_cols/2)*_scl), ((_rows/2)*_scl));
	}
	static drawInvaderScorePage(_scl, _cols, _rows, _font) {
		noStroke();
		fill(255);
		textFont(_font);
		textSize(15);
		textAlign(CENTER, TOP);

		let textRow = 5;
		let screenCenterX = ((_cols/2)*_scl);
		let enemiesX = (((_cols/2)-3)*_scl);

		text('PLAY', screenCenterX, (textRow*_scl));
		text('SPACE INVADERS', screenCenterX, ((textRow+2)*_scl));

		GameDrawing.drawBlinkText('PRESS <ANY KEY> TO START', screenCenterX, ((textRow+4)*_scl));

		text('* SCORE ADVANCE TABLE *', screenCenterX, ((textRow+7)*_scl));
		SpritesDrawing.drawSpriteCentered(enemiesX, ((textRow+8)*_scl), Saucer.DESIGNS[0], 2, 1.2, color(255, 0, 0));
		SpritesDrawing.drawSpriteCentered(enemiesX, ((textRow+9)*_scl+(_scl/2*1)), SpaceInvadorEnemies.DESIGNS[0][0], 2, 1.2, color(255));
		SpritesDrawing.drawSpriteCentered(enemiesX, ((textRow+10)*_scl+(_scl/2*2)), SpaceInvadorEnemies.DESIGNS[1][0], 2, 1.2, color(255));
		SpritesDrawing.drawSpriteCentered(enemiesX, ((textRow+11)*_scl+(_scl/2*3)), SpaceInvadorEnemies.DESIGNS[2][0], 2, 1.2, color(0, 255, 0));

		noStroke();
		fill(255);
		textAlign(LEFT, TOP);
		text('= ? MYSTERY', enemiesX+_scl, ((textRow+8)*_scl+(_scl/2*1)));
		text('= 30 POINTS', enemiesX+_scl, ((textRow+9)*_scl+(_scl/2*2)));
		text('= 20 POINTS', enemiesX+_scl, ((textRow+10)*_scl+(_scl/2*3)));
		text('= 10 POINTS', enemiesX+_scl, ((textRow+11)*_scl+(_scl/2*4)));

		textAlign(CENTER, TOP);
		text('* KEYBOARD   CONTROLS *', screenCenterX, ((textRow+15)*_scl));
		textAlign(LEFT, TOP);
		text(" <RIGHT KEY> MOVE LEFT", enemiesX-45, ((textRow+15)*_scl+(_scl/2*4)));
		text(" < LEFT KEY > MOVE RIGHT", enemiesX-45, ((textRow+16)*_scl+(_scl/2*4)));
		text(" <    SPACE     > SHOOT", enemiesX-45, ((textRow+17)*_scl+(_scl/2*4)));

	}

	//**** MESSAGE Drawing function **** */
	static drawScores(_scl, _cols, _rows, _font, _players, _numberOfPlayer, _currentPlayer, _space_data) {
		let scoreLine = (0*_scl)+10;
		let pointsLine = (1*_scl)+10;
		let colPlayer1 = (4*_scl);
		let colHiScore = ((_cols/2)*_scl);
		let colPlayer2 = ((_cols-4)*_scl);

		noStroke();
		fill(255);
		textFont(_font);
		textSize(15);
		textAlign(CENTER, TOP);

		for (let i=0; i < _players.length; i++) {
			let player = _players[i];
			let msgPlayerInfo = '';
			let msgScore = player.score.toString().padStart(5, "0");
			let colPlayer = colPlayer1;

			if (i==1 && _numberOfPlayer == 1) break; //display only first player score

			if (i==0) {
				msgPlayerInfo = 'SCORE< 1 >';
			}
			if (i==1) {
				colPlayer = colPlayer2;
				msgPlayerInfo = 'SCORE< 2 >';
			}

			text(msgPlayerInfo, colPlayer, scoreLine);
			if (_currentPlayer == i && SWITCH_PLAYER_DISPLAY == true) {
				GameDrawing.drawBlinkText(msgScore, colPlayer, pointsLine);
			} else {
				if (_currentPlayer == i || DISPLAY_MENU == true || DISPLAY_ENEMIES_SCORING == true) 
					text(msgScore, colPlayer, pointsLine);
			}
		}

		//Display HighScores
		let msgHiScore = _space_data.highscore.toString().padStart(5, "0");
		text(' HI-SCORE ', colHiScore, scoreLine);
		text(msgHiScore, colHiScore, pointsLine);

	}
	static drawBottomLine(_redSaucer, _enemies, _players, _currentPlayer) {
		stroke(1);
		stroke(0, 255, 0);
		let yLine = Math.ceil(_players[_currentPlayer].groundY);
		for (let i=_enemies.minPosXEnemies; i <= _enemies.maxPosXEnemies; i++) {
			if ( (_enemies.groundHitLine.indexOf(i) == -1 && redSaucer.groundHitLine.indexOf(i) == -1) ) {
				point(i, yLine)
			}
		}
		/*
		stroke(0, 255, 0);
		//Draw Green Limit
		line(_enemies.minPosXEnemies, GREEN_LIMIT, _enemies.maxPosXEnemies, GREEN_LIMIT);
		//Draw Red Limit
		stroke(255, 0, 0);
		line(_enemies.minPosXEnemies, RED_LIMIT, _enemies.maxPosXEnemies, RED_LIMIT);
		*/
	}
	static drawUnpauseInstructions(_scl, _cols, _rows, _font) {
		noStroke();
		fill('#f7fc2e');
		textAlign(CENTER);
		textSize(18);
		textFont(_font);
		
		if (!DISPLAY_ENEMIES_SCORING)
			text('click to play', ((_cols/2)*_scl), (18*_scl));
		else 
			text('click to play', ((_cols/2)*_scl), (4*_scl));
	}
	static drawGameOver(_scl, _cols, _rows, _font, _currentPlayer) {
		noStroke();
		fill(255, 0, 0);
		textAlign(CENTER);
		textSize(15);
		textFont(_font);
		text(' Game Over ', ((_cols/2)*_scl), (8*_scl));
		//textSize(16);
		text(' PLAYER  <' + (_currentPlayer+1) + '>', ((_cols/2)*_scl), (10*_scl));
	}
	static drawUserSwitching(_scl, _cols, _rows, _font, _currentPlayer) {
		noStroke();
		fill(255);
		textAlign(CENTER);
		textSize(15);
		textFont(_font);

		let textRow = 12;
		let screenCenterX = ((_cols/2)*_scl);

		GameDrawing.drawBlinkText('PRESS <ANY KEY> TO START', screenCenterX, ((textRow)*_scl));
		text(' PLAY   PLAYER <' + (_currentPlayer+1) + '>', screenCenterX, ((textRow+2)*_scl));
	}

}