import { DynamicModule, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Services } from './services';
import { IAuthModuleConfig } from '@/interfaces';
import { ParamNotFoundException } from '@/errors';

const providers: Provider<any>[] = [...Services];

@Module({})
export class AuthModule {
  static forRoot(config: IAuthModuleConfig): DynamicModule {
    if (!config?.secretKey) {
      throw new ParamNotFoundException('secretKey');
    }
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          secret: config?.secretKey,
          signOptions: {
            expiresIn: config?.accessExpiresIn || '60s'
          }
        })
      ],
      providers: providers,
      exports: providers
    };
  }
}
