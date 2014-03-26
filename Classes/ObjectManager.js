ObjectManager = function(){

};

ObjectManager.prototype = {
	
	setup: function(){
		this.objects = [];
	
	},
	
	followVars: function(_camera, _player){
		this.player = _player;
		this.camera = _camera;
	},
	
	addObject: function(_object){
		this.objects.push(_object);
	},
	
	update: function(_dt){
		
		// === debug ThomasJS.getData === Aconsole.log("found the item : " + ThomasJS.findData(ThomasJS.visData, ["washingMachine","anim_data","on","framerate"]));
		
		for ( var i=0; i < this.objects.length; i++){
			this.objects[i].update(_dt);
			//this.objects[i].draw(ctx);
		}
		
		this.camera.cameraBound(this.player.dims);
		
		return this.objects;
	}, 
	
	getObjects: function(_viewDims){
		
		var frameLimits = [];
		frameLimits[0] = _viewDims[0] + (_viewDims[2]/2); // right edge
		frameLimits[1] = _viewDims[0] - (_viewDims[2]/2); // left edge
		frameLimits[2] = _viewDims[1] + (_viewDims[3]/2); // bottom edge
		frameLimits[3] = _viewDims[1] - (_viewDims[3]/2); // top edge
		
		
		var drawObjects = [];
		
		for ( var i=0; i < this.objects.length; i++){	// each object
			
			var objDims = this.objects[i].dims;
			
			var objLimits = [];	// distance from middle to edge
			objLimits[0] = objDims[0] + (objDims[2]/2);	// right edge
			objLimits[1] = objDims[0] - (objDims[2]/2);	// left edge
			objLimits[2] = objDims[1] + (objDims[3]/2);	// bottom edge
			objLimits[3] = objDims[1] - (objDims[3]/2);	// top edge

			// vectors between top left between corners
			var tlVector = [];
			tlVector[0] = objLimits[1] - frameLimits[1];
			tlVector[1] = objLimits[3] - frameLimits[3];
			
			// vectors between bottom right corners
			var brVector = [];
			brVector[0] = objLimits[0] - frameLimits[0];
			brVector[1] = objLimits[2] - frameLimits[2];
			
			// if horizontally on the screen
			if ( tlVector[0] >=  - objDims[2]  &&  brVector[0] <= objDims[2] ){			//top left  x less than width 		&&		// bottom right x less than width
				
				// if horizontally on the screen
				if ( tlVector[1] >= - objDims[3] &&  brVector[1] <= objDims[3] ){		// top left y less than height		&& 		// bottom right less than height
					
					// if partiallly on --- make the mask 
					if (tlVector[0]		< 0 
						|| tlVector[1] 	< 0
						|| brVector[0]	> 0
						|| brVector[1]	> 0){
						// this doesnt pick up top left & bottom right as being partially
						
						drawMask = [0, 0, objDims[2], objDims[3]];
						
						// ==== for the top left adjustment
						
						// if tlVector[0]   if -ve	//off the left
						if( tlVector[0] < 0){
							drawMask[0] = Math.abs(tlVector[0]);	// x position on the sprite to start drawing 
							drawMask[2] = objDims[2] - Math.abs(tlVector[0]); 	// x width pf the sprite to draw
						}
						
						// if tlVector[1]   if-ve	//off the top
						if( tlVector[1] < 0){
							drawMask[1] = Math.abs(tlVector[1]);	// y position onthe sprite to start drawing 
							drawMask[3] = objDims[3] - Math.abs(tlVector[1]); // y height of hte sprite to draw
						}
						
						// ==== for the bottom right adjustment ====
						// the start point will always be the same
						
						// !! WORKING HERE - NEED TO FIGURE OUT WIDTH FOR BIGGER SPRITES
						
						if (brVector[0] > 0){	// off the right
							//drawMask[2] = objDims[2] - Math.abs(brVector[0]);	// x width of the sprite to draw
							var someWidth = objDims[2] - Math.abs(brVector[0]);
							drawMask[2] = Math.min( Math.max( someWidth , 0) ,  _viewDims[2] );	// clamp between the view 
							
						}
						
						if (brVector[1] > 0){	// off the bottom
							//drawMask[3] = objDims[3] - Math.abs(brVector[1]); // y height ofthe sprite to draw
							var someHeight = objDims[3] - Math.abs(brVector[1]);
							drawMask[3] = Math.min( Math.max( someHeight , 0) ,  _viewDims[3] );	// clamp between the view 
							
						}
						
						//alert(drawMask);
						
						this.objects[i].setDrawMask(drawMask);
						
					}else{
						this.objects[i].setDrawMask();
					}
			
					drawObjects.push(this.objects[i]);
					
					
					
				}else{
					//console.log("lost it vert");
				}
				
			}else{
				//console.log("lost it horiz");
			}
			
		}
		
		return drawObjects;
		
	}
	
	
}
