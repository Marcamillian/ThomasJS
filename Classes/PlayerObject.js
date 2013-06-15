var PlayerObject = {};

PlayerObject.prototype = Object.create(GameObject.prototype);

PlayerObject.prototype.setup = function(_image , _dims){
	
	this.image = _image;
	this.dims = _dims;
}

PlayerObject.prototype.draw = function(_ctx, _scale){
	
	//alert( (this.dims[2]/2) + " , " + (this.dims[2]/2)/2);
		
	_ctx.save();
	_ctx.fillStyle = this.color;
	_ctx.translate(-this.dims[2], -this.dims[3]);
	//_ctx.fillRect((this.dims[2]/2)*_scale[0], (this.dims[3]/2)*_scale[1], (this.dims[2])*_scale[0], (this.dims[3])*_scale[1]);
	
	_ctx.drawImage(	this.image,
					//source
					0,0, this.dims[2], this.dims[3],
					// destination
					(this.dims[2]/2)*_scale[0], (this.dims[3]/2)*_scale[1], (this.dims[2])*_scale[0], (this.dims[3])*_scale[1]);
	
	_ctx.restore()
	
}

PlayerObject.prototype.update = function(){
	this.movement();
};

PlayerObject.prototype.movement = function(){
	//this.dims[0] += 4;
};
