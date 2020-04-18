Preload = function(game){}

//prototype: para crear más funcionalidades
Preload.prototype = {
	preload : function(){
		//escalar la pantalla de acuerdo a los recursos, NONE es por defecto
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//centrar el juego horizontalmente
	    this.scale.pageAlignHorizontally = true;
	    //centrar el juego verticalmente
	    this.scale.pageAlignVertically = true;

	    //images
	    this.load.image("background","assets/images/background-texture.png");
	    this.load.image("button-pause","assets/images/button-pause.png");
	    this.load.image("floor","assets/images/floor.png");
	    this.load.image("gameover","assets/images/gameover.png");
	    this.load.image("loading_bar","assets/images/loading-bar.png");
	    this.load.image("monster_cover","assets/images/monster-cover.png");
	    this.load.image("score_bg","assets/images/score-bg.png");
	    this.load.image("title","assets/images/title.png");

	    //spritesheet
	    //nomrbre de spritesheet, dirección,ancho, alto, cantidad de fotogramas, desfase en x, desfase en y
	    this.load.spritesheet("candy","assets/images/candy.png",82,98,5);
	    this.load.spritesheet("monster","assets/images/monster-idle.png",103,131,13);
	    this.load.spritesheet("button_start","assets/images/button-start.png",401,143,3);
	},
	create:function(){
		this.state.start('Game');
	}
}