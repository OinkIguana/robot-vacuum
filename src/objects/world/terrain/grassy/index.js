'use strict';
import { Tree } from './tree';
import { Rock } from './rock';

export const Grassy = {
  objects: [Tree, Rock],
  groundCover: ["grass", "dirt"],
  vacuumPath: ["#00000077", "#00000077"]
};
