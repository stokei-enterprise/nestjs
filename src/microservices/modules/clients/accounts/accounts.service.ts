import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { servicePatternNames } from '@stokei/services/accounts/controllers/microservice/constants/server-pattern-names.constants';
import { AccountServerInfo } from '@stokei/services/accounts/enums/server-info.enum';
import { AccessModel } from '@stokei/services/accounts/models/access.model';
import { AccountModel } from '@stokei/services/accounts/models/account.model';
import { BaseMicroserviceClientService } from '@stokei/microservices';

@Injectable()
export class MicroserviceAccountsClientService extends BaseMicroserviceClientService {
  constructor(
    @Inject(AccountServerInfo.NAME)
    client: ClientProxy
  ) {
    super({
      client,
      prefixPatternName: AccountServerInfo.PATTERN_NAME
    });
  }

  get accounts() {
    return {
      findById: (id: string): Promise<AccountModel> =>
        this.send(servicePatternNames.accounts.findById, id)
    };
  }

  get accesses() {
    return {
      findById: (id: string): Promise<AccessModel> =>
        this.send(servicePatternNames.accesses.findById, id)
    };
  }
}
