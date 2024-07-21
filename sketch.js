/**
 * SPACE INVADERS P5 PROJECTS 
 * author : Stéphane RONCIN
 * since  : 2020-12-29
 * 
 * This is a tentative to reproduce Space Invaders Arcade Game.
 * I was inspired by the Coding Train Challenge "Space Invaders" of Daniel Shiffman for the basic design.
 * 
 * Some ideas come from Daniel Kaye "Classic Style Space Invaders" who also contribute to the
 *  Coding Train Challenge about moving the alien from the frameCount of P5 modulo and timer
 *  usage for animating the explosions very great idea :)
 * 
 * And I took the original sprites designs of Space Invader Arcade game from the Computer Archeology.
 * 
 * The following YouTube video was also very usefull in order to have a global view of how the game
 *  was working and this one in order to have an overview when 2 players mode is started.
 * 
 * Great part of the development:
 *   1. Sprites that are bit arrays and not images ... the old fashion way in order to be the closest to the original!
 *   2. Shield collision with shots and lasers which is done per pixel and the shield damaging was quite challenging
 *   3. Laser an Shot collision
 *   4. The overall result of the game
 * 
 * sources :
 *  - Coding Train "Space Invaders" by Daniel Shiffman : https://thecodingtrain.com/CodingChallenges/005-space-invaders-p5.html
 *  - Classic Style Space Invaders by Daniel Kaye : https://editor.p5js.org/danno484/sketches/zzO5nmnEg 
 *  - Computer Archeology by Christopher Cantrell : http://www.computerarcheology.com/Arcade/SpaceInvaders/Code.html 
 *  - You Tube video by Game Archive showing the game flow : https://www.youtube.com/watch?v=MU4psw3ccUI 
 *  - Space Invaders Fonts used come from "Font Magazin" website : https://thefontsmagazine.com/font/space-invaders-font/
 *  - Space Invaders Sounds come from "Classic Gaming" website : https://www.classicgaming.cc/classics/space-invaders/sounds
 */

//TODO : check how to have a set of alien per player !

let BG_COLOR;
let PLAY_SOUNDS = true;

let space_data;
let space_data_url = 'invaders_data.json';

let scl = 20;
let fps = 60;
let cols, rows;
let spaceInvaderFont1;
let spaceInvaderFont2;
let spaceInvaderFont3;

let pauseMode = false;
let pauseTime = 0;

let redSaucer;
let redSaucerRow = 2;
let RED_SAUCER_FRAME_INITIALIZE = 50;

let enemieStartRow = 6;
let enemieStartSpeed = 30;
let enemieSpeed = enemieStartSpeed;
let enemieToneIndex = 0;
let enemieSoundSpeed = enemieStartSpeed;
let enemiesPerRow = 11;
let enemies;

let ENEMIES_MAX_SPEED = 4; //move 4 pixels at once max
let ENEMIES_MIN_SOUND_SPEED = 6;
let ENEMIES_MAX_SOUND_SPEED = enemieStartSpeed;

let playerStartRow = 3;
let playerShieldRow = 6; //removed rows from player to start drawing shields
let players = [];
let playerSpeed = 1;
let currentPlayer = 0; //0 = Player 1 || 1 = Player 2
let numberOfPlayer = 1;

let SPACE_SOUNDS = {};

let GREEN_LIMIT = 0;
let RED_LIMIT = 0;

let laserMaxSpeed = 6;

let stop = 0;

//Game Menu And Messages Management
let GAMEOVER_SHOWINGTIME = 120;
let player_game_over = false;
let gameOverPauseTime = 0;
let playerSwitchingIsDone = false;
let DISPLAY_MENU = true;
let DISPLAY_ENEMIES_SCORING = false;
let SWITCH_PLAYER_DISPLAY = false;

//Levels
let NB_MAX_LEVELS = 30;
let gameLevel = 0;

/**** P5 FUNCTIONS **** */

