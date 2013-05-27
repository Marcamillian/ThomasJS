var GameCamera = function(){
	
}

GameCamera.prototype = {
	
	setup: function(_dims, _outDims){
		
		this.dims = _dims; // worldDims -- world x,y - frame scale
		this.outputDims = _outDims;
		// add in some output dims for multiple cameras
		
	},
	
	draw: function(_ctx, _objects){
		
		// find the center of where we will be drawing on the canvas
		var outputCorner = [0,0];
		outputCorner[0] = this.outputDims[0] - this.outputDims[2]/2; // viewPos top left x relative to the viewPos center
		outputCorner[1] = this.outputDims[1] - this.outputDims[3]/2; // viewPos top left y relative to the viewPos center
		
		//  ****************  move to the center of the view  *******************
		
		_ctx.save();
		_ctx.translate(this.outputDims[0], this.outputDims[1]); 

		this.clearView(_ctx);	

		_ctx.strokeStyle = 'red';
		_ctx.strokeRect(-this.outputDims[2]/2, -this.outputDims[3]/2, this.outputDims[2], this.outputDims[3]); // - move to the right place
		
		// move to the center of the view & draw the center
		_ctx.strokeStyle = 'green';
		_ctx.strokeRect(-25,-25, 50, 50);
		
		// loop thrught drawing the objects
		for ( var i=0; i < _objects.length; i++){
			
			var objDims = _objects[i].dims;
			var relPos = [];
			
			relPos[0] = objDims[0] - this.dims[0]; // x position with respect to the middle of the camera
			relPos[1] = objDims[1] - this.dims[1]; // y position with respect to the middle of the camera
			
			// SCALE ASSUMED TO BE 1:1
			//if (this. < this.outputDims[0])
			
			_ctx.save();
			_ctx.translate(relPos[0], relPos[1]);
			_objects[i].draw(_ctx);
			_ctx.restore();
			
		}
		
		_ctx.restore();
		
		//  *************   restore from the center of the view  ********************
	},
	
	clearView: function(_ctx){
		
		_ctx.save();
		_ctx.fillStyle = 'white';
		_ctx.fillRect(- this.outputDims[2]/2, -this.outputDims[3]/2, this.outputDims[2], this.outputDims[3]); // these should be the outpt dims
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
