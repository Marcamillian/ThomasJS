var GameObject = function(){
	
	
}

GameObject.prototype = function(){
	
	// IMAGE ===================================================
	
	var image;
	
	
	
	// MOVEMENT ================================================
	
	var posX;
	var posY;
	var height = 50;
	var width = 50;
	
	
	
	// ANIMATION ================================================
	
	var animation;
	var frame;
	var frameTime;
	var facing; // 0 == right way round , 1 == flipped
	
	
	var flip = new Array(	function(ctx){
							},
							function(ctx){	ctx.scale(-1,1);
							} 
						);
	var animationData = new Array;
	// each animation has a new Array ( Frame Rate [ms] , #Frames, Looping?)
	animationData.push(new Array(300, 1, true));
	
	
	// ============================================================
	
	setUp = function(){
		posX = 20;
		posY = 20;
		
		animation = 0;
		frame = 0;
		frameTime = 0;
		facing = 0;
		
	}
	
	update = function(){
		
	}
	
	draw = function(ctx){
		var relPosX = posX; // - view ?
		var relPosY = posY;
		
		ctx.save();
		ctx.translate(relPosX, relPosY);
		flip[facing](ctx);
		ctx.drawImage(image,	// source
							frame*width, animation*height, width, height,
								// destination
							-width/2, -height/2, width, height);
		ctx.restore();
	}
	
	isVisible = function(){
		
	}
	
	animate = function(){
		// fill in the stuff here
	}
	
	speak = function(){
		
		alert("say soemthing dummy");
	}
	
	return{
		setUp:setUp,
		update:update,
		draw:draw,
		isVisible:isVisible,
		speak:speak,
	}
	
}();
