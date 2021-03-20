import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class MsConnector {
  constructor(private client: ClientProxy) {}

  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput
  ): Observable<TResult> {
    console.log('send');
    return this.client.send(pattern, data);
  }

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput
  ): Observable<TResult> {
    console.log('emit');
    return this.client.emit(pattern, data);
  }

  connect() {
    return this.client.connect();
  }

  close() {
    return this.client.close();
  }
}
