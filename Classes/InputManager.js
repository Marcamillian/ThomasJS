var InputManager = function(){
	
}

/* 
 * Input manager needs to throw appropriate signals to the appropriate object 
 */

InputManager.prototype = {
	
	setup: function(_camera, _player){
		this.camera = _camera;
		this.player = _player;
	},
	
	input: function(_evt){
		
		var inputObj = ThomasJS.inputManager.camera;
		var player = ThomasJS.inputManager.player;
		
		//alert(_evt.keyCode);
		
		switch(_evt.keyCode){
			case 37: 
				_evt.preventDefault();
				inputObj.input('left');
				break;
			case 38:
				_evt.preventDefault();
				inputObj.input('up');
				break;
			case 39:
				_evt.preventDefault();
				inputObj.input('right');
				break;
			case 40:
				_evt.preventDefault();
				inputObj.input('down');
				break;
			case 13:
				player.input('enter');
				break;
		}
	}
	
}
