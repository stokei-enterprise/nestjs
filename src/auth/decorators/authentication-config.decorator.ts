import { SetMetadata } from '@nestjs/common';

import { IAuthenticationConfig } from '../../interfaces/authentication-config';

export const AUTHENTICATION_CONFIG = 'AUTHENTICATION_CONFIG';
export const AuthenticationConfig = (config: IAuthenticationConfig) =>
  SetMetadata(AUTHENTICATION_CONFIG, config);
