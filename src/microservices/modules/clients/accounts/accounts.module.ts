import { Module } from '@nestjs/common';
import { MicroserviceClient } from '@stokei/microservices';
import { AccountServerInfo } from '@stokei/services/accounts/enums/server-info.enum';

const providers = [];

@Module({
  imports: [
    MicroserviceClient({
      name: AccountServerInfo.NAME,
      queueName: AccountServerInfo.QUEUE_NAME
    })
  ],
  providers: [...providers],
  exports: [...providers]
})
export class MicroserviceAccountsClientModule {}
