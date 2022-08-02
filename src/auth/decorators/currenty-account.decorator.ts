import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IAuthenticatedAccount } from '../../interfaces';
import { extractRequestFromContext } from '../../utils/extract-request-from-context';

export const CurrentAccount = createParamDecorator(
  (
    data: keyof IAuthenticatedAccount,
    context: ExecutionContext
  ): IAuthenticatedAccount => {
    const request = extractRequestFromContext(context);
    if (data) {
      return request.user && request.user[data];
    }
    return request.user;
  }
);
