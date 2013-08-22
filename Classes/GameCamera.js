var GameCamera = function(){
	
}

GameCamera.prototype = {
	
	setup: function(_dims, _outDims){
		
		this.dims = _dims; // worldDims -- world x,y - frame scale
		this.outputDims = _outDims;	// where it is drawing to 
		
		this.scale = [];
		this.scale[0] = this.outputDims[2] / this.dims[2];
		this.scale[1] = this.outputDims[3] / this.dims[3];
		
		// add in some output dims for multiple cameras
		this.screenObjs = 0;
	},
	
	draw: function(_ctx, _objects){
		
		if (this.screenObjs != _objects.length){
			this.screenObjs = _objects.length;
			//alert("objects on screen : " + this.screenObjs);
		}
		
		// find the center of where we will be drawing on the canvas
		var outputCorner = [0,0];
		outputCorner[0] = this.outputDims[0] - this.outputDims[2]/2; // viewPos top left x relative to the viewPos center
		outputCorner[1] = this.outputDims[1] - this.outputDims[3]/2; // viewPos top left y relative to the viewPos center
		
		//  ****************  move to the center of the view  *******************
		
		_ctx.save();
		_ctx.translate(this.outputDims[0], this.outputDims[1]); 

		this.clearView(_ctx);	
		
		// move to the center of the view & draw the center
		_ctx.strokeStyle = 'green';		
		_ctx.strokeRect( -(this.dims[2]/4)*this.scale[0],-(this.dims[3]/4)*this.scale[1], (this.dims[2]/2)*this.scale[0], (this.dims[3]/2)*this.scale[1] );
		
		// loop thrught drawing the objects
		for ( var i=0; i < _objects.length; i++){
			
			// NEED TO MASK THE DRAW POINT CHANGE IT FROM THE CENTER IF IT NEEDS IT
			
			var objDims = _objects[i].dims;
			var relPos = [];
			
			relPos[0] = objDims[0] - this.dims[0]; // x position with respect to the middle of the camera
			relPos[1] = objDims[1] - this.dims[1]; // y position with respect to the middle of the camera
			
			// SCALE ASSUMED TO BE 1:1
			//if (this. < this.outputDims[0])
			
			_ctx.save();
			_ctx.translate(relPos[0]*this.scale[0], relPos[1]*this.scale[1]); // moves so we get teh relPos - could pass it
			_objects[i].draw(_ctx, this.scale);
			_ctx.restore();
			
		}
		
		
		_ctx.strokeStyle = 'black';
		_ctx.strokeRect(-this.outputDims[2]/2, -this.outputDims[3]/2, this.outputDims[2], this.outputDims[3]); // - move to the right place
		
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
	
	update: function(_focusPos){
		this.cameraBound(_focusPos);
	},
	
	cameraBound: function(_focusDims){ //follows the focus object if it leaves a bounding box
		// do we need to do it to the postion or to the visible object limits??

		// SET OUT THE BOUNDING BOX
			// use global positioning  - need to reference camera width as well
			
		var bound = [	[ this.dims[0] - this.dims[2]/4  , this.dims[0] + this.dims[2]/4 ],
						[ this.dims[1] - this.dims[3]/4  , this.dims[1] + this.dims[3]/4 ]
					];
		
		
		if (_focusDims[0] < bound[0][0]){
			this.dims[0] -= 5;
		} else if (_focusDims[0] > bound[0][1]){
			this.dims[0] += 5;
		}
		
		if (_focusDims[1] < bound[1][0]){
			this.dims[1] -= 5;
		} else if (_focusDims[1] > bound[1][1]){
			this.dims[1] += 5;
		}
		
		// compare it (x&y) to the focus objectPostion 
		
	}
}
