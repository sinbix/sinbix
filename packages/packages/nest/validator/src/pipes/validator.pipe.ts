import {
  applyDecorators,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import { SchemaMap, ValidationOptions } from '@sinbix-common/validator';
import { ErrorCallback, validateOrException } from '../utils';

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(
    private schemaMap: SchemaMap,
    private errorCallback?: ErrorCallback,
    private options?: ValidationOptions
  ) {}

  transform(value: any) {
    validateOrException(
      this.schemaMap,
      value,
      this.errorCallback,
      this.options
    );
    return value;
  }
}

export function Validator(
  schemaMap: SchemaMap,
  errorCallback?: ErrorCallback,
  options?: ValidationOptions
) {
  return applyDecorators(
    UsePipes(new ValidatorPipe(schemaMap, errorCallback, options))
  );
}
