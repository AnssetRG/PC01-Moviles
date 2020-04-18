Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	create:function(){
		this.gravity = 500;
		this.jumpForce = -400;

		//habilitar físicas
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//tileSprite (iniX,iniY,finX,finY,asset)
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,"background");

		//autoScroll (velocidadX, velocidadY)
		this.background.autoScroll(-100,0);

		this.player = this.game.add.sprite(0,0,"player");
		this.player.anchor.setTo(0.5);
		this.player.x = this.game.world.centerX;
		this.player.y = this.game.world.centerY;
		this.player.animations.add("fly",[0,1,2],10,true);

		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = this.gravity;

		this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceBar.onDown.add(this.flap,this);
		this.game.input.onDown.add(this.flap,this);

		this.walls = this.game.add.group();
		this.spawnWall = 0;
		this.score = 0;

		this.scoreText = this.game.add.text(0,0,'Score :'+this.score);
		this.scoreText.fill = "#FFFFFF";

		this.maxScore = this.game.add.text(0,0,'Max Score');
		this.maxScore.x = this.game.width - 150;
		this.maxScore.fill = "#FFFFFF";
	},
	flap:function(){
		this.player.body.velocity.y = this.jumpForce;
	},
	createWall:function(){
		//integerInRange: random entre 2 valores 
		let wallY = this.game.rnd.integerInRange(this.game.height*0.3,this.game.height*0.7);
		this.generateWall(wallY);
		this.generateWall(wallY,true);
	},
	generateWall:function(wallY,flipped){
		let posY;
		let opening = 400;
		if(flipped){
			wallY = wallY - (opening/2);
		}else{
			wallY = wallY + (opening/2);
		}
		let wall = this.walls.getFirstDead();
		if(wall){
			wall.reset(this.game.width, wallY);
		}else{
			wall = this.game.add.sprite(this.game.width,wallY,"wall");
		}
		this.game.physics.arcade.enable(wall);
		wall.body.velocity.x = -200;
		wall.body.inmovable = true;
		wall.body.allowGravity = false;
		this.walls.add(wall);
		if(flipped){
			wall.scale.y = -1;
		}else{
			wall.scale.y = 1;
		}
	},
	update:function(){
		this.spawnWall += this.game.time.elapsed;
		if(this.spawnWall >3000){
			this.spawnWall = 0;
			this.createWall();
		}
		if(this.player.body.velocity.y > -20){
			this.player.frame = 3;
		}else{
			this.player.animations.play("fly");
		}
	}

		
}