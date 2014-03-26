var ThomasJS = {
	something: 'something',
	
	init:function (){
		
		this.canvas = document.getElementById('game-canvas');
		this.ctx = this.canvas.getContext('2d');
		this.WIDTH = this.canvas.width;
		this.HEIGHT = this.canvas.height;
		
		this.elapsedTime = 0;
		this.lastTime = 0;
		this.dt;
		
		// initialise engineObjects
		this.objManager = Object.create(ObjectManager.prototype);
		this.objManager.setup();
		
		this.camera = Object.create(GameCamera.prototype);
		this.camera.setup([0, 0, this.WIDTH, this.HEIGHT], [this.WIDTH/2, this.HEIGHT/2, this.WIDTH/2, this.HEIGHT/2]);
		
		// load all the sprites
		this.playerSprite = new Image();
		this.playerSprite.src = 'Assets/StandWalkInteract.png';
		
		this.backgroundSprite = new Image();
		this.backgroundSprite.src = 'Assets/House.png';
		
		this.wMachineSprite = new Image();
		this.wMachineSprite.src = 'Assets/WashingMachineSheet.png';
		
		// load the JSON animation data
		// ========================

		this.objectData = [];
		$.getJSON('Data/ObjectData.xml', "somethingElse", function(data) {
			ThomasJS.objectData = data.level_objects;
			console.log("load Object Data");
		});
   		
		this.visData = [];
		$.getJSON('Data/SpriteAndAnim.xml', "somethingTooToo", function(data) {
			ThomasJS.visData = data.visual_data;
			console.log("load in visual Data (sprite & anim)");
		});
		
		//console.log("found the item : " + this.findData(this.visData, ["player"]));
		// initalise the gameObjects
		//getJSON runs later getAnims has no value
		
		var background = Object.create(GameObject.prototype);
		background.setup(this.backgroundSprite, [ 0, 0, 2400, 728] , 'red');
		this.objManager.addObject(background);
		
		
		var player = Object.create(PlayerObject.prototype);
		player.setup(this.playerSprite, [0 , 0, 128, 256] , 'red');//, ThomasJS.getAnims("player"));
		this.objManager.addObject(player);
		
		var wMachine = Object.create(GameObject.prototype);
		wMachine.setup(this.wMachineSprite, [-513, 270, 100, 100], 'red');//, ThomasJS.getAnims("washingMachine"));
		this.objManager.addObject(wMachine);
		
		// CREATE THE INPUT MANAGER
		this.inputManager = Object.create(InputManager.prototype);
		this.inputManager.setup(this.camera, player);
		
		document.addEventListener('keydown', ThomasJS.inputManager.kdInput, true);
		document.addEventListener('keyup', ThomasJS.inputManager.kuInput, true);
		
		// set the player & camera variables in the object manager
		this.objManager.followVars(this.camera, player);
		
		
		// set the loop
		setInterval(ThomasJS.gameLoop, 33);
		
	},
	
	gameLoop: function(){
		
		ThomasJS.advGameTime();
		ThomasJS.objManager.update(ThomasJS.dt);
		var viewObjects = ThomasJS.objManager.getObjects(ThomasJS.camera.dims);
		ThomasJS.camera.draw(ThomasJS.ctx, viewObjects);
		
	},
	
	advGameTime: function(){
		
		var clock = new Date();
		var currentTime = clock.getTime();
		
		this.dt = currentTime - this.lastTime;
		this.lastTime = currentTime;
		this.elapsedTime = 0 + this.dt;
		
	},
	
	objectInit: function(){
		
	},
	
	getAnim: function(_spriteSearch, _animSearch){
		
		var animData = ThomasJS.animationValues; 
		
		var spriteIndex = null;
		var animIndex = null;
		
		//search for sprite index
		for( var i=0 ; i < animData.length ; i++){
			if ( Object.keys(animData[i]) == _spriteSearch ){
				spriteIndex = i;
				
				for ( var j=0; j < animData[spriteIndex][ _spriteSearch ].length; j++){
					if ( Object.keys( animData[spriteIndex][_spriteSearch][j] ) == _animSearch){
						animIndex = j;
						break;
					}
					
				}
				
				break;
				
			} else{
				alert("sprite not found");
			}
		}
		
		var searchReturn = animData[spriteIndex][_spriteSearch][animIndex][_animSearch];
		
		var returnValues = [ searchReturn[0]['framerate'], searchReturn[1]['frames'], searchReturn[2]['loop'] ];
		
		return returnValues;
		
	},
	
	getAnims: function(_spriteSearch){
		var animData = ThomasJS.animationValues;
		
		var spriteIndex = null;
		
		for( var i=0; i < animData.length; i++){
			if (Object.keys(animData[i]) == _spriteSearch){
				spriteIndex = i;
				
				var anims = new Array();
				
				for (var j=0; j < animData[spriteIndex][ _spriteSearch ].length; j++){
					
					var animName = Object.keys( animData[spriteIndex][_spriteSearch][j]);
					var valuePath = animData[spriteIndex][_spriteSearch][j][animName];
					var animValues = [ valuePath[0]['framerate'], valuePath[1]['frames'], valuePath[2]['loop'] ];
					
					anims.push(animValues);
				}
				
			}
		}
		return anims;	
	},
	
	pullJSON: function(_source, _targetObject, _targetVariable){
		
		var sourceData = _source; 
		
		// trying to make it look for a particular value
		for (var i=0; i++; i > _targetObject.length){
			console.log(i);
			i++;
		}
		
		var objectIndex = null;
		var variableIndex = null;
		
		//search for sprite index
		for( var i=0 ; i < sourceData.length ; i++){
			if ( Object.keys(sourceData[i]) == _targetObject ){
				objectIndex = i;
				
				for ( var j=0; j < sourceData[objectIndex][ _targetObject ].length; j++){
					if ( Object.keys( sourceData[objectIndex][_targetObject][j] ) == _targetVariable){
						variableIndex = j;
						break;
					}
					
				}
				
				break;
				
			} else{
				alert("sprite not found");
			}
		}
		
		var searchReturn = sourceData[objectIndex][_targetObject][variableIndex][_targetVariable];
		
		var returnValues = [ searchReturn[0]['framerate'], searchReturn[1]['frames'], searchReturn[2]['loop'] ];
		
		return searchReturn;
		
	},
	findData: function(_source, _targetObjects){
		
		var sourceData = _source;	// set the initial JSON object to look into
		
		//console.log("something : " + _targetObjects[0]);
		
		for (var t =0; t < _targetObjects.length; t++){ // looping through the _targetObjects array - going down levels in the data
			
			// == debug comp target value === console.log("object : " + _targetObjects[t]);
			
			for (var i=0; i < sourceData.length; i++){ // looping through sourceData keys
			
			//=== debug comp sourceData value === console.log("source comparison : " + Object.keys(sourceData[i]));

				if (_targetObjects[t] == Object.keys(sourceData[i])){
					sourceData = sourceData[i][_targetObjects[t]];
					//=== debug comp match confirm === console.log("yes");
					break;
				}
			}
		}
		
		
		
		
		if (sourceData == _source)
			return "couldn't find '" + _targetObjects[t] + "'";
		else
			return sourceData;
			
			
	} 
}




