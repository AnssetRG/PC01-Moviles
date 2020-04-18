Menu = function(game){}

Menu.prototype = {
	create:function(){
		this.background = this.game.add.sprite(0,0,"background");
		this.title = this.game.add.sprite(0,0,"title");
		this.title.anchor.setTo(0.5);
		this.title.x = this.game.world.centerX;
		this.title.y = this.game.world.centerY - (960/4);

		this.button_start = this.game.add.sprite(0,0,"button_start");
		this.button_start.anchor.setTo(0.5);
		this.button_start.x = this.game.world.centerX;
		this.button_start.y = this.game.world.centerY*1.5;
	},
	update:function(){
		
	}
}