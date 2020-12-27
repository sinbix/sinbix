import * as _ from 'lodash';

export function setDefaultValues<T>(object: T, values: Partial<T>) {
  _.keys(values).forEach((key) => {
    object[key] = object[key] ?? values[key];
  })
}
