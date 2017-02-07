'use strict';

import { GameObject, Position, Dimension, override } from 'game-engine';
import * as Random from 'random-js';
import random from '../../random';

export class Piece extends GameObject {
  static get size() { return new Dimension(3000, 3000); }
  seed = random();
  where = null;
  objects = [];
  ground = [];
  terrain = null;

  generate() {
    const rng = Random.engines.mt19937();
    rng.seed(this.seed);
    // ground cover
    const success = Random.bool(0.75);
    for(let i = 0; i < 30; ++i) {
      this.ground[i] = [];
      for(let j = 0; j < 30; ++j) {
        this.ground[i][j] = success(rng);
      }
    }
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
  init(where, terrain) {
    this.terrain = terrain;
    this.where = new Position((where.x - 0.5) * Piece.size.w, (where.y - 0.5) * Piece.size.h);
  }
}
