'use strict';

import { Drawable, Collider, GameObject, Rectangle, Position, override, sprite } from 'game-engine';
import { Terrain } from '../terrain';

class Wall extends Drawable(Collider(new Rectangle(0, 0, 0, 0))(Terrain(GameObject))) {
  pos = new Position(0, 0);
  depth = 3;

  @override
  init(where) {
    this.sprite.position = where;
  }

  @override
  get position() {
    return this.sprite.position;
  }

  @override
  draw(draw) {
    draw
      .rect(Rectangle.shift(this.bbox, this.position), this.depth + 1)
      .sprite(this.sprite, this.depth);
  }
}

@sprite('inside-wall')
export class Inside extends Wall {
  frame = null;

  @override
  step() {
    if(this.frame === null) {
      this.frame = 0;
      if(super.game.collides(new Rectangle(this.bbox.x + this.position.x - 128, this.bbox.y + this.position.y, 128, 128), this.constructor)) {
        ++this.frame;
      }
      if(!super.game.collides(new Rectangle(this.bbox.x + this.position.x + 128, this.bbox.y + this.position.y, 128, 128), this.constructor)) {
        ++this.frame;
      }
      this.sprite.frame = this.frame;
    }
  }

  @override
  get bbox() {
    return new Rectangle(0, 256, 128, 128);
  }
}

@sprite('inside-smallwall')
export class Small extends Wall {
  frame = null;
  dir = null;

  @override
  init(dir, ...args) {
    super.init(...args);
    this.dir = dir;
  }

  @override
  step() {
    if(this.frame === null) {
      this.frame = this.dir == 'left' ? 0 : 3;
      if(super.game.collides(new Rectangle(this.bbox.x + this.position.x, this.bbox.y + this.position.y - 128, 128, 128), this.constructor)) {
        ++this.frame;
      }
      if(!super.game.collides(new Rectangle(this.bbox.x + this.position.x, this.bbox.y + this.position.y - 128, 128, 128), this.constructor)) {
        ++this.frame;
      }
      this.sprite.frame = this.frame;
    }
  }

  @override
  get bbox() {
    return new Rectangle(0, 0, 128, 128);
  }
}

@sprite('outside-wall')
export class Outside extends Inside {}
