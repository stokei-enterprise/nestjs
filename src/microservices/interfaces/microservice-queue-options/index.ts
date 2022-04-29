import { Deserializer, Serializer } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

export type MicroserviceQueueURL = string[] | RmqUrl[];

export interface MicroserviceQueueOptions {
  urls?: MicroserviceQueueURL;
  queue?: string;
  prefetchCount?: number;
  isGlobalPrefetchCount?: boolean;
  queueOptions?: any;
  socketOptions?: any;
  noAck?: boolean;
  serializer?: Serializer;
  deserializer?: Deserializer;
  replyQueue?: string;
  persistent?: boolean;
  headers?: Record<string, string>;
}
