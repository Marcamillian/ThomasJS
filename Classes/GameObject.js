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
		
		// ??? problem with the animation going > 1 - messes with the drawmask - draw mask doesnt stop at the edge of the frame???
		this.animation = 0;
		this.frame = 0;
		
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
						this.drawMask[0] + this.drawMask[2]*this.frame , this.drawMask[1] + this.drawMask[3]*this.animation , this.drawMask[2], this.drawMask[3],

						// destination
						this.drawMask[0]*_scale[0] , this.drawMask[1]*_scale[1], (this.drawMask[2])*_scale[0], (this.drawMask[3])*_scale[1]);
						
		//_ctx.strokeRect( 0, 0, (this.drawMask[2])*_scale[0], (this.drawMask[3])*_scale[1] );
		_ctx.restore();
		
	},
	
	update:function(){
		
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
	animate:function(dt){
		
		frameTime += dt;
		
		if (frameTime > animationData[animation][0]){
			frame ++;
			if (frame < (animationData[animation][1])){
				//alert("animation"+animation +" | frame:"+ (frame+1) +" of "+animationData[animation][1]);
			} else {
				if (animationData[animation][2] == false){
					animation = 0;
				}
				frame = 0;
			}
			frameTime = 0;
		}
	}
}
