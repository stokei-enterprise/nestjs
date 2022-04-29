import { InvalidTokenException } from '@stokei/shared';

export const extractRefreshToken = (token: string): string => {
  if (!token) {
    throw new InvalidTokenException();
  }
  return token;
};
