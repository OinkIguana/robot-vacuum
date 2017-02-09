'use strict';
import { Room, Position, override, texturepage } from 'game-engine';
import { World as WorldGenerator, Vacuum, Wall } from '../objects';

@texturepage('grassy', 'character')
export class World extends Room {
  @override
  start() {
    this.spawn(Vacuum);
    this.spawn(WorldGenerator);
  }
}
