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
			var objType = Object.keys(this.objectInstances[n]);
			
			//runs once for each type of object -
			this.objectFactory(objType[0], [0,0]);
		}
		
		 	// set the player & camera variables in the object manager
		this.objManager.followVars(this.camera, this.player);
			// setup the input so camera follows player
		this.inputManager.setup(this.camera, this.player);
		
		
		
			// testing findData
		//console.log(this.findData(["player"]));
			//testing the factory object
		//this.objectFactory("washingMachine", "something");
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
	
	findData: function(_targetObjects){
		
		var sourceData = this.objectData;	// set the initial JSON object to look into
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
		
		if (sourceData == this.objectData)
			console.log("couldn't find '" + _targetObjects[t] + "'");
		else
			return sourceData;	
	},
	
	objectFactory: function(_objectName, _position){
		console.log(" ==== OPEN factory function ===");
		switch (_objectName){
			case "player":
				console.log(" > make player");
				this.player = Object.create(PlayerObject.prototype);
				this.player.setup(this.playerSprite, [0 , 0, 128, 256] );//, ThomasJS.getAnims("player"));
				this.objManager.addObject(this.player);
				console.log("> make player");
				break;
			case "washingMachine":
				console.log("> make washingMachine");
				break;
			case "testObject":
				console.log("> make testObject");
				var test = Object.create(GameObject.prototype);
				
				var position = new Array(	_position[0],
											_position[1],
											this.findData(["testObject", "size", "width"]),
											this.findData(["testObject", "size", "height"])
										);				
				test.setup(this.testObjectSprite, position);
				this.objManager.addObject(test);
				break;
		}
		console.log(" ==== CLOSE factory function ====");
		
			
	},
}




