'use strict';
import { Drawable, Collider, GameObject, Circle, override } from 'game-engine';
import { Terrain } from '../terrain';

export class Rock extends Drawable(Collider(new Circle(0, 0, 128))(Terrain(GameObject))) {
  pos = null;

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
    draw.color(0x66000077).circle(Circle.shift(this.bbox, this.pos), 1);
  }
}
