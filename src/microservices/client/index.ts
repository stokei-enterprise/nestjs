import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { MICROSERVICE_URL } from '../environments';

export interface MicroserviceClientConfig {
  readonly name: string;
  readonly queueName: string;
}

export const MicroserviceClient = (data: MicroserviceClientConfig) =>
  ClientsModule.register([
    {
      name: data.name,
      transport: Transport.RMQ,
      options: {
        urls: [MICROSERVICE_URL],
        queue: data.queueName,
        queueOptions: {
          durable: true
        }
      }
    }
  ]);

interface DataMicroservice {
  readonly client: ClientProxy;
  readonly prefixPatternName: string;
  readonly defaultTimeout?: number;
}

export abstract class BaseMicroserviceClientService {
  readonly client: ClientProxy;
  readonly prefixPatternName: string;
  readonly defaultTimeout?: number = 5000;
  constructor(data: DataMicroservice) {
    this.client = data.client;
    this.prefixPatternName = data.prefixPatternName;
    this.defaultTimeout = data.defaultTimeout;
  }

  createPatternName = (action: string): string =>
    `${this.prefixPatternName}:${action}`;

  send<TResponse = any, TData = any>(
    pattern: any,
    data: TData
  ): Promise<TResponse> {
    const send = this.client.send<TResponse, TData>(pattern, data);
    return lastValueFrom(send);
  }

  emit<TResponse = any, TData = any>(
    pattern: any,
    data: TData
  ): Promise<TResponse> {
    const send = this.client
      .emit<TResponse, TData>(pattern, data)
      .pipe(timeout(this.defaultTimeout));
    return lastValueFrom(send);
  }
}
