GameOver = function(game){}

GameOver.prototype = {
	create:function(){
		//Fondo background
		//Botón gameover (State Menu)

		this.background = this.game.add.sprite(0,0,"background");

		this.gameover = this.game.add.sprite(0,0,"gameover");
		this.gameover.anchor.setTo(0.5);
		this.gameover.x = this.game.world.centerX;
		this.gameover.y = this.game.world.centerY;

	},
	update:function(){
		
	}
}