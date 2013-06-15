var InputManager = function(){
	
}

InputManager.prototype = {
	
	setup: function(_focus){
		this.focusObject = _focus;
	},
	
	input: function(_evt){
		
		_evt.preventDefault();
		
		var inputObj = ThomasJS.inputManager.focusObject;
		
		var traceObject = ThomasJS.objManager.objects[1];	
		//alert(_evt.keyCode);
		
		switch(_evt.keyCode){
			case 37: 
				inputObj.input('left');
				break;
			case 38:
				inputObj.input('up');
				break;
			case 39:
				inputObj.input('right');
				break;
			case 40:
				inputObj.input('down');
				break;
			case 13:
				//traceObject.input('enter');
				break;
		}
	}
	
}