//P5 PreLoading files and data
function preload() {
	spaceInvaderFont1 = loadFont('assets/fonts/space_invaders.ttf');
	spaceInvaderFont2 = loadFont('assets/fonts/MachineStd-Bold.otf');
	spaceInvaderFont3 = loadFont('assets/fonts/MachineStd-Medium.otf');

	soundFormats('wav');
	SPACE_SOUNDS.explosion = loadSound('assets/sounds/explosion.wav');
	SPACE_SOUNDS.invaderKilled = loadSound('assets/sounds/shoot.wav');
	SPACE_SOUNDS.shoot = loadSound('assets/sounds/invaderkilled.wav');
	SPACE_SOUNDS.tone1 = loadSound('assets/sounds/fastinvader4.wav');
	SPACE_SOUNDS.tone2 = loadSound('assets/sounds/fastinvader1.wav');
	SPACE_SOUNDS.tone3 = loadSound('assets/sounds/fastinvader2.wav');
	SPACE_SOUNDS.tone4 = loadSound('assets/sounds/fastinvader3.wav');
	SPACE_SOUNDS.saucer_low = loadSound('assets/sounds/ufo_lowpitch.wav');
	SPACE_SOUNDS.saucer_high = loadSound('assets/sounds/ufo_highpitch.wav');

	space_data = loadJSON('data/' + space_data_url);
}
//P5 SETUP
function setup() {
	BG_COLOR = color(0);

	//Load data from JSON file
	fps = space_data.screen.fps;
	PLAY_SOUNDS = space_data.sound.enabled;
	$('#soundDeactivated').on('click', activateDeactivateSound);
	$('#soundActivated').on('click', activateDeactivateSound);

	//Setup Canvas
	var canvas = createCanvas(space_data.screen.width, space_data.screen.height);
	canvas.parent('spaceInvaders-holder');
	canvas.id('spaceInvaders-canvas');

	//Prepare the Grid which help us to align sprites
	cols = width / scl;
	rows = height / scl;
	
	//Calculate Player Row Position
	playerStartRow = rows-playerStartRow;
	console.log('width: ' + width + ' heigth: ' + height + ' scl: ' + scl + ' cols:' + cols + ' rows:' + rows);

	frameRate(fps);

	//just in order to have scores display
	numberOfPlayer = 2;

	//Initialize players and enemies
	initializeGame();
}

//P5 MAIN DRAWING FUNCTION
function draw() {
	if (focused || frameCount < 10) {
		clear();

		GameDrawing.drawScores(scl, cols, rows, spaceInvaderFont1, players, numberOfPlayer, currentPlayer, space_data);
		//text('frameCount: ' + (frameCount % RED_SAUCER_FRAME_INITIALIZE), (cols/2*scl), ((playerStartRow+2)*scl));
		//text('frameRate: ' + Math.ceil(frameRate()) + ' FPS', (cols/2*scl), ((playerStartRow+2)*scl));

		//GameDrawing.drawGrid(scl, cols, rows);

		if (DISPLAY_MENU) GameDrawing.drawMenu(scl, cols, rows, spaceInvaderFont1);
		else {
			if (DISPLAY_ENEMIES_SCORING) GameDrawing.drawInvaderScorePage(scl, cols, rows, spaceInvaderFont1);
			else {
				if (SWITCH_PLAYER_DISPLAY) {
					GameDrawing.drawUserSwitching(scl, cols, rows, spaceInvaderFont1, currentPlayer);
				} else {
					drawGame();
				}
			}
		}
	} else {
		GameDrawing.drawUnpauseInstructions(scl, cols, rows, spaceInvaderFont3);
	}
}

//P5 AUDIO Activation
function touchStarted() {
	if (getAudioContext().state !== 'running') {
		console.log('Audio is now activated');
		getAudioContext().resume();
	}
}

