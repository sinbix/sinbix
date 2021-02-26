import * as _ from 'lodash';

export function setDefaultValues<T>(object: T, values: Partial<T>) {
  const newObject = _.clone(object ?? {}) as T;
  _.keys(values).forEach((key) => {
    _.set(newObject as any, key, _.get(newObject, key) ?? values?.[key]);
  });
  return newObject;
}
