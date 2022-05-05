import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IAuthenticatedAccount } from '../../interfaces';

export const CurrentAccount = createParamDecorator(
  (
    data: keyof IAuthenticatedAccount,
    context: ExecutionContext
  ): IAuthenticatedAccount => {
    const request =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    if (data) {
      return request.user && request.user[data];
    }
    return request.user;
  }
);
