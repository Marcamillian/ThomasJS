var ThomasJS = {
	something: 'something',
	
	init:function (){
		
		this.canvas = document.getElementById('game-canvas');
		this.ctx = this.canvas.getContext('2d');
		this.WIDTH = this.canvas.width;
		this.HEIGHT = this.canvas.height;
		
		this.elapsedTime = 0;
		this.globalTime;
		this.dt;
		
		// initialise engineObjects
		this.objManager = Object.create(ObjectManager.prototype);
		this.objManager.setup();
		
		this.camera = Object.create(GameCamera.prototype);
		this.camera.setup([0, 0, this.WIDTH, this.HEIGHT], [this.WIDTH/2, this.HEIGHT/2, this.WIDTH/2, this.HEIGHT/2]);
		
		this.inputManager = Object.create(InputManager.prototype);
		this.inputManager.setup(this.camera);
		
		document.addEventListener('keydown', ThomasJS.inputManager.input, true);
		
		// load all the sprites
		this.playerSprite = new Image();
		this.playerSprite.src = 'Assets/StandWalkInteract.png';
		
		this.backgroundSprite = new Image();
		this.backgroundSprite.src = 'Assets/House.png';
		
		
		
		// initalise the gameObjects
		
		/*
		var background = Object.create(GameObject.prototype);
		background.setup(this.backgroundSprite, [ 0, 0, 2400, 728] , 'red');
		this.objManager.addObject(background);
		*/
		
		var player = Object.create(GameObject.prototype);
		player.setup(this.playerSprite, [0 , 0, 128, 256] , 'red');
		this.objManager.addObject(player);
		
		// =====
		/*
		var midPoint = Object.create(GameObject.prototype);
		midPoint.setup(null, [0,0, 20, 20], 'green');
		this.objManager.addObject(midPoint);
		
		
		var tr = Object.create(GameObject.prototype);
		tr.setup(null,[50,-50, 40, 40], 'blue');
		this.objManager.addObject(tr);
		
		var tl = Object.create(GameObject.prototype);
		tl.setup(null,[-50,-50, 40, 40], 'red');
		this.objManager.addObject(tl);
		
		var br = Object.create(GameObject.prototype);
		br.setup(null,[50,50, 40, 40], 'yellow');
		this.objManager.addObject(br);
		
		var bl = Object.create(GameObject.prototype);
		bl.setup(null, [-50,50, 40, 40], 'pink');
		this.objManager.addObject(bl);
		
		
		
		var tr2 = Object.create(GameObject.prototype);
		tr2.setup(null,[100,-100, 20, 20], 'blue');
		this.objManager.addObject(tr2);
		
		var tl2 = Object.create(GameObject.prototype);
		tl2.setup(null,[-100,-100, 20, 20], 'red');
		this.objManager.addObject(tl2);
		
		var br2 = Object.create(GameObject.prototype);
		br2.setup(null, [100,100, 20, 20], 'yellow');
		this.objManager.addObject(br2);
		
		var bl2 = Object.create(GameObject.prototype);
		bl2.setup(null, [-100,100, 20, 20], 'pink');
		this.objManager.addObject(bl2);
		*/
		
		// set the loop
		setInterval(ThomasJS.gameLoop, 33);
		
	},
	
	gameLoop: function(){
		
		ThomasJS.advGameTime();
		ThomasJS.objManager.update(ThomasJS.dt);
		var viewObjects = ThomasJS.objManager.getObjects(ThomasJS.camera.dims);
		ThomasJS.camera.draw(ThomasJS.ctx, viewObjects);
		
		/*
		var viewObjects = ThomasJS.objManager.update();
		ThomasJS.camera.draw(ThomasJS.ctx, viewObjects);
		*/
	},
	
	advGameTime: function(){
		
		var clock = new Date();
		var currentTime = clock.getTime();
		
		this.dt = currentTime - this.globalTime;
		this.globalTime = currentTime;
		
		var thing = 0 + this.dt;
		
		console.log("elapsed time : " + thing );
		
	}
	
}




