import { RpcException } from '@nestjs/microservices';
import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@sinbix-nest/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RcpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((err) => throwError(new RpcException(err.message))));
  }
}

export function RcpCatcher() {
  return applyDecorators(UseInterceptors(new RcpErrorInterceptor()));
}
