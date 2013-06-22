var InputManager = function(){
	
}

InputManager.prototype = {
	
	setup: function(_focus){
		this.focusObject = _focus;
	},
	
	input: function(_evt){
		
		var inputObj = ThomasJS.inputManager.focusObject;
		
		var traceObject = ThomasJS.objManager.objects[1];	
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
				//traceObject.input('enter');
				break;
		}
	}
	
}
