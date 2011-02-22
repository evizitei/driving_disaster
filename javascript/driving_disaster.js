$(document).ready(function() {
	//init Crafty with FPS of 50 and create the canvas element
	Crafty.init(50);
	Crafty.canvas();
	
	//preload the needed assets
	Crafty.load(["images/sprite.png", "images/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(0, "images/sprite.png", {truck: [0,0]});
		
		//start the main scene when loaded
		Crafty.scene("main");
	});
	
	Crafty.scene("main", function() {
		Crafty.background("url('images/bg.png')");
		
		var player = Crafty.e("2D, canvas, controls, truck")
		  .attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.9, 
			         x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2})
			.origin("center")
      .bind("keydown", function(e) {
        //on keydown, set the move booleans
        if(e.keyCode === Crafty.keys.RA) {
          this.move.right = true;
        } else if(e.keyCode === Crafty.keys.LA) {
          this.move.left = true;
        } else if(e.keyCode === Crafty.keys.UA) {
          this.move.up = true;
        }
      }).bind("keyup", function(e) {
        //on key up, set the move booleans to false
        if(e.keyCode === Crafty.keys.RA) {
          this.move.right = false;
        } else if(e.keyCode === Crafty.keys.LA) {
          this.move.left = false;
        } else if(e.keyCode === Crafty.keys.UA) {
          this.move.up = false;
        }
      });
	});
});