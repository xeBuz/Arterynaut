function Heart(){
	var heart = new BitmapAnimation(spriteCorazon);
	if(shadows)heart.shadow = new Shadow("#422",0,5,4);
	heart.gotoAndPlay("beat");//default animation
	heart.currentAnim = "beat";//default current animation
	heart.r = 45;
	heart.x = (canvas.width/2);
	heart.y = 400;
	heart.snapToPixel = true;
	return heart;
}
