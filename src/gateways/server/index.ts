import { Logger, VersioningType } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import fastifyCookie from 'fastify-cookie';
import { IGatewayServerConfig } from '../interfaces';

export interface GatewayServerConfig {
  readonly server: IGatewayServerConfig;
  readonly cors?: CorsOptions;
  readonly mainModule: any;
  readonly isFastify?: boolean;
}

export class GatewayServer {
  readonly logger: Logger;
  readonly server: IGatewayServerConfig;
  readonly isFastify?: boolean;
  private readonly app: Promise<
    NestFastifyApplication & NestExpressApplication
  >;

  constructor(config: GatewayServerConfig) {
    this.server = config?.server;
    this.isFastify = !!config?.isFastify;
    this.logger = new Logger(this.server?.name);
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
    return app;
  }

  async start() {
    const app = await this.bootstrap();

    app.listen(this.server?.port, this.server?.host, () => {
      this.logger.log(
        `Gateway(${this.server?.name}) started at ${this.server?.url}`
      );
    });
  }
}
