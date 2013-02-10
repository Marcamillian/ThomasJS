var GameEngine = function(){

	var inheritVar1 = "something";
	
	// ============== VARIABLES ==================
	
	// IMPORTANT DRAWING STUFF
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");
		
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	
	// TIMING STUFF
	var dt = 0;
	var globalTime;  
	
	// OBJECT HANDELLING
	var objectStack = new Array;

}

GameEngine.prototype = function(){
	
	// CORE METHODS
	
	// start state (will reset if need be)
	setUp = function(){
		dt = 0;
		gameTime = null;
		
	}
	
	// update the movements
	update = function(){
		advGameTime();
		//alert(globalTime);
		
		for (var i=0 ; i < objectStack.length ; i++){
			objectStack[i].draw(ctx);
		}
		
	}
	
	
	// draw the objects
	draw = function(){
		
		// for each object
		for (var i=0 ; i < objectStack.length ; i++){
			
			if ( objectStack[i].isVisible() ){
				objectStack.draw();
			}
				
		}
		
	}
	
	// advance the time
	advGameTime = function(){
		var clock = new Date();
		var currentTime = clock.getTime();
		
		dt = currentTime - globalTime;
		globalTime = currentTime;
	}
	
	addObject = function (object){
		obejectStack.push(object);
	}
	
	// OTHER METHODS
	
	talk1 = function (){
		alert(inheritVar1);
	}
	
	
	// PUBLIC METHODS
	return{
		talk1:talk1,
		setUp:setUp,
		update:update,
		addObject:addObject,
	}
	
}();