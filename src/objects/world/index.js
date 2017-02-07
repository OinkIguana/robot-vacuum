'use strict';

import { GameObject, Position, override } from 'game-engine';
import { Vacuum } from '../vacuum';
import { Piece } from './piece';
import { Home } from './home';
import * as Terrain from './terrain';

export class World extends GameObject {
  world = {};
  robot = null;
  where = new Position(0, 0);
  currentTerrain = Terrain.Grassy;

  @override
  init() {
    this.world = { [0]: { [0]: super.game.spawn(Home, new Position(0, 0), this.currentTerrain) } };
    this.robot = super.game.find(Vacuum)[0];
    this.piecesAround.forEach(_ => _.generate());
  }

  @override
  stepend() {
    const { x, y } = this.robot.position;
    // if the robot goes too far, spawn a new piece with a reasonable terrain.
    const [ dx, dy ] = [
      x - this.where.x * Piece.size.w,
      y - this.where.y * Piece.size.h
    ]
    if(Math.abs(dx) < Piece.size.w / 2 || Math.abs(dy) < Piece.size.h / 2) {
      this.move(Position.add(this.where, new Position(Math.sign(dx), Math.sign(dy))));
    }
  }

  get piecesAround() {
    return [].concat.apply([], [-1, 0, 1].map(dx => [-1, 0, 1].map(dy => {
      if(!this.world[this.where.x + dx]) {
        this.world[this.where.x + dx] = {};
      }
      if(!this.world[this.where.x + dx][this.where.y + dy]) {
        this.world[this.where.x + dx][this.where.y + dy] =
          super.game.spawn(
            Piece,
            new Position(this.where.x + dx, this.where.y + dy),
            Terrain.mutate(this.currentTerrain)
          );
      }
      return this.world[this.where.x + dx][this.where.y + dy];
    })));
  }

  move(where) {
    const prev = this.piecesAround;
    this.where = where;
    const next = this.piecesAround;
    prev.filter(_ => !next.includes(_)).forEach(_ => _.clean());
    next.filter(_ => !prev.includes(_)).forEach(_ => _.generate());
  }
}
