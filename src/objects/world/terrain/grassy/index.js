'use strict';
import { Tree } from './tree';
import { Rock } from './rock';

export const Grassy = {
  objects: [Tree, Rock],
  groundCover: ['grass', 'dirt'],
  vacuumPath: ['#000000', '#000000']
};
