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
import { rcpException } from './rcp-exception';

@Injectable()
export class RcpValidatorPipe implements PipeTransform {
  constructor(private schema: SchemaMap, private options?: ValidationOptions) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const errors = validateWithErrors(
      validator.object(this.schema),
      value,
      this.options
    );

    if (errors) {
      throw rcpException(errors);
    }

    return value;
  }
}

export function RpcValidator(schema: SchemaMap, options?: ValidationOptions) {
  return applyDecorators(UsePipes(new RcpValidatorPipe(schema, options)));
}
