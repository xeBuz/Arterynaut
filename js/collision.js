function collCircleWall(obj){
	var vx = obj.vx;
	var vy = obj.vy;
	var r = obj.r;
	if(obj.y+vy-r<upperWallY){
		return upperWall[Math.floor(obj.x/40)];
	}
	if(obj.y+vy+r>lowerWallY){
		return lowerWall[Math.floor(obj.x/40)];
	}
	return false;
}

function collPointBox(obj, o){
	var vx = obj.vx;
	var vy = obj.vy;
	var div = Math.max(Math.abs(vx), Math.abs(vy));
	for(var i=0; i<div; i++){
		for(var j=0; j<o.length; j++){
			var p = o[j];
			px = obj.x + (vx*i)/div;
			py = obj.y + (vy*i)/div;
			if(px>p.x && px<p.x+p.w && py>p.y && py<p.y+p.h){
				return p;
			}
		}
	}
	return false;
}

function collCircle(obj, o){
	
	var vx = obj.vx;
	var vy = obj.vy;
	var div = Math.max(Math.abs(vx), Math.abs(vy));
	for(var i=0; i<div; i++){
	
		for(var j=0; j<o.length; j++){
			var p = o[j];
			px = obj.x + (vx*i)/div;
			py = obj.y + (vy*i)/div;

			if(distance(px,py,p.x,p.y)<p.r+obj.r){
				return p;
			}
		}
	}
	return false;
}

function distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function direction(x1,y1,x2,y2){
	var vx = x2-x1;
	var vy = y2-y1;
	var l = Math.sqrt(vx*vx+vy*vy);
	return [vx/l, vy/l];

}

function Particle(x,y,color1,color2,dir){
	var shape = new Shape();
	shape.graphics.beginFill(color1).drawCircle(0,0,6).beginFill(color2).drawCircle(0,0,3);
	//shape.graphics.beginFill(color1).rect(-6,-6,12,12).beginFill(color2).rect(-3,-3,6,6);
	shape.x = x;
	shape.y = y;
	shape.v = 20;
	shape.vx = dir[0];
	shape.vy = dir[1];
	shape.snapToPixel = true;
	shape.cache(-6,-6,12,12);
	stage.addChild(shape);
	particles.push(shape);
	return shape;
}

function updateParticles(){
	for(var i=0; i<particles.length; i++){
		var p = particles[i];
		p.x += p.vx;
		p.y += p.vy;
		p.v -= 1;
		p.v<10?p.alpha-=0.1:true;
		if(p.v<=0){
			Destroy(i,particles);
		}
	}
}
