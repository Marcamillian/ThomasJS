ObjectManager = function(){

};

ObjectManager.prototype = {
	
	setup: function(){
		this.objects = [];
	},
	
	addObject: function(_object){
		this.objects.push(_object);
	},
	
	update: function(){
		
		for ( var i=0; i < this.objects.length; i++){
			this.objects[i].update();
			//this.objects[i].draw(ctx);
		}
		
		return this.objects;
	}, 
	
	getObjects: function(_viewDims){
		
		//return this.objects;
		
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
			
				//top left  x less than width 			// bottom right x less than width
			if ( tlVector[0] >=  - objDims[2]  &&  brVector[0] <= objDims[2] ){
				
					// top left y less than height		// bottom right less than height
				if ( tlVector[1] >= - objDims[3] &&  brVector[1] <= objDims[3] ){
					
					// check to see if it is partiall on
					if (tlVector[0]*tlVector[1] < 0  || brVector[0]*brVector[1] < 0){
						console.log("pratially on");
					}
			
					drawObjects.push(this.objects[i]);
					
				}else{
					console.log("lost it vert");
				}
				
			}else{
				console.log("lost it horiz");
			}
			
		}
		
		return drawObjects;
		
	}
	
	
}
