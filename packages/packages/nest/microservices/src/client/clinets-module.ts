import {
  ClientProxy,
  ClientProxyFactory,
  ClientsModule,
  ClientsModuleOptions,
  Closeable,
} from '@nestjs/microservices';
import { OnApplicationShutdown } from '@sinbix-nest/common';
import { MsConnector } from './utils';

export class MsClientsModule {
  static register(options: ClientsModuleOptions) {
    const clients = (options || []).map((item) => ({
      provide: item.name,
      useValue: new MsConnector(
        this.assignOnAppShutdownHook(ClientProxyFactory.create(item))
      ),
    }));
    return {
      module: MsClientsModule,
      providers: clients,
      exports: clients,
    };
  }

  private static assignOnAppShutdownHook(client: ClientProxy & Closeable) {
    ((client as unknown) as OnApplicationShutdown).onApplicationShutdown =
      client.close;
    return client;
  }
}
