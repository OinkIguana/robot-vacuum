'use strict';
import { Room, Position, override, texturepage } from 'game-engine';
import { Vacuum, Wall } from '../objects';

@texturepage('environment', 'character')
export class World extends Room {
  @override
  start() {
    this.spawn(Vacuum);
    for(let i = 0; i < 3; ++i) {
      this.spawn(Wall, new Position(Math.floor(Math.random() * this.game.size.w), Math.floor(Math.random() * this.game.size.h)));
    }
    for(let i = 0; i < this.game.size.w / 32; ++i) {
      this.spawn(Wall, new Position(i * 32, 0));
      this.spawn(Wall, new Position(i * 32, this.game.size.h - 32));
    }
    for(let i = 1; i < this.game.size.h / 32 - 1; ++i) {
      this.spawn(Wall, new Position(0, i * 32));
      this.spawn(Wall, new Position(this.game.size.w - 32, i * 32));
    }
  }
}
