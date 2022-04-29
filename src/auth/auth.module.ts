import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Strategies } from './strategies';
import { TOKEN_SECRET_KEY } from './environments';
import { Services } from './services';

const providers: Provider<any>[] = [...Services, ...Strategies];

@Module({
  imports: [
    JwtModule.register({
      secret: TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [...providers],
  exports: [...providers]
})
export class AuthModule {}
