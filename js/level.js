function spawner(){
	spawnCounters[0] -= 1;
	if (spawnCounters[0] <= 0){
		Oxygen(-5,Math.random()*240+80,3,0);
		spawnCounters[0] = Math.random()*30+5;

	}
	spawnCounters[1] -=1;
	if (spawnCounters[1] <= 0){
		Bug(-5,Math.random()*240+80,3,Math.random()*6-3, (Math.floor(Math.random() * 3) + 1));
		spawnCounters[1] = Math.random()*240+10;
	}
}

function setPoints(value){
	points = points + value;
}

function updatePoints(){
	setPoints(0.07);
	points_text.text = "SCORE " + zeroPad(parseInt(points), 8);
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
