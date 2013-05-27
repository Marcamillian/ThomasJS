var PlayerObject = {};

PlayerObject.prototype = Object.create(GameObject.prototype);

PlayerObject.prototype.update = function(){
	this.movement();
};

PlayerObject.prototype.movement = function(){
	//this.dims[0] += 4;
};
