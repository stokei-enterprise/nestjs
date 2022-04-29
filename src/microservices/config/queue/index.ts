import { RmqOptions, Transport } from '@nestjs/microservices';
import {
  MicroserviceQueueNameNotFound,
  MicroserviceQueueUrlNotFound
} from '../../errors';
import { IMicroserviceQueueConfig } from '../../interfaces';

export const microserviceQueueConfig = (
  config: IMicroserviceQueueConfig
): RmqOptions => {
  if (!config?.name) {
    throw new MicroserviceQueueNameNotFound();
  }
  if (!config?.url) {
    throw new MicroserviceQueueUrlNotFound();
  }

  return {
    transport: Transport.RMQ,
    options: {
      urls: [config.url],
      queue: config.name,
      queueOptions: {
        durable: true
      }
    }
  };
};
