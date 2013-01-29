var stage;
var contenedor;
var canvas;

var inGame = false;

var player;//objeto del jugador
var cosas;//array con objetos varios
var gameObjects = new Container();//container con los objetos de la partida
var currentLevel;//nivel de dificultad actual
var spawnCounters;

var keyup = 38;
var keydown = 40;
var keyleft = 37;
var keyright = 39; 
var keyj = 74;
var keyk = 75;
var keyl = 76;
var keyw = 87;
var keys = 83;
var keya = 65;
var keyd = 68;

var upperWallY = 60;
var lowerWallY = 340;

var imageSheet = new Image();//Imagen para el spritesheet
var imageBackground = new Image();//Imagen para el fondo
var imageCorazon = new Image();
var imageBrick = new Image();

var imageRojo = new Image();
var imageBlanco = new Image();
var imagePlaqueta = new Image();

var imageOxigeno = new Image();

var imageBichos = new Image();

var imageSplashscreenA = new Image();
var imageSplashscreenB = new Image();
var imageGameOver = new Image();
//objeto spritesheet 
var spriteSheet; 
var spriteCorazon;
var spriteBichos;

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

function init(){
	canvas = document.getElementById("canvas");
	stage = new Stage(canvas);
	stage.snapToPixelEnabled = true;
	
	contenedor = new Container();
	stage.addChild (contenedor);
	
	
	
	points = 0;
	points_text = new Text("score", "25px Englebert", "#333");
	points_text.textAlign = "center";
	points_text.x = (700);
	points_text.y = 10;	
	stage.addChild(points_text);

	imageSheet.onload = handleImageLoad;
	imageSheet.onerror = handleImageError;
	imageSheet.src = "img/vaquero48.png";
	
	imageBackground.onload = handleImageLoad;
	imageBackground.onerror = handleImageError;
	imageBackground.src = "img/vena.jpg";
	
	imageCorazon.onload = handleImageLoad;
	imageCorazon.onerror = handleImageError;
	imageCorazon.src = "img/corazon.png";
	
	imageBrick.onload = handleImageLoad;
	imageBrick.onerror = handleImageError;
	imageBrick.src = "img/brick.jpg";
	
	imageRojo.onload = handleImageLoad;
	imageRojo.onerror = handleImageError;
	imageRojo.src = "img/globrojo.png";
	
	imageBlanco.onload = handleImageLoad;
	imageBlanco.onerror = handleImageError;
	imageBlanco.src = "img/globblanco.png";
	
	imagePlaqueta.onload = handleImageLoad;
	imagePlaqueta.onerror = handleImageError;
	imagePlaqueta.src = "img/plaqueta.png";	
	
	imageBichos.onload = handleImageLoad;
	imageBichos.onerror = handleImageError;
	imageBichos.src = "img/bichos.png";		
	
	imageOxigeno.onload = handleImageLoad;
	imageOxigeno.onerror = handleImageError;
	imageOxigeno.src = "img/oxygeno.png";
	 	
	imageSplashscreenA.onload = handleImageLoad;
	imageSplashscreenA.onerror = handleImageError;
	imageSplashscreenA.src = "img/arterynaut.png";

	imageSplashscreenB.onload = handleImageLoad;
	imageSplashscreenB.onerror = handleImageError;
	imageSplashscreenB.src = "img/arterynaut-logo.png";
		
	imageGameOver.onload = handleImageLoad;
	imageGameOver.onerror = handleImageError;
	imageGameOver.src = "img/gameover.png";
		
	upperWall = Wall(50);
	lowerWall = Wall(340);
	
	header = new Shape();
	header.x = 0;
	header.y = 0;
	header.graphics.beginFill('rgba(223, 217, 189,1)').rect(0, 0, 800, 50);
	contenedor.addChild(header);
	

	vena = new Bitmap(imageBackground);
	vena.x = 0;
	vena.y = 60;
	vena.alpha = 0.8
	contenedor.addChild(vena);
	
	
	footer = new Shape();
	footer.x = 0;
	footer.y = 350;
	footer.graphics.beginFill('rgba(223, 217, 189,1)').rect(0, 0, 800, 100);
	contenedor.addChild(footer);
	
	bar = new Shape();
	bar.x = 10;
	bar.y = 385;
	bar.w = 780;
	bar.h = 30;
	bar.graphics.beginStroke("#000").beginFill('#333').drawRoundRect(0, 0, bar.w, bar.h, 20);
	contenedor.addChild(bar);
	
	oxigenBar = Bar(15, '#59A9C2', 1);
	contenedor.addChild(oxigenBar);
	healthBar = Bar(425, '#BA0002', 2);
	contenedor.addChild(healthBar);
	//setWidth(oxigenBar, 50);
	//setWidth(healthBar, 50);
	   
	spriteSheet = new SpriteSheet({
		images: [imageSheet],
		frames: {width:48, height:48, regX:24, regY:24},
		animations:{
			move:[0,3,"move",4],
			move_h:[6,9,"move_h",4],
		}
	});
	
	spriteCorazon = new SpriteSheet({
		images: [imageCorazon],
		frames: {width:90, height:90, regX:45, regY:45},
		animations:{
			beat:[0,3,"beat",9],
		}
	});
	
	spriteBichos = new SpriteSheet({
		images: [imageBichos],
		frames: {width:32, height:32, regX:16, regY:16},
		animations:{
			debil:[3,5,"debil",4],
			medio:[9,11,"medio",15],			
			fuerte:[15,17,"fuerte",10],			
		}
	});	

	heart = Heart();
	stage.addChild(heart);
	
	startGame();

	stage.addChild(gameObjects)
	
}

