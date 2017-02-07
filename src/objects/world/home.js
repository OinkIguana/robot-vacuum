'use strict';

import { override } from 'game-engine';
import { Piece } from './piece';

export class Home extends Piece {
  @override
  generate() {
    super.generate();
    // generate a house in the middle, with regular terrain around the house
  }
}
