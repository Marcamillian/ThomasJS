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
		
		// initalise the gameObjects
		
		var test = Object.create(GameObject.prototype);
		test.setup([40,40, 20, 20], 'red');
		
		var player = Object.create(PlayerObject.prototype);
		player.setup([40,40, 20, 20], 'red');
		this.objManager.addObject(player);
		
		var enemy = Object.create(GameObject.prototype);
		enemy.setup([50, 50 , 20 , 20], 'blue');
		this.objManager.addObject(enemy);
		
		// set the loop
		setInterval(ThomasJS.gameLoop, 33);
		
	},
	
	gameLoop: function(){
		
		ThomasJS.clearCanvas();
		ThomasJS.objManager.gameLoop(ThomasJS.ctx);
		
	}, 
	
	clearCanvas: function(){
		
		this.ctx.save();
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
		this.ctx.restore();
		
	}
	
}




