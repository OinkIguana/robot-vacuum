'use strict';
import { Engine, Dimension, config, override } from 'game-engine';
import * as Room from './rooms';
import cfg from '../public_html/resources/config.json';

const engine = new (@config('resources', cfg) class extends Engine {
  constructor() {
    super('#roomba', new Dimension(window.innerWidth, window.innerHeight));
  }

  @override
  start() {
    this.util.room.goto(Room.Ba);
  }
});

engine.run();