function startGame(){
	splashScreenA = new Bitmap(imageSplashscreenA);
	splashScreenB = new Bitmap(imageSplashscreenB);
	splashScreenB.x = 70;
	splashScreenB.y = 200;
	splashScreenB.scaleX = 0.17;
	splashScreenB.scaleY = 0.17;


	start_text = new Text("Press any key to start", "20px Englebert", "#FFF");
	start_text.textAlign = "center";
	start_text.x = (canvas.width/2);
	start_text.y = (canvas.height-20);	

	stage.addChild(splashScreenA);
	stage.addChild(splashScreenB);
	stage.addChild(start_text);
	stage.update();
}

function gameOver(){
	splashGameOver = new Bitmap(imageGameOver);	
	stage.addChild(splashGameOver);
	Ticker.setPaused(true);
	stage.update();	
}

function reset(level){
	inGame=true;
	stage.removeChild(splashScreenA);
	stage.removeChild(splashScreenB);
	stage.removeChild(start_text);
	stage.update();
	currentLevel = level;
	gameObjects.removeAllChildren();
	player = Player((canvas.width / 2) , (canvas.height/2));
	cosas = [];
	glob_rojos = [];
	glob_blancos = [];
	glob_plaquetas = [];
	bichos = [];
	oxygens = [];
	particles = [];
	spawnCounters = [120, 200, 400];
	Ticker.setFPS(60);
	Ticker.addListener(window);
}


function handleImageLoad(){
}
function handleImageError(){
}

function tick(){
	/*for(var i=0; i<cosas.length; i++){
		var coso = cosas[i];
		coso.x += coso.vx;
		coso.y += coso.vy;
	}*/
	if(inGame){
		setWidth(oxigenBar,-0.1);
		updateParticles();
		updateOxygens();
		updateBugs();
		spawner();
		updateWall(upperWall);
		updateWall(lowerWall);
		playerUpdate();
		updateShot();	
		updatePoints();
		stage.update();
	}
}

function sign(n){
	return n?n>0?1:-1:0; //regex mofaca!!	
}

function handleKeyDown(e){//lo que pasa cuando el jugador toca una tecla
	if(!inGame){reset(0);}
	switch(e.keyCode){
		case keyj:
			Shoot("globRojo");
			return false;
		case keyk:
			Shoot("globBlanco");
			return false;	
		case keyl:
			Shoot("Plaqueta");
			return false;			
		
		
		case keyup:
		case keyw:
			player.up=true;return false;
		case keyleft:
		case keya:
			player.left=true;return false;
		case keyright:
		case keyd:
			player.right=true;return false;
		case keydown:
		case keys:
			player.down=true;break;
	}
}

function handleKeyUp(e){// lo que pasa cuando el jugador suelta una tecla
	switch(e.keyCode){
		
		case keyup:
		case keyw:
			player.up=false;return false;
		case keyleft:
		case keya:
			player.left=false;return false;
		case keyright:
		case keyd:
			player.right=false;return false;
		case keydown:
		case keys:
			player.down=false;break;
	}
}


