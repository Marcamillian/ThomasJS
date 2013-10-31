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
		
		this.animationValues = [];
		
		
		$.getJSON('Assets/animationData.xml',"something", function(data) {
			
			ThomasJS.animationValues = data.animations;

			alert(ThomasJS.getAnims("player", "walk"));
			
		});
   		
		
		// initalise the gameObjects
		
		var background = Object.create(GameObject.prototype);
		background.setup(this.backgroundSprite, [ 0, 0, 2400, 728] , 'red');
		this.objManager.addObject(background);
		
		
		var player = Object.create(PlayerObject.prototype);
		player.setup(this.playerSprite, [0 , 0, 128, 256] , 'red');
		this.objManager.addObject(player);
		
		var wMachine = Object.create(GameObject.prototype);
		wMachine.setup(this.wMachineSprite, [0, 0, 100, 100], 'red');
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
	
	getAnims: function(_spriteSearch, _animSearch){
		
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
		
	}
}




