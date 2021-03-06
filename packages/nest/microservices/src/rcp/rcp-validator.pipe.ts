import {
  applyDecorators,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@sinbix-nest/common';
import {
  validateWithErrors,
  ValidationOptions,
  validator,
} from '@sinbix-common/validator';
import { rcpException } from './rcp-exception';

@Injectable()
export class RcpValidatorPipe implements PipeTransform {
  constructor(
    private schema: validator.AnySchema,
    private options?: ValidationOptions
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const errors = validateWithErrors(this.schema, value, this.options);

    if (errors) {
      throw rcpException(errors);
    }

    return value;
  }
}

export function RpcValidator(
  schema: validator.AnySchema,
  options?: ValidationOptions
) {
  return applyDecorators(UsePipes(new RcpValidatorPipe(schema, options)));
}
