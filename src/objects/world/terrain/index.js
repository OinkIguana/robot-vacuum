'use strict';

import { House } from './house';
import { Grassy } from './grassy';

export function mutate(from) {
  if(from === House) {
    return Grassy;
  }
  return from; // TODO: make a mutator
}

export * from './terrain';
export * from './grassy';
