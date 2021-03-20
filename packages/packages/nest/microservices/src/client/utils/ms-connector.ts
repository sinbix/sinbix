import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export abstract class MsConnector {
  constructor(private client: ClientProxy) {}

  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput
  ): Observable<TResult> {
    return this.client.send(pattern, data);
  }

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput
  ): Observable<TResult> {
    return this.client.emit(pattern, data);
  }

  connect() {
    return this.client.connect();
  }

  close() {
    return this.client.close();
  }
}
