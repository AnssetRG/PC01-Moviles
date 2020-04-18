window.onload = function(){
	let game = new Phaser.Game(640,960,Phaser.AUTO);
	//nombre del diccionario, nombra de la clase
	game.state.add('Preload',Preload);
	game.state.add('Game',Game);
	game.state.start('Preload');
}