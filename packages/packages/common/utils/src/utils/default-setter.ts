import * as _ from 'lodash';

export function setDefaultValues<T>(object: T, values: Partial<T>) {
  const newObject = _.clone(object);
  _.keys(values).forEach((key) => {
    newObject[key] = object[key] ?? values[key];
  });
  return newObject;
}
