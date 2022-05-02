import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthenticatedAccount, IRefreshTokenPayload } from '@/interfaces';

export interface ITokenConfig {
  readonly expiresIn?: string | number;
}
export interface ITokenResponse {
  readonly exp?: number;
  readonly iat?: number;
}

@Injectable()
export class ManagementTokenService {
  constructor(private readonly jwtService: JwtService) {}

  createToken<TPayload = Record<string, string>>(
    data: TPayload,
    config?: ITokenConfig
  ): string {
    return this.jwtService.sign(data as any, {
      ...(config?.expiresIn && { expiresIn: config?.expiresIn })
    });
  }

  decodeToken<TPayload = Record<string, string>>(
    token: string
  ): TPayload & ITokenResponse {
    const responseToken = this.jwtService.decode(token) as TPayload &
      ITokenResponse;
    if (!responseToken) {
      throw new UnauthorizedException();
    }
    return {
      ...responseToken,
      exp: responseToken.exp * 1000,
      iat: responseToken.iat * 1000
    };
  }

  createAccessToken(data: IAuthenticatedAccount): string {
    return this.createToken<IAuthenticatedAccount>(data, {
      expiresIn: '60s'
    });
  }

  decodeAccessToken(token: string) {
    return this.decodeToken<IAuthenticatedAccount>(token);
  }

  createRefreshToken(data: IRefreshTokenPayload): string {
    return this.createToken<IRefreshTokenPayload>(data, {
      expiresIn: '300s' // 5 min
    });
  }

  decodeRefreshToken(token: string) {
    return this.decodeToken<IRefreshTokenPayload>(token);
  }
}
