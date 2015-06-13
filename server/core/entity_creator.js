'use strict'

var BulletComponent = require('../../shared/components/bullet.js');
var Entity = require('../../shared/core/entity.js');
var GameEngine = require('../../shared/game_engine.js');
var PhysicsComponent = require('../../shared/components/physics.js');
var SpriteComponent = require('../components/sprite.js');
var UUID = require('node-uuid');

///////////////////// Send these to a data file /////////////////////////////
var bulletVelocity = 100;
var bulletSpriteScale = 0.2;
var bulletMass = 0.2;

var EntityCreator = {
	init : function (game) {
		this.game = game;
	},

	createBullet : function(player, canonPosition, side) {
		console.log("createBullet");
		var bulletId = UUID();
		var entity = new Entity(bulletId);

		//CHANGE TO GET FROM TRANSFORM//////////
		var playerBody = player.components.get("physics").body;
		//bullet properties
		var x = canonPosition.x;
		var y = canonPosition.y;
		var angle;
		if (side == "left")  angle = playerBody.angle - 90;
		else angle = playerBody.angle + 90;

		var body = new p2.Body({
	            name: "bullet",
	            mass: bulletMass,
	            position: [x, y],
	            velocity: [bulletVelocity *  Math.cos(angle *  Math.PI/ 180.0),
	            		   bulletVelocity *  Math.sin(angle *  Math.PI/ 180.0)]
	    });
		body.addShape(new p2.Circle(this.radius));
		body.angle = angle;
		GameEngine.getInstance().world.addBody(body);

		entity.components.add(new PhysicsComponent(body));
		entity.components.add(new BulletComponent(player.id));
		return entity;
	}
};

module.exports = EntityCreator;