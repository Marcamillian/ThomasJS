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
		this.camera.setup([0, 0, this.WIDTH, this.HEIGHT], [this.WIDTH/2, this.HEIGHT/2, this.WIDTH, this.HEIGHT]);
		
		// CREATE THE INPUT MANAGER
		this.inputManager = Object.create(InputManager.prototype);
		//this.inputManager.setup(this.camera, player);
		// THIS NEEDS AN OBJECT TO ATTACH TO
		document.addEventListener('keydown', ThomasJS.inputManager.kdInput, true);
		document.addEventListener('keyup', ThomasJS.inputManager.kuInput, true);
		
		//load the level?
		this.loadLevel();
		
		// set the loop
		setInterval(ThomasJS.gameLoop, 33);

	},
	
	loadLevel: function(){
		
		this.objectData = [];
		$.getJSON('Data/Level1.xml', "somethingElse", function(data) {
			ThomasJS.objectData = data.level_objects;
			console.log("load Level1 Data");
			//ThomasJS.initLevel(); //initiate the objects
		});
		
		this.objectInstances = [];
		$.getJSON('Data/Level1_Instances.xml', "something", function(data){
			ThomasJS.objectInstances = data.level_instances;
			console.log("load Level Instances");
			ThomasJS.initLevel();
		});
	},
	
	initLevel: function(){
		
		//alert("did this work" + this.objectData);
		
			// Load all the images
		this.playerSprite = new Image();
		this.playerSprite.src = 'Assets/StandWalkInteract.png';
		
		this.backgroundSprite = new Image();
		this.backgroundSprite.src = 'Assets/House.png';
		
		this.wMachineSprite = new Image();
		this.wMachineSprite.src = 'Assets/WashingMachineSheet.png';
		
		this.testObjectSprite = new Image();
		this.testObjectSprite.src = 'Assets/TestObject.png';
		
		
		
		
			// initiate the 
		var background = Object.create(GameObject.prototype);
		background.setup(this.backgroundSprite, [ 0, 0, 2400, 728] );
		this.objManager.addObject(background);
		
		var wMachine = Object.create(GameObject.prototype);
		wMachine.setup(this.wMachineSprite, [-513, 270, 100, 100] );//, ThomasJS.getAnims("washingMachine"));
		this.objManager.addObject(wMachine);
		
		for (var n=0; n < this.objectInstances.length; n++){
			
			// find the key so we know the object we are init-ing
			var objType = Object.keys(this.objectInstances[n])[0];
			//runs once for each type of object -

				//set the object containing the object instances
			var instArray = this.objectInstances[n][objType];
			
				// loop for each instance 
			for (var i=0; i < instArray.length; i++){
				
					//pull the position values and put int on array
				var position = Array(	this.findData(this.objectInstances, [objType, i, "xPos"]),
										this.findData(this.objectInstances, [objType, i, "yPos"])
									);
					// print out the objects being made
				//console.log ( objType + " " + i + " : " + position);
				
					//use factory to create the instance
				this.objectFactory(objType, position);
			}
		}
		
		 	// set the player & camera variables in the object manager
		this.objManager.followVars(this.camera, this.player);
			// setup the input so camera follows player
		this.inputManager.setup(this.camera, this.player);
		
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
	
	findData: function(_sourceData, _targetObjects){
		
		var sourceData = _sourceData;	// set the initial JSON object to look into

		for (var t =0; t < _targetObjects.length; t++){ // looping through the _targetObjects array - going down levels in the data
			
			
			for (var i=0; i < sourceData.length; i++){ // looping through sourceData keys
			

				if (_targetObjects[t] == Object.keys(sourceData[i])){
					sourceData = sourceData[i][_targetObjects[t]];
					break;
				}
			}
		}
		
		// need to check against levels -- length in the loop - return the tree of the unfound items?
		if (sourceData == _sourceData)
			console.log("couldn't find '" + _targetObjects[t] + "'");
		else
			return sourceData;	
	},
	
	objectFactory: function(_objectName, _position){
		
		switch (_objectName){
			case "player":
				this.player = Object.create(PlayerObject.prototype);
				this.player.setup(this.playerSprite, [0 , 0, 128, 256] );//, ThomasJS.getAnims("player"));
				this.objManager.addObject(this.player);
				break;
			case "washingMachine":
				break;
			case "testObject":
				var test = Object.create(GameObject.prototype);
				
				var position = new Array(	_position[0],
											_position[1],
											this.findData(this.objectData,["testObject", "size", "width"]),
											this.findData(this.objectData,["testObject", "size", "height"])
										);				
				test.setup(this.testObjectSprite, position);
				this.objManager.addObject(test);
				break;
		}
		
			
	},
}




