import {
  ValidationErrorItem,
  ValidationOptions,
} from '@sinbix-common/validator';
import { ValidatorException } from '../exceptions';

export interface ValidatorOptions {
  validationOptions?: ValidationOptions;
  exceptionType?: typeof ValidatorException;
}

export interface ErrorCallback {
  (errors: ValidationErrorItem): void;
}
