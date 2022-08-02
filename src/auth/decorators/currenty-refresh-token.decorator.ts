import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IRefreshTokenPayload } from '../../interfaces';
import { extractRequestFromContext } from '../../utils/extract-request-from-context';

export const CurrentRefreshToken = createParamDecorator(
  (
    data: keyof IRefreshTokenPayload,
    context: ExecutionContext
  ): IRefreshTokenPayload => {
    const request = extractRequestFromContext(context);
    if (data) {
      return request.refreshToken && request.refreshToken[data];
    }
    return request.refreshToken;
  }
);
