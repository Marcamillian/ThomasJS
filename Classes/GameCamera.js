var GameCamera = function(){
	
}

GameCamera.prototype = {
	
	setup: function(_dims){
		
		this.dims = _dims; // worldDims
		// add in some output dims for multiple cameras
		
	},
	
	draw: function(_ctx, _objects){
		
		this.clearCanvas(_ctx);
		
		for ( var i=0; i < _objects.length; i++){
			
			var objDims = _objects[i].dims;
			var drawDims = [];
			
			drawDims[0] = objDims[0] - this.dims[0]; // x dims with respect to the middle of the camera
			drawDims[1] = objDims[1] - this.dims[1]; // y dims with respect to the middle of the camera
			
			//alert(drawDims[0]+" : "+drawDims[1]);
			//alert(this.dims[2]/2 + " : " + this.dims[3]/2);
			
			_ctx.save();
			_ctx.translate( (this.dims[2]/2) + drawDims[0], (this.dims[3]/2) + drawDims[1]);
			_objects[i].draw(_ctx);
			_ctx.restore();
		}
	},
	
	clearCanvas: function(_ctx){
		
		_ctx.save();
		_ctx.fillStyle = 'white';
		_ctx.fillRect(0, 0, 900, 600); // these should be the outpt dims
		_ctx.restore();
	},
	
	input: function (_direction){
		switch(_direction){
			case 'up':
				this.dims[1] -= 5;
				break;
			case 'down':
				this.dims[1] += 5;
				break;
			case 'left':
				this.dims[0] -= 5;
				break;
			case 'right':
				this.dims[0] += 5;
				break;
		}
	},
}
