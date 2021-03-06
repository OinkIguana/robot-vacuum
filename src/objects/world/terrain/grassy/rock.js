'use strict';
import { Drawable, Collider, GameObject, Rectangle, Position, override, sprite } from 'game-engine';
import { Terrain } from '../terrain';

class Rock extends Drawable(Collider(new Rectangle(-64, 0, 128, 64))(Terrain(GameObject))) {
  pos = null;

  @override
  init(where) {
    this.sprite.position = where;
  }

  @override
  get position() {
    return new Position(this.sprite.position.x + 64, this.sprite.position.y + 64);
  }

  get depth() {
    return this.bbox.y + this.bbox.h + this.position.y;
  }

  @override
  draw(draw) {
    draw
      // .color(0x66000077)
      // .rect(Rectangle.shift(this.bbox, this.position), this.depth + 1)
      .sprite(this.sprite, this.depth);
  }
}

@sprite('big-rock')
export class BigRock extends Rock {}

@sprite('small-rocks')
export class SmallRocks extends Rock {
  @override
  get bbox() {
    return new Rectangle(-64, -64, 128, 128);
  }
}
