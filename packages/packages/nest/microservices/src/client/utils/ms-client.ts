import { ClientProxy } from '@nestjs/microservices';
import { BadGatewayException } from '@sinbix-nest/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, timeout as rxjsTimeout } from 'rxjs/operators';
import * as _ from 'lodash';
import { TIMEOUT_DEFAULT_VALUE } from './constants';
import { map } from 'lodash';
import { object } from 'joi';

export class MsClient {
  constructor(private client: ClientProxy) {}

  send<TResult = any, TInput = any>(
    pattern: any,
    data?: TInput,
    timeout = TIMEOUT_DEFAULT_VALUE
  ): Observable<TResult> {
    // return this.setTimeout(this.client.send(pattern, data ?? {}), timeout);
    return this.setPipes(this.client.send(pattern, data ?? {}), timeout);
  }

  emit<TResult = any, TInput = any>(
    pattern: any,
    data?: TInput,
    timeout = TIMEOUT_DEFAULT_VALUE
  ): Observable<TResult> {
    return this.setPipes(this.client.emit(pattern, data ?? {}), timeout);
  }

  asyncSend<TResult = any, TInput = any>(
    pattern: any,
    data?: TInput,
    timeout = TIMEOUT_DEFAULT_VALUE
  ): Promise<TResult> {
    return this.send(pattern, data, timeout)
      .toPromise()
      .catch((err) => {
        throw new BadGatewayException(err?.message);
      });
  }

  connect() {
    return this.client.connect();
  }

  close() {
    return this.client.close();
  }

  private setPipes(obs: Observable<any>, timeout: number) {
    return obs.pipe(
      mergeMap((value) =>
        timeout ? of(value).pipe(rxjsTimeout(timeout)) : of(value)
      ),
      catchError((err) => {
        return throwError(new BadGatewayException(err?.message));
      })
    );
  }
}
