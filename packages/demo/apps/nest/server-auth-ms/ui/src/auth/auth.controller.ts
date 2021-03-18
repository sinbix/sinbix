import {
  ArgumentMetadata,
  Controller,
  Injectable,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

import {
  ValidationOptions,
  AnySchema,
  ValidationErrorItem,
  SchemaMap,
  // object,
  // string,
} from '@hapi/joi';

import * as Joi from '@hapi/joi';
import { HttpException, HttpStatus } from '@nestjs/common';


export class ReflectorException extends HttpException {
  constructor(errors: any, code: number = HttpStatus.BAD_REQUEST) {
    super({ errors, code, type: 'reflector' }, code);
    delete this.stack;
  }
}

export class NotFoundException extends ReflectorException {
  constructor(errors: any) {
    super(errors, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends ReflectorException {
  constructor(errors: any) {
    super(errors, HttpStatus.UNAUTHORIZED);
  }
}

export class BadRequestException extends ReflectorException {
  constructor(errors: any) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}

export class ValidatorHelper {
  static findErrors(
    schema: AnySchema,
    value: any,
    options?: ValidationOptions
  ): ValidationErrorItem {
    let errors;

    const { error } = schema.validate(value, options);

    if (error) {
      errors = error.details;
    }

    return errors;
  }

  static validate(
    schema: AnySchema,
    value: any,
    options?: ValidationOptions
  ): boolean {
    if (this.findErrors(schema, value, options)) {
      return false;
    }
    return true;
  }
}

export interface ReflectorOptions {
  validationOptions?: ValidationOptions;
  exceptionType?: typeof ReflectorException;
}

export interface ValidateOrRejectArgs {
  schema: SchemaMap;
  value: any;
}

export class Reflector {
  constructor(private _options?: ReflectorOptions) {}

  validateOrReflect(args: ValidateOrRejectArgs) {
    const { schema, value } = args;

    const errors = ValidatorHelper.findErrors(
      Joi.object(schema),
      value,
      this._options?.validationOptions
    );
    if (errors) {
      let exception = BadRequestException;
      if (this._options?.exceptionType) {
        exception = this._options.exceptionType;
      }
      throw new exception(errors);
    }
  }

  getPipe(schema: SchemaMap) {
    return new ReflectorPipe(this, schema);
  }
}

@Injectable()
export class ReflectorPipe implements PipeTransform {
  constructor(private reflector: Reflector, private schemaMap: SchemaMap) {}

  transform(value: any, metadata: ArgumentMetadata) {
    this.reflector.validateOrReflect({
      schema: this.schemaMap,
      value,
    });
    return value;
  }
}

@Controller('auth')
export class AuthController implements ISigninGateway, ISignupGateway {
  constructor(private authService: AuthService) {}

  // @MessagePattern('getUsers')
  // getUsers(): Promise<IUser[]> {
  //   return this.authService.getUsers();
  // }

  @UsePipes(
    new Reflector({
      exceptionType: UnauthorizedException,
    }).getPipe({
      data: Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(8).max(25),
      }),
    })
  )
  @MessagePattern('signin')
  signin(args: ISigninArgs): Promise<IAuthToken> {
    return this.authService.signin(args);
  }

  @MessagePattern('signup')
  signup(args: ISignupArgs): Promise<IAuthToken> {
    return this.authService.signup(args);
  }
}
