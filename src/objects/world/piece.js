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
    // TODO: use a more natural arrangement and make transitioning nice between
    const ground = this.groundImage.getContext('2d');
    const sprites = this.terrain.groundCover.map(name => super.game.sprite(name));
    sprites.forEach(spr => spr.frame = 4);
    const groundType = Random.integer(0, this.terrain.groundCover.length - 1);
    for(let i = 0; i < 30; ++i) {
      for(let j = 0; j < 30; ++j) {
        const sprite = sprites[groundType(rng)];
        ground.drawImage(sprite.texture, ...sprite.src, i * 128, j * 128, 128, 128);
      }
    }
    // objects
    const spawnObject = Random.bool(0.95);
    while(spawnObject(rng) || this.objects.length < 3) {
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
    // draw the roomba's path onto a surface
    const vacuum = this.vacuumPath.getContext('2d');
    vacuum.fillStyle = this.terrain.vacuumPath[0];
    vacuum.beginPath();
    vacuum.arc(...Circle.shift(this.vacuum.bbox, Position.sub(this.vacuum.position, this.where)), 0, Math.PI * 2);
    vacuum.fill();
  }

  @override
  init(where, terrain) {
    this.terrain = terrain;
    this.where = new Position((where.x - 0.5) * Piece.size.w, (where.y - 0.5) * Piece.size.h);
    this.vacuum = super.game.find(Vacuum)[0];
    this.groundImage.width = this.vacuumPath.width = Piece.size.w;
    this.groundImage.height = this.vacuumPath.height = Piece.size.h;
  }

  @override
  draw(draw) {
    const { x, y } = super.game.view();
    const src = new Rectangle(x - this.where.x, y - this.where.y, ...super.game.size);
    const dest = new Rectangle(x, y, ...super.game.size);
    if(Rectangle.intersects(dest, super.game.view())) {
      // only need to draw relevant areas
      draw.image(this.groundImage, src, dest, -Infinity).alpha(0.2).image(this.vacuumPath, src, dest, -Infinity).alpha(1);
    }
    draw.rect(new Rectangle(this.where, ...Piece.size));
  }
}
