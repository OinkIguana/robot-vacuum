'use strict';

import { Position, Dimension, Rectangle, override } from 'game-engine';
import { Piece } from './piece';
import * as Random from 'random-js';
import random from '../../random';
import * as Wall from './terrain/house/wall';

export class Home extends Piece {
  houseDimensions = new Dimension(10, 8);

  @override
  generate() {
    const rng = Random.engines.mt19937();
    rng.seed(this.seed);
    // ground cover
    // TODO: use a more natural arrangement and make transitioning nice between
    const ground = this.groundImage.getContext('2d');
    const sprites = this.terrain.groundCover.map(name => super.game.sprite(name));
    const floor = super.game.sprite("floor");
    sprites.forEach(spr => spr.frame = 4);
    const groundType = Random.integer(0, this.terrain.groundCover.length - 1);
    const wallSide = Random.integer(0, 3)(rng);
    for(let i = 0; i < 30; ++i) {
      for(let j = 0; j < 30; ++j) {
        let sprite = floor;
        if( i < (30 - this.houseDimensions.w) / 2 || i >= (30 + this.houseDimensions.w) / 2 ||
            j < (30 - this.houseDimensions.h) / 2 || j >= (30 + this.houseDimensions.h) / 2
        ) {
          sprite = sprites[groundType(rng)];
        }
        ground.drawImage(sprite.texture, ...sprite.src, i * 128, j * 128, 128, 128);
      }
    }
    const [xx, yy] = [(30 - this.houseDimensions.w) / 2 * 128, (30 - this.houseDimensions.h) / 2 * 128]
    // objects
    for(let i = 0; i < this.houseDimensions.w; ++i) {
      if(wallSide !== 0 || (i !== 4 && i !== 5)) {
        this.objects.push(super.game.spawn(Wall.Inside, new Position(this.where.x + xx + i * 128, this.where.y + yy - 384)));
      }
      if(wallSide !== 1 || (i !== 4 && i !== 5)) {
        this.objects.push(super.game.spawn(Wall.Outside, new Position(this.where.x + xx + i * 128, this.where.y + yy + this.houseDimensions.h * 128 - 256)));
      }
    }
    for(let i = -3; i < this.houseDimensions.h + 1; ++i) {
      if(wallSide !== 2 || (i !== 3 && i !== 4)) {
        this.objects.push(super.game.spawn(Wall.Small, 'left', i < -1, new Position(this.where.x + xx - 128, this.where.y + yy + i * 128)));
      }
      if(wallSide !== 3 || (i !== 3 && i !== 4)) {
        this.objects.push(super.game.spawn(Wall.Small, 'right', i < -1, new Position(this.where.x + xx + this.houseDimensions.w * 128, this.where.y + yy + i * 128)));
      }
    }
    const spawnObject = Random.bool(0.95);
    const house = new Rectangle(8.5 * 128, 9.5 * 128, 13 * 128, 11 * 128); // a bit bigger than the house for padding
    while(spawnObject(rng) || this.objects.length < 3) {
      let pos;
      while(Position.inside(pos = Random.position(rng, Piece.size), house)) {}
      this.objects.push(super.game.spawn(Random.pick(rng, this.terrain.objects), Position.add(this.where, pos)));
    }
    // decorations
  }
}
