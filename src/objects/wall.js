'use strict';
import { Drawable, Collider, GameObject, Rectangle, Position, override } from 'game-engine';
export class Wall extends Drawable(Collider(new Rectangle(0, 0, 32, 32))(GameObject)) {
  pos = new Position(0, 0);
  @override
  init(pos) {
    this.pos = pos;
  }
  
  @override
  get position() {
    return this.pos;
  }

  @override
  draw(draw) {
    draw.rect(Rectangle.shift(this.bbox, this.position));
  }
}