//P5 KEYBOARDS EVENTS
function keyPressed() {
	if (DISPLAY_MENU == false && DISPLAY_ENEMIES_SCORING == false && SWITCH_PLAYER_DISPLAY == false) {
		//Game Control
		if (key === ' ') {
			if (!pauseMode) {
				//Shoot
				players[currentPlayer].shoot(redSaucer);
			}
		}

		//Move Player
		if (keyCode === RIGHT_ARROW) {
			players[currentPlayer].setDir(1);
		} else if (keyCode === LEFT_ARROW) {
			players[currentPlayer].setDir(-1);
		}
	}
}
//P5 KEYBOARDS EVENTS
function keyReleased() {
	//console.log('key release: ' + key + ' keyIsPressed: ' + keyIsPressed);

	if (key == 'm') activateDeactivateSound();

	if (DISPLAY_MENU == false && DISPLAY_ENEMIES_SCORING == false && SWITCH_PLAYER_DISPLAY == false) {
		//Game Control
		if (key != ' ' && keyIsDown(LEFT_ARROW) == false && keyIsDown(RIGHT_ARROW) == false) {
			players[currentPlayer].setDir(0);
		}
	} else {
		if (DISPLAY_ENEMIES_SCORING == false && SWITCH_PLAYER_DISPLAY == false) {
			//Menu Control
			if (key == '1') {
				numberOfPlayer = 1;
				DISPLAY_MENU = false;
				DISPLAY_ENEMIES_SCORING = true;
			} else {
				if (key == '2') {
					numberOfPlayer = 2;
					DISPLAY_MENU = false;
					DISPLAY_ENEMIES_SCORING = true;
				}
			}
			if (DISPLAY_ENEMIES_SCORING) {
				//Enemie Scoring Page
				if (playerSwitchingIsDone == false) {
					//Game can start if players are not switching
					currentPlayer = 0;
					initializeGame();	
				}
			}
		} else {
			//Comes from Enemie Scoring Page
			//Check if Players are Switching if 2 player mode
			if (SWITCH_PLAYER_DISPLAY == false) {
				DISPLAY_ENEMIES_SCORING = false;
				if (numberOfPlayer > 1) SWITCH_PLAYER_DISPLAY = true;
			} else {
				// Player Switching is displayed
				SWITCH_PLAYER_DISPLAY = false;
			}
		}
	}

}

/**** SOUND MANAGEMENT **** */
function activateDeactivateSound() {
	PLAY_SOUNDS = !PLAY_SOUNDS;
	if (PLAY_SOUNDS == true) {
		$('#soundDeactivated').addClass('d-none');
		$('#soundActivated').removeClass('d-none');
	} else {
		$('#soundDeactivated').removeClass('d-none');
		$('#soundActivated').addClass('d-none');
	}
}

/**** GAME SETUP, INITIALIZATION and BUSINESS LOGIC **** */
function initGameVariables() {
	//reinitialisation variables for next game
	pauseTime = 0;
	gameOverPauseTime = 0;
	playerSwitchingIsDone == false;
	pauseMode = false;
}
function initializeGame() {
	levelUpEnemies(false);

	players = new Array();
	players.push(new Player(fps, scl, enemies.minPosXEnemies, playerStartRow, playerSpeed));
	players.push(new Player(fps, scl, enemies.minPosXEnemies, playerStartRow, playerSpeed));

	GREEN_LIMIT = ((playerStartRow-playerShieldRow-1)*scl) + (scl/2);
	console.log('GREEN_LIMIT: ' + GREEN_LIMIT);
	RED_LIMIT = (redSaucerRow+1)*scl-3;
	console.log('RED_LIMIT: ' + RED_LIMIT);

	console.log('enemies.minPosXEnemies: ' + enemies.minPosXEnemies + ' / enemies.maxPosXEnemies: ' + enemies.maxPosXEnemies);
}
function switchPlayer() {
	if (playerSwitchingIsDone == false) {

		SWITCH_PLAYER_DISPLAY = true;

		//Switch the user
		playerSwitchingIsDone = true;
		if (currentPlayer == 0) currentPlayer = 1;
		else currentPlayer = 0;

		if (players[currentPlayer].lives > 0) {
			//Continue with player 2
			enemies.clearAllLasers();
			redSaucer.cleanLasers();
			redSaucer.initShowTimer();
		} else {
			//Change Player back and check if he still have live
			if (currentPlayer == 0) currentPlayer = 1;
			else currentPlayer = 0;

			if (players[currentPlayer].lives <= 0) {
				DISPLAY_MENU = true; //GameOver 2 Players are dead
				SWITCH_PLAYER_DISPLAY = false;
				playerSwitchingIsDone = false;
				currentPlayer = 0;
				initGameVariables();
			}
			else {
				enemies.clearAllLasers();
				redSaucer.cleanLasers();
				redSaucer.initShowTimer();
			}
		}
	}	
}
function updateSpeeds() {
		let nbEnemies = enemies.nbLines * enemies.enemiesPerRow;
		let percEnemies = (enemies.nbEnemiesLeft / nbEnemies);
		
		//speedFactor Calculation
		let speedFactor = ((ENEMIES_MAX_SPEED * Math.ceil(gameLevel / NB_MAX_LEVELS)) + ( Math.ceil((1 - percEnemies) * 10)));
		/*console.log('enemy SPEEDFACTOR Before : ' + speedFactor 
			+ ' level percentage : ' + gameLevel / NB_MAX_LEVELS 
			+ ' percEnemiesSpeed(' + ( Math.ceil((1 - percEnemies) * 10)) + ')');*/
		if (speedFactor > ENEMIES_MAX_SPEED) speedFactor = ENEMIES_MAX_SPEED;
		//console.log('enemy SPEEDFACTOR After : ' + speedFactor);

		//Increase difficulties when the number of enemies diminish
		//by refreshing the enemies screen move more ofter = enemieSpeed
		if (nbEnemies > 0) enemieSpeed = Math.ceil(enemieStartSpeed * percEnemies);
		enemieSpeed = enemieSpeed || 1;
		
		//update sound speed
		enemieSoundSpeed = Math.ceil(ENEMIES_MAX_SOUND_SPEED * percEnemies);
		if (!enemieSoundSpeed || enemieSoundSpeed < ENEMIES_MIN_SOUND_SPEED) enemieSoundSpeed = ENEMIES_MIN_SOUND_SPEED;

		if (enemies.nbEnemiesLeft <= 9 && enemies.laserSpeed < laserMaxSpeed) {
			enemies.laserSpeed++;
		}

		return speedFactor;
}
function levelUpEnemies(_bLevelUp) {
	if (_bLevelUp == true) {
		enemieSpeed = Math.ceil(enemieStartSpeed * ((NB_MAX_LEVELS - gameLevel) / NB_MAX_LEVELS));
		gameLevel++;
		if (enemieSpeed < 1) {
			enemieSpeed++;
			gameLevel--;
		}
	}

	console.log('Game Level: ' + gameLevel + ', enemy speed: ' + enemieSpeed);

	//Recreate the enemies fleet
	enemies = new SpaceInvadorEnemies(fps, scl, enemiesPerRow, enemieStartRow);

	//Recreate the new Red Saucer (the boss)
	redSaucer = new Saucer(fps, scl, redSaucerRow, enemies)
}

