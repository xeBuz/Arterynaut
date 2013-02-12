function Shot(x,y,dire, tipo){
	//tipo: rojo, blanco, plaqueta
	if(sonidos)SoundJS.play("shoot",SoundJS.INTERRUPT_NONE);
	
	switch(tipo){
		case "rojo":
			var shape = new Bitmap(images["globrojo"]);
			shape.oxigenado = 0;
			glob_rojos.push(shape);
			break;
			return false;
		case "blanco":
			var shape = new Bitmap(images["globblanco"]);
			glob_blancos.push(shape);
			break;
			return false;
		case "plaqueta":
			var shape = new Bitmap(images["plaqueta"]);
			glob_plaquetas.push(shape);
			break;
			return false;		
	};
	shape.regX = 7;
	shape.regY = 7;
	shape.r = 7.5;
	shape.x = x;
	shape.y = y;
	shape.vx = dire[0];
	shape.vy = dire[1];
	type = tipo;
	shape.life = 60;	
	shape.snapToPixel = true;	
	gameObjects.addChild(shape);
}
function GlobuloRojo(x,y,dire){
	if (ValidateAmount() == true){
		var shot = Shot(x,y,dire, "rojo");
		}
}
	
	
function GlobuloBlanco(x,y,dire){
	if (ValidateAmount() == true){
		var shot = Shot(x,y,dire, "blanco");
		}
}

function Plaqueta(x,y,dire){
	if (ValidateAmount() == true){
		var shot = new Shot(x,y,dire, "plaqueta");
		}
}



function ValidateAmount(){
	if ((glob_rojos.length + glob_blancos.length + glob_plaquetas.length ) >= 5)
		return false
	else
		return true
}


function Shoot(glob){
	var vx= Math.abs(player.vx)>0.1?1*sign(player.vx):0;
	var vy= Math.abs(player.vy)>0.1?1*sign(player.vy):0;


	if (vx == 0 && vy == 0){
		vx = player.last_x;
		vy = player.last_y;
	}
	else {
	    player.last_x = vx;
	    player.last_y = vy;
	}
	
	
	if(glob == "globRojo")GlobuloRojo(player.x,player.y-10,[vx*10,vy*10]);
	if(glob == "globBlanco")GlobuloBlanco(player.x,player.y-10,[vx*10,vy*10]);
	if(glob == "Plaqueta")Plaqueta(player.x,player.y-10,[vx*10,vy*10]);
}

function Destroy(i,arr){
	gameObjects.removeChild(arr[i]);
	arr.splice(i,1);
}

function DestroyShot(i, tipo){
	if (tipo == "rojo"){
		gameObjects.removeChild(glob_rojos[i]);
		glob_rojos.splice(i,1);
	}
	if (tipo == "blanco"){
		gameObjects.removeChild(glob_blancos[i]);
		glob_blancos.splice(i,1);
	}
	if (tipo == "plaqueta"){
		gameObjects.removeChild(glob_plaquetas[i]);
		glob_plaquetas.splice(i,1);
	}
}


function BounceShot(obj){
	obj.vy = obj.vy * -1; 
}	

function updateShot(){

    // Globulos rojos
	for (i=0; i< glob_rojos.length; i++){
		temp_rojo = glob_rojos[i];
		if(temp_rojo.vx<3)temp_rojo.vx += 0.1;
		temp_rojo.x += temp_rojo.vx+1;
		temp_rojo.y += temp_rojo.vy;
		
		temp_rojo.life--;
		if (temp_rojo.life == 0 && temp_rojo.oxigenado == 0){
			DestroyShot(i, "rojo");
			break;	
		}
		var w = collCircleWall(temp_rojo)
		if (w && w.isAlive) {
			BounceShot(temp_rojo);
			break;	
		}
		var oxi = collCircle(temp_rojo, oxygens);
		if (oxi) {
			if(temp_rojo.oxigenado<3){
				temp_rojo.oxigenado+=1;
				oxi.kill = true;
				if(sonidos)SoundJS.play("impactoxy",SoundJS.INTERRUPT_NONE);
			}
			temp_rojo.vx*=0.7;
			temp_rojo.vy*=0.7;
			console.log("choca con target");
		}
		if (collCircle(temp_rojo, bichos)) {
			for(var j=0; j<3; j++){
				var g = temp_rojo;
				Particle(g.x,g.y,"rgba(180,40,60,0.5)","rgba(240,50,70,1)",[Math.random()*8-4,Math.random()*8-4])
			}	
			if(sonidos)SoundJS.play("impactbug2",SoundJS.INTERRUPT_NONE);
			DestroyShot(i, "rojo");
		}
		if (temp_rojo.x < -300 || temp_rojo.y < upperWallY || temp_rojo.y > lowerWallY ) {
			DestroyShot(i, "rojo");
			break;		
		}
		if(temp_rojo.x > canvas.width){
			DestroyShot(i, "rojo");
			setWidth(oxigenBar,temp_rojo.oxigenado*5);
			break;
		}
	}
	
	// Globulos Blancos
	for (i=0; i < glob_blancos.length; i++){
		temp_blanco = glob_blancos[i];
		temp_blanco.x += temp_blanco.vx+1;
		temp_blanco.y += temp_blanco.vy;
		
		temp_blanco.life--;
		if (temp_blanco.life == 0){
			DestroyShot(i, "blanco");
			break;	
		}
		var w = collCircleWall(temp_blanco)
		if (w && w.isAlive) {
			BounceShot(temp_blanco);
			break;	
		}
		b = collCircle(temp_blanco, bichos)
		if (b != false) {	
			for(var j=0; j<5; j++){
				var g = temp_blanco;
				Particle(g.x,g.y,"rgba(180,200,220,0.3)","rgba(200,240,250,1)",[Math.random()*8-4,Math.random()*8-4])
			}
			console.log(b);
			b.hp-=1;
			if(sonidos)SoundJS.play("impactbug1",SoundJS.INTERRUPT_NONE);
			DestroyShot(i, "blanco");
			break;	
		} 
		if (temp_blanco.x < 0 || temp_blanco.y < upperWallY || temp_blanco.x > canvas.width || temp_blanco.y > lowerWallY ) {
			DestroyShot(i, "blanco");
			break;		
		}
	}
	
	// Plaquetas
	for (i=0; i< glob_plaquetas.length; i++){
		temp_plaqueta = glob_plaquetas[i];
		temp_plaqueta.x += temp_plaqueta.vx+1;
		temp_plaqueta.y += temp_plaqueta.vy;
		
		temp_plaqueta.life--;
		if (temp_plaqueta.life == 0){
			DestroyShot(i, "plaqueta");
			break;	
		}
		var w = collCircleWall(temp_plaqueta);
		if (w) {
			if(w.hp<5){
				w.hp++;
			}
			DestroyShot(i, "plaqueta");
			//BounceShot(temp_plaqueta);
			break;	
		}
		if (temp_plaqueta.x < 0 || temp_plaqueta.y < 0 || temp_plaqueta.x > canvas.width || temp_plaqueta.y > canvas.height ) {
			DestroyShot(i, "plaqueta");
			break;		
		}
	}
			
}
