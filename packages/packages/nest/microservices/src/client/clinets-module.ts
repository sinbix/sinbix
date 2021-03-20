import {
  ClientsModule,
  ClientsModuleOptions,
} from '@nestjs/microservices';
import { MsConnector } from './utils';

export class MsClientsModule {
  register(options: ClientsModuleOptions) {
    const clients = (options || []).map((item) => {
      item.name = `CLIENT_PROXY_${item.name.toString()}`;
      return item;
    });
    return {
      module: MsClientsModule,
      imports: [ClientsModule.register(clients)],
      // providers: clients,
      // exports: clients,
    };
  }
}
