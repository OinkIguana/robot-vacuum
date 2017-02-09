'use strict';
import { Drawable, Collider, GameObject, Rectangle, Position, override } from 'game-engine';
import { Terrain } from '../terrain';

export class Tree extends Drawable(Collider(new Rectangle(-48, -16, 96, 48))(Terrain(GameObject))) {
  static get height() { return 220  ; }
  pos = null;
  trunk = null;
  sprite = null;
  depth = 2;

  @override
  init(where) {
    this.pos = where;
    this.head = super.game.sprite('leafy-tree');
    this.head.position = new Position(this.pos.x - this.head.w / 2, this.pos.y - Tree.height - this.head.h * (3 / 5));
    this.trunk = super.game.sprite('leafy-trunk');
    this.trunk.position = new Position(this.pos.x - this.trunk.w / 2, this.pos.y - Tree.height);
  }

  @override
  get position() {
    return this.pos;
  }

  @override
  draw(draw) {
    draw.color(0x66000077)
      .rect(Rectangle.shift(this.bbox, this.pos))
      .sprite(this.head, this.depth)
      .sprite(this.trunk, this.depth - 1);
  }
}
