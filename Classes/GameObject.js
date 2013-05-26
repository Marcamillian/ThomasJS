var GameObject = function(){
	
}

GameObject.prototype = {
	
	images:1, // Array of all the character images in the game - ordered into an xml document?
	
	
	setup:function(/*_image,*/ _dims, _color){
		
		//this.image = _image;
		this.dims = _dims;
		this.color = _color;
	},
	
	draw:function(ctx){
		
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.translate(this.dims[0], this.dims[1]);
		ctx.fillRect(this.dims[2]/2, this.dims[3]/2, this.dims[2], this.dims[3]);
		ctx.restore()
	}
	
}

/*
GameObject.prototype = function(){
	
	// IMAGE
	var image;
	
	// MOVEMENT
	var posX;
	var posY;
	var height = 50;
	var width = 50;
	
	// ANIMATION
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
	
	setUp();
	
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
	
	draw = function(){
		
	}
	
	isVisible = function(){
		
	}
	
	animate = function(){
		// fill in the stuff here
	}
	
	return{
		setUp:setUp,
		update:update,
		draw:draw,
		isVisible:isVisible
	}
	
}();
*/