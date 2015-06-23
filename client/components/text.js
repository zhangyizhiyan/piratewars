'use strict'

var GameEngine = require('../../shared/game_engine.js');
var GameComponent = require('../../shared/core/component.js');

function TextComponent(text) {
	console.log("inside TextComponent constr");
	this.key = "text";
	this.text = text;
};

TextComponent.prototype = Object.create(GameComponent.prototype);
TextComponent.prototype.constructor = TextComponent;

TextComponent.prototype.setScale = function(x, y) {
	this.text.scale.setTo(x, y);
};

TextComponent.prototype.setAnchor = function(x, y) {
	this.text.anchor.setTo(x, y);
};


TextComponent.prototype.init = function() {};

TextComponent.prototype.update = function() {
	var transform = this.owner.transform.getTransform();
	this.text.position.x = transform.position.x;
	this.text.position.y = transform.position.y + 0.5*this.owner.components.get("sprite").getHeight();
};

TextComponent.prototype.remove = function() {
	text.destroy();
};

module.exports = TextComponent;