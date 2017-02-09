'use strict';

import { GameObject, Position, Drawable, Dimension, Rectangle, Circle, override } from 'game-engine';
import * as Random from 'random-js';
import random from '../../random';
import { Vacuum } from '../vacuum';

// TODO: make Pieces into Rooms so that only necessary resources will be loaded
//       should be ok for now, but when (if) there are lots...
export class Piece extends Drawable(GameObject) {
  static get size() { return new Dimension(128 * 30, 128 * 30); }
  seed = random();
  where = null;
  objects = [];
  terrain = null;

  groundImage = document.createElement('CANVAS');
  vacuumPath = document.createElement('CANVAS');

  generate() {
    const rng = Random.engines.mt19937();
    rng.seed(this.seed);
    // ground cover
    const success = Random.bool(0.85);
    this.groundImage.width = this.vacuumPath.width = Piece.size.w;
    this.groundImage.height = this.vacuumPath.height = Piece.size.h;
    const ground = this.groundImage.getContext('2d');
    // TODO: randomize each tile and make it all nicely tiled looking when drawn
    const sprite = super.game.sprite(this.terrain.groundCover[0]);
    sprite.frame = 4;
    for(let i = 0; i < 30; ++i) {
      for(let j = 0; j < 30; ++j) {
        ground.drawImage(sprite.texture, ...sprite.src, i * 128, j * 128, 128, 128);
      }
    }
    rng.discard(30 ** 2);
    // objects
    while(success(rng) || this.objects.length < 3) {
      this.objects.push(super.game.spawn(Random.pick(rng, this.terrain.objects), Position.add(this.where, Random.position(rng, Piece.size))));
    }
    // decorations
  }

  clean() {
    for(let object of this.objects) {
      super.game.destroy(object);
    }
  }

  @override
  step() {
    const vacuum = this.vacuumPath.getContext('2d');
    vacuum.fillStyle = this.terrain.vacuumPath[0];
    vacuum.beginPath();
    vacuum.arc(...Circle.shift(this.vacuum.bbox, this.vacuum.position), 0, Math.PI * 2);
    vacuum.fill();
  }

  @override
  init(where, terrain) {
    this.terrain = terrain;
    this.where = new Position((where.x - 0.5) * Piece.size.w, (where.y - 0.5) * Piece.size.h);
    this.vacuum = super.game.find(Vacuum)[0];
  }

  @override
  draw(draw) {
    const { x, y } = super.game.view();
    const src = new Rectangle(x - this.where.x, y - this.where.y, ...super.game.size);
    const dest = new Rectangle(x, y, ...super.game.size);
    if(Rectangle.intersects(dest, super.game.view())) {
      draw.image(this.groundImage, src, dest, -101).alpha(0.5).image(this.vacuumPath, src, dest, -100).alpha(1);
    }
  }
}
