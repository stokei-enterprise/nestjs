import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';
import { microserviceQueueConfig } from '../config/queue';
import {
  IMicroserviceQueueConfig,
  IMicroserviceServerConfig
} from '../interfaces';

export interface MicroserviceServerConfig {
  readonly mainModule: any;
  readonly server: IMicroserviceServerConfig;
  readonly queue: IMicroserviceQueueConfig;
  readonly isFastify?: boolean;
}

export class MicroserviceServer {
  readonly logger: Logger;
  readonly server: IMicroserviceServerConfig;
  readonly queue: IMicroserviceQueueConfig;
  readonly isFastify?: boolean;
  private readonly app: Promise<
    NestFastifyApplication & NestExpressApplication
  >;

  constructor(config: MicroserviceServerConfig) {
    this.queue = config?.queue;
    this.server = config?.server;
    this.isFastify = !!config?.isFastify;
    this.logger = new Logger(config?.server?.name);
    this.app = NestFactory.create<
      NestFastifyApplication & NestExpressApplication
    >(config.mainModule, this.isFastify && new FastifyAdapter());
  }

  async bootstrap() {
    const app = await this.app;

    app.enableVersioning({
      type: VersioningType.URI
    });
    if (this.isFastify) {
      /*
      app.register(fastifyHelmet, {
        contentSecurityPolicy: IS_PRODUCTION
      });*/
      app.register(fastifyCookie);
    } else {
      /*
      app.use(
        helmet({
          contentSecurityPolicy: IS_PRODUCTION
        })
      );
      app.use(csurf());
      */
    }

    app.connectMicroservice<MicroserviceOptions>(
      microserviceQueueConfig(this.queue)
    );

    await app.startAllMicroservices();

    return app;
  }

  async start() {
    const app = await this.bootstrap();

    app.listen(this.server?.port, this.server?.host, () => {
      this.logger.log(
        `Microservise(${this.server?.name}) started at ${this.server?.url}`
      );
    });
  }
}
