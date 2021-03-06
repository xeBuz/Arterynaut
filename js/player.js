
function Player(x, y){
	var anim = new BitmapAnimation(spriteSheet);
	if(shadows)anim.shadow = new Shadow("#233",0,5,4);
	anim.gotoAndPlay("move");//default animation
	currentAnim = "move";//default current animation
	anim.x = x;
	anim.y = y;
	anim.r = 16;
	anim.dir = 0;
	anim.vx = 0;
	anim.vy = 0;
	anim.last_x = -1;
	anim.last_y = 0;
	anim.snapToPixel = true;
	last_x = 0;
	last_y = 0;
	anim.currentFrame = 0;
	gameObjects.addChild(anim);
	return anim;
}

function playerUpdate(){

	if(player.left)player.vx-=1;
	if(player.up)player.vy-=1;
	if(player.right)player.vx+=1;
	if(player.down)player.vy+=1;

	wall  = collCircleWall(player);
	if (wall != false){
		player.vy = player.vy * -1;
	}
	if (player.x > canvas.width ) {
		player.vx = Math.abs(player.vx)*-1;
	}
	if (player.x < 0 ) {
		player.vx = Math.abs(player.vx);
	}
	
	if(player.vx>0 && currentAnim != "move_h"){
		currentAnim = "move_h";
		player.gotoAndPlay("move_h");
	}
	else if(player.vx<0 && currentAnim != "move"){
		currentAnim = "move";
		player.gotoAndPlay("move");
	}
	
	if(player.vx>5)player.vx = 5;
	if(player.vx<-5)player.vx = -5;
	if(player.vy>5)player.vy = 5;
	if(player.vy<-5)player.vy = -5;
	
	player.x += player.vx;
	player.y += player.vy;
	if(!(player.left || player.right)){
		player.vx*=0.7;
	}
	if(!(player.up || player.down)){
		player.vy*=0.7;
	}
}






