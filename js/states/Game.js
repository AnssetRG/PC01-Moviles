Game = function(game){}

//prototype: para crear más funcionalidades
Game.prototype = {
	create:function(){
		//habilitar físicas
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.gravity = 250;

		this.background = this.game.add.sprite(0,0,"background");

		this.floor = this.game.add.sprite(0,0,"floor");
		this.floor.y = this.game.height - this.floor.height;
		this.physics.arcade.enable(this.floor)
		this.floor.body.collideWorldBounds = false;
		this.floor.body.immovable = true;

		this.Monster = this.game.add.sprite(0,0,"monster");
		this.Monster.anchor.setTo(0.5);
		this.Monster.x = this.game.world.centerX * 0.5;
		this.Monster.y = this.game.world.centerY;

		this.physics.arcade.enable(this.Monster);
		this.Monster.body.collideWorldBounds = true;
		this.Monster.body.gravity.y = this.gravity;

		this.Monster.animations.add('walking',[0,1,2,3,4,5,6,7,8,9,10,11],24,false);

		this.keys = this.input.keyboard.createCursorKeys();

		this.scoreBG = this.game.add.sprite(0,0,"score_bg");
		this.scoreBG.anchor.setTo(0.5);
		this.scoreBG.x = this.game.world.centerX*1.5;
		this.scoreBG.y = 100;

		this.time_to_create = 4*1000;
		this.actual_time = 0;

		this.candies = this.game.add.group();
		this.candies.enableBody = true;

		this.n_sprite = 0;

		this.score = 0;

	},
	createCandy:function(){
		let pos = this.game.rnd.integerInRange(this.game.width*0.1,this.game.width*0.8);

		let candy_dummy = this.game.add.sprite(pos,50,"candy");
		candy_dummy.frame = this.n_sprite;

		this.candies.add(candy_dummy)

		//this.game.physics.arcade.enable(this.candy_dummy);
		candy_dummy.body.gravity.y = this.gravity;

	},
	update:function(){
		this.physics.arcade.collide(this.monster,this.floor);

		//El personaje debe poder moverse con las teclas en horizontal y no salir del escenario
		if(this.keys.left.isDown){
			this.Monster.body.velocity.x = -100;
			this.Monster.animations.play('walking');
			this.Monster.scale.setTo(-1,1);
		}else if(this.keys.right.isDown){
			this.Monster.body.velocity.x = 100;
			this.Monster.animations.play('walking');
			this.Monster.scale.setTo(1,1);
		}else{
			this.Monster.body.velocity.x = 0;
		}
		//Cada 4 segundos se generan elementos Candy, 
		//debe generar un elemento azar dentro del spritesheet, utilizar propiedad frame con integerInRange
		this.actual_time += this.game.time.elapsed;
		if(this.time_to_create <= this.actual_time){
			this.n_sprite = this.game.rnd.integerInRange(0,5);
			this.createCandy();
			this.actual_time = 0;
		}

		this.physics.arcade.overlap(this.character,this.candies,null,this.checkCollision,this);

		//Cuando los caramelos salgan del escenario deben eliminarse y el personaje pierde una vida (3 puntos)
		//Debe utilizarse pool de objetos (3 puntos)
		//Si la vida llega a 0 debe mandar al state GameOver (1 punto)
	},
	//devuelve los 2 elementos de la colisión
	checkCollision:function(sprite1,sprite2){
		//El personaje debe contar con 5 vidas, cada vez que choque con un caramelo gana puntos (2 puntos)
			//Si es frame 0 o 2 y el puntaje es múltiplo de 2 se duplica sino se gana 5 puntos.
			//Si es frame 1 gana 10 puntos
			//Si es frame 3 gana 50 puntos
			//Mostrar en consola el puntaje ganado
		this.score += 2;
		let score_temp = 2;
		switch(this.n_sprite){
			case 0, 2:
			score_temp = (score_temp % 2 == 0) ? score_temp*5 : +5;
			break;
			case 1:
			score_temp += 10;
			break;
			case 3:
			score_temp += 50;
			break;
		}
		console.log(score_temp);
		this.score += score_temp;
		sprite2.kill();
	}
	/*create:function(){
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
	}*/

		
}