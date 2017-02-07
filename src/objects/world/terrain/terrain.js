'use strict';

const IS_TERRAIN = Symbol();
export function Terrain(Base) {
  return class extends Base {
    [IS_TERRAIN] = true;
  };
}
Object.defineProperty(Terrain, Symbol.hasInstance,  {
  value(instance) {
    return !!instance[IS_TERRAIN];
  }
})
