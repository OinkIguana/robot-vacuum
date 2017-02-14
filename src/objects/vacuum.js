'use strict';
import { Drawable, Collider, GameObject, Circle, Position, sprite, override } from 'game-engine';
import * as Random from 'random-js';
import random from '../random';
import { Terrain } from './world/terrain';
// states
const Spiral = Symbol('Spiral');
const FollowLeft = Symbol('FollowLeft');
const BounceLeft = Symbol('BounceLeft');
const FollowRight = Symbol('FollowRight');
const BounceRight = Symbol('BounceRight');
const Straight = Symbol('Straight');
const Right90 = Symbol('Right90');
const Left90 = Symbol('Left90');

// TODO:  make this work nicer when it finds a very large open area and covers
//        the whole space already

@sprite('roomba')
export class Vacuum extends Drawable(Collider(new Circle(0, 0, 60))(GameObject)) {
  direction = Random.real(0, 1, true)(random) * 2 * Math.PI;
  _state = Spiral;
  timeSinceStateChange = 0;
  // spiral info
  totalRotation = 0;

  @override
  init() {
    this.position = new Position(0, 0);
    this.state = Spiral;
  }

  @override
  step() {
    ++this.timeSinceStateChange;
    const collision = super.game.collides(Circle.shift(this.bbox, this.nextPosition), Terrain);
    if(!collision) {
      this.position = this.nextPosition;
    } else {
      console.log(collision.constructor, collision.position);
      debugger;
    }
    this.direction += this.rotation;
    this.totalRotation += this.rotation;
    if(this.direction >= 2 * Math.PI) {
      this.direction -= 2 * Math.PI;
    } else if(this.direction < 0) {
      this.direction += 2 * Math.PI;
    }
    this[this.state]();
    super.game.view(this.position, false);
  }

  @override
  get position() {
    return Position.add(new Position(64, 64), new Position(...this.sprite));
  }

  get nextPosition() {
    const delta = new Position(Math.cos(this.direction) * this.speed, -Math.sin(this.direction) * this.speed);
    return Position.add(delta, this.position);
  }

  set position(pos) {
    this.sprite.position = Position.add(new Position(-64, -64), pos);
  }

  [Spiral]() {
    if(super.game.collides(Circle.shift(this.bbox, this.nextPosition), Terrain)) {
      this.state = BounceRight;
    }
  }
  [FollowLeft]() {
    if(this.timeSinceStateChange > 300) {
      this.state = Right90;
    } else if(super.game.collides(Circle.shift(this.bbox, this.nextPosition), Terrain)) {
      this.state = BounceLeft;
    }
  }
  [BounceLeft]() {
    if(this.timeSinceStateChange > 40) {
      this.state = FollowLeft;
    }
  }
  [FollowRight]() {
    if(this.timeSinceStateChange > 300) {
      this.state = Left90;
    } else if(super.game.collides(Circle.shift(this.bbox, this.nextPosition), Terrain)) {
      this.state = BounceRight;
    }
  }
  [BounceRight]() {
    if(this.timeSinceStateChange > 40) {
      this.state = FollowRight;
    }
  }
  [Straight]() {
    if(super.game.collides(Circle.shift(this.bbox, this.nextPosition), Terrain)) {
      this.state = FollowRight;
    } else if(this.timeSinceStateChange > 800) {
      this.state = Spiral;
    }
  }
  [Right90]() {
    if(this.timeSinceStateChange > 30) {
      this.state = Straight;
    }
  }
  [Left90]() {
    if(this.timeSinceStateChange > 30) {
      this.state = Straight;
    }
  }

  get state() { return this._state; }
  set state(state) {
    this._state = state;
    this.timeSinceStateChange = 0;
    this.totalRotation = state === Spiral ? Math.PI : 0;
  }

  get speed() {
    if(this.timeSinceStateChange < 10) { return 0; }
    if([Spiral, FollowLeft, FollowRight, Straight].includes(this.state)) { return 1; }
    if([BounceLeft, BounceRight].includes(this.state)) { return -0.5; }
    return 0;
  }

  get rotation() {
    if(this.timeSinceStateChange < 10) { return 0; }
    switch(this.state) {
      case Spiral:
        return (2 + this.totalRotation ** 2) / (18 * (1 + this.totalRotation ** 2) ** (3/2));
      case Straight:
        return 0;
      case FollowLeft:
        return 0.005;
      case BounceLeft:
        return -0.01; // -Math.PI * 2 / 8 / 60;
      case FollowRight:
        return -0.005;
      case BounceRight:
        return 0.01; // Math.PI * 2 / 8 / 60;
      case Right90:
        return -Math.PI * 2 / 4 / 30;
      case Left90:
        return Math.PI * 2 / 4 / 30;
    }
  }

  @override
  draw(draw) {
    draw.rotation(-this.direction - Math.PI * 3 / 2, new Position(64, 64)).sprite(this.sprite).rotation(0);
  }
}
