var GameObject = function(){
	
}

GameObject.prototype = {
	
	images:1, // Array of all the character images in the game - ordered into an xml document?
	
	setup:function(_image, _dims, _color){
		
		this.dims = _dims;

		if (_image != null){
			this.image = _image;
			this.draw = this.imageDraw;
		}else{
			this.color = _color;
			this.draw = this.shapeDraw;
		}
		
		this.drawMask = [0,0, this.dims[2], this.dims[3]];
		
		// animation references
		// ANIMATION NAME = new array (FRAME-RATE(in ms), FRAMES, LOOP)
		this.animationData = new Array;
		this.animationData.push(new Array(300, 1, true)); 	//  0 - stand
		this.animationData.push(new Array(300, 2, true));	//  1 - walk 
		this.animationData.push(new Array(600, 1, false));	// 	2 - interact
	
		this.animation = 1 ;
		this.frame = 0;
		this.frameTime = 0;

		
	},
	
	shapeDraw:function(_ctx, _scale ){
		
		_ctx.save();
		_ctx.fillStyle = this.color;
		_ctx.translate(-(this.dims[2]/2)*_scale[0], -(this.dims[3]/2)*_scale[1]); // move to top left
		_ctx.translate( this.drawMask[0]*_scale[0] , this.drawMask[1]*_scale[1] );	// move to the culled draw position top left
		_ctx.fillRect( 0, 0, (this.drawMask[2])*_scale[0], (this.drawMask[3])*_scale[1] ); // draw the width that we are working with
		
		_ctx.restore()
	},
	
	imageDraw:function(_ctx, _scale){
		
		_ctx.save();
		_ctx.translate(-(this.dims[2]/2)*_scale[0], -(this.dims[3]/2)*_scale[1]); // move to top left
		
		_ctx.drawImage(	this.image,
						//source
						this.dims[2]*this.frame + this.drawMask[0] , this.dims[3]*this.animation + this.drawMask[1] , this.drawMask[2], this.drawMask[3],

						// destination
						this.drawMask[0]*_scale[0] , this.drawMask[1]*_scale[1], (this.drawMask[2])*_scale[0], (this.drawMask[3])*_scale[1]);
		//console.log()
						
		//_ctx.strokeRect( 0, 0, (this.drawMask[2])*_scale[0], (this.drawMask[3])*_scale[1] );
		_ctx.restore();
		
	},
	
	update:function(_dt){
		//console.log("update: "+ this.frameTime);
		this.animate(_dt);
		
	},
	
	input:function(){
		alert(this.dims);
	},
	setDrawMask:function(_drawMask){
		
		if(_drawMask == null){
			this.drawMask = [0,0,this.dims[2], this.dims[3]];
		}else{
			this.drawMask = _drawMask;
		}
		
		
	},
	animate:function(_dt){
		
		//console.log(this.frameTime);
		
		this.frameTime += _dt;
		
		console.log(this.frameTime);
		/*
		if (this.frameTime > this.animationData[this.animation][0]){
			this.frame ++;
			if (this.frame < (this.animationData[this.animation][1])){
				//alert("animation"+animation +" | frame:"+ (frame+1) +" of "+animationData[animation][1]);
			} else {
				if (this.animationData[this.animation][2] == false){
					this.animation = 0;
				}
				this.frame = 0;
			}
			this.frameTime = 0;
		}
		*/
	}
}
