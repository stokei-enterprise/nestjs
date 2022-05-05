import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvalidTokenException } from '../../../errors';
import {
  extractRefreshToken,
  extractToken,
  isExpiredDate
} from '../../../utils';
import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME
} from '../../constants';
import { ManagementTokenService } from '../../services';

@Injectable()
export class AuthenticationWithoutExpiresValidationGuard
  implements CanActivate
{
  constructor(private managementTokenService: ManagementTokenService) {}
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    return GqlExecutionContext.create(context).getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);

    const accessToken = extractToken(
      request?.headers[ACCESS_TOKEN_HEADER_NAME]
    );
    if (!accessToken) {
      throw new InvalidTokenException();
    }
    const refreshToken = extractRefreshToken(
      request?.headers[REFRESH_TOKEN_HEADER_NAME]
    );
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const user = await this.managementTokenService.decodeAccessToken(
      accessToken
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const refreshTokenDecoded =
      await this.managementTokenService.decodeRefreshToken(refreshToken);
    if (!refreshTokenDecoded) {
      throw new UnauthorizedException();
    }

    const isValidAccessTokenAndRefreshToken =
      user.code === refreshTokenDecoded.code &&
      user.id === refreshTokenDecoded.accountId;
    if (!isValidAccessTokenAndRefreshToken) {
      throw new UnauthorizedException();
    }

    const isAccessExpired = isExpiredDate(user.accessExpiresIn);
    if (isAccessExpired) {
      throw new UnauthorizedException();
    }
    request.user = user;
    request.refreshToken = refreshTokenDecoded;
    return true;
  }
}
