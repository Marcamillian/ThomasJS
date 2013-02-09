
/*	CROCKFORD TRUE PROTOTYPICAL FORMULATION
function object(o){
	function F(){}
	F.prototype = o;
	return new F;
}
*/

// STANDARD FUNCTIONS
function create(parent){
	var F = function(){};	// create an empty function
	F.prototype = parent;	// set the parent prototype
	return new F();			// give back this object with the right prototype 
}

// IMPORT IMAGES

var charSprite = new Image();
charSprite.src = 'Assets/StandWalkInteract.png'
var houseImg = new Image();
houseImg.src = 'Assets/House.png';


var init = function(){
	
	var engine1 = new GameEngine();
	engine1.setUp();
	
	var player1 = new GameObject;
	
	player1.speak();
	
	return setInterval(engine1.update, 33);
	
}






