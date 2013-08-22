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
	
	kdInput: function(_evt){
		
		var inputObj = ThomasJS.inputManager.camera;
		var player = ThomasJS.inputManager.player;
		
		//alert(_evt.keyCode);
		
		switch(_evt.keyCode){
			case 37: 
				_evt.preventDefault();
				//inputObj.input('right');
				player.kdInput('left');
				break;
			case 38:
				_evt.preventDefault();
				//inputObj.input('down');
				player.kdInput('up');
				break;
			case 39:
				_evt.preventDefault();
				//inputObj.input('left');
				player.kdInput('right');
				break;
			case 40:
				_evt.preventDefault();
				//inputObj.input('up');
				player.kdInput('down');
				break;
			case 13:
				player.kdInput('enter');
				break;
		}
	},
	
	kuInput: function(_evt){
		
		var inputObj = ThomasJS.inputManager.camera;
		var player = ThomasJS.inputManager.player;
		
		//alert(_evt.keyCode);
		
		switch(_evt.keyCode){
			case 37: 
				_evt.preventDefault();
				//inputObj.input('right');
				player.kuInput('left');
				break;
			case 38:
				_evt.preventDefault();
				//inputObj.input('down');
				player.kuInput('up');
				break;
			case 39:
				_evt.preventDefault();
				//inputObj.input('left');
				player.kuInput('right');
				break;
			case 40:
				_evt.preventDefault();
				//inputObj.input('up');
				player.kuInput('down');
				break;
			case 13:
				player.kuInput('enter');
				break;
		}
	}
	
}
