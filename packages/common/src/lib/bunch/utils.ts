import * as _ from 'lodash';
import { Bunch, BunchCallback } from './types';

export function bunchHandler(bunch: Bunch<any>, callback: BunchCallback<any>) {
  if (_.isArray(bunch)) {
    bunch.map((entity) => {
      callback(entity);
    });
  } else {
    callback(bunch);
  }
}
