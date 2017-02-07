'use strict';
import { Position } from 'game-engine';
import * as Random from 'random-js';

Random.position = (engine, area) => new Position(Random.integer(0, area.w)(engine), Random.integer(0, area.h)(engine));

const random = Random.engines.mt19937();
// lets go deterministic for now...
random.seed(0);
export default random;
