'use strict';
import { Drawable, Collider, GameObject, Rectangle, Position, override } from 'game-engine';
import { Terrain } from '../terrain';

class Tree extends Drawable(Collider(new Rectangle(-48, -16, 96, 48))(Terrain(GameObject))) {
  static get height() { return 220  ; }
  pos = null;
  trunk = null;
  sprite = null;
  sprites = null;

  @override
  init(where) {
    this.pos = where;
    this.sprites.head = super.game.sprite(this.sprites.head);
    this.sprites.head.position = new Position(this.pos.x - this.sprites.head.w / 2, this.pos.y - Tree.height - this.sprites.head.h * (3 / 5));
    this.sprites.trunk = super.game.sprite(this.sprites.trunk);
    this.sprites.trunk.position = new Position(this.pos.x - this.sprites.trunk.w / 2, this.pos.y - Tree.height);
  }

  @override
  get position() {
    return this.pos;
  }

  get depth() {
    return this.bbox.y + this.bbox.h + this.position.y;
  }

  @override
  draw(draw) {
    draw
      // .color(0x66000077)
      // .rect(Rectangle.shift(this.bbox, this.pos), this.depth + 1)
      .sprite(this.sprites.head, this.depth)
      .sprite(this.sprites.trunk, this.depth - 1);
  }
}

export class LeafyTree extends Tree {
  sprites = {
    head: 'leafy-tree',
    trunk: 'leafy-trunk'
  }
}

export class PineTree extends Tree {
  sprites = {
    head: 'pine-tree',
    trunk: 'pine-trunk'
  }
}
