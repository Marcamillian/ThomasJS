var ThomasJS = {
	something: 'something',
	
	init:function (){
		
		this.canvas = document.getElementById('game-canvas');
		this.ctx = this.canvas.getContext('2d');
		this.WIDTH = this.canvas.width;
		this.HEIGHT = this.canvas.height;
		
		// initialise engineObjects
		this.objManager = Object.create(ObjectManager.prototype);
		this.objManager.setup();
		
		this.camera = Object.create(GameCamera.prototype);
		this.camera.setup([0, 0, this.WIDTH, this.HEIGHT], [this.WIDTH/2, this.HEIGHT/2, this.WIDTH, this.HEIGHT]);
		
		this.inputManager = Object.create(InputManager.prototype);
		this.inputManager.setup(this.camera);
		
		document.addEventListener('keydown', ThomasJS.inputManager.input, true);
		
		// load all the sprites
		this.playerSprite = new Image();
		this.playerSprite.src = 'Assets/RabbitSprite_2.png';
		
		// initalise the gameObjects
		
		var player = Object.create(PlayerObject.prototype);
		player.setup(this.playerSprite, [40,40, 64, 64] , 'red');
		this.objManager.addObject(player);
		
		var midPoint = Object.create(GameObject.prototype);
		midPoint.setup([0,0, 30, 30], 'green');
		this.objManager.addObject(midPoint);
		
		var enemy = Object.create(GameObject.prototype);
		enemy.setup([50, 100 , 40 , 40], 'blue');
		this.objManager.addObject(enemy);
		
		
		// set the loop
		setInterval(ThomasJS.gameLoop, 33);
		
	},
	
	gameLoop: function(){
		
		ThomasJS.objManager.update();
		var viewObjects = ThomasJS.objManager.getObjects(ThomasJS.camera.dims);
		ThomasJS.camera.draw(ThomasJS.ctx, viewObjects);
		
		/*
		var viewObjects = ThomasJS.objManager.update();
		ThomasJS.camera.draw(ThomasJS.ctx, viewObjects);
		*/
	}
	
}




