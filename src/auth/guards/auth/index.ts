import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AUTHENTICATION_CONFIG } from '../../decorators/authentication-config.decorator';
import {
  IAuthenticatedAccount,
  IAuthenticationConfig,
  IRefreshTokenPayload
} from '../../../interfaces';
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
import { ITokenResponse, ManagementTokenService } from '../../services';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private managementTokenService: ManagementTokenService,
    private reflector: Reflector
  ) {}
  getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    return GqlExecutionContext.create(context).getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const config = this.reflector.getAllAndOverride<IAuthenticationConfig>(
      AUTHENTICATION_CONFIG,
      [context.getHandler(), context.getClass()]
    );

    let user: IAuthenticatedAccount & ITokenResponse;
    let refreshTokenDecoded: IRefreshTokenPayload & ITokenResponse;
    try {
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
      user = await this.managementTokenService.decodeAccessToken(accessToken);
      if (!user) {
        throw new UnauthorizedException();
      }
      refreshTokenDecoded =
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

      const isAccessTokenExpired = isExpiredDate(user.exp);
      const isRefreshTokenExpired = isExpiredDate(refreshTokenDecoded.exp);
      const isAccessExpired = isExpiredDate(user.accessExpiresIn);
      if (isAccessExpired) {
        throw new UnauthorizedException();
      }
      if (
        config?.hasExpiresValidation &&
        (isAccessTokenExpired || isRefreshTokenExpired)
      ) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      if (config?.isRequired) {
        throw error;
      }
    }
    request.user = user;
    request.refreshToken = refreshTokenDecoded;
    return true;
  }
}
