'use strict';
import { Drawable, Collider, GameObject, Circle, Rectangle, override } from 'game-engine';
import { Terrain } from '../terrain';

export class Tree extends Drawable(Collider(new Circle(0, 0, 128))(Terrain(GameObject))) {
  static get height() { return 300; }
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
    draw.color(0x66000077)
      .circle(Circle.shift(this.bbox, this.pos), 40)
      .color(0)
      .rect(new Rectangle(this.pos.x - this.bbox.r, this.pos.y - Tree.height, 2 * this.bbox.r, Tree.height), 1);
  }
}
