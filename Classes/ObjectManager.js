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


			/*
			// off to the left
			if( objLimits[0] >= frameLimits[1]){
				
				drawObjects.push(this.objects[i]);
				
			}else{
				
				console.log("off to the left: " + objLimits[1] + " < " + frameLimits[1]);
				
			}
			
			// off to the right
			if (objLimits[1] <= frameLimits [0]) { // left & right culling
				
				drawObjects.push(this.objects[i]);
				
			}else{
				
				console.log("off to the right: " + objLimits[0] + " > " + frameLimits[0]);
			}
			*/
			
			if ( objLimits[0] >= frameLimits[1]  &&  objLimits[1] <= frameLimits [0] ){
				
				if ( objLimits[2] >= frameLimits[3]  &&  objLimits[3] <= frameLimits [2] ){
					
					drawObjects.push(this.objects[i]);
					
				}
			}
			
			
		}
		
		return drawObjects;
		
	}
	
	
}
