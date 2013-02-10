
// STANDARD FUNCTIONS
function create(parent){
	var F = function(){};	// create an empty function
	F.prototype = parent.prototype;	// set the parent prototype
	return new F();			// give back this object with the right prototype 
}

// IMPORT IMAGES

var charSprite = new Image();
charSprite.src = 'Assets/StandWalkInteract.png'
var houseImg = new Image();
houseImg.src = 'Assets/House.png';


var init = function(){
	
	var engine1 = create(GameEngine);
	
	//engine1.addObeject(new GameObject(houseImg, 0, 0, 2400, 728));
	engine1.addObject(charSprite, 20, 20 , 128, 256);
	
	return setInterval(engine1.update, 33);
	
}






