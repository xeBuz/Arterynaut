function Bug(x,y,vx,vy,tipo){
	var shape = new BitmapAnimation(spriteBichos);
	if(shadows)shape.shadow = new Shadow("#243",0,5,2);
	
	switch(tipo){
		case 1: 
			shape.damage = 1; 
			shape.hp = 1; 
			shape.vx = vx*1.5;
			shape.vy = vy*1.5;
			shape.gotoAndPlay("debil");
			shape.currentAnim = "debil";
			break;
		case 2: 
			shape.damage = 1; 
			shape.hp = 1;
			shape.vx = vx*1;
			shape.vy = vy*1;
			shape.gotoAndPlay("medio");
			shape.currentAnim = "medio";
			break;			
		case 3: 
			shape.damage = 3; 
			shape.hp = 3;
			shape.vx = vx*0.5;
			shape.vy = vy*0.5;
			shape.gotoAndPlay("fuerte");
			shape.currentAnim = "fuerte";
			break;			
	}
	
	shape.x = x;
	shape.y = y;
	shape.r = 16;
	shape.snapToPixel = true;
	//shape.cache(-10,-10,20,20);
	bichos.push(shape);
	stage.addChild(shape);
	return shape;
}

function Oxygen(x,y,vx,vy){
	var shape = new Bitmap(imageOxigeno);
	shape.regX = 5;
	shape.regY = 5;
	shape.x = x;
	shape.y = y;
	shape.alpha = 0.7;
	shape.kill = false;
	shape.r = 5;
	shape.vx = vx;
	shape.vy = vy;
	shape.snapToPixel = true;
	//shape.cache(0,0,10,10);
	oxygens.push(shape);
	stage.addChild(shape);
	return shape;
}

function updateOxygens(){
	for(var i=0; i<oxygens.length; i++){
		var ox = oxygens[i];
		ox.x += ox.vx;
		ox.y += ox.vy;
		var w = collCircleWall(ox)
		if (w && w.isAlive) {
			BounceShot(ox);
			break;	
		}
		if(ox.y>lowerWallY || ox.y<upperWallY){
			Destroy(i,oxygens);
		}
		if(ox.x-ox.r>canvas.width || ox.kill){
			Destroy(i,oxygens);
			//setWidth(healthBar,-1);
		}
	}
}

function updateBugs(){
	for(var i=0; i<bichos.length; i++){
		var bg = bichos[i];
		var wall = collCircleWall(bg);
		if(wall && wall.isAlive){
			wall.hp -= bg.damage;
			BounceShot(bg);
			SoundJS.play("impactwall",SoundJS.INTERRUPT_NONE);
		}
		/*if (collCircle(bg, glob_blancos)) {	
			stage.removeChild(bichos[i]);
			bichos.splice(i,1);bg.
			break;	
		} */

		if(bg.vx<3)bg.vx+=0.1;
		bg.x += bg.vx;
		bg.y += bg.vy;
		if(bg.hp<=0){
			for(var j=0; j<8; j++){
				Particle(bg.x,bg.y,"rgba(100,220,150,0.3)","rgba(80,150,50,1)",[Math.random()*8-4,Math.random()*8-4])
			}
			SoundJS.play("killedbug",SoundJS.INTERRUPT_NONE);
			Destroy(i,bichos);
			return false;
		}
		if(bg.y < upperWallY || bg.y > lowerWallY){
			Destroy(i,bichos);
		}
		if(bg.x-bg.r>canvas.width){
			Destroy(i,bichos);
			setWidth(healthBar,-bg.damage*5);
		}
	}
}
