
/*	CROCKFORD TRUE PROTOTYPICAL FORMULATION
function object(o){
	function F(){}
	F.prototype = o;
	return new F;
}
*/

var init = function(){
	
	var engine1 = new GameEngine();
	engine1.setUp();
	
	return setInterval(engine1.update, 33);
	
}






