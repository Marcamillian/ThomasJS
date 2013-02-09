var GameObject = function(){
	
	
}

GameObject.prototype = function(){
	
	// IMAGE ===================================================
	
	this.image;
	
	
	
	// MOVEMENT ================================================
	
	this.posX;
	this.posY;
	this.height = 50;
	this.width = 50;
	
	
	
	// ANIMATION ================================================
	
	this.animation;
	this.frame;
	this.frameTime;
	this.facing; // 0 == right way round , 1 == flipped
	
	
	this.flip = new Array(	function(ctx){
							},
							function(ctx){	ctx.scale(-1,1);
							} 
						);
	this.animationData = new Array;
	// each animation has a new Array ( Frame Rate [ms] , #Frames, Looping?)
	this.animationData.push(new Array(300, 1, true));
	
	
	
	
	// ============================================================
	
	this.setUp = function(){
		this.posX = 20;
		this.posY = 20;
		
		this.animation = 0;
		this.frame = 0;
		this.frameTime = 0;
		this.facing = 0;
		
	}
	
	this.update = function(){
		
	}
	
	this.draw = function(ctx){
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
	
	this.isVisible = function(){
		
	}
	
	this.animate = function(){
		// fill in the stuff here
	}
	
	this.speak = function(){
		
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
