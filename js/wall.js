function Brick(x,y){
	brick = new Bitmap(images["brick"]);
	brick.w = 40;
	brick.h = 10;
	brick.x = x;
	brick.y = y;
	brick.hp = 5;
	brick.snapToPixel = true;
	//brick.cache(0,0,40,10);
	brick.isAlive = true;
	//brick.graphics.beginFill('rgba(240,190,170,1)').rect(0, 0, brick.w, brick.h);
	contenedor.addChild(brick);
	return brick;
}

function Wall(y){
	var wall = new Array(20);
	for (i=0; i<20; i++){
		wall[i] = Brick(i*40, y);
		//if(i==8)wall[i].isAlive = false;
	}
	return wall;	
}

function updateWall(walls){

	for(var i=0; i<walls.length; i++){
		var w = walls[i];
		w.alpha = w.alpha>=0?w.hp/5:0;
		if(w.hp<=0){
			if(sonidos)SoundJS.play("hemorrhage",SoundJS.INTERRUPT_NONE);
			if(w.isAlive){
				if(sonidos)SoundJS.play("brokenvein",SoundJS.INTERRUPT_NONE);
				w.isAlive = false;
			}
			if(w.hp<=-3)w.hp = -3;
		}else{
			w.isAlive = true;
		}
		if(!w.isAlive || w.hp <= 0){
			Attract(w,glob_rojos);
			Attract(w,glob_blancos);
			Attract(w,glob_plaquetas);
			Attract(w,oxygens);
			Attract(w,bichos);
		}
	}
}

function Attract(w,obj){
	for(var i=0; i<obj.length;i++){
		var g=obj[i];
		if(distance(w.x+20,w.y+5,g.x,g.y)<300){
			var dire = direction(w.x+20,w.y+5,g.x,g.y);
			g.vx-=dire[0]*0.1;
			g.vy-=dire[1]*0.1;
		}
	}
}
