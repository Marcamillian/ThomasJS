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
		
		/*
		var player = Object.create(PlayerObject.prototype);
		player.setup(this.playerSprite, [40,40, 64, 64] , 'red');
		this.objManager.addObject(player);
		*/
		
		var midPoint = Object.create(GameObject.prototype);
		midPoint.setup([5,5, 10, 10], 'green');
		this.objManager.addObject(midPoint);
		
		
		var tr = Object.create(GameObject.prototype);
		tr.setup([50,-50, 20, 20], 'blue');
		this.objManager.addObject(tr);
		
		var tl = Object.create(GameObject.prototype);
		tl.setup([-50,-50, 20, 20], 'red');
		this.objManager.addObject(tl);
		
		var br = Object.create(GameObject.prototype);
		br.setup([50,50, 20, 20], 'yellow');
		this.objManager.addObject(br);
		
		var bl = Object.create(GameObject.prototype);
		bl.setup([-50,50, 20, 20], 'pink');
		this.objManager.addObject(bl);
		/*
		var tr2 = Object.create(GameObject.prototype);
		tr2.setup([100,-100, 20, 20], 'blue');
		this.objManager.addObject(tr2);
		
		var tl2 = Object.create(GameObject.prototype);
		tl2.setup([-100,-100, 20, 20], 'red');
		this.objManager.addObject(tl2);
		
		var br2 = Object.create(GameObject.prototype);
		br2.setup([100,100, 20, 20], 'yellow');
		this.objManager.addObject(br2);
		
		var bl2 = Object.create(GameObject.prototype);
		bl2.setup([-100,100, 20, 20], 'pink');
		this.objManager.addObject(bl2);
		*/
		
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