/**** GAME DRAWING **** */
function drawGame() {

	if (!pauseMode) { //Game is runing : player alive

		//Check if the Red Saucer can appear on screen
		redSaucer.decreaseTimer();
		if (redSaucer.showCounter <= 0) {
			redSaucer.initialize();
		}

		//Move Player before lasers and shot
		players[currentPlayer].move(enemies.minPosXEnemies, enemies.maxPosXEnemies);

		//Moving Lasers and Shots
		players[currentPlayer].moveAllShots();
		enemies.moveLasers(players[currentPlayer]);
		redSaucer.moveLasers(players[currentPlayer]);

		//Move Red Saucer at each frame
		redSaucer.move();

		//Check and may increase Speed Factor of enemies
		let speedFactor = updateSpeeds();

		//Move enemies and fire their laser depending of their speed not at every frame
		if (frameCount % enemieSpeed == 0) { 
			enemies.moveAll(speedFactor);
			enemies.fireLaser();
			redSaucer.fireLaser();
		}

		//Sound management of the enemy fleet
		if (frameCount % enemieSoundSpeed == 0) {
			if (PLAY_SOUNDS === true) {
				if (SPACE_SOUNDS["tone" + (enemieToneIndex+1)].isPlaying()) SPACE_SOUNDS["tone" + (enemieToneIndex+1)].stop();
				SPACE_SOUNDS["tone" + (enemieToneIndex+1)].play();
			}
			enemieToneIndex++;
			if (enemieToneIndex > 3) enemieToneIndex = 0;
		}

		//Enemies fleet destroyed .. increase difficulties
		// and clean player and red Saucer shot and lasers
		if (enemies.allEnemiesShot == true) {
			levelUpEnemies(true);
			players[currentPlayer].clearAllShots();
			players[currentPlayer].restoreShield();
			redSaucer.cleanLasers();
		}

		//Draw all sprits
		players[currentPlayer].draw();
		players[currentPlayer].drawAllShots();
		players[currentPlayer].shields.drawAllShields();
		enemies.drawAll();
		enemies.drawLasers();
		redSaucer.draw();
		redSaucer.drawLasers();

		//Hit Management
		players[currentPlayer].hitShields();
		players[currentPlayer].hitSaucerLasers(redSaucer);
		players[currentPlayer].hitSaucer(redSaucer);
		players[currentPlayer].hitEnemiesLasers(enemies);
		players[currentPlayer].hitEnemies(enemies);
		enemies.lasersHitShields(players[currentPlayer]);
		redSaucer.lasersHitShields(players[currentPlayer]);
		if (enemies.lasersHitPlayer(players[currentPlayer]) === true || 
				redSaucer.lasersHitPlayer(players[currentPlayer]) === true ||
				enemies.hitPlayerOrGround(players[currentPlayer])) {
			if (PLAY_SOUNDS === true) SPACE_SOUNDS.explosion.play();
			if (players[currentPlayer].lives > 0) {
				//console.log('Player is losing a life!');
				pauseTime = frameCount;
				pauseMode = true;
				players[currentPlayer].clearAllShots();
				enemies.clearAllLasers();
				redSaucer.cleanLasers();
				redSaucer.initShowTimer();
			}
		}
		if (enemies.hitPlayerOrGround(players[currentPlayer])) {
			//console.log('Enemies wins, player lose a life !!!');
			levelUpEnemies(false);
		}
		if (players[currentPlayer].lives == 0) {
			//console.log('GameOver for player, there is not more life !!!');
			pauseMode = true;
		}

		//Array Cleaning of shots and Lasers = remove used ones
		players[currentPlayer].cleanShots();
		enemies.cleanLasers();
		redSaucer.cleanLasers();

		GameDrawing.drawBottomLine(redSaucer, enemies, players, currentPlayer);

	} else { //PauseMode is on = Player is loosing a life
		if (gameOverPauseTime == 0 && playerSwitchingIsDone == false) {
			pauseMode = players[currentPlayer].newLife(pauseTime, enemies); //Live is remove only when explosion display is finished
			if (players[currentPlayer].lives <= 0) {

				//Save HiScores
				if (players[currentPlayer].score > space_data.highscore) {
					space_data.highscore = players[currentPlayer].score;
				}

				players[currentPlayer].clearAllShots();
				enemies.clearAllLasers();
				redSaucer.cleanLasers();
				redSaucer.initShowTimer();
				GameDrawing.drawGameOver(scl, cols, rows, spaceInvaderFont1, currentPlayer);
				gameOverPauseTime = frameCount; //Start Drawing GameOver test
				player_game_over = true;
			} else { 
				if (pauseMode == false && numberOfPlayer > 1) {
					pauseMode = true; //need pause mode in order to display player switch message
				}
			}
		}

		if (frameCount - pauseTime > players[currentPlayer].explosionTimer) {
			//Explosion display is finished
			let gameOverIsDisplay = (gameOverPauseTime == 0) ? false : !(frameCount - gameOverPauseTime > GAMEOVER_SHOWINGTIME);

			//console.log('numberOfPlayer(' + numberOfPlayer + ') player_game_over(' + player_game_over + ') gameOverIsDisplay(' + gameOverIsDisplay + ')'); //TOCLEAN
			if (player_game_over == true) {
				if (gameOverIsDisplay) {
					GameDrawing.drawGameOver(scl, cols, rows, spaceInvaderFont1, currentPlayer);
				}
				else if (numberOfPlayer > 1 && playerSwitchingIsDone == false) {
					//always 2 players here
					switchPlayer(); //if it has not been switch yet
				}
				else {
					playerSwitchingIsDone = false; //reinitialize player switching
					if (numberOfPlayer > 1) { 
						//Nothing to do everything is done in switchPlayer
					} else {
						//Only 1 player and he is dead
						if (pauseMode == true) {
							DISPLAY_MENU = true;
							SWITCH_PLAYER_DISPLAY = false;
							currentPlayer = 0;
						}
					}
					initGameVariables();
				}
			} else {
				if (numberOfPlayer > 1 && playerSwitchingIsDone == false) {
					//always 2 players here
					switchPlayer(); //if it has not been switch yet
				} else {
					playerSwitchingIsDone = false; //reinitialize player switching
					initGameVariables();
				}
			}
		}
	}
}
