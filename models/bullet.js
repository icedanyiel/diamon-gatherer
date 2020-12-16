const { Socket } = require('socket.io');
const server = require('../server');

class Bullet {
  constructor(player) {
    this.player = player;
    this.x = player.x + player.width / 2;
    this.y = player.y + player.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.speed = 5;
    this.imageId = player.imageId + '-bullet';
    this.setSpeed();
    this.distance = 200;
    this.width = 13;
    this.height = 13;
    this.opponent = this.findOpponent();
  }

  setSpeed() {
    switch(this.player.direction) {
      case 'up':
        this.dy = -this.speed;
        break;
      
      case 'right':
        this.dx = this.speed;
        break;

      case 'down':
        this.dy = this.speed;
        break;

      case 'left':
        this.dx = -this.speed;
        break;
    }
  }

  forDraw() {
    return {
      imageId: this.imageId,
      drawImageParameters: [
        this.x,
        this.y
      ]
    }
  }

  update() {
    this.move();
    this.checkOponentCollision;
  }

  move() {
    this.x = this.x + this.dx; // this.x += this.dx
    this.y = this.y + this.dy;
    this.distance -= this.speed;
  }

  collidedWith(opponent) {
    const center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
    if (
      center.x >= opponent.x && center.x <= opponent.x + opponent.width &&
      center.y >= opponent.y && center.y <= opponent.y + opponent.height
    ) {
      return true;
    }
    return false;
  }

  checkOponentCollision() {
    if (this.collidedWith(this.opponent)) {
      this.checkOponentCollision.hp--;
      this.distance = 0;
    }
  }

  findOpponent() {
    const opponentIndex = this.plsayer.imageId == 'space-ranger' ? 1:0;
    return server.games[socketId];
  }
}

module.exports = Bullet;