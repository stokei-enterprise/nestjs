import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IRefreshTokenPayload } from '@/interfaces';

export const CurrentRefreshToken = createParamDecorator(
  (
    data: keyof IRefreshTokenPayload,
    context: ExecutionContext
  ): IRefreshTokenPayload => {
    const request =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    if (data) {
      return request.refreshToken && request.refreshToken[data];
    }
    return request.refreshToken;
  }
);
