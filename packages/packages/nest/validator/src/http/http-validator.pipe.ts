import {
  applyDecorators,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import {
  SchemaMap,
  validateWithErrors,
  ValidationOptions,
  validator,
} from '@sinbix-common/validator';
import { httpException } from './http-exception';

@Injectable()
export class HttpValidatorPipe implements PipeTransform {
  constructor(private schema: SchemaMap, private options?: ValidationOptions) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const errors = validateWithErrors(
      validator.object(this.schema),
      value,
      this.options
    );

    if (errors) {
      throw httpException(errors);
    }

    return value;
  }
}

export function HttpValidator(schema: SchemaMap, options?: ValidationOptions) {
  return applyDecorators(UsePipes(new HttpValidatorPipe(schema, options)));
}
