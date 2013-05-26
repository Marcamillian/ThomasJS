var PlayerObject = {};

PlayerObject.prototype = Object.create(GameObject.prototype);

PlayerObject.prototype.update = function(ctx){
	alert('doing update');
	//this.movement();
	//this.draw(ctx);
};

PlayerObject.prototype.movement = function(){
	this.dims[0] += 4;
};

PlayerObject.prototype.movement = function(){
	alert('is moving');
};
