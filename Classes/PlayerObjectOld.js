var PlayerObject = {};

PlayerObject.prototype = Object.create(GameObject.prototype);

PlayerObject.prototype.setup = function(_image , _dims){
	
	this.image = _image;
	this.dims = _dims;
	this.drawMask = [0,0, this.dims[2], this.dims[3]];
	
	this.frame =1;
	this.animation =2;

}

PlayerObject.prototype.update = function(){
	this.movement();
};

PlayerObject.prototype.movement = function(){
	//this.dims[0] += 4;
};
