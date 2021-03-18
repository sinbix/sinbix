import {
  applyDecorators,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import { SchemaMap, ValidationOptions } from '@sinbix-common/validator';
import { ValidatorException } from '../exceptions';
import { validateOrException, ValidatorOptions } from '../utils';

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(
    private schemaMap: SchemaMap,
    private exception?: typeof ValidatorException,
    private options?: ValidationOptions
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    validateOrException(this.schemaMap, value, this.exception, this.options);
    return value;
  }
}

export function Validator(
  schemaMap: SchemaMap,
  exception?: typeof ValidatorException,
  options?: ValidationOptions
) {
  return applyDecorators(
    UsePipes(new ValidatorPipe(schemaMap, exception, options))
  );
}
