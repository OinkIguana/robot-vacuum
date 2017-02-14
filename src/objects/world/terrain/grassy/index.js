'use strict';
import { LeafyTree, PineTree } from './tree';
import { BigRock, SmallRocks } from './rock';

export const Grassy = {
  objects: [LeafyTree, PineTree, BigRock, SmallRocks],
  groundCover: ['grass', 'dirt'],
  vacuumPath: ['#000000', '#000000']
};
