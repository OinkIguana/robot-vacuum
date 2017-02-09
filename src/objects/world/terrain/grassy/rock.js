'use strict';
import { Drawable, Collider, GameObject, Circle, override, sprite } from 'game-engine';
import { Terrain } from '../terrain';

@sprite('big-rock')
export class Rock extends Drawable(Collider(new Circle(0, 0, 64))(Terrain(GameObject))) {
  pos = null;
  depth = 1;

  @override
  init(where) {
    this.pos = where;
  }

  @override
  get position() {
    return this.pos;
  }

  @override
  draw(draw) {
    draw.color(0x66000077).self(this.depth);
  }
}
