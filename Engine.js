
/*	CROCKFORD TRUE PROTOTYPICAL FORMULATION
function object(o){
	function F(){}
	F.prototype = o;
	return new F;
}
*/

// IMPORT IMAGES

var charSprite = new Image();
charSprite.src = 'Assets/StandWalkInteract.png'
var houseImg = new Image();
houseImg.src = 'Assets/House.png';


var init = function(){
	
	var engine1 = new GameEngine();
	engine1.setUp();
	
	var player = new GameObject(image, 20, 20);
	
	return setInterval(engine1.update, 33);
	
}






