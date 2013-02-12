function Bar(x, color, tipo){ //tipo 1=oxigen tipo 2=health
	bar = new Shape();
	bar.w = 360;
	bar.h = 20;
	bar.x = x;
	bar.y = 390;
	bar.color = color
	bar.tipo = tipo;
	bar.graphics.beginFill(bar.color).drawRoundRect(0, 0, bar.w, bar.h,20);
	return bar;
}

function setWidth(bar, valor)
{
	bar.w = bar.w + valor;
	if(bar.w > 360) {
		bar.w = 360;
		bar.x = 15;
	} else {	
		if (bar.tipo == 1)
		{	
			bar.x = bar.x-valor;
		}
	}
	
	if(bar.w <= 0 ){
		gameOver();
		return false;
	}

	bar.graphics.clear();
	bar.graphics.beginFill(bar.color).drawRoundRect(0, 0, bar.w, bar.h,20);
}


