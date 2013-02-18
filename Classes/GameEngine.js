var GameEngine = function(){
	
	// GET ALL THE IMAGES
	var backgroundSprite = 

}

GameEngine.prototype = function(){
	
	var inheritVar1 = "something";
	var inheritVar2 = "something else"
	
	// ============== VARIABLES ==================
	
	// IMPORTANT DRAWING STUFF
	var WIDTH;
	var HEIGHT;
	var canvas;
	var ctx;
	
	var camera;
	
	// TIMING STUFF
	var dt = 0;
	var globalTime;  
	
	// OBJECT HANDELLING
	var objectStack = new Array;
	
	
	// ============== METHODS ===================
	
	// CORE METHODS
	
	// start state (will reset if need be)
	setUp = function(){
		dt = 0;
		gameTime = null;
		
		canvas = document.getElementById("game-canvas");
		ctx = canvas.getContext("2d");
		
		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		
		camera = new GameCamera(ctx);
		
	}
	
	// update the movements
	update = function(){
		advGameTime();
		alert(globalTime);
		
		draw();
		
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
	
	
	// OTHER METHODS
	
	talk1 = function (){
		alert(inheritVar1);
	}
	
	talk2 = function(){
		alert(inheritVar2);
	}
	
	
	// PUBLIC METHODS
	return{
		talk1:talk1,
		talk2:talk2,
		setUp:setUp,
		update:update
	}
	
}();