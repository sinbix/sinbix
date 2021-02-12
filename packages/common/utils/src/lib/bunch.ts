import * as _ from 'lodash';

export type Bunch<T> = T | T[];

export interface BunchCallback<T> {
  (bunchEntity: T);
}

export function bunchHandler<T>(bunch: Bunch<T>, callback: BunchCallback<T>) {
  if (_.isArray(bunch)) {
    bunch.map((entity) => {
      callback(entity);
    });
  } else {
    callback(bunch);
  }
}
