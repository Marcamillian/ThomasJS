ObjectManager = function(){

};

ObjectManager.prototype = {
	
	setup: function(){
		this.objects = [];
	},
	
	addObject: function(_object){
		this.objects.push(_object);
	},
	
	gameLoop: function(){
		
		for ( var i=0; i < this.objects.length; i++){
			this.objects[i].update();
		}
		
	}, 
	
	
	
}
