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
		
		var frameLimits = [];
		frameLimits[0] = _viewDims[2]/2;
		frameLimits[1] = _viewDims[3]/2;
		
		var drawObjects = [];
		
		for ( var i=0; i < this.objects.length; i++){	// each object
			
			objDims = this.objects[i].dims;
			
			if (objDims[0] > _viewDims[0]-frameLimits[0] && objDims[0] < _viewDims[0] + frameLimits[0]){	// within the x limits
				
				if (objDims[1] > _viewDims[1]- frameLimits[1] && objDims[1] < _viewDims[1] + frameLimits[1]){	// within the y limits
					drawObjects.push(this.objects[i]);		// add to the draw pile
				}
				
			}
			
		}
		
		return drawObjects;
		
	}
	
}
