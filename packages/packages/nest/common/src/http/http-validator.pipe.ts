import {
  applyDecorators,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import {
  validateWithErrors,
  ValidationOptions,
  validator,
} from '@sinbix-common/validator';
import { httpException } from './http-exception';

@Injectable()
export class HttpValidatorPipe implements PipeTransform {
  constructor(
    private schema: validator.AnySchema,
    private options?: ValidationOptions
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const errors = validateWithErrors(this.schema, value, this.options);

    if (errors) {
      throw httpException(errors);
    }

    return value;
  }
}

export function HttpValidator(
  schema: validator.AnySchema,
  options?: ValidationOptions
) {
  return applyDecorators(UsePipes(new HttpValidatorPipe(schema, options)));
}
