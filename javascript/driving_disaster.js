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
		
		var player = Crafty.e("2D, canvas, image")
		         .attr({x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2, w:30, h:100})
		         .origin("center").image("images/sprite.png","no-repeat");
	  player.addComponent("controls");
	  player.attr({move: {left: false, right: false, up: false, down: false}, 
	               speed: 0, xspeed: 0, yspeed: 0, speed_decay: 0.99, 
	               brake: false, brake_step: 0.15, 
	               acceleration: 0.4, rotation_step: 8, 
	               max_speed: 15});
	  
	  player.stayInFrame = function(){
	    if(this._x > Crafty.viewport.width) {
				this.x = -64;
			}
			if(this._x < -64) {
				this.x =  Crafty.viewport.width;
			}
			if(this._y > Crafty.viewport.height) {
				this.y = -64;
			}
			if(this._y < -64) {
				this.y = Crafty.viewport.height;
			}
	  };
	  
	  player.decaySpeed = function(){
	    if(this.speed > 0.3){
	     	this.speed *= this.speed_decay; 
	    }else{
	      this.speed = 0;
	    }
	  };
	  
	  player.rotationDelta = function(){
	    return this.rotation_step * (this.speed / this.max_speed);
	  };
	  
	  player.bind("keydown", function(e) {
			//on keydown, set the move booleans
			if(e.keyCode === Crafty.keys.RA) {
				this.move.right = true;
			} else if(e.keyCode === Crafty.keys.LA) {
				this.move.left = true;
			} else if(e.keyCode === Crafty.keys.UA) {
				this.move.up = true;
			} else if(e.keyCode === Crafty.keys.DA) {
			  this.brake = true;
			}
		});
		
		player.bind("keyup", function(e) {
			//on key up, set the move booleans to false
			if(e.keyCode === Crafty.keys.RA) {
				this.move.right = false;
			} else if(e.keyCode === Crafty.keys.LA) {
				this.move.left = false;
			} else if(e.keyCode === Crafty.keys.UA) {
				this.move.up = false;
			} else if(e.keyCode === Crafty.keys.DA) {
			  this.brake = false;
		  }
		});
		
		player.bind("enterframe",function(e){
		  this.decaySpeed();
		  
		  if(this.move.right){
		    this.rotation += this.rotationDelta();
		  }
			
			if(this.move.left){
			  this.rotation -= this.rotationDelta();
			}
		
			if(this.move.up) {
			  this.speed += this.acceleration;
			} 
			
			if(this.brake){
			  this.speed -= this.brake_step;
			} 
			
			if(this.speed > this.max_speed){
			  this.speed = this.max_speed;
			}else if(this.speed < 0){
			  this.speed = 0;
			}
			
			var rotation_radians = this.rotation * (Math.PI/180);
			this.xspeed = this.speed * Math.sin(rotation_radians);
			this.yspeed = (this.speed * Math.cos(rotation_radians)) * -1;
			
			//move the truck by the x and y speeds or movement vector
			this.x += this.xspeed;
			this.y += this.yspeed;
			
			this.stayInFrame();
		});
		
		player.draw();
	});
});